import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { TrabajadorComponent } from "./pages/trabajador/trabajador/trabajador.component";
import { TrabajadorPerfilComponent } from "./pages/trabajador/trabajador-perfil/trabajador-perfil.component";
import { TrabajadorPostulacionComponent } from "./pages/trabajador/trabajador-postulacion/trabajador-postulacion.component";
import { EmpresaComponent } from "./pages/empresa/empresa/empresa.component";
import { EmpresaRecomendacionComponent } from "./pages/empresa/empresa-recomendacion/empresa-recomendacion.component";
import { AreaComponent } from "./pages/area/area.component";
import { AreaEdicionComponent } from "./pages/area/area-edicion/area-edicion.component";
import { EmpresaRegistrarComponent } from "./pages/empresa/empresa-registrar/empresa-registrar.component";
import { TrabajadorRegistrarComponent } from "./pages/trabajador/trabajador-registrar/trabajador-registrar.component";
import { TrabajoRegistrarComponent } from "./pages/trabajo/trabajo-registrar/trabajo-registrar.component";
import { TrabajoComponent } from "./pages/trabajo/trabajo.component";
import { TrabajadorListComponent } from "./pages/trabajador/trabajador-list.component";
import { EmpresaListComponent } from "./pages/empresa/empresa-list.component";
import { TrabajadorPerfilEdicionComponent } from "./pages/trabajador/trabajador-perfil-edicion/trabajador-perfil-edicion.component";
import { TrabajadorPostulacionListComponent } from "./pages/trabajador/trabajador-postulacion-list/trabajador-postulacion-list.component";
import { TrabajadorRecomendacionListComponent } from "./pages/trabajador/trabajador-recomendacion-list/trabajador-recomendacion-list.component";
import { EmpresaTrabajoListComponent } from "./pages/empresa/empresa-trabajo-list/empresa-trabajo-list.component";
import { EmpresaTrabajoPostulacionComponent } from "./pages/empresa/empresa-trabajo-postulacion/empresa-trabajo-postulacion.component";

const routes: Routes = [
  /*   {
    path: "",
    redirecTo: "/",
    pathMatch: "full"
  }, */
  {
    path: "registrar",
    component: RegisterComponent
  },
  {
    path: "empresa-listar",
    component: EmpresaListComponent,
    children: [
      { path: "nuevo", component: EmpresaRegistrarComponent },
      { path: "edicion/:id", component: EmpresaRegistrarComponent }
    ]
  },
  {
    path: "trabajador-registrar",
    component: TrabajadorRegistrarComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "trabajador",
    component: TrabajadorComponent
  },
  {
    path: "trabajador-perfil",
    component: TrabajadorPerfilComponent,
    children: [
      {
        path: "edicion/:id",
        component: TrabajadorPerfilEdicionComponent
      }
    ]
  },
  {
    path: "trabajador-postulacion",
    component: TrabajadorPostulacionListComponent
  },
  {
    path: "trabajador-recomendacion",
    component: TrabajadorRecomendacionListComponent
  },
  {
    path: "trabajo-listar",
    component: TrabajoComponent
  },
  {
    path: "empresa",
    component: EmpresaComponent
  },
  {
    path: "trabajador-listar",
    component: TrabajadorListComponent,
    children: [
      { path: "nuevo", component: TrabajadorRegistrarComponent },
      { path: "edicion/:id", component: TrabajadorRegistrarComponent }
    ]
  },
  {
    path: "empresa-recomendacion",
    component: EmpresaRecomendacionComponent
  },
  {
    path: "empresa-trabajo-listar",
    component: EmpresaTrabajoListComponent,
    children: [
      {
        path: "empresa-trabajo-postulacion/:id",
        component: EmpresaTrabajoPostulacionComponent
      }
    ]
  },
  /* {
    path: "empresa-trabajo-postulacion/:id",
    component: EmpresaTrabajoPostulacionComponent
  }, */
  {
    path: "trabajo-postulacion",
    component: TrabajadorPostulacionComponent
  },
  {
    path: "trabajo-registrar",
    component: TrabajoRegistrarComponent
  },
  {
    path: "area",
    component: AreaComponent,
    children: [
      { path: "nuevo", component: AreaEdicionComponent },
      { path: "edicion/:id", component: AreaEdicionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
