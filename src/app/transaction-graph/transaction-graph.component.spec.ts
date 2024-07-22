import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGraphComponent } from './transaction-graph.component';

describe('TransactionGraphComponent', () => {
  let component: TransactionGraphComponent;
  let fixture: ComponentFixture<TransactionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
