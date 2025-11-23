import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceClassComponent } from './attendence-class.component';

describe('AttendenceClassComponent', () => {
  let component: AttendenceClassComponent;
  let fixture: ComponentFixture<AttendenceClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendenceClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
