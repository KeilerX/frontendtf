import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Empresa } from "src/app/model/empresa";
import { EmpresaService } from "src/app/service/empresa.service";

@Component({
  selector: "app-empresa",
  templateUrl: "./empresa-list.component.html",
  styleUrls: ["./empresa-list.component.css"]
})
export class EmpresaListComponent implements OnInit {
  dataSource: MatTableDataSource<Empresa>;
  displayedColumns = [
    "idEmpresa",
    "nombre",
    "direccion",
    "telefono",
    "descripcion",
    "acciones"
  ];

  constructor(
    private empresaService: EmpresaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.empresaService.empresaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.empresaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.empresaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
