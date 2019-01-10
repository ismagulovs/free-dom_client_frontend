import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GotClientComponent } from './got-client.component';

describe('GotClientComponent', () => {
  let component: GotClientComponent;
  let fixture: ComponentFixture<GotClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GotClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GotClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
