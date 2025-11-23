import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentImgComponent } from './student-img.component';

describe('StudentImgComponent', () => {
  let component: StudentImgComponent;
  let fixture: ComponentFixture<StudentImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
