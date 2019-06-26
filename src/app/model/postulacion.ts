import { Trabajador } from "./trabajador";
import { Trabajo } from "./trabajo";

export class Postulacion {
  id: number;
  trabajador: Trabajador;
  trabajo: Trabajo;
  estado: number;
}
