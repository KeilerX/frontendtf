import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Trabajo } from "src/app/model/trabajo";
import { TrabajoService } from "src/app/service/trabajo.service";
import { PostulacionService } from "src/app/service/postulacion.service";
import { Trabajador } from "src/app/model/trabajador";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { Postulacion } from "src/app/model/postulacion";

@Component({
  selector: "app-trabajo",
  templateUrl: "./trabajo.component.html",
  styleUrls: ["./trabajo.component.css"]
})
export class TrabajoComponent implements OnInit {
  dataSource: MatTableDataSource<Trabajo>;
  displayedColumns = [
    "idTrabajo",
    "descripcion",
    "sueldo",
    "empresa",
    "acciones"
  ];

  idTrabajadorSeleccionado: number;
  cTrabajador: Trabajador = new Trabajador();
  id: number;
  estado: number;

  postulado: boolean = false;
  mensaje: string;

  p: Postulacion[];

  constructor(
    private trabajoService: TrabajoService,
    private trabajadorService: TrabajadorService,
    private postulacionService: PostulacionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.trabajadorService
      .listarTrabajadorPorId(+localStorage.getItem("trabajador"))
      .subscribe(data => {
        this.cTrabajador = data;
        console.log(data);
      });
    this.idTrabajadorSeleccionado = +localStorage.getItem("trabajador");
    this.trabajoService.trabajoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.trabajoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.trabajoService.listarDisponibles().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  postular(id2: number) {
    let trabajador = new Trabajador();
    trabajador.id = this.idTrabajadorSeleccionado;

    let trabajo = new Trabajo();
    trabajo.id = id2;

    let postulacion = new Postulacion();
    postulacion.trabajador = trabajador;
    postulacion.trabajo = trabajo;
    postulacion.id = this.id;
    console.log(id2);
    console.log(this.idTrabajadorSeleccionado);

    this.postulacionService.registrar(postulacion).subscribe(data => {
      if (data !== false) {
        this.snackBar.open("Se postuló al trabajo correctamente.", "Aviso", {
          duration: 2000
        });
      } else {
        this.snackBar.open("Ya postuló a este trabajo.", "Aviso", {
          duration: 2000
        });
      }
    });

    //this.postulado = true;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
