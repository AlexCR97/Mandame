import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContrasenaPage } from './contrasena.page';

describe('ContrasenaPage', () => {
  let component: ContrasenaPage;
  let fixture: ComponentFixture<ContrasenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
