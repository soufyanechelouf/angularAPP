import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor() { }

  ngOnInit(): void {
  }
}
