import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeneralMessageComponent } from './add-general-message.component';

describe('AddGeneralMessageComponent', () => {
  let component: AddGeneralMessageComponent;
  let fixture: ComponentFixture<AddGeneralMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGeneralMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeneralMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
