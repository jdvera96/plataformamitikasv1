import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfesoresComponent } from './gestion-profesores.component';

describe('GestionProfesoresComponent', () => {
  let component: GestionProfesoresComponent;
  let fixture: ComponentFixture<GestionProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
