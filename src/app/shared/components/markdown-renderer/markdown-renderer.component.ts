import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

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
    if (this.content) {
      try {
        this.renderedContent = marked.parse(this.content) as string;
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
