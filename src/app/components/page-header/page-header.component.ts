import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() pageTitle: string = '';
}
