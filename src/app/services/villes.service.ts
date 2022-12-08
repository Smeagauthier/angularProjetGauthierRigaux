import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ville} from "../entities/ville.entities";

@Injectable({providedIn: "root"}) //providedIn:"root" permet de rendreaccessible cette classe partout dans l'application
export class VillesService {
  private host = environment.host;

  constructor(private httpClient: HttpClient) {
  }

  getVille(idville: number): Observable<Ville> {
    return this.httpClient.get<Ville>(this.host + '/villes/' + idville);
  }

  getVilleNom(nom: string): Observable<Ville[]> {
    return this.httpClient.get<Ville[]>(this.host + "/villes/nom=" + nom);
  }

  deleteVille(ville: Ville): Observable<void> {
    return this.httpClient.delete<void>(this.host + "/villes/" + ville.idville);
  }

  save(v: Ville): Observable<Ville> {
    return this.httpClient.post<Ville>(this.host + "/villes/", v);
  }

  updateVille(v: Ville): Observable<Ville> {
    return this.httpClient.put<Ville>(this.host + "/villes/" + v.idville, v);
  }

}
