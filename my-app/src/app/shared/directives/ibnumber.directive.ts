import {Directive, ElementRef, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appIBnumber]'
})
export class IbnumberDirective {

  @Input() appIBnumber: number = 3
  el: ElementRef

  constructor(el: ElementRef) {
    this.el = el
  }

  ngOnInit() {
    if(!this.appIBnumber) return
    const whole = this.appIBnumber.toFixed(0)
    const decimal = (this.appIBnumber % 1)
    this.el.nativeElement.innerHTML = `${whole}.<small>${decimal.toFixed(2).substr(2)}</small>`;
  }
}
