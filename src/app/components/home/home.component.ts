import { Component, OnInit } from '@angular/core';
import {Ville} from "../../entities/ville.entities";
import {VillesService} from "../../services/villes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  villes?: Ville[];

  constructor(private villesService: VillesService, private router: Router) { }

  ngOnInit(): void {
  }

}
