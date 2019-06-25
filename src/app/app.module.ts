import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {
  MatDialogModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule
} from "@angular/material";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { TrabajadorComponent } from "./pages/trabajador/trabajador/trabajador.component";
import { TrabajadorPerfilComponent } from "./pages/trabajador/trabajador-perfil/trabajador-perfil.component";
import { TrabajadorPostulacionComponent } from "./pages/trabajador/trabajador-postulacion/trabajador-postulacion.component";
import { EmpresaComponent } from "./pages/empresa/empresa/empresa.component";
import { EmpresaRecomendacionComponent } from "./pages/empresa/empresa-recomendacion/empresa-recomendacion.component";
import { EmpresaPublicacionComponent } from "./pages/empresa/empresa-publicacion/empresa-publicacion.component";
import { AreaComponent } from "./pages/area/area.component";
import { AreaEdicionComponent } from "./pages/area/area-edicion/area-edicion.component";
import { MaterialModule } from "./material/material.module";
import { EmpresaRegistrarComponent } from "./pages/empresa/empresa-registrar/empresa-registrar.component";
import { TrabajadorRegistrarComponent } from "./pages/trabajador/trabajador-registrar/trabajador-registrar.component";
import { RecomendacionComponent } from "./pages/recomendacion/recomendacion.component";
import { TrabajoRegistrarComponent } from "./pages/trabajo/trabajo-registrar/trabajo-registrar.component";
import { TrabajoComponent } from "./pages/trabajo/trabajo.component";
import { TrabajoEdicionComponent } from './pages/trabajo/trabajo-edicion/trabajo-edicion.component';

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
    EmpresaPublicacionComponent,
    AreaComponent,
    AreaEdicionComponent,
    EmpresaRegistrarComponent,
    TrabajadorRegistrarComponent,
    RecomendacionComponent,
    TrabajoRegistrarComponent,
    TrabajoComponent,
    TrabajoEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
