import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMassegesComponent } from './general-masseges.component';

describe('GeneralMassegesComponent', () => {
  let component: GeneralMassegesComponent;
  let fixture: ComponentFixture<GeneralMassegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralMassegesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMassegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
