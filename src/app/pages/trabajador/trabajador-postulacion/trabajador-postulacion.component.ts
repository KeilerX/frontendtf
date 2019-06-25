import { Component, OnInit } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { Trabajo } from "src/app/model/trabajo";
import { TrabajoService } from "src/app/service/trabajo.service";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { MatSnackBar } from "@angular/material";
import { TrabajadorPostulacion } from "src/app/model/trabajadorPostulacion";

@Component({
  selector: "app-trabajador-postulacion",
  templateUrl: "./trabajador-postulacion.component.html",
  styleUrls: ["./trabajador-postulacion.component.css"]
})
export class TrabajadorPostulacionComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  trabajos: Trabajo[] = [];

  id: number = 0;
  idTrabajadorSeleccionado: number;
  idTrabajoSeleccionado: number;

  estado: string;

  mensaje: string;

  constructor(
    private trabajoService: TrabajoService,
    private trabajadorService: TrabajadorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listarTrabajadores();
    this.listarTrabajos();
  }

  listarTrabajadores() {
    this.trabajadorService.listar().subscribe(data => {
      this.trabajadores = data;
    });
  }

  listarTrabajos() {
    this.trabajoService.listar().subscribe(data => {
      this.trabajos = data;
    });
  }

  aceptar() {
    let trabajador = new Trabajador();
    trabajador.id = this.idTrabajadorSeleccionado;

    let trabajo = new Trabajo();
    trabajo.id = this.idTrabajoSeleccionado;

    let trabajadorPostulacion = new TrabajadorPostulacion();
    trabajadorPostulacion.trabajador = trabajador;
    trabajadorPostulacion.trabajo = trabajo;
    trabajadorPostulacion.id = this.id;

    this.trabajadorService.postular(trabajadorPostulacion).subscribe(data => {
      this.snackBar.open("Se postuló al trabajo correctamento", "Aviso", {
        duration: 2000
      });
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

  limpiarControles() {
    this.idTrabajadorSeleccionado = 0;
    this.idTrabajoSeleccionado = 0;
    this.estado = "";
    this.mensaje = "";
  }

  estadoBotonRegistrar() {
    return (
      this.idTrabajadorSeleccionado === 0 || this.idTrabajoSeleccionado === 0
    );
  }
}
