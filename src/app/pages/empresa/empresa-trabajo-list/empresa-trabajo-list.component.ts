import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Trabajo } from "src/app/model/trabajo";
import { TrabajoService } from "src/app/service/trabajo.service";
import { EmpresaService } from "src/app/service/empresa.service";
import { Empresa } from "src/app/model/empresa";

@Component({
  selector: "app-empresa-trabajo-list",
  templateUrl: "./empresa-trabajo-list.component.html",
  styleUrls: ["./empresa-trabajo-list.component.css"]
})
export class EmpresaTrabajoListComponent implements OnInit {
  dataSource: MatTableDataSource<Trabajo>;
  displayedColumns = [
    "idTrabajo",
    "descripcion",
    "sueldo",
    "empresa",
    "estado",
    "acciones"
  ];

  empresa: Empresa = new Empresa();
  idEmpresaSeleccionado: number;

  constructor(
    private empresaService: EmpresaService,
    private trabajoService: TrabajoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.empresaService
      .listarEmpresaPorId(+localStorage.getItem("empresa"))
      .subscribe(data => {
        this.empresa = data;
        console.log(data);
      });
    this.idEmpresaSeleccionado = +localStorage.getItem("empresa");

    this.trabajoService.trabajoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.trabajoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.trabajoService
      .listarTrabajoPorEmpresa(this.idEmpresaSeleccionado)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  mostrar() {
    this.trabajoService.trabajoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.trabajoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.trabajoService
      .listarTrabajoPorEmpresa(this.idEmpresaSeleccionado)
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
