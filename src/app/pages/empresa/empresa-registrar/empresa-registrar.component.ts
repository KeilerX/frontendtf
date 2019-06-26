import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Empresa } from "src/app/model/empresa";
import { EmpresaService } from "src/app/service/empresa.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-empresa-registrar",
  templateUrl: "./empresa-registrar.component.html",
  styleUrls: ["./empresa-registrar.component.css"]
})
export class EmpresaRegistrarComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  empresa: Empresa = new Empresa();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empresaService: EmpresaService
  ) {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(""),
      direccion: new FormControl(""),
      telefono: new FormControl(""),
      descripcion: new FormControl("")
    });
  }

  ngOnInit() {
    this.empresa = new Empresa();
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = params["id"] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.empresaService.listarEmpresaPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          direccion: new FormControl(data.direccion),
          telefono: new FormControl(data.telefono),
          descripcion: new FormControl(data.descripcion)
        });
      });
    }
  }

  operar() {
    this.empresa.id = this.form.value["id"];
    this.empresa.nombre = this.form.value["nombre"];
    this.empresa.direccion = this.form.value["direccion"];
    this.empresa.telefono = this.form.value["telefono"];
    this.empresa.descripcion = this.form.value["descripcion"];

    if (this.edicion) {
      this.empresaService.modificar(this.empresa).subscribe(data => {
        this.empresaService.listar().subscribe(empresas => {
          this.empresaService.empresaCambio.next(empresas);
          this.empresaService.mensajeCambio.next("Se modificaó correctamente.");
        });
      });
    } else {
      this.empresaService.registrar(this.empresa).subscribe(data => {
        this.empresaService.listar().subscribe(empresas => {
          this.empresaService.empresaCambio.next(empresas);
          this.empresaService.mensajeCambio.next("Se registró correctamente.");
        });
      });
    }
  }
}
