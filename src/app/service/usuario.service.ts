import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Trabajador } from "../model/trabajador";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  execChange: Subject<any> = new Subject<any>();

  constructor() {}

  /**
   * Use to change user name
   * @data type: string
   */
  setCurrentUser(id: number) {
    this.execChange.next(id);
    console.log("Entró");
  }

  /* getCurrentUser() {
    return this.execChange;
  } */
}
