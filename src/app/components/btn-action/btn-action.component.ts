import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/modeles/product.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { UpdateOrCreateProductComponent } from '../update-or-create-product/update-or-create-product.component';

@Component({
  selector: 'app-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.css']
})
export class BtnActionComponent implements OnInit, AfterViewInit {

  public params: any;
  public isSelected?: boolean = false;

  ngAfterViewInit(): void {
    this.isSelected = this.params.data.isSelected;
  }

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

  //delete
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
        this.productService.deleteProduct(ids)[0].toPromise().then(res => {
          if (res) {
            this.productService.getAllProducts().subscribe(data => {
              this.params.api.setRowData(data);
              this.notificationService.success('le produit a été supprimé avec succès!');
            })
          }
        }).catch(err => { 
          this.notificationService.danger('erreur de suppression!');
        })
      }
    });
  }

  //select
  public selectProduct() {
    const product: Product = this.params.data;
    this.productService.selectedProduct(product).subscribe(p => {
      this.productService.getAllProducts().subscribe(data => {
        this.params.api.setRowData(data);
      })
    });
    this.params.data.isSelected = !this.params.data.isSelected
    this.isSelected = !this.params.data.isSelected;
  }

  //edit
  public editProduct() {
    const prod: Product = this.params.data;
    if (prod) {
      const initialState = { mode: 'UPDATE', product: prod };
      const modalRef: BsModalRef = this.bsModalService.show(UpdateOrCreateProductComponent, { initialState, class: 'modal-purple modal-lg' });
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
