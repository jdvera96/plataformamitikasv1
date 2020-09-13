import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesSPComponent } from './notificaciones-sp.component';

describe('NotificacionesSPComponent', () => {
  let component: NotificacionesSPComponent;
  let fixture: ComponentFixture<NotificacionesSPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesSPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
