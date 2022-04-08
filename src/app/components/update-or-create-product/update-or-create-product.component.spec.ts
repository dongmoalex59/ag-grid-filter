import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrCreateProductComponent } from './update-or-create-product.component';

describe('UpdateOrCreateProductComponent', () => {
  let component: UpdateOrCreateProductComponent;
  let fixture: ComponentFixture<UpdateOrCreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrCreateProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
