import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatsClientePage } from './chats-cliente.page';

describe('ChatsClientePage', () => {
  let component: ChatsClientePage;
  let fixture: ComponentFixture<ChatsClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
