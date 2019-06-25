import { Trabajador } from "./trabajador";
import { Trabajo } from "./trabajo";

export class TrabajadorPostulacion {
  id: number;
  trabajador: Trabajador;
  trabajo: Trabajo;
  estado: boolean;
}
