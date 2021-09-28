import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorexamComponent } from './visitorexam.component';

describe('VisitorexamComponent', () => {
  let component: VisitorexamComponent;
  let fixture: ComponentFixture<VisitorexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
