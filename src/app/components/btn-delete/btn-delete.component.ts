import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ProductService } from 'src/app/services/product.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Product } from 'src/app/modeles/product.model';
import { DeleteProductStateEnum } from 'src/app/states/deleteProduct.state';
import { catchError, map, of, startWith } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-btn-delete',
  templateUrl: './btn-delete.component.html',
  styleUrls: ['./btn-delete.component.css']
})
export class BtnDeleteComponent implements OnInit {

  public params: any;

  constructor(
    public productService: ProductService,
    private bsModalService: BsModalService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public deleteProduct() {
    const ids: any[] = [];
    const noms: any[] = [];
    const products: Product[] = [];
    ids.push(this.params.data.id);
    noms.push(this.params.data.nom);
    products.push(this.params.data);
    const initialState = { IDS: ids, names: noms, products: products };
    const modalRef: BsModalRef = this.bsModalService.show(DeleteConfirmationComponent, { initialState, class: 'modal-purple modal-sm' });
    modalRef.onHidden.subscribe(() => {
      const agree: boolean = modalRef.content.agree;
      if (agree) {
        this.productService.deleteProduct(ids)[0].toPromise().then(() => {
          this.productService.getAllProducts().subscribe(data => {
            console.log(data)
            this.params.api.setRowData(data);
            this.notificationService.success('le produit a été supprimé avec succès!');
          })
        }).catch(err => { 
          this.notificationService.danger('erreur de suppression!');
        })
      }
    });
  }
}
