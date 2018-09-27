import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  progress = 0;
  constructor() {}

  buttonHold(intervalValue) {
    console.log(intervalValue);
    this.progress = intervalValue / 10;

    if (intervalValue > 1000) {
      console.log('item deleted virtually');
    }
  }
}
