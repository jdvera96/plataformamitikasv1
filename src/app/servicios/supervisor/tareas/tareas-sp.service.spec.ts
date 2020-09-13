import { TestBed } from '@angular/core/testing';

import { TareasSpService } from './tareas-sp.service';

describe('TareasSpService', () => {
  let service: TareasSpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasSpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
