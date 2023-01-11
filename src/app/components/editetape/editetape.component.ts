import {Component, Input, OnInit} from '@angular/core';
import {EtapesService} from "../../services/etapes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Etape} from "../../entities/etape.entities";
import {Ville} from "../../entities/ville.entities";

@Component({
  selector: 'app-editetape',
  templateUrl: './editetape.component.html',
  styleUrls: ['./editetape.component.css']
})
export class EditetapeComponent implements OnInit {
  etapeFormGroup?: FormGroup;
  submitted = false;
  @Input() etape?: Etape;
  deleted=false;
  villes?:Ville[];

  constructor(private etapesService:EtapesService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.etapeFormGroup = this.fb.group({
      idetape: [this.etape?.idetape],
      numero: [this.etape?.numero, [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: [this.etape?.description, Validators.required],
      dateetape: [this.etape?.dateetape, Validators.required],
      km: [this.etape?.km, [Validators.required, Validators.pattern("^[0-9]*$")]],
      villedepart: [this.etape?.villedepart.nom],
      villearrivee: [this.etape?.villearrivee.nom]
    });
  }

  onUpdateEtape(): void {
    this.submitted = true;
    if (this.etapeFormGroup?.invalid) {
      return;
    }
    let etapemaj: Etape = this.etapeFormGroup?.value;
    if (this.etape) {
      etapemaj.villearrivee = this.etape.villearrivee;
      etapemaj.villedepart = this.etape.villedepart;
      this.etapesService.updateEtape(etapemaj).subscribe({
        next: data => alert('Mise à jour effectuée'),
        error: err => alert(err.headers.get("error"))
      })
    }
  }

  onDeleteEtape() {
    let c = confirm('Etes-vous sûr de vouloir supprimer ? ');
    if (c) {
      this.etapesService.deleteEtape(this.etapeFormGroup?.value).subscribe(data => {
          alert('Effacement effectué');
          this.deleted = true;
        },
        err => {
          alert(err.headers.get("Error"));
        });
    }
  }

}
