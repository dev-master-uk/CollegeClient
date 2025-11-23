import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGComponent } from './class-g.component';

describe('ClassGComponent', () => {
  let component: ClassGComponent;
  let fixture: ComponentFixture<ClassGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
