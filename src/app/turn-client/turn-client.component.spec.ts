import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnClientComponent } from './turn-client.component';

describe('TurnClientComponent', () => {
  let component: TurnClientComponent;
  let fixture: ComponentFixture<TurnClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
