import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentDate!: string;

  constructor() {}

  ngOnInit(): void {
    this.currentDate = new Date().toDateString();
  }
}
