import {TestBed} from '@angular/core/testing';
import {Clone} from './clone';

describe('Clone', () => {
  let clone: Clone;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    clone = TestBed.inject(Clone);
  });

  it('should be created', () => {
    expect(clone).toBeTruthy();
  });
});
