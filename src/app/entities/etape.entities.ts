import {Ville} from './ville.entities';
export interface Etape {
  idetape : number,
  numero :number,
  description:string,
  dateetape:Date,
  km:number,
  villedepart:Ville,
  villearrivee:Ville

}
