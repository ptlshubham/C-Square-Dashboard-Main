import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagequeComponent } from './manageque.component';

describe('ManagequeComponent', () => {
  let component: ManagequeComponent;
  let fixture: ComponentFixture<ManagequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
