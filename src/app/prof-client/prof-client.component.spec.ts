import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfClientComponent } from './prof-client.component';

describe('ProfClientComponent', () => {
  let component: ProfClientComponent;
  let fixture: ComponentFixture<ProfClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
