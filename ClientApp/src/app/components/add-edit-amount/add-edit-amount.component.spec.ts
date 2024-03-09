import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAmountComponent } from './add-edit-amount.component';

describe('AddEditAmountComponent', () => {
  let component: AddEditAmountComponent;
  let fixture: ComponentFixture<AddEditAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAmountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
