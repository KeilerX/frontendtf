import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { TrabajadorComponent } from "./pages/trabajador/trabajador/trabajador.component";
import { TrabajadorPerfilComponent } from "./pages/trabajador/trabajador-perfil/trabajador-perfil.component";
import { TrabajadorPostulacionComponent } from "./pages/trabajador/trabajador-postulacion/trabajador-postulacion.component";
import { EmpresaComponent } from "./pages/empresa/empresa/empresa.component";
import { EmpresaRecomendacionComponent } from "./pages/empresa/empresa-recomendacion/empresa-recomendacion.component";
import { EmpresaListComponent } from "./pages/empresa/empresa-list.component";
import { EmpresaPublicacionComponent } from "./pages/empresa/empresa-publicacion/empresa-publicacion.component";
import { AreaComponent } from "./pages/area/area.component";
import { AreaEdicionComponent } from "./pages/area/area-edicion/area-edicion.component";
import { MaterialModule } from "./material/material.module";
import { EmpresaRegistrarComponent } from "./pages/empresa/empresa-registrar/empresa-registrar.component";
import { TrabajadorRegistrarComponent } from "./pages/trabajador/trabajador-registrar/trabajador-registrar.component";
import { RecomendacionComponent } from "./pages/recomendacion/recomendacion.component";
import { TrabajoRegistrarComponent } from "./pages/trabajo/trabajo-registrar/trabajo-registrar.component";
import { TrabajoComponent } from "./pages/trabajo/trabajo.component";
import { TrabajadorListComponent } from "./pages/trabajador/trabajador-list.component";
import { TrabajoEdicionComponent } from "./pages/trabajo/trabajo-edicion/trabajo-edicion.component";
import { UsuarioService } from "./service/usuario.service";
import { TrabajadorPerfilEdicionComponent } from './pages/trabajador/trabajador-perfil-edicion/trabajador-perfil-edicion.component';
import { TrabajadorPostulacionListComponent } from './pages/trabajador/trabajador-postulacion-list/trabajador-postulacion-list.component';
import { TrabajadorRecomendacionListComponent } from './pages/trabajador/trabajador-recomendacion-list/trabajador-recomendacion-list.component';
import { EmpresaTrabajoListComponent } from './pages/empresa/empresa-trabajo-list/empresa-trabajo-list.component';
import { EmpresaTrabajoPostulacionComponent } from './pages/empresa/empresa-trabajo-postulacion/empresa-trabajo-postulacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TrabajadorComponent,
    TrabajadorPerfilComponent,
    TrabajadorPostulacionComponent,
    EmpresaComponent,
    EmpresaRecomendacionComponent,
    EmpresaListComponent,
    EmpresaPublicacionComponent,
    AreaComponent,
    AreaEdicionComponent,
    EmpresaRegistrarComponent,
    TrabajadorListComponent,
    TrabajadorRegistrarComponent,
    RecomendacionComponent,
    TrabajoRegistrarComponent,
    TrabajoComponent,
    TrabajoEdicionComponent,
    TrabajadorPerfilEdicionComponent,
    TrabajadorPostulacionListComponent,
    TrabajadorRecomendacionListComponent,
    EmpresaTrabajoListComponent,
    EmpresaTrabajoPostulacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule {}
