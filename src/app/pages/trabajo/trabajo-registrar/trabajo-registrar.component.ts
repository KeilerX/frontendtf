import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Trabajo } from "src/app/model/trabajo";
import { TrabajoService } from "src/app/service/trabajo.service";
import { Area } from "src/app/model/area";
import { Empresa } from "src/app/model/empresa";
import { EmpresaService } from "src/app/service/empresa.service";
import { AreaService } from "src/app/service/area.service";
import { MatSnackBar } from "@angular/material";
import { TrabajoListaArea } from "src/app/model/trabajoListaArea";

@Component({
  selector: "app-trabajo-registrar",
  templateUrl: "./trabajo-registrar.component.html",
  styleUrls: ["./trabajo-registrar.component.css"]
})
export class TrabajoRegistrarComponent implements OnInit {
  empresas: Empresa[] = [];
  descripcion: string;
  sueldo: number = 0;
  estado: boolean = false;
  areas: Area[] = [];

  idAreaSeleccionado: number;
  idEmpresaSeleccionado: number;

  cEmpresa: Empresa = new Empresa();

  areasSeleccionados: Area[] = [];
  mensaje: string;

  constructor(
    private trabajoService: TrabajoService,
    private empresaService: EmpresaService,
    private areaService: AreaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listarEmpresas();
    this.listarAreas();
  }

  listarEmpresas() {
    this.empresaService
      .listarEmpresaPorId(+localStorage.getItem("empresa"))
      .subscribe(data => {
        this.cEmpresa = data;
        console.log(data);
      });
    this.idEmpresaSeleccionado = +localStorage.getItem("empresa");
  }

  listarAreas() {
    this.areaService.listar().subscribe(data => {
      this.areas = data;
    });
  }

  agregarArea() {
    if (this.idAreaSeleccionado > 0) {
      let cont = 0;
      for (let i = 0; i < this.areasSeleccionados.length; i++) {
        let area = this.areasSeleccionados[i];
        if (area.id === this.idAreaSeleccionado) {
          cont++;
          break;
        }
      }

      if (cont > 0) {
        this.mensaje = `El área se encuentra en la lista.`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        let area = new Area();
        area.id = this.idAreaSeleccionado;
        this.areaService
          .listarAreaPorId(this.idAreaSeleccionado)
          .subscribe(data => {
            area.nombre = data.nombre;
            this.areasSeleccionados.push(area);
          });
      }
    } else {
      this.mensaje = `Debe agregar un área.`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  aceptar() {
    /*     let area = new Area();
    area.id = this.idAreaSeleccionado; */
    let empresa = new Empresa();
    empresa.id = this.idEmpresaSeleccionado;

    let trabajo = new Trabajo();
    trabajo.empresa = empresa;
    trabajo.descripcion = this.descripcion;
    trabajo.estado = this.estado;
    trabajo.sueldo = this.sueldo;

    let trabajoListaArea = new TrabajoListaArea();
    trabajoListaArea.trabajo = trabajo;
    trabajoListaArea.lstArea = this.areasSeleccionados;

    this.trabajoService.registrar(trabajoListaArea).subscribe(data => {
      this.snackBar.open("Se registró correctamente.", "Aviso", {
        duration: 2000
      });
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
    console.log(trabajoListaArea);
  }

  limpiarControles() {
    this.areasSeleccionados = [];
    this.estado = false;
    this.idAreaSeleccionado = 0;
    this.idEmpresaSeleccionado = 0;
    this.mensaje = "";
    this.descripcion = "";
    this.sueldo = 0;
  }

  estadoBotonRegistrar() {
    return this.idAreaSeleccionado === 0 || this.idEmpresaSeleccionado === 0;
  }
}
