import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsClientComponent } from './news-client.component';

describe('NewsClientComponent', () => {
  let component: NewsClientComponent;
  let fixture: ComponentFixture<NewsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
