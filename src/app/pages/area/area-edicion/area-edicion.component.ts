import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Area } from "src/app/model/area";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AreaService } from "src/app/service/area.service";

@Component({
  selector: "app-area-edicion",
  templateUrl: "./area-edicion.component.html",
  styleUrls: ["./area-edicion.component.css"]
})
export class AreaEdicionComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  area: Area;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private areaService: AreaService
  ) {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(""),
      descripcion: new FormControl("")
    });
  }

  ngOnInit() {
    this.area = new Area();
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = params["id"] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.areaService.listarAreaPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion)
        });
      });
    }
  }

  operar() {
    this.area.id = this.form.value["id"];
    this.area.nombre = this.form.value["nombre"];
    this.area.descripcion = this.form.value["descripcion"];

    if (this.edicion) {
      this.areaService.modificar(this.area).subscribe(data => {
        this.areaService.listar().subscribe(areas => {
          this.areaService.areaCambio.next(areas);
          this.areaService.mensajeCambio.next("Se modificó.");
        });
      });
    } else {
      this.areaService.registrar(this.area).subscribe(data => {
        this.areaService.listar().subscribe(areas => {
          this.areaService.areaCambio.next(areas);
          this.areaService.mensajeCambio.next("Se agregó.");
        });
      });
    }
    this.router.navigate(["area"]);
  }
}
