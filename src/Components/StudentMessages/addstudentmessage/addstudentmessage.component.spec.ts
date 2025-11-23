import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstudentmessageComponent } from './addstudentmessage.component';

describe('AddstudentmessageComponent', () => {
  let component: AddstudentmessageComponent;
  let fixture: ComponentFixture<AddstudentmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddstudentmessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstudentmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
