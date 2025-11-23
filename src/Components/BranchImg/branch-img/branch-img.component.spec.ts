import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchImgComponent } from './branch-img.component';

describe('BranchImgComponent', () => {
  let component: BranchImgComponent;
  let fixture: ComponentFixture<BranchImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
