import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertTestPage } from './alert-test.page';

describe('AlertTestPage', () => {
  let component: AlertTestPage;
  let fixture: ComponentFixture<AlertTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
