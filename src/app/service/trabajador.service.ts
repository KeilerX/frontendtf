import { Injectable } from "@angular/core";
import { HOST } from "../shared/var.constant";
import { Subject } from "rxjs";
import { Trabajador } from "../model/trabajador";
import { HttpClient } from "@angular/common/http";
import { TrabajadorPostulacion } from "../model/trabajadorPostulacion";

@Injectable({
  providedIn: "root"
})
export class TrabajadorService {
  url: string = `${HOST}/trabajadores`;

  trabajadorCambio = new Subject<Trabajador[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Trabajador[]>(this.url);
  }

  listarTrabajadorPorId(id: number) {
    return this.http.get<Trabajador>(`${this.url}/${id}`);
  }

  registrar(trabajador: Trabajador) {
    return this.http.post(this.url, trabajador);
  }

  postular(postulacion: TrabajadorPostulacion) {
    return this.http.post(this.url, postulacion);
  }

  modificar(trabajador: Trabajador) {
    return this.http.put(this.url, trabajador);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
