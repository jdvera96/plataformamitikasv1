import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosSpComponent } from './cursos-sp.component';

describe('CursosSpComponent', () => {
  let component: CursosSpComponent;
  let fixture: ComponentFixture<CursosSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
