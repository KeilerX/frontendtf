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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trabajadorService: TrabajadorService
  ) {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombres: new FormControl(""),
      apellidos: new FormControl(""),
      sexo: new FormControl(""),
      direccion: new FormControl(""),
      fecha_nacimiento: new FormControl("")
    });
  }

  ngOnInit() {
    this.trabajador = new Trabajador();
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = params["id"] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.trabajadorService.listarTrabajadorPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombres: new FormControl(data.nombres),
          apellidos: new FormControl(data.apellidos),
          sexo: new FormControl(data.sexo),
          direccion: new FormControl(data.direccion),
          fecha_nacimiento: new FormControl(data.fecha_nacimiento)
        });
      });
    }
  }

  operar() {
    this.trabajador.id = this.form.value["id"];
    this.trabajador.nombres = this.form.value["nombre"];
    this.trabajador.apellidos = this.form.value["apellidos"];
    this.trabajador.sexo = this.form.value["sexo"];
    this.trabajador.direccion = this.form.value["direccion"];
    this.trabajador.fecha_nacimiento = this.form.value["fecha_nacimiento"];

    if (this.edicion) {
      this.trabajadorService.modificar(this.trabajador).subscribe(data => {
        this.trabajadorService.listar().subscribe(trabajadores => {
          this.trabajadorService.trabajadorCambio.next(trabajadores);
          this.trabajadorService.mensajeCambio.next(
            "Se modificó correctamente."
          );
        });
      });
    }
    this.router.navigate(["trabajador"]);
  }
}
