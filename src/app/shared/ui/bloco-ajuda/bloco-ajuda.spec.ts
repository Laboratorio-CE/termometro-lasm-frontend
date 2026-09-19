import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlocoAjuda } from './bloco-ajuda';

describe('BlocoAjuda', () => {
  let component: BlocoAjuda;
  let fixture: ComponentFixture<BlocoAjuda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocoAjuda],
    }).compileComponents();

    fixture = TestBed.createComponent(BlocoAjuda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
