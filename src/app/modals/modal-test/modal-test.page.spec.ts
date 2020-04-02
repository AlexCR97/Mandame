import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTestPage } from './modal-test.page';

describe('ModalTestPage', () => {
  let component: ModalTestPage;
  let fixture: ComponentFixture<ModalTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
