import { Injectable } from "@angular/core";
import { HOST } from "../shared/var.constant";
import { Subject } from "rxjs";
import { Empresa } from "../model/empresa";
import { HttpClient } from "@angular/common/http";
import { TrabajadorRecomendacion } from "../model/trabajadorRecomendacion";

@Injectable({
  providedIn: "root"
})
export class EmpresaService {
  url: string = `${HOST}/empresas`;

  empresaCambio = new Subject<Empresa[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Empresa[]>(this.url);
  }

  listarEmpresaPorId(id: number) {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  registrar(empresa: Empresa) {
    return this.http.post(this.url, empresa);
  }

  recomendar(recomendacion: TrabajadorRecomendacion) {
    return this.http.post(this.url, recomendacion);
  }

  modificar(empresa: Empresa) {
    return this.http.put(this.url, empresa);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
