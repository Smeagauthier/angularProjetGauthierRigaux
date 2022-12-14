import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  villes?: Ville[] = [];

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

  getVilles() {
    this.villesService.getVilles().subscribe(
      {
        next: data => {
          this.villes = data.sort((a, b) => a.nom.localeCompare(b.nom));
        }
      });
  }


  ngOnInit(): void {
    this.getVilles();
    this.etapeFormGroup = this.fb.group({
      numero: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required],
      dateetape: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      km: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      villearrivee: /*[*/this.fb.group({
        idville: [],
        nom: [],
        latitude: [],
        longitude: [],
        pays: [],
      })/*, [Validators.required]]*/
    });
  }

  getSelectedVillearrivee($event: any) {
    let selectedId = $event.target.value
    console.log($event.target.value) //envoie la valeur dans l'input qui a changé dans l'event (ici ville.idville)
    let ville = this.villes?.find((v) => v.idville == selectedId)//on cherche l'élément v tel que l'idville de cet élément est égal à l'event
    /*this.villearrivee?.get('idville')?.setValue(ville?.idville);
    this.villearrivee?.get('nom')?.setValue(ville?.nom);
    this.villearrivee?.get('latitude')?.setValue(ville?.latitude);
    this.villearrivee?.get('longitude')?.setValue(ville?.longitude);
    this.villearrivee?.get('pays')?.setValue(ville?.pays);*/
    this.villearrivee?.patchValue(ville);//méthode pour remplir les champs de l'objet de la ville d'arrivée (nom, lat, long, pays,..) grâce à l'élément ville cherché au préalable
  }

  get villearrivee() {
    return this.etapeFormGroup?.get('villearrivee');
  }

  onSaveEtape(): void {
    this.submitted = true;
    this.etapesService.save(this.etapeFormGroup?.value, this.vilactdep?.value).subscribe({
      next: data => {
        alert('Sauvegarde effectuée');
        this.et = data;
        this.newEtape.emit(data)
      },
      error: err => {
        if(this.villearrivee == null){
          alert('Veuillez entrer une ville d\'arrivée');
        } else {
          alert(err.headers.get("error"));
        }
      }
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
