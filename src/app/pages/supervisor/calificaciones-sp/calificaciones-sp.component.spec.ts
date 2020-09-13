import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesSpComponent } from './calificaciones-sp.component';

describe('CalificacionesSpComponent', () => {
  let component: CalificacionesSpComponent;
  let fixture: ComponentFixture<CalificacionesSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
