import { TestBed } from '@angular/core/testing';

import { DireccionesService } from './direcciones.service';

describe('DireccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DireccionesService = TestBed.get(DireccionesService);
    expect(service).toBeTruthy();
  });
});
