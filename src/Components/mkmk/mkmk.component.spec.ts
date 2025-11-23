import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkmkComponent } from './mkmk.component';

describe('MkmkComponent', () => {
  let component: MkmkComponent;
  let fixture: ComponentFixture<MkmkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkmkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MkmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
