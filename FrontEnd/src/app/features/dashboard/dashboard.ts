import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { Router } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-dashboard',
  imports: [
    DecimalPipe,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    ChartComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly router = inject(Router);
  @ViewChild('chart') chart?: ChartComponent;
  public chartOptions: ChartOptions;
  // Data models
  sections: Array<{
    code: string;
    name: string;
    scores: {
      self: number;
      appraisal1: number;
      explain: number;
      max: number;
    };
  }> = [
    {
      code: 'I',
      name: 'Kết quả thực hiện nhiệm vụ theo chức năng',
      scores: { self: 19, appraisal1: 15, explain: 20, max: 35 },
    },
    {
      code: 'II',
      name: 'Kết quả thực hiện cải cách hành chính (CCHC)',
      scores: { self: 2.5, appraisal1: 3, explain: 2.5, max: 30 },
    },
    {
      code: 'III',
      name: 'Thực hiện kỷ luật, kỷ cương hành chính',
      scores: { self: 0, appraisal1: 7.5, explain: 0, max: 10 },
    },
    {
      code: 'IV',
      name: 'Điểm cộng',
      scores: { self: 2.5, appraisal1: 0, explain: 2.5, max: 5 },
    },
    {
      code: '',
      name: 'Tổng Cộng',
      scores: { self: 2.5, appraisal1: 0, explain: 2.5, max: 5 },
    },
  ];

  // Header information (banner)
  notice = {
    title: 'THÔNG BÁO!',
    body: 'Đợt Test Linh 2025 đang diễn ra từ ngày 01/08/2025 đến 30/08/2025 đã bắt đầu giải trình.',
  };

  // Table configuration
  displayedColumns: string[] = ['name', 'self', 'appraisal1', 'explain'];
  dataSource = this.sections;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Điểm tối đa',
          data: [44, 55, 57, 56],
        },
        {
          name: 'Điểm tự đánh giá lần 1',
          data: [76, 85, 101, 98],
        },
        {
          name: 'Điểm thẩm định lần 1',
          data: [35, 41, 36, 26],
        },
        {
          name: 'Điểm thẩm định lần 2',
          data: [50, 41, 36, 26],
        },
        {
          name: 'Điểm giải trình',
          data: [35, 41, 36, 26],
        },
      ],
      chart: {
        type: 'bar',
        height: 400,
      } as ApexChart,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['I. Nhiệm vụ', 'II. Cải cách', 'III. Kỷ luật', 'IV. Điểm cộng'],
        labels: {
          style: {
            fontSize: '13px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Điểm',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      },
    };
  }

  onGiaiTrinh() {
    this.router.navigate(['ke-khai', '90']);
  }
}
