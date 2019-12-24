import { TestBed } from '@angular/core/testing';

import { ModalPagesService } from './modal-pages.service';

describe('ModalPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalPagesService = TestBed.get(ModalPagesService);
    expect(service).toBeTruthy();
  });
});
