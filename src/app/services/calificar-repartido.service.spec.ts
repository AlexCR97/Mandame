import { TestBed } from '@angular/core/testing';

import { CalificarRepartidoService } from './calificar-repartido.service';

describe('CalificarRepartidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalificarRepartidoService = TestBed.get(CalificarRepartidoService);
    expect(service).toBeTruthy();
  });
});
