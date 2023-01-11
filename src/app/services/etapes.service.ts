import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Etape} from "../entities/etape.entities";
import {Ville} from "../entities/ville.entities";

@Injectable({providedIn: "root"})
export class EtapesService {
  private host = environment.host;

  constructor(private httpClient: HttpClient) {
  }

  deleteEtape(e: Etape): Observable<void> {
    return this.httpClient.delete<void>(this.host + '/etapes/' + e.idetape);
  }

  /*saveArr(e: Etape, va: Ville): Observable<Etape> {
    e.villearrivee= va;
    return this.httpClient.post<Etape>(this.host + '/etapes/', e);
  }*/

  save(e: Etape, vd: Ville): Observable<Etape> {
    e.villedepart = vd;
    console.log(e, vd);
    return this.httpClient.post<Etape>(this.host + '/etapes/', e);
  }

  updateEtape(e: Etape): Observable<Etape> {
    return this.httpClient.put<Etape>(this.host + '/etapes/' + e.idetape, e);
  }

  getEtapesVilleDepart(idVille: number): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + '/etapes/idvilled=' + idVille);
  }

  getEtapesVilleArrivee(idVille_1: number): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + '/etapes/idvillea=' + idVille_1);
  }

  search(id: number): Observable<Etape> {
    return this.httpClient.get<Etape>(this.host + "/etapes/" + id);
  }

  /*searchDesc(desc: string): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + "/etapes/description=" + desc);
  }*/

  /*searchEtapesByPays(pays: string): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + "/etapes/pays=" + pays);
  }*/

  getEtapesKm(kmMin: number, kmMax: number): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + "/etapes/" + kmMin + "/" + kmMax);
  }

  getEtapes(): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + '/etapes/all');
  }

}
