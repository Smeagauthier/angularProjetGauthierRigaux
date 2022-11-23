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
}
