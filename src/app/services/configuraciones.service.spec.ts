import { TestBed } from '@angular/core/testing';

import { ConfiguracionesService } from './configuraciones.service';

describe('ConfiguracionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracionesService = TestBed.get(ConfiguracionesService);
    expect(service).toBeTruthy();
  });
});
