import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces for row-based cell types
export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface CellData {
  value: any;
  type:
    | 'text'
    | 'number'
    | 'select'
    | 'textarea'
    | 'file'
    | 'readonly'
    | 'mixed'
    | 'score'
    | 'empty';
  options?: string[];
  subFields?: {
    text?: boolean;
    textarea?: boolean;
    file?: boolean;
  };
}

export interface TableRow {
  [key: string]: CellData;
}

export interface TabData {
  id: string;
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
}

export interface SelfAssessmentData {
  title: string;
  subtitle: string;
  tabs: TabData[];
}

@Component({
  selector: 'app-tu-danh-gia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './tu-danh-gia.html',
  styleUrls: ['./tu-danh-gia.scss'],
})
export class TuDanhGia {
  assessmentData: SelfAssessmentData = {
    title: 'CẬP NHẬT SỐ LIỆU TỰ ĐÁNH GIÁ',
    subtitle: 'Đợt Test Linh 2025 đang diễn ra từ ngày 01/08/2025 đến 30/09/2025.',
    tabs: [
      {
        id: 'tab1',
        title: 'I. Kết quả thực hiện nhiệm vụ theo chức năng',
        columns: [
          { key: 'stt', label: 'STT', width: '80px' },
          { key: 'tieuChi', label: 'Tiêu chí, tiêu chí thành phần', width: '300px' },
          { key: 'diemToiDa', label: 'Điểm tối đa', width: '100px' },
          { key: 'soLieuKeKhai', label: 'Số liệu kê khai', width: '150px' },
          { key: 'cachTinhDiem', label: 'Cách tính điểm', width: '200px' },
          { key: 'yeuCauTaiLieu', label: 'Các yêu cầu và tài liệu kiểm chứng', width: '250px' },
          { key: 'diemTuDanhGia', label: 'Điểm tự đánh giá', width: '120px' },
        ],
        rows: [
          {
            stt: { value: 'I', type: 'readonly' },
            tieuChi: { value: 'KẾT QUẢ THỰC HIỆN NHIỆM VỤ THEO CHỨC NĂNG', type: 'readonly' },
            diemToiDa: { value: '36.5', type: 'readonly' },
            soLieuKeKhai: { value: '', type: 'empty' },
            cachTinhDiem: { value: '', type: 'empty' },
            yeuCauTaiLieu: {
              value: '',
              type: 'empty',
            },
            diemTuDanhGia: { value: '', type: 'empty' },
          },
          {
            stt: { value: '3.1.1', type: 'readonly' },
            tieuChi: { value: 'Ban hành văn bản tổ chức triển khai thực hiện', type: 'readonly' },
            diemToiDa: { value: '0.5', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                '- Có ban hành văn bản tổ chức triển khai thực hiện: Điểm tối đa\n- Không ban hành văn bản tổ chức triển khai thực hiện: 0 điểm',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: 'Các Văn bản về chức trách khai thực hiện',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
          {
            stt: { value: '3.1.2', type: 'readonly' },
            tieuChi: {
              value: 'Báo cáo kết quả thực hiện đầy đủ nội dung, đúng quy định',
              type: 'readonly',
            },
            diemToiDa: { value: '0.5', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                '- Thực hiện đầy đủ nội dung, đúng quy định: Điểm tối đa\n- Không thực hiện đầy đủ nội dung, đúng quy định: 0 điểm',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: 'Báo cáo kết quả triển khai thực hiện Đề án',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
          {
            stt: { value: '3.2', type: 'readonly' },
            tieuChi: { value: 'Ban hành Nội quy có quan; Quy chế', type: 'readonly' },
            diemToiDa: { value: '2', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                'Mới nội quy, quy chế được ban hành đảm bảo nội dung theo yêu cầu đạt: 0.5 điểm; không ban hành: 0 điểm',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea:
                  'Yêu cầu: Có quan, đơn vị ra soát, bổ sung, điều chỉnh để ban hành Nội quy, Quy chế đảm bảo đúng với cơ cấu tổ chức và quy định hiện hành chính trong các cơ quan nhà nước tỉnh Phú Thọ giai đoạn 2022 - 2025 và các quy định hiện hành.\nTLKC: Các Nội quy, Quy chế theo yêu cầu.',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
          {
            stt: { value: '', type: 'empty' },
            tieuChi: {
              value: 'Số nội quy, quy chế được ban hành đảm bảo nội dung theo yêu cầu',
              type: 'readonly',
            },
            diemToiDa: { value: '', type: 'empty' },
            soLieuKeKhai: { value: '', type: 'text' },
            cachTinhDiem: { value: '', type: 'empty' },
            yeuCauTaiLieu: { value: '', type: 'empty' },
            diemTuDanhGia: { value: '', type: 'empty' },
          },
        ],
      },
      {
        id: 'tab2',
        title: 'II. Kết quả thực hiện cải cách hành chính (CCHC)',
        columns: [
          { key: 'stt', label: 'STT', width: '80px' },
          { key: 'tieuChi', label: 'Tiêu chí, tiêu chí thành phần', width: '300px' },
          { key: 'diemToiDa', label: 'Điểm tối đa', width: '100px' },
          { key: 'soLieuKeKhai', label: 'Số liệu kê khai', width: '150px' },
          { key: 'cachTinhDiem', label: 'Cách tính điểm', width: '200px' },
          { key: 'yeuCauTaiLieu', label: 'Các yêu cầu và tài liệu kiểm chứng', width: '250px' },
          { key: 'diemTuDanhGia', label: 'Điểm tự đánh giá', width: '120px' },
        ],
        rows: [
          {
            stt: { value: 'II', type: 'readonly' },
            tieuChi: { value: 'KẾT QUẢ THỰC HIỆN CẢI CÁCH HÀNH CHÍNH (CCHC)', type: 'readonly' },
            diemToiDa: { value: '25', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: { value: '', type: 'empty' },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: '',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
          {
            stt: { value: '2.1', type: 'readonly' },
            tieuChi: { value: 'Cải cách thể chế', type: 'readonly' },
            diemToiDa: { value: '8', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                'Thực hiện đầy đủ các nhiệm vụ được giao: Điểm tối đa\nThực hiện chưa đầy đủ: Trừ điểm tương ứng',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: 'Báo cáo kết quả thực hiện cải cách thể chế theo quy định',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
        ],
      },
      {
        id: 'tab3',
        title: 'III. Thực hiện kỷ luật, kỷ cương hành chính',
        columns: [
          { key: 'stt', label: 'STT', width: '80px' },
          { key: 'tieuChi', label: 'Tiêu chí, tiêu chí thành phần', width: '300px' },
          { key: 'diemToiDa', label: 'Điểm tối đa', width: '100px' },
          { key: 'soLieuKeKhai', label: 'Số liệu kê khai', width: '150px' },
          { key: 'cachTinhDiem', label: 'Cách tính điểm', width: '200px' },
          { key: 'yeuCauTaiLieu', label: 'Các yêu cầu và tài liệu kiểm chứng', width: '250px' },
          { key: 'diemTuDanhGia', label: 'Điểm tự đánh giá', width: '120px' },
        ],
        rows: [
          {
            stt: { value: '3.1', type: 'readonly' },
            tieuChi: { value: 'Thực hiện các quy định về kỷ luật lao động', type: 'readonly' },
            diemToiDa: { value: '3', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                'Không vi phạm kỷ luật lao động: Điểm tối đa\nCó vi phạm: Trừ điểm theo mức độ',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: 'Báo cáo kết quả triển khai thực hiện Đề án',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
          {
            stt: { value: '3.2', type: 'readonly' },
            tieuChi: { value: 'Thực hiện quy định về đạo đức nghề nghiệp', type: 'readonly' },
            diemToiDa: { value: '2', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                'Tuân thủ đầy đủ các quy định: Điểm tối đa\nCó vi phạm nhẹ: Trừ 50% điểm\nCó vi phạm nghiêm trọng: 0 điểm',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: 'Báo cáo kết quả triển khai thực hiện Đề án',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
        ],
      },
      {
        id: 'tab4',
        title: 'IV. Điểm cộng',
        columns: [
          { key: 'stt', label: 'STT', width: '80px' },
          { key: 'tieuChi', label: 'Tiêu chí, tiêu chí thành phần', width: '300px' },
          { key: 'diemToiDa', label: 'Điểm tối đa', width: '100px' },
          { key: 'soLieuKeKhai', label: 'Số liệu kê khai', width: '150px' },
          { key: 'cachTinhDiem', label: 'Cách tính điểm', width: '200px' },
          { key: 'yeuCauTaiLieu', label: 'Các yêu cầu và tài liệu kiểm chứng', width: '250px' },
          { key: 'diemTuDanhGia', label: 'Điểm tự đánh giá', width: '120px' },
        ],
        rows: [
          {
            stt: { value: 'IV', type: 'readonly' },
            tieuChi: { value: 'ĐIỂM CỘNG', type: 'readonly' },
            diemToiDa: { value: '5', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: { value: '', type: 'empty' },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: '',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
          {
            stt: { value: '4.1', type: 'readonly' },
            tieuChi: { value: 'Thực hiện tốt các nhiệm vụ đột xuất', type: 'readonly' },
            diemToiDa: { value: '2', type: 'readonly' },
            soLieuKeKhai: {
              value: '--- Chọn ---',
              type: 'select',
              options: ['--- Chọn ---', 'Có', 'Không', 'Không áp dụng'],
            },
            cachTinhDiem: {
              value:
                'Hoàn thành xuất sắc: Điểm tối đa\nHoàn thành tốt: 75% điểm\nHoàn thành: 50% điểm',
              type: 'textarea',
            },
            yeuCauTaiLieu: {
              value: {
                text: '',
                textarea: 'Báo cáo kết quả thực hiện nhiệm vụ đột xuất',
                files: [],
              },
              type: 'mixed',
              subFields: { textarea: true, file: true },
            },
            diemTuDanhGia: { value: '0.00', type: 'score' },
          },
        ],
      },
    ],
  };

  // Helper methods for cell data access
  getCellValue(row: TableRow, columnKey: string): any {
    return row[columnKey]?.value || '';
  }

  getCellType(row: TableRow, columnKey: string): string {
    return row[columnKey]?.type || 'readonly';
  }

  getCellOptions(row: TableRow, columnKey: string): string[] {
    return row[columnKey]?.options || [];
  }

  getDisplayedColumns(columns: TableColumn[]): string[] {
    return columns.map((col) => col.key);
  }

  selectedTabIndex = 0;

  // Event handlers
  onCellValueChange(value: any, rowIndex: number, columnKey: string, tabIndex: number): void {
    const cell = this.assessmentData.tabs[tabIndex].rows[rowIndex][columnKey];
    if (cell) {
      cell.value = value;
    }
    console.log('Cell value updated:', { tabIndex, rowIndex, columnKey, value });
  }

  onMixedInputChange(
    value: any,
    rowIndex: number,
    columnKey: string,
    tabIndex: number,
    subField: string,
  ): void {
    const cell = this.assessmentData.tabs[tabIndex].rows[rowIndex][columnKey];
    if (cell && typeof cell.value === 'object' && cell.value !== null) {
      cell.value[subField] = value;
    }
    console.log('Mixed data updated:', { tabIndex, rowIndex, columnKey, subField, value });
  }

  onMixedFileSelected(event: any, rowIndex: number, columnKey: string, tabIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const cell = this.assessmentData.tabs[tabIndex].rows[rowIndex][columnKey];
      if (cell && typeof cell.value === 'object' && cell.value !== null && cell.value.files) {
        cell.value.files.push({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        });
      }
      console.log('Mixed file selected:', file.name, 'for row:', rowIndex, 'column:', columnKey);
    }
  }

  removeMixedFile(rowIndex: number, columnKey: string, tabIndex: number, fileIndex: number): void {
    const cell = this.assessmentData.tabs[tabIndex].rows[rowIndex][columnKey];
    if (cell && typeof cell.value === 'object' && cell.value !== null && cell.value.files) {
      cell.value.files.splice(fileIndex, 1);
    }
  }

  saveData(): void {
    console.log('Saving assessment data:', this.assessmentData);
    // Implement save logic here - send to backend
  }
}
