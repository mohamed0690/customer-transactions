import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-transaction-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.css']
})
export class TransactionGraphComponent implements OnChanges {
  @Input() transactions!: any[];
  @Input() customerId!: number;

  chart: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] || changes['customerId']) {
      this.renderChart();
    }
  }

  renderChart() {
    const customerTransactions = this.transactions.filter(transaction => transaction.customer_id === this.customerId);
    const groupedByDate = customerTransactions.reduce((acc: { [key: string]: number }, transaction: any) => {
      const date = transaction.date;
      if (!acc[date]) acc[date] = 0;
      acc[date] += transaction.amount;
      return acc;
    }, {});

    const labels = Object.keys(groupedByDate);
    const data = Object.values(groupedByDate);

    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Transaction Amount',
            data: data as number[],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, config);
  }
}
