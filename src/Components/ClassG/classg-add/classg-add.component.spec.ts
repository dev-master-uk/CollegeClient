import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassgAddComponent } from './classg-add.component';

describe('ClassgAddComponent', () => {
  let component: ClassgAddComponent;
  let fixture: ComponentFixture<ClassgAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassgAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
