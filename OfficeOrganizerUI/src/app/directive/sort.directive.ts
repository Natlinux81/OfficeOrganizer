import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { SortTable } from '../helper/sortTable';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort!: Array<any>;

  constructor(private renderer: Renderer2, private targetElm: ElementRef) { }

  @HostListener ("click")
  sortData(){
    // Create Object of Sort Class
    const sort = new SortTable();
    // Get Reference Of Current Clicked Element
    const elem = this.targetElm.nativeElement;
    // Get In Which Order list should be sorted by default it should be set to desc on element attribute
    const order = elem.getAttribute("data-order");
    // Get The Property Type specially set [data-type=data] if it is date field
    const type = elem.getAttribute("data-type");
    // Get The Property Name from Element Attribute
    const property = elem.getAttribute("data-name");
    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    }
    else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }

}
