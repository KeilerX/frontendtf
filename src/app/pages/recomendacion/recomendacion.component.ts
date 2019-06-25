import { Component, OnInit } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { Empresa } from "src/app/model/empresa";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { EmpresaService } from "src/app/service/empresa.service";
import { MatSnackBar } from "@angular/material";
import { TrabajadorRecomendacion } from "src/app/model/trabajadorRecomendacion";

@Component({
  selector: "app-recomendacion",
  templateUrl: "./recomendacion.component.html",
  styleUrls: ["./recomendacion.component.css"]
})
export class RecomendacionComponent implements OnInit {
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

    /*  this.trabajadorService.registrar(consultaListaExamen).subscribe(data => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    }); */
  }
}
