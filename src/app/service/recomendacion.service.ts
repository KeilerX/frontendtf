import { Injectable } from "@angular/core";
import { HOST } from "../shared/var.constant";
import { Subject } from "rxjs";
import { Recomendacion } from "../model/recomendacion";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RecomendacionService {
  url: string = `${HOST}/recomendaciones`;

  recomendacionCambio = new Subject<Recomendacion[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Recomendacion[]>(this.url);
  }

  listarRecomendacionPorId(id: number) {
    return this.http.get<Recomendacion>(`${this.url}/${id}`);
  }

  registrar(recomendacion: Recomendacion) {
    return this.http.post(this.url, recomendacion);
  }

  modificar(recomendacion: Recomendacion) {
    return this.http.put(this.url, recomendacion);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
