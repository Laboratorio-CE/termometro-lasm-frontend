import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Leitura } from './leitura';

describe('Leitura', () => {
  let component: Leitura;
  let fixture: ComponentFixture<Leitura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leitura],
    }).compileComponents();

    fixture = TestBed.createComponent(Leitura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
