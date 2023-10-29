import {ChangeDetectorRef, Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appExpandable]'
})
export class CollapsableContainerDirective {
  // Track the expanded state
  private _isExpanded: boolean = false;

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }

  // Respond to external input to toggle expansion
  @Input('isExpanded')
  set isExpanded(value: boolean) {
    this._isExpanded = value;
    if (value) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  private expand() {
    // Ensure styles allow for height adjustment
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');

    // Calculate the full height of the content, including padding if necessary
    const scrollHeight = this.el.nativeElement.scrollHeight + 'px';
    this.renderer.setStyle(this.el.nativeElement, 'height', scrollHeight);
  }


  private collapse() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '0');
  }
}
