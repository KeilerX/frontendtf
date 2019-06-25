import { Component, OnInit } from "@angular/core";
import { Trabajador } from "src/app/model/trabajador";
import { FormGroup, FormControl } from "@angular/forms";
import { TrabajadorService } from "src/app/service/trabajador.service";

@Component({
  selector: "app-trabajador-registrar",
  templateUrl: "./trabajador-registrar.component.html",
  styleUrls: ["./trabajador-registrar.component.css"]
})
export class TrabajadorRegistrarComponent implements OnInit {
  id: number;
  form: FormGroup;
  trabajador: Trabajador = new Trabajador();

  mensaje: string;

  fechaSeleccionada: Date = new Date();

  constructor(private trabajadorService: TrabajadorService) {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombres: new FormControl(""),
      apellidos: new FormControl(""),
      sexo: new FormControl(""),
      direccion: new FormControl(""),
      fecha_nacimiento: new FormControl("")
    });
  }

  ngOnInit() {}

  operar() {
    //this.trabajador.id = 0;
    this.trabajador.nombres = this.form.value["nombre"];
    this.trabajador.apellidos = this.form.value["apellidos"];
    this.trabajador.sexo = this.form.value["sexo"];
    this.trabajador.direccion = this.form.value["direccion"];

    /* let tzoffset = this.fechaSeleccionada.getTimezoneOffset() * 60000;
    let localISOTime = new Date(Date.now() - tzoffset).toISOString();
    this.trabajador.fecha_nacimiento = localISOTime;
    //2018-09-27T21:00:35.259Z ISODate */
    this.trabajador.fecha_nacimiento = this.form.value["fecha_nacimiento"];

    this.trabajadorService.registrar(this.trabajador).subscribe(data => {
      this.trabajadorService.listar().subscribe(trabajadores => {
        this.trabajadorService.trabajadorCambio.next(trabajadores);
        this.trabajadorService.mensajeCambio.next("Se registró correctamente.");
      });
    });
  }
}
