import { Empresa } from "./empresa";

export class Trabajo {
  id: number;
  descripcion: string;
  sueldo: number;
  estado: boolean;
  empresa: Empresa;
}
