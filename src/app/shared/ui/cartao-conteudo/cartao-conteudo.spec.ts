import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoConteudo } from './cartao-conteudo';

describe('CartaoConteudo', () => {
  let component: CartaoConteudo;
  let fixture: ComponentFixture<CartaoConteudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoConteudo],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoConteudo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
