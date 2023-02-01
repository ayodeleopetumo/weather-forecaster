import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `{{ errorMessage }}`
})
export class MockErrorComponent {
  @Input() errorMessage!: any;
}
