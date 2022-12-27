import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Ville} from "../../entities/ville.entities";
import {VillesService} from "../../services/villes.service";

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent implements OnInit {
  villes?: Ville[]; //le ? signifie que la valeur undefinied est acceptée
  constructor(private villesService: VillesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSearch(value: any) {
    this.villesService.getVilleNom(value.nom).subscribe(
      {
        next: data => {
          this.villes = data.sort((a, b) => a.nom.localeCompare(b.nom));
        }
      });
  }

  onNewVille() {
    this.router.navigateByUrl("newVille");
  }

  onDelete(v: Ville) {
    let c = confirm('êtes vous sûr de vouloir supprimer ? ');
    if (c) {
      this.villesService.deleteVille(v).subscribe(
        {
          next: data => {
            this.onSearch(v); //rafraîchissement de la page actuelle
            //la solution ci-dessous permet de ne pas recharger la liste à partir du backend
            /* const index = this.clients?.indexOf(c, 0); //élement à rechercher, position de départ de la recherche
            alert("index = "+index);
            if (!(index === undefined) && index > -1) {
            this.clients?.splice(index, 1);//position de l'élément à ôter,nombre d'éléments à ôter
            }*/
          },
          error: err => {
            alert(err.headers.get("error"));
          }
        }
      );
    }
  }

  onEdit(v: Ville) {
    this.router.navigateByUrl("editVille/"+v.idville);
  }
}
