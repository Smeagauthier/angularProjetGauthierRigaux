import { Component, OnInit } from '@angular/core';
import {Ville} from "../../entities/ville.entities";
import {VillesService} from "../../services/villes.service";

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.css']
})
export class ExercicesComponent implements OnInit {

  ville:Ville|null=null;
  numrech:number=0;
  nom:String="";
  clistrouv?:Ville[];

  constructor(private villeService:VillesService) {
  }

  ngOnInit(): void {
    this.onSearchById(1);
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

}
