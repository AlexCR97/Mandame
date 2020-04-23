import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DireccionesPage } from './direcciones.page';

describe('DireccionesPage', () => {
  let component: DireccionesPage;
  let fixture: ComponentFixture<DireccionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
