import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestportalComponent } from './testportal.component';

describe('TestportalComponent', () => {
  let component: TestportalComponent;
  let fixture: ComponentFixture<TestportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
