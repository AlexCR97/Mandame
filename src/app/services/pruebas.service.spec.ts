import { TestBed } from '@angular/core/testing';

import { PruebasService } from './pruebas.service';

describe('PruebasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PruebasService = TestBed.get(PruebasService);
    expect(service).toBeTruthy();
  });
});
