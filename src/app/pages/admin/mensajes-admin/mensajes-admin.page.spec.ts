import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensajesAdminPage } from './mensajes-admin.page';

describe('MensajesAdminPage', () => {
  let component: MensajesAdminPage;
  let fixture: ComponentFixture<MensajesAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensajesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
