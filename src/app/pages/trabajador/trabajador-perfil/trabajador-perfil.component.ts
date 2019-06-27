import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Trabajador } from "src/app/model/trabajador";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TrabajadorService } from "src/app/service/trabajador.service";

@Component({
  selector: "app-trabajador-perfil",
  templateUrl: "./trabajador-perfil.component.html",
  styleUrls: ["./trabajador-perfil.component.css"]
})
export class TrabajadorPerfilComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  trabajador: Trabajador;

  idTrabajadorSeleccionado: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trabajadorService: TrabajadorService
  ) {}

  ngOnInit() {
    this.trabajador = new Trabajador();
    this.listarTrabajadores();
  }

  listarTrabajadores() {
    this.trabajadorService
      .listarTrabajadorPorId(+localStorage.getItem("trabajador"))
      .subscribe(data => {
        this.trabajador = data;
        console.log(data);
      });
    this.idTrabajadorSeleccionado = +localStorage.getItem("trabajador");
    this.id = +localStorage.getItem("trabajador");
  }
}
