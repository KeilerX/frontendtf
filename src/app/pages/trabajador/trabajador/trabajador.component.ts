import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UsuarioService } from "src/app/service/usuario.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-trabajador",
  templateUrl: "./trabajador.component.html",
  styleUrls: ["./trabajador.component.css"]
})
export class TrabajadorComponent implements OnInit {
  id: number;
  userId: number;
  _subscription_user_id: Subscription;
  constructor(private usuarioService: UsuarioService) {
    this._subscription_user_id = this.usuarioService.execChange.subscribe(
      value => {
        this.userId = value; // this.username will hold your value and modify it every time it changes
        console.log(this.userId);
      }
    );
  }

  ngOnInit() {}
}
