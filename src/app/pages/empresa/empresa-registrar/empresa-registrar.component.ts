import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Empresa } from "src/app/model/empresa";
import { EmpresaService } from "src/app/service/empresa.service";

@Component({
  selector: "app-empresa-registrar",
  templateUrl: "./empresa-registrar.component.html",
  styleUrls: ["./empresa-registrar.component.css"]
})
export class EmpresaRegistrarComponent implements OnInit {
  id: number;
  form: FormGroup;
  empresa: Empresa = new Empresa();

  constructor(private empresaService: EmpresaService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(""),
      direccion: new FormControl(""),
      telefono: new FormControl(""),
      descripcion: new FormControl("")
    });
  }

  ngOnInit() {}

  operar() {
    this.empresa.id = this.id;
    this.empresa.nombre = this.form.value["nombre"];
    this.empresa.direccion = this.form.value["empresa"];
    this.empresa.telefono = this.form.value["telefono"];
    this.empresa.descripcion = this.form.value["descripcion"];

    this.empresaService.registrar(this.empresa).subscribe(data => {
      this.empresaService.listar().subscribe(empresas => {
        this.empresaService.empresaCambio.next(empresas);
        this.empresaService.mensajeCambio.next("Se registró correctamente.");
      });
    });
  }
}
