import { Component, OnInit } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { Empresa } from "src/app/model/empresa";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { EmpresaService } from "src/app/service/empresa.service";
import { MatSnackBar } from "@angular/material";
import { TrabajadorRecomendacion } from "src/app/model/trabajadorRecomendacion";
import { RecomendacionService } from "src/app/service/recomendacion.service";
import { Recomendacion } from "src/app/model/recomendacion";

@Component({
  selector: "app-empresa-recomendacion",
  templateUrl: "./empresa-recomendacion.component.html",
  styleUrls: ["./empresa-recomendacion.component.css"]
})
export class EmpresaRecomendacionComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  empresas: Empresa[] = [];
  comentario: string;

  id: number;
  idTrabajadorSeleccionado: number;
  idEmpresaSeleccionado: number;
  cEmpresa: Empresa = new Empresa();

  mensaje: string;

  constructor(
    private trabajadorService: TrabajadorService,
    private empresaService: EmpresaService,
    private recomendacionService: RecomendacionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listarTrabajadores();
    this.empresaService
      .listarEmpresaPorId(+localStorage.getItem("empresa"))
      .subscribe(data => {
        this.cEmpresa = data;
        console.log(data);
      });
    this.idEmpresaSeleccionado = +localStorage.getItem("empresa");
  }

  listarTrabajadores() {
    this.trabajadorService.listar().subscribe(data => {
      this.trabajadores = data;
    });
  }

  aceptar() {
    let trabajador = new Trabajador();
    trabajador.id = this.idTrabajadorSeleccionado;
    let empresa = new Empresa();
    empresa.id = this.idEmpresaSeleccionado;

    let recomendacion = new Recomendacion();
    recomendacion.empresa = empresa;
    recomendacion.trabajador = trabajador;
    recomendacion.comentario = this.comentario;
    recomendacion.id = this.id;

    console.log(recomendacion);
    this.recomendacionService.registrar(recomendacion).subscribe(data => {
      this.snackBar.open("Se recomendó correctamente al trabajador.", "Aviso", {
        duration: 2000
      });
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

  limpiarControles() {
    this.idTrabajadorSeleccionado = 0;
    this.idEmpresaSeleccionado = 0;
    this.comentario = "";
    this.mensaje = "";
  }

  estadoBotonRegistrar() {
    return (
      this.idTrabajadorSeleccionado === 0 || this.idEmpresaSeleccionado === 0
    );
  }
}
