import { TestBed } from '@angular/core/testing';

import { ClassInfoService } from './class-info.service';

describe('ClassInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassInfoService = TestBed.get(ClassInfoService);
    expect(service).toBeTruthy();
  });
});
