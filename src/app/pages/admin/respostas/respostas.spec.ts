import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Respostas } from './respostas';

describe('Respostas', () => {
  let component: Respostas;
  let fixture: ComponentFixture<Respostas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Respostas],
    }).compileComponents();

    fixture = TestBed.createComponent(Respostas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
