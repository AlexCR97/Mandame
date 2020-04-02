import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MostrarModalPage } from './mostrar-modal.page';

describe('MostrarModalPage', () => {
  let component: MostrarModalPage;
  let fixture: ComponentFixture<MostrarModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
