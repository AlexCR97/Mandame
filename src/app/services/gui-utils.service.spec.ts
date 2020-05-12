import { TestBed } from '@angular/core/testing';

import { GuiUtilsService } from './gui-utils.service';

describe('GuiUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuiUtilsService = TestBed.get(GuiUtilsService);
    expect(service).toBeTruthy();
  });
});
