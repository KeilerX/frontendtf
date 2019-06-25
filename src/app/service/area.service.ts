import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { HOST } from '../shared/var.constant';
import { Area } from '../model/area';

@Injectable({
  providedIn: "root"
})
export class AreaService {
  url: string=`${HOST}/areas`;

  areaCambio= new Subject<Area[]>();
  mensajeCambio=new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Area[]>(this.url);
  }

  listarAreaPorId(id: number) {
    return this.http.get<Area>(`${this.url}/${id}`);
  }

  registrar(area: Area) {
    return this.http.post(this.url, area);
  }

  modificar(area: Area) {
    return this.http.put(this.url, area);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
