import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  public IDS: any;
  public names: any;
  public agree: boolean = false;
  public idsLenght: any;
  public namesLenght: any;
  public products: any;


  constructor(
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void {
    if(this.IDS && this.IDS.length > 0) {
      this.idsLenght = this.IDS.length;
    }
    if(this.names && this.names.length > 0) {
      this.namesLenght = this.names.length;
    }
  }

  public close(): void {
    this.modalService.hide();
  }

  public delete(): void {
    this.agree = true;
    this.close();
  }
}
