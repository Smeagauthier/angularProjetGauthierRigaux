import {Component, OnInit} from '@angular/core';
import {EtapesService} from "../../services/etapes.service";
import {Etape} from "../../entities/etape.entities";
import {Ville} from "../../entities/ville.entities";

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  kmMin?: number;
  kmMax?: number;
  ok?: boolean = false;


  etapes?: Etape[];

  constructor(private etapesService: EtapesService) {
  }

  ngOnInit(): void {
  }

  onSearchEtapesBetweenKm() {
    if (this.kmMin != null && this.kmMax != null) {
      this.etapesService.getEtapesKm(this.kmMin, this.kmMax).subscribe({
        next: data => this.etapes = data,
        error: error => alert("Error : " + error.headers.get("error"))
      })
    }
  }

  onSearchDoublons() {
    if (this.etapes?.filter(i => i.villedepart === i.villearrivee)) {
      this.etapesService.getEtapes().subscribe({
        next: data => {
          this.etapes = data
        }
      })
    } else {
      alert("Aucune étape trouvée avec les même ville de départ et d'arrivée");
    }
    /*for (let e of this.etapes?) {
      if (e.villedepart.nom == e.villearrivee.nom) {
        this.etapesService.getEtapes().subscribe({
          next: data => {
            this.etapes = data
          }
        })
      }
    }*/
  }
}


