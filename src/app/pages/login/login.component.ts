import { Component, OnInit } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { TrabajadorService } from "src/app/service/trabajador.service";
import { EmpresaService } from "src/app/service/empresa.service";
import { Empresa } from "src/app/model/empresa";
import { MatSnackBar } from "@angular/material";
import { UsuarioService } from "src/app/service/usuario.service";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  empresas: Empresa[] = [];

  idTrabajadorSeleccionado: number;
  idEmpresaSeleccionado: number;

  userId: number;
  mensaje: string;
  _subscription_user_id: Subscription;

  constructor(
    private trabajadorService: TrabajadorService,
    private empresaService: EmpresaService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this._subscription_user_id = this.usuarioService.execChange.subscribe(
      value => {
        this.userId = value; // this.username will hold your value and modify it every time it changes
      }
    );
  }

  ngOnInit() {
    this.listarTrabajadores();
    this.listarEmpresas();
  }

  listarTrabajadores() {
    this.trabajadorService.listar().subscribe(data => {
      this.trabajadores = data;
    });
  }

  listarEmpresas() {
    this.empresaService.listar().subscribe(data => {
      this.empresas = data;
    });
  }

  seleccionar() {
    this.usuarioService.setCurrentUser(this.idTrabajadorSeleccionado);
    console.log(this.userId);
    localStorage.setItem(
      "trabajador",
      JSON.stringify(this.idTrabajadorSeleccionado)
    );
  }
}
