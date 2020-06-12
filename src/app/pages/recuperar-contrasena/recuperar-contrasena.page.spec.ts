import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecuperarContrasenaPage } from './recuperar-contrasena.page';

describe('RecuperarContrasenaPage', () => {
  let component: RecuperarContrasenaPage;
  let fixture: ComponentFixture<RecuperarContrasenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContrasenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
