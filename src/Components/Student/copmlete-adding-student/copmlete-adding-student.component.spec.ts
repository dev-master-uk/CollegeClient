import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopmleteAddingStudentComponent } from './copmlete-adding-student.component';

describe('CopmleteAddingStudentComponent', () => {
  let component: CopmleteAddingStudentComponent;
  let fixture: ComponentFixture<CopmleteAddingStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopmleteAddingStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopmleteAddingStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
