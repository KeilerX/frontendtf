import { Component, OnInit } from "@angular/core";
import { PostulacionService } from "src/app/service/postulacion.service";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Postulacion } from "src/app/model/postulacion";
import { Trabajador } from "src/app/model/trabajador";

@Component({
  selector: "app-trabajador-postulacion-list",
  templateUrl: "./trabajador-postulacion-list.component.html",
  styleUrls: ["./trabajador-postulacion-list.component.css"]
})
export class TrabajadorPostulacionListComponent implements OnInit {
  dataSource: MatTableDataSource<Postulacion>;
  displayedColumns = ["idPostulacion", "trabajador", "trabajo", "estado"];

  trabajador: Trabajador = new Trabajador();
  idTrabajadorSeleccionado: number;
  constructor(
    private postulacionService: PostulacionService,
    private trabajadorService: TrabajadorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.trabajadorService
      .listarTrabajadorPorId(+localStorage.getItem("trabajador"))
      .subscribe(data => {
        this.trabajador = data;
        console.log(data);
      });
    this.idTrabajadorSeleccionado = +localStorage.getItem("trabajador");

    this.postulacionService.postulacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.postulacionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.postulacionService
      .listarPostulacionPorTrabajador(this.idTrabajadorSeleccionado)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  mostrar() {
    this.postulacionService.postulacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.postulacionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.postulacionService
      .listarPostulacionPorTrabajador(this.idTrabajadorSeleccionado)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
