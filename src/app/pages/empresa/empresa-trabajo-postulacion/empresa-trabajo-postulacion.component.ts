import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Postulacion } from "src/app/model/postulacion";
import { Empresa } from "src/app/model/empresa";
import { EmpresaService } from "src/app/service/empresa.service";
import { TrabajoService } from "src/app/service/trabajo.service";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { PostulacionService } from "src/app/service/postulacion.service";
import { Params, ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-empresa-trabajo-postulacion",
  templateUrl: "./empresa-trabajo-postulacion.component.html",
  styleUrls: ["./empresa-trabajo-postulacion.component.css"]
})
export class EmpresaTrabajoPostulacionComponent implements OnInit {
  dataSource: MatTableDataSource<Postulacion>;
  displayedColumns = [
    "idPostulacion",
    "trabajador",
    "trabajo",
    "estado",
    "acciones"
  ];

  empresa: Empresa = new Empresa();
  idEmpresaSeleccionado: number;

  idEmpresa: number;

  constructor(
    private empresaService: EmpresaService,
    private trabajoService: TrabajoService,
    private trabajadorService: TrabajadorService,
    private postulacionService: PostulacionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idEmpresa = params["id"];
    });
    this.empresaService
      .listarEmpresaPorId(+localStorage.getItem("empresa"))
      .subscribe(data => {
        this.empresa = data;
        console.log(data);
      });
    this.idEmpresaSeleccionado = +localStorage.getItem("empresa");

    this.postulacionService.postulacionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.postulacionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.postulacionService
      .listarPostulacionPorTrabajo(this.idEmpresa)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  contratar(id2: number) {
    this.postulacionService
      .contratar(this.idEmpresaSeleccionado, id2)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    this.postulacionService.listar().subscribe(postulaciones => {
      this.postulacionService.postulacionCambio.next(postulaciones);
      this.postulacionService.mensajeCambio.next("Se contrató al Trabajador.");
    });
    this.router.navigate(["empresa-trabajo-listar"]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
