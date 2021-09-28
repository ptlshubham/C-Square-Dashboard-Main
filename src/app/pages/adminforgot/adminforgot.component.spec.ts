import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminforgotComponent } from './adminforgot.component';

describe('AdminforgotComponent', () => {
  let component: AdminforgotComponent;
  let fixture: ComponentFixture<AdminforgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminforgotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminforgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
