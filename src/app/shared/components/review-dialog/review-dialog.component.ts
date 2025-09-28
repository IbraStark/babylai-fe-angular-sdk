import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TranslatePipe]
})
export class ReviewDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() isSubmitting: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() submitReview = new EventEmitter<{ rating: number; comment: string }>();
  @Output() skip = new EventEmitter<void>();

  rating: number = 0;
  comment: string = '';
  
  // Validation errors
  ratingError: string = '';
  commentError: string = '';

  onRatingClick(starIndex: number): void {
    this.rating = starIndex + 1;
    this.clearRatingError();
  }

  onCommentChange(): void {
    this.clearCommentError();
  }

  onClose(): void {
    if (!this.isSubmitting) {
      this.close.emit();
    }
  }

  onSubmitReview(): void {
    if (this.validateForm() && !this.isSubmitting) {
      this.submitReview.emit({
        rating: this.rating,
        comment: this.comment.trim()
      });
      // Don't reset form immediately - wait for parent to handle submission
    }
  }

  onSkip(): void {
    if (!this.isSubmitting) {
      this.skip.emit();
      this.resetForm();
    }
  }

  private validateForm(): boolean {
    let isValid = true;
    
    // Validate rating
    if (this.rating < 1 || this.rating > 5) {
      this.ratingError = 'Rating must be between 1 and 5.';
      isValid = false;
    }
    
    // Validate comment
    const trimmedComment = this.comment.trim();
    if (trimmedComment.length < 10) {
      this.commentError = 'Comment must be at least 10 characters long.';
      isValid = false;
    } else if (trimmedComment.length > 500) {
      this.commentError = 'Comment must not exceed 500 characters.';
      isValid = false;
    }
    
    return isValid;
  }

  private clearRatingError(): void {
    this.ratingError = '';
  }

  private clearCommentError(): void {
    this.commentError = '';
  }

  private resetForm(): void {
    this.rating = 0;
    this.comment = '';
    this.ratingError = '';
    this.commentError = '';
  }

  getStarsArray(): number[] {
    return Array(5).fill(0).map((_, index) => index);
  }

  isStarFilled(starIndex: number): boolean {
    return starIndex < this.rating;
  }

  getCommentLength(): number {
    return this.comment.trim().length;
  }

  getCommentMaxLength(): number {
    return 500;
  }

  getCommentMinLength(): number {
    return 10;
  }
}
