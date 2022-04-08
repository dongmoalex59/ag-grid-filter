import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSelectionComponent } from './btn-selection.component';

describe('BtnSelectionComponent', () => {
  let component: BtnSelectionComponent;
  let fixture: ComponentFixture<BtnSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
