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

  save(e: Etape, va: Ville, vd:Ville): Observable<Etape> {
    e.villearrivee= va;
    e.villedepart= vd;
    return this.httpClient.post<Etape>(this.host + '/etapes/', e);
  }

  updateEtape(e: Etape): Observable<Etape> {
    return this.httpClient.put<Etape>(this.host + '/etapes/' + e.idetape, e);
  }

  getEtapesVilleDepart(idVille: number): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + '/etapes/idville=' + idVille);
  }

  getEtapesVilleArrivee(idVille_1: number): Observable<Etape[]> {
    return this.httpClient.get<Etape[]>(this.host + '/etapes/idville_1=' + idVille_1);
  }

  search(id:number):Observable<Etape>{
    return this.httpClient.get<Etape>(this.host+"/etapes/"+id);
  }
}
