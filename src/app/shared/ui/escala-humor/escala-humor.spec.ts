import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscalaHumor } from './escala-humor';

describe('EscalaHumor', () => {
  let component: EscalaHumor;
  let fixture: ComponentFixture<EscalaHumor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscalaHumor],
    }).compileComponents();

    fixture = TestBed.createComponent(EscalaHumor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
