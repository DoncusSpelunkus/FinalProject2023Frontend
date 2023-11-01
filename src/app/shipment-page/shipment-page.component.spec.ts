import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentPageComponent } from './shipment-page.component';

describe('ShipmentPageComponent', () => {
  let component: ShipmentPageComponent;
  let fixture: ComponentFixture<ShipmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentPageComponent]
    });
    fixture = TestBed.createComponent(ShipmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
