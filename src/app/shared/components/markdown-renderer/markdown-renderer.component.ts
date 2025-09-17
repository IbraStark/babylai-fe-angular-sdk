import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Conditional imports for optional dependencies
let marked: any;

try {
  marked = eval('require')('marked');
} catch (e) {
  console.warn('marked not available, markdown rendering will be disabled');
}

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      #markdownContainer
      [class]="cssClass"
      [dir]="dir"
      [innerHTML]="renderedContent"
    ></div>
  `,
  styles: []
})
export class MarkdownRendererComponent implements OnInit, AfterViewInit {
  @Input() content: string = '';
  @Input() inline: boolean = false;
  @Input() cssClass: string = '';
  @Input() dir: string = 'ltr';
  @ViewChild('markdownContainer') markdownContainer!: ElementRef;

  renderedContent: string = '';

  ngOnInit(): void {
    this.renderContent();
  }

  ngAfterViewInit(): void {
    this.highlightCode();
  }

  private renderContent(): void {
    if (marked && this.content) {
      try {
        this.renderedContent = marked.parse(this.content);
      } catch (e) {
        console.warn('Error parsing markdown:', e);
        this.renderedContent = this.content;
      }
    } else {
      this.renderedContent = this.content;
    }
  }

  private highlightCode(): void {
    if (typeof window !== 'undefined' && (window as any).Prism) {
      const Prism = (window as any).Prism;
      if (this.markdownContainer?.nativeElement) {
        Prism.highlightAllUnder(this.markdownContainer.nativeElement);
      }
    }
  }
}
