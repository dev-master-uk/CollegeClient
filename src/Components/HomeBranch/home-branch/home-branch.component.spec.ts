import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBranchComponent } from './home-branch.component';

describe('HomeBranchComponent', () => {
  let component: HomeBranchComponent;
  let fixture: ComponentFixture<HomeBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
