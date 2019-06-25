import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPublicacionComponent } from './empresa-publicacion.component';

describe('EmpresaPublicacionComponent', () => {
  let component: EmpresaPublicacionComponent;
  let fixture: ComponentFixture<EmpresaPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
