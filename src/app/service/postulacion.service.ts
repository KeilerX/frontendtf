import { Injectable } from "@angular/core";
import { HOST } from "../shared/var.constant";
import { Subject } from "rxjs";
import { Postulacion } from "../model/postulacion";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PostulacionService {
  url: string = `${HOST}/postulaciones`;

  postulacionCambio = new Subject<Postulacion[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Postulacion[]>(this.url);
  }

  listarPostulacionPorId(id: number) {
    return this.http.get<Postulacion>(`${this.url}/${id}`);
  }

  listarPostulacionPorTrabajador(id: number) {
    return this.http.get<Postulacion[]>(`${this.url}/trabajador/${id}`);
  }

  listarPostulacionPorTrabajo(id: number) {
    return this.http.get<Postulacion[]>(`${this.url}/trabajo/${id}`);
  }

  contratar(id1: number, id2: number) {
    return this.http.get<Postulacion[]>(`${this.url}/contratar/${id1}/${id2}`);
  }
  registrar(postulacion: Postulacion) {
    return this.http.post(this.url, postulacion);
  }

  modificar(postulacion: Postulacion) {
    return this.http.put(this.url, postulacion);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
