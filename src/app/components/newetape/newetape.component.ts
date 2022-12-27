import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Etape} from "../../entities/etape.entities";
import {EtapesService} from "../../services/etapes.service";
import {formatDate} from "@angular/common";
import {Ville} from "../../entities/ville.entities";
import {VillesService} from "../../services/villes.service";

@Component({
  selector: 'app-newetape',
  templateUrl: './newetape.component.html',
  styleUrls: ['./newetape.component.css']
})
export class NewetapeComponent implements OnInit {
  @Input() vilactdep?: FormGroup;
  @Input() vilactarr?: FormGroup;
  @Output() newEtape = new EventEmitter<Etape>();
  etapeFormGroup?: FormGroup;
  submitted = false;
  et?: Etape;
  villes?: Ville[];

  constructor(private fb: FormBuilder, private etapesService: EtapesService, private villesService: VillesService) {

  }

  onSearch(value: any) {
    this.villesService.getVilleNom(value.nom).subscribe(
      {
        next: data => {
          this.villes = data
        }
      });
  }


  ngOnInit(): void {
    this.etapeFormGroup = this.fb.group({
      idetape: [],
      numero: [],
      description: [],
      dateetape: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      km: [],
      //villearrivee: {}
    });
  }

  onSaveEtape(): void {
    this.submitted = true;
    this.etapesService.saveDep(this.etapeFormGroup?.value, this.vilactdep?.value).subscribe({
      next: data => {
        alert('Sauvegarde effectuée');
        alert('Voici le numéro de la ville de départ:' + data.villedepart)
        this.et = data;
        this.newEtape.emit(data)
      },
      error: err => alert(err.headers.get("error"))
    });
  }

  /*onSaveEtapeArrivee(): void {
    this.submitted = true;
    this.etapesService.saveArr(this.etapeFormGroup?.value, this.vilactarr?.value).subscribe({
      next: data => {
        alert('Sauvegarde effectuée'); alert('Voici le numéro de la ville d arrivée:'+data.villearrivee )
        this.et = data;
        this.newEtape.emit(data)
      },
      error: err => alert(err.headers.get("error"))
    });
  }*/
}
