import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Trabajador } from "src/app/model/trabajador";
import { TrabajadorService } from "src/app/service/trabajador.service";

@Component({
  selector: "app-trabajador",
  templateUrl: "./trabajador-list.component.html",
  styleUrls: ["./trabajador-list.component.css"]
})
export class TrabajadorListComponent implements OnInit {
  dataSource: MatTableDataSource<Trabajador>;
  displayedColumns = [
    "idTrabajador",
    "nombres",
    "apellidos",
    "sexo",
    "direccion",
    "fecha_nacimiento",
    "acciones"
  ];

  constructor(
    private trabajadorService: TrabajadorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.trabajadorService.trabajadorCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.trabajadorService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.trabajadorService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
