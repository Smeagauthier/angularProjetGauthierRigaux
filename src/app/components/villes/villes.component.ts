import { Component, OnInit } from '@angular/core';
import {VillesService} from "../../services/villes.service";


@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent implements OnInit {

  constructor(private villesService:VillesService) { }

  ngOnInit(): void {
    this.onSearchById(1);
  }

  onSearchById(idville:number) {
    this.villesService.getVille(idville).subscribe({
      next:data=>alert(data.nom),
      error:error=>alert(error)
    })
  }
}
