import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent implements OnInit {
  public icon?: string;
  public message?: string;

  constructor(
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void { }

  public close(): void {
    this.modalService.hide();
  }
}
