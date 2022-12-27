import { Component, OnInit } from '@angular/core';
import {EtapesService} from "../../services/etapes.service";
import {Etape} from "../../entities/etape.entities";

@Component({
  selector: 'app-etapes',
  templateUrl: './etapes.component.html',
  styleUrls: ['./etapes.component.css']
})
export class EtapesComponent implements OnInit {
  etape: Etape|null = null;
  numetape:number=0;
  etapes?:Etape[];
  idetape?:number;

  constructor(private etapesService:EtapesService) { }

  ngOnInit(): void {
  }

  onSearch(){
    this.etape=null;
    this.etapesService.search(this.numetape).subscribe({
      next : data => this.etape=data,
      error : err => alert("Etape introuvable")
    })
  }

}
