import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowClientsComponent } from './yellow-clients.component';

describe('YellowClientsComponent', () => {
  let component: YellowClientsComponent;
  let fixture: ComponentFixture<YellowClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YellowClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YellowClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
