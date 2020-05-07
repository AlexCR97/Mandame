import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TelefonoPage } from './telefono.page';

describe('TelefonoPage', () => {
  let component: TelefonoPage;
  let fixture: ComponentFixture<TelefonoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TelefonoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
