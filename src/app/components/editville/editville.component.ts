import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {VillesService} from "../../services/villes.service";
import {EtapesService} from "../../services/etapes.service";
import {Etape} from "../../entities/etape.entities";

@Component({
  selector: 'app-editville',
  templateUrl: './editville.component.html',
  styleUrls: ['./editville.component.css']
})
export class EditvilleComponent implements OnInit {
  villeFormGroup?: FormGroup;
  submitted = false;
  idville: number;
  idv: any = "";
  etapes?: Etape[];

  constructor(private villesService: VillesService, private fb:
    FormBuilder, activatedRoute: ActivatedRoute, private etapesService: EtapesService) {
    this.idville = activatedRoute.snapshot.params.idville;
  }

  ngOnInit(): void {
    this.villesService.getVille(this.idville).subscribe(
      ville => {
        this.villeFormGroup = this.fb.group({
          idville: [ville.idville, Validators.required],
          nom: [ville.nom, [Validators.required, Validators.pattern("^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿñÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÒÓÔÕÖÙÚÛÜÝŸÑ -]+$")]],
          latitude: [ville.latitude, [Validators.required, Validators.pattern("^[0-9]{2}([.][0-9]{4})$")]],
          longitude: [ville.longitude, [Validators.required, Validators.pattern("^[0-9]{2}([.][0-9]{4})$")]],
          pays: [ville.pays, [Validators.required, Validators.pattern("^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿñÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÐÒÓÔÕÖÙÚÛÜÝŸÑ -]+$")]]
        })
      });
  }

  onUpdateVille(): void {
    this.submitted = true;
    if (this.villeFormGroup?.invalid) {
      return;
    }
    this.villesService.updateVille(this.villeFormGroup?.value).subscribe(data => {
        alert('Mise à jour effectuée')
      },
      err => {
        alert(err.headers.get("error"));
      });
  }

  onShowEtapeVilleDepart() {
    this.etapesService.getEtapesVilleDepart(this.idville).subscribe({
      next: data => this.etapes = data,
      error: err => alert("Erreur de recherche des villes de départ")
    })
  }

  onShowEtapeVilleArrivee() {
    this.etapesService.getEtapesVilleArrivee(this.idville).subscribe({
      next: data => this.etapes = data,
      error: err => alert("Erreur de recherche des villes d'arrivée ")
    })
  }

  addEtape($event: Etape) {
    this.etapes?.push($event);
  }
}
