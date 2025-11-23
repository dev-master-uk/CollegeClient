import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopleteTeacherAcountComponent } from './coplete-teacher-acount.component';

describe('CopleteTeacherAcountComponent', () => {
  let component: CopleteTeacherAcountComponent;
  let fixture: ComponentFixture<CopleteTeacherAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopleteTeacherAcountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopleteTeacherAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
