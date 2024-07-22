import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { TransactionGraphComponent } from '../transaction-graph/transaction-graph.component';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, TransactionGraphComponent],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  customers: any[] = [];
  transactions: any[] = [];
  filteredCustomers: any[] = [];
  filterName: string = '';
  // filterAmount: number = 0;
  filterAmount: any = null;
  selectedCustomerId: number | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadTransactions();
  }

  loadCustomers() {
    this.dataService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data;
      console.log('Customers loaded:', this.customers);
    });
  }

  loadTransactions() {
    this.dataService.getTransactions().subscribe(data => {
      this.transactions = data;
      console.log('Transactions loaded:', this.transactions);
    });
  }

  filterTable() {
    this.filteredCustomers = this.customers.filter(customer => {
      const transactions = this.transactions.filter(transaction => transaction.customer_id === customer.id);
      const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      const nameMatch = customer.name.toLowerCase().includes(this.filterName.toLowerCase());
       console.log(`Customer: ${customer.name}, Total Amount: ${totalAmount}`);
      return (nameMatch && (this.filterAmount === null || totalAmount === this.filterAmount));
    });
  }

  getTotalTransactionAmount(customerId: number): number {
    console.log(`Getting total transaction amount for Customer ID: ${customerId}`);
    const customerTransactions = this.transactions.filter(transaction => {
      console.log(`Checking transaction:`, transaction);
      return transaction.customer_id === customerId;
    });
    console.log(`Customer ID: ${customerId}, Customer Transactions:`, customerTransactions);
    const totalAmount = customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    console.log(`Customer ID: ${customerId}, Total Amount: ${totalAmount}`);
    return totalAmount;
  }

  selectCustomer(customerId: number) {
    this.selectedCustomerId = customerId;
  }
}
