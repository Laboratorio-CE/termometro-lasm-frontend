import { TestBed } from '@angular/core/testing';
import { Pagina } from './pagina';

describe('Pagina', () => {
  let service: Pagina;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pagina);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
