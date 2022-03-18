import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  searchClicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSearchClicked() {
    this.searchClicked = !this.searchClicked
  }
}
