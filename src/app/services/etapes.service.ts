import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class ComfactService {
  private host = environment.host;

  constructor(private http: HttpClient) {
  }
}
