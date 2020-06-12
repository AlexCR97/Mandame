import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabChatsPage } from './tab-chats.page';

describe('TabChatsPage', () => {
  let component: TabChatsPage;
  let fixture: ComponentFixture<TabChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabChatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
