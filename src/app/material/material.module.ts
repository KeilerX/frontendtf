import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatToolbarModule, MatIconModule, MatMenuModule, MatDividerModule, MatInputModule, MatTableModule, MatButtonModule, MatSidenavModule, MatCardModule, MatSnackBarModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatSnackBarModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class MaterialModule { }
