import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationMessageComponent } from '../components/notification-message/notification-message.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private modalService: BsModalService) { }

  public success(message: string): void {
    const initialState = { icon: 'fa-check-circle text-success', message: message };
    this.modalService.show(NotificationMessageComponent, {initialState, class: 'modal-success modal-sm'});
  }

  public warning(message: string): void {
    const initialState = { icon: 'fa-warning text-warning', message: message };
    this.modalService.show(NotificationMessageComponent, {initialState, class: 'modal-warning modal-sm'});
  }

  public danger(message: string): void {
    const initialState = { icon: 'fa-times-circle text-danger', message: message };
    this.modalService.show(NotificationMessageComponent, {initialState, class: 'modal-danger modal-sm'});
  }

  public info(message: string): void {
    const initialState = { icon: 'fa-info-circle text-info', message: message };
    this.modalService.show(NotificationMessageComponent, {initialState, class: 'modal-info modal-sm'});
  }
}
