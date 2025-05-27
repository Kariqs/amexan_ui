import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageMetadata } from '../../../models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() pageMetadata!: PageMetadata;
  @Output() previousPage = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<number>();

  onPreviousPage(): void {
    if (this.pageMetadata.hasPrevPage) {
      this.previousPage.emit(this.pageMetadata.previousPage);
    }
  }

  onNextPage(): void {
    if (this.pageMetadata.hasNextPage) {
      this.nextPage.emit(this.pageMetadata.nextPage);
    }
  }
}
