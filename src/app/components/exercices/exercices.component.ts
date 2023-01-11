import {Component, OnInit} from '@angular/core';
import {Ville} from "../../entities/ville.entities";
import {VillesService} from "../../services/villes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EtapesService} from "../../services/etapes.service";
import {Etape} from "../../entities/etape.entities";

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  ville: Ville | null = null;
  numrech: number = 0;
  nom: String = "";
  villestrouv?: Ville[];
  submitted = false;
  villes?: Ville[];
  etapes?: Etape[];
  bcc: number = 0;
  item: number = 0;
  total: any;
  villeFormGroup?: FormGroup;
  etapeFormGroup?: FormGroup;
  latitude?:number;
  longitude?:number;


  constructor(private villeService: VillesService, private fb: FormBuilder, private etapesService: EtapesService) {
  }

  ngOnInit(): void {
    this.villeFormGroup = this.fb.group({
      nom: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      pays: ["", Validators.required]
    })
  }

  onSearchById(idville: number) {
    this.villeService.getVille(idville).subscribe({
      next: data => this.ville = data,
      error: error => alert(error)
    })
  }

  recherche() {
    this.ville = null;
    this.villeService.getVille(this.numrech).subscribe({
      next: data => this.ville = data,
      error: error => alert("erreur " + error.headers.get("error"))
    })
  }

  rechParForm(value: any) {
    this.ville = null;
    let numero: number = value.numero;
    this.villeService.getVille(numero).subscribe({
      next: data => this.ville = data,
      error: error => {
        alert("erreur ");
        this.ville = null;
      }
    })
  }

  rechercheParNom(value: any) {
    this.villeService.getVilleNom(value.nom).subscribe({
      next: data => {
        this.villestrouv = data
      }
    })
  }

  effacer(v: Ville) {
    this.villeService.deleteVille(v).subscribe({
      next: data => {
        alert("record effacé");
        //this.rechercheParNom(v);},
        const index = this.villestrouv?.indexOf(v, 0);
        if (!(index === undefined) && index > -1) {
          this.villestrouv?.splice(index, 1);
        }
      },
      error: error => {
        alert("erreur ");
        this.ville = null;
      }
    })
  }

  saveVille() {
    this.submitted = true;
    if (this.villeFormGroup?.invalid) alert("Encodage invalide");
    else {
      alert(this.villeFormGroup?.value.nom + " " +
        this.villeFormGroup?.value.latitude + " " +
        this.villeFormGroup?.value.longitude + " "
        + this.villeFormGroup?.value.pays);
    }
  }

  rechercheParID(value: any) {
    let numero: number = value.idville;
    this.villeService.getVille(numero).subscribe({
      next: data => {
        this.ville = data;
        this.villeFormGroup = this.fb.group(
          {
            nom: [data.nom, Validators.required],
            latitude: [data.latitude, Validators.required],
            longitude: [data.longitude, Validators.required],
            pays: [data.pays, Validators.required]
          }
        )
      },
      error: error => {
        alert("erreur ");
        this.ville = null
      }
    })
  }

  majVille() {
    this.submitted = true;
    if (this.villeFormGroup?.invalid) {
      return
    }
    alert("maj OK");
  }

  rechercheEtapeParID(value: any) {
    this.etapesService.search(value.idetape).subscribe({
        next: data => {
          this.etapeFormGroup = this.fb.group(
            {
              numero: [data.numero, [Validators.required]],
              description: [data.description, Validators.required],
              dateetape: [data.dateetape, Validators.required],
              km: [data.km, Validators.required],
            }
          )
        },
        error: error => alert("commande introuvable")
      }
    )
  }


  /*rechercheEtapeParDesc(value:any){
    this.etapesService.searchDesc(value.description).subscribe({
      next: data => {
        this.etapes = data
      }
    })
  }

  getTotalKm() {
    return this.etapes?.map(t => t.km).reduce((a, b) => a + b, 0);
  }*/


}
