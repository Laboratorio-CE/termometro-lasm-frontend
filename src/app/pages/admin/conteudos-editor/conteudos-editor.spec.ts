import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConteudosEditor } from './conteudos-editor';

describe('ConteudosEditor', () => {
  let component: ConteudosEditor;
  let fixture: ComponentFixture<ConteudosEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudosEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteudosEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
