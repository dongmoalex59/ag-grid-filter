import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { Product } from 'src/app/modeles/product.model';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UpdateOrCreateProductComponent } from '../update-or-create-product/update-or-create-product.component';
import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-btn-update',
  templateUrl: './btn-update.component.html',
  styleUrls: ['./btn-update.component.css']
})
export class BtnUpdateComponent implements OnInit {

  public params: any;

  constructor(
    public modalService: BsModalService,
    public productService: ProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public editProduct() {
    const prod: Product = this.params.data;
    if (prod) {
      const initialState = { mode: 'UPDATE', product: prod };
      const modalRef: BsModalRef = this.modalService.show(UpdateOrCreateProductComponent, { initialState, class: 'modal-purple modal-lg' });
      modalRef.onHidden.subscribe(() => {
        const isUpdated: boolean = modalRef.content.isUpdated;
        const isNotUpdated: boolean = modalRef.content.isNotUpdated;
        if (isUpdated) {
          this.productService.getAllProducts().subscribe(data => {
            if(data) {
              this.params.api.setRowData(data);
            }
          });
          this.notificationService.success('le produit a été modifié avec succès!');
        }
        if (isNotUpdated) {
          this.notificationService.danger('echec de la modification du produit!');
        }
      });
    }
  }

}
