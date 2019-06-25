import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Trabajo } from "src/app/model/trabajo";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { TrabajoService } from "src/app/service/trabajo.service";

@Component({
  selector: "app-trabajo-edicion",
  templateUrl: "./trabajo-edicion.component.html",
  styleUrls: ["./trabajo-edicion.component.css"]
})
export class TrabajoEdicionComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  trabajo: Trabajo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trabajoService: TrabajoService
  ) {
    this.form = new FormGroup({
      id: new FormControl(0),
      descripcion: new FormControl(""),
      sueldo: new FormControl(""),
      estado: new FormControl("")
    });
  }

  ngOnInit() {
    this.trabajo = new Trabajo();
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = params["id"] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.trabajoService.listarTrabajoPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          descripcion: new FormControl(data.descripcion),
          sueldo: new FormControl(data.sueldo),
          estado: new FormControl(data.estado)
        });
      });
    }
  }

  operar() {
    this.trabajo.id = this.form.value["id"];
    this.trabajo.descripcion = this.form.value["descripcion"];
    this.trabajo.sueldo = this.form.value["sueldo"];
    this.trabajo.estado = this.form.value["estado"];

    if (this.edicion) {
      this.trabajoService.modificar(this.trabajo).subscribe(data => {
        this.trabajoService.listar().subscribe(trabajos => {
          this.trabajoService.trabajoCambio.next(trabajos);
          this.trabajoService.mensajeCambio.next("Se modificó.");
        });
      });
    }
    this.router.navigate(["trabajo"]);
  }
}
