import { Component, OnInit } from '@angular/core';
import {Ville} from "../../entities/ville.entities";
import {VillesService} from "../../services/villes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  ville:Ville|null=null;
  numrech:number=0;
  nom:String="";
  villestrouv?:Ville[];
  submitted=false;

  villeFormGroup?: FormGroup;

  constructor(private villeService:VillesService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.villeFormGroup = this.fb.group({
      nom: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      pays: ["", Validators.required]
    })
  }

  onSearchById(idville:number) {
    this.villeService.getVille(idville).subscribe({
      next:data=>this.ville=data,
      error:error=>alert(error)
    })
  }

  recherche() {
    this.ville=null;
    this.villeService.getVille(this.numrech).subscribe({
      next:data=>this.ville=data,
      error:error=> alert("erreur "+error.headers.get("error"))
    })
  }

  rechParForm(value: any) {
    this.ville = null;
    let numero:number = value.numero;
    this.villeService.getVille(numero).subscribe({
      next:data=>this.ville=data,
      error:error=> {alert("erreur ");this.ville=null;}
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
      error: error => {alert("erreur ");this.ville = null;}
    })
  }

  saveVille() {
    this.submitted = true;
    if (this.villeFormGroup?.invalid) alert("Encodage invalide");
    else {
      alert(this.villeFormGroup?.value.nom + " " +
        this.villeFormGroup?.value.latitude + " "+
        this.villeFormGroup?.value.longitude + " "
        + this.villeFormGroup?.value.pays);
    }
  }

}
