import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { HOST } from "../shared/var.constant";
import { Trabajo } from "../model/trabajo";
import { TrabajoListaArea } from "../model/trabajoListaArea";

@Injectable({
  providedIn: "root"
})
export class TrabajoService {
  url: string = `${HOST}/trabajos`;

  trabajoCambio = new Subject<Trabajo[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Trabajo[]>(this.url);
  }

  listarTrabajoPorId(id: number) {
    return this.http.get<Trabajo>(`${this.url}/${id}`);
  }

  registrar(trabajoDTO: TrabajoListaArea) {
    return this.http.post(this.url, trabajoDTO);
  }

  modificar(trabajo: Trabajo) {
    return this.http.put(this.url, trabajo);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
