import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Trabajo } from "src/app/model/trabajo";
import { TrabajoService } from "src/app/service/trabajo.service";

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
    "estado",
    "empresa",
    "acciones"
  ];

  constructor(
    private trabajoService: TrabajoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.trabajoService.trabajoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.trabajoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.trabajoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
