import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorregComponent } from './visitorreg.component';

describe('VisitorregComponent', () => {
  let component: VisitorregComponent;
  let fixture: ComponentFixture<VisitorregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
