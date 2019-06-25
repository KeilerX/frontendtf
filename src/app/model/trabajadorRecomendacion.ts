import { Trabajador } from "./trabajador";
import { Empresa } from "./empresa";

export class TrabajadorRecomendacion {
  id: number;
  comentario: string;
  trabajador: Trabajador;
  empresa: Empresa;
}
