import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarDireccionPage } from './agregar-direccion.page';

describe('AgregarDireccionPage', () => {
  let component: AgregarDireccionPage;
  let fixture: ComponentFixture<AgregarDireccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDireccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
