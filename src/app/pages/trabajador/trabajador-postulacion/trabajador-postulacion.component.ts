import { Component, OnInit, OnChanges } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { Trabajo } from "src/app/model/trabajo";
import { TrabajoService } from "src/app/service/trabajo.service";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { MatSnackBar } from "@angular/material";
import { Postulacion } from "src/app/model/postulacion";
import { PostulacionService } from "src/app/service/postulacion.service";

@Component({
  selector: "app-trabajador-postulacion",
  templateUrl: "./trabajador-postulacion.component.html",
  styleUrls: ["./trabajador-postulacion.component.css"]
})
export class TrabajadorPostulacionComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  trabajos: Trabajo[] = [];

  id: number;
  idTrabajadorSeleccionado: number;
  idTrabajoSeleccionado: number;

  cTrabajador: Trabajador = new Trabajador();

  nombres: string;
  estado: number = 0;

  mensaje: string;

  constructor(
    private trabajoService: TrabajoService,
    private trabajadorService: TrabajadorService,
    private postulacionService: PostulacionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listarTrabajadores();
    this.listarTrabajos();
  }

  listarTrabajadores() {
    this.trabajadorService
      .listarTrabajadorPorId(+localStorage.getItem("trabajador"))
      .subscribe(data => {
        this.cTrabajador = data;
        console.log(data);
      });
    this.idTrabajadorSeleccionado = +localStorage.getItem("trabajador");
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

    let postulacion = new Postulacion();
    postulacion.trabajador = trabajador;
    postulacion.trabajo = trabajo;
    postulacion.id = this.id;

    this.postulacionService.registrar(postulacion).subscribe(data => {
      this.snackBar.open("Se postuló al trabajo correctamente.", "Aviso", {
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
    this.estado = 0;
    this.mensaje = "";
  }

  estadoBotonRegistrar() {
    return (
      this.idTrabajadorSeleccionado === 0 || this.idTrabajoSeleccionado === 0
    );
  }
}
