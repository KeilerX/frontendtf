import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { Area } from "src/app/model/area";
import { AreaService } from "src/app/service/area.service";

@Component({
  selector: "app-area",
  templateUrl: "./area.component.html",
  styleUrls: ["./area.component.css"]
})
export class AreaComponent implements OnInit {
  dataSource: MatTableDataSource<Area>;
  displayedColumns = ["idArea", "nombre", "descripcion", "acciones"];

  constructor(
    private areaService: AreaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.areaService.areaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.areaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "Aviso", { duration: 2000 });
    });

    this.areaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
