import { Component, OnInit } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { Empresa } from "src/app/model/empresa";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { EmpresaService } from "src/app/service/empresa.service";
import { MatSnackBar } from "@angular/material";
import { TrabajadorRecomendacion } from "src/app/model/trabajadorRecomendacion";

@Component({
  selector: "app-empresa-recomendacion",
  templateUrl: "./empresa-recomendacion.component.html",
  styleUrls: ["./empresa-recomendacion.component.css"]
})
export class EmpresaRecomendacionComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  empresas: Empresa[] = [];
  comentario: string;

  id: number = 0;
  idTrabajadorSeleccionado: number;
  idEmpresaSeleccionado: number;

  mensaje: string;

  constructor(
    private trabajadorService: TrabajadorService,
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listarTrabajadores();
    this.listarEmpresas();
  }

  listarTrabajadores() {
    this.trabajadorService.listar().subscribe(data => {
      this.trabajadores = data;
    });
  }

  listarEmpresas() {
    this.empresaService.listar().subscribe(data => {
      this.empresas = data;
    });
  }

  aceptar() {
    let trabajador = new Trabajador();
    trabajador.id = this.idTrabajadorSeleccionado;
    let empresa = new Empresa();
    empresa.id = this.idEmpresaSeleccionado;

    let trabajadorRecomendacion = new TrabajadorRecomendacion();
    trabajadorRecomendacion.empresa = empresa;
    trabajadorRecomendacion.trabajador = trabajador;
    trabajadorRecomendacion.comentario = this.comentario;
    trabajadorRecomendacion.id = this.id;

    this.empresaService.recomendar(trabajadorRecomendacion).subscribe(data => {
      this.snackBar.open("Se recomendó correctamente al usuario.", "Aviso", {
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
