import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';

export interface DeclarationItem {
  id: string;
  title: string;
  status: 'completed' | 'not-completed' | 'not-applicable';
  description: string;
  points?: number;
  maxPoints?: number;
}

@Component({
  selector: 'app-ke-khai-overview',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
  ],
  templateUrl: './ke-khai-overview.html',
  styleUrl: './ke-khai-overview.scss',
})
export class KeKhaiOverview {
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);

  testPeriod = 'Đợt Test Linh 2025 (01/08/2025 - 30/08/2025)';
  selfAssessmentScore = 24.0;
  maxSelfAssessmentScore = 100;
  reviewScore = 25.0;
  maxReviewScore = 100;

  declarationItems: DeclarationItem[] = [
    {
      id: '1',
      title: 'I. Kết quả thực hiện nhiệm vụ theo chức năng',
      status: 'not-completed',
      description: 'Đã có số liệu: 7/16 tiêu chí',
      points: 7,
      maxPoints: 16,
    },
    {
      id: '2',
      title: 'II. Kết quả thực hiện cải cách hành chính (CCHC)',
      status: 'not-completed',
      description: 'Chưa có số liệu',
    },
    {
      id: '3',
      title: 'III. Thực hiện kỷ luật, kỷ cương hành chính',
      status: 'not-completed',
      description: 'Chưa có số liệu',
    },
    {
      id: '4',
      title: 'IV. Điểm cộng',
      status: 'not-completed',
      description: 'Đã có số liệu: 2/6 tiêu chí',
      points: 2,
      maxPoints: 6,
    },
    {
      id: '5',
      title: 'V. Điểm đánh giá thông qua điều tra khảo sát',
      status: 'not-applicable',
      description: 'Đơn vị không cần tự đánh giá',
    },
    {
      id: '6',
      title: 'VI. Điểm đánh giá của chủ tịch và các phó chủ tịch UBND tỉnh',
      status: 'not-applicable',
      description: 'Đơn vị không cần tự đánh giá',
    },
    {
      id: '7',
      title: 'VII. Điểm trừ',
      status: 'not-applicable',
      description: 'Đơn vị không cần tự đánh giá',
    },
  ];

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed':
        return 'check_circle';
      case 'not-completed':
        return 'radio_button_unchecked';
      case 'not-applicable':
        return 'remove_circle_outline';
      default:
        return 'help_outline';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'primary';
      case 'not-completed':
        return 'warn';
      case 'not-applicable':
        return 'accent';
      default:
        return '';
    }
  }

  getCompletionPercentage(): number {
    return Math.round((this.selfAssessmentScore / this.maxSelfAssessmentScore) * 100);
  }

  getReviewPercentage(): number {
    return Math.round((this.reviewScore / this.maxReviewScore) * 100);
  }

  onUpdateBannerClick() {
    this.router.navigate(['tu-danh-gia'], { relativeTo: this.activeRoute });
  }
}
