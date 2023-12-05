import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartDataset } from 'chart.js/auto';
import { Client, Report } from 'src/app/model/client';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent implements OnInit, OnChanges {
  @Input() client?: Client;
  @Input() updateChartTrigger: boolean = false;
  selectedCategory: string = 'All';

  ngOnInit(): void {
    this.generateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['updateChartTrigger'] || changes['selectedCategory']) &&
      (!changes['updateChartTrigger']?.firstChange ||
        !changes['selectedCategory']?.firstChange)
    ) {
      this.generateChart();
    }
  }

  generateChart() {
    if (this.client) {
      const categoriesData: Record<string, Record<string, number>> = {};
      this.client.expenses.forEach((expense: Report) => {
        const createdDate: Date = new Date(expense.created);
        const dayMonthYear: string = createdDate.toISOString().split('T')[0];
        categoriesData[expense.type] = categoriesData[expense.type] || {};
        categoriesData[expense.type][dayMonthYear] =
          (categoriesData[expense.type][dayMonthYear] || 0) + expense.amount!;
      });

      const labels: string[] = Object.keys(categoriesData)
        .flatMap((category) => Object.keys(categoriesData[category]))
        .sort();

      const totalExpenses = labels.map((date) =>
        this.client!.expenses.filter(
          (expense) =>
            expense.type === this.selectedCategory ||
            this.selectedCategory === 'All'
        )
          .filter(
            (expense) =>
              new Date(expense.created).toISOString().split('T')[0] === date
          )
          .reduce((total, expense) => total + expense.amount!, 0)
      );

      const datasets: ChartDataset[] = Object.keys(categoriesData).map(
        (category) => {
          const values = labels.map(
            (label) => categoriesData[category][label] || 0
          );

          return {
            label: `${category}`,
            data: values,
            borderWidth: 1,
            hidden:
              category !== this.selectedCategory &&
              this.selectedCategory !== 'All',
          };
        }
      );

      datasets.push({
        label: 'Total Expenses',
        data: totalExpenses,
        borderWidth: 2,
        borderColor: 'black',
        hidden: this.selectedCategory !== 'All',
      });

      const ctx: any = document.getElementById('myChart');
      const chart: any = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: '€',
              },
            },
          },
        },
      });

      chart.canvas.parentNode.style.height = '100%';
    }
  }

  onCategoryChange() {
    this.generateChart();
  }

  getDistinctCategories(): string[] {
    return this.client
      ? Array.from(new Set(this.client.expenses.map((expense) => expense.type)))
      : [];
  }
}
