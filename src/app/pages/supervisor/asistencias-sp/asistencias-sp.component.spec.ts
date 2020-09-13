import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasSpComponent } from './asistencias-sp.component';

describe('AsistenciasSpComponent', () => {
  let component: AsistenciasSpComponent;
  let fixture: ComponentFixture<AsistenciasSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciasSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
