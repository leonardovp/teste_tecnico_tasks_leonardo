import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteCadastro } from './cadastro.component';

describe('ComponenteCadastro', () => {
  let componente: ComponenteCadastro;
  let fixture: ComponentFixture<ComponenteCadastro>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteCadastro]
    });
    fixture = TestBed.createComponent(ComponenteCadastro);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componente).toBeTruthy();
  });
});
