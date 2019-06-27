import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Recomendacion } from "src/app/model/recomendacion";
import { Trabajador } from "src/app/model/trabajador";
import { RecomendacionService } from "src/app/service/recomendacion.service";
import { TrabajadorService } from "src/app/service/trabajador.service";

@Component({
  selector: "app-trabajador-recomendacion-list",
  templateUrl: "./trabajador-recomendacion-list.component.html",
  styleUrls: ["./trabajador-recomendacion-list.component.css"]
})
export class TrabajadorRecomendacionListComponent implements OnInit {
  dataSource: MatTableDataSource<Recomendacion>;
  displayedColumns = ["idRecomendacion", "trabajador", "empresa", "comentario"];

  trabajador: Trabajador = new Trabajador();
  idTrabajadorSeleccionado: number;
  constructor(
    private recomendacionService: RecomendacionService,
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

    this.recomendacionService.recomendacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.recomendacionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.recomendacionService
      .listarRecomendacionPorTrabajador(this.idTrabajadorSeleccionado)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  mostrar() {
    this.recomendacionService.recomendacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.recomendacionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.recomendacionService
      .listarRecomendacionPorTrabajador(this.idTrabajadorSeleccionado)
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
