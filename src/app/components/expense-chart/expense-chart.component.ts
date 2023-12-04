import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Client, Report } from 'src/app/model/client';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent implements OnInit,OnChanges {
  @Input() client?: Client;
  @Input() updateChartTrigger: boolean = false;
  @Input() report?:Report

 ngOnInit(): void {
  this.generateChart();
  
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['updateChartTrigger'] && !changes['updateChartTrigger'].firstChange) {
    
    this.generateChart();
  }
}


generateChart(){
  if (this.client) {  
    const dailyExpenses: Record<string, number> = {};
    this.client.expenses.forEach((expense: Report) => {
      const createdDate: Date = new Date(expense.created);
      const dayMonthYear: string = createdDate.toISOString().split('T')[0];
      if (!dailyExpenses[dayMonthYear]) {
        dailyExpenses[dayMonthYear] = 0;
       }
      dailyExpenses[dayMonthYear] += expense.amount!;
    });    
    const labels: string[] = Object.keys(dailyExpenses).sort();
    const values = labels.map((label) => dailyExpenses[label]);
    const ctx: any = document.getElementById('myChart');
    const chart: any = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: `${this.client.name} ` ,
            data: values,
            borderWidth: 1,
          },
        ],
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
}

