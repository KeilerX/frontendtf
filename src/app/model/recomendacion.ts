import { Trabajador } from "./trabajador";
import { Empresa } from "./empresa";

export class Recomendacion {
  id: number;
  trabajador: Trabajador;
  empresa: Empresa;
  comentario: string;
}
