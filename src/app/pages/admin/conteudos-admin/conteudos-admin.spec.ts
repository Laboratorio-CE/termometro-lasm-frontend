import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConteudosAdmin } from './conteudos-admin';

describe('ConteudosAdmin', () => {
  let component: ConteudosAdmin;
  let fixture: ComponentFixture<ConteudosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteudosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
