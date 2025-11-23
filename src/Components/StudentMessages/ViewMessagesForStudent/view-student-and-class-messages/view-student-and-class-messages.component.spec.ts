import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentAndClassMessagesComponent } from './view-student-and-class-messages.component';

describe('ViewStudentAndClassMessagesComponent', () => {
  let component: ViewStudentAndClassMessagesComponent;
  let fixture: ComponentFixture<ViewStudentAndClassMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudentAndClassMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentAndClassMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
