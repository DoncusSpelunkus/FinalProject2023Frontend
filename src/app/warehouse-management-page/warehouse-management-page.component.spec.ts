import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManagementPageComponent } from './warehouse-management-page.component';

describe('WarehouseManagementPageComponent', () => {
  let component: WarehouseManagementPageComponent;
  let fixture: ComponentFixture<WarehouseManagementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseManagementPageComponent]
    });
    fixture = TestBed.createComponent(WarehouseManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
