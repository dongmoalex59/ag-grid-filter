import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { RowSelectedEvent } from 'ag-grid-community';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { PRODUCT_COLUMN } from 'src/app/config/productColumn';
import { Product } from 'src/app/modeles/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AppDataState, DataStateEnum } from 'src/app/states/product.state';
import { BtnDeleteComponent } from '../btn-delete/btn-delete.component';
import { BtnSelectionComponent } from '../btn-selection/btn-selection.component';
import { BtnUpdateComponent } from '../btn-update/btn-update.component';
import { CheckboxComponent } from './../checkbox/checkbox.component';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UpdateOrCreateProductComponent } from '../update-or-create-product/update-or-create-product.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DeleteProductState } from 'src/app/states/deleteProduct.state';
import { NotificationService } from 'src/app/services/notification.service';
import { BtnActionComponent } from '../btn-action/btn-action.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild("agGrid") agGrid?: AgGridAngular;

  public columnDefs = PRODUCT_COLUMN;
  public rowData?: Product[] = [];
  public gridApi: any;
  public columnApi: any;
  public rowSelection: string = 'multiple';
  public animateRows: boolean = true;
  public pagination: boolean = true;
  public suppressRowClickSelection: boolean = true;
  public rowMultiSelectWithClick: boolean = true;
  public paginationTable: number[] = [10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000, 2000, 4000, 6000, 8000, 10000];
  public paginationPageSize: number = 10;
  public defaultPageNumber: number = 0;
  public products: Observable<AppDataState<Product[]>> | null = null;
  public deleteProducts: Observable<DeleteProductState<Product>>[] | null = null;
  public searchValue: string = '';
  public isLoading: boolean = false;
  public isLoader: boolean = false;
  public isError: boolean = false;
  public bsModalRef: BsModalRef | null = null;

  public frameworkComponent = {
    CheckboxComponent,
    BtnSelectionComponent,
    BtnDeleteComponent,
    BtnUpdateComponent,
    BtnActionComponent,
    FilterComponent
  };

  constructor(
    private productService: ProductService,
    private bsModalService: BsModalService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.onGetAllProducts();
    
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  public getSelectedRows(): Product[] {
    return this.gridApi.getSelectedNodes().map((node: any) => node.data);
  }

  public quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  public refreshData(content: Product[]): void {
    this.gridApi.applyTransaction({
      add: content,
      addIndex: this.gridApi.paginationGetRowCount() + 1
    });
  }

  public clear(): void {
    this.searchValue = '';
    this.quickSearch();
  }

  public onGetAllProducts() {
    this.products = this.productService.getAllProducts().pipe(
      map(data => {
        return ({ DataState: DataStateEnum.LOADER, data: data })
      }),
      startWith({ DataState: DataStateEnum.LOADING }),
      catchError(err => of({ DataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
    this.products.subscribe(res => {
      if (res) {
        if (res.DataState == DataStateEnum.LOADER) {
          this.isLoader = true;
          this.isLoading = false;
          this.rowData = res.data
        }
        else if (res.DataState == DataStateEnum.LOADING) {
          this.isLoading = true;
          this.isLoader = false;
        }
        else if (res.DataState == DataStateEnum.ERROR) {
          this.isError = true;
          this.isLoader = false;
          this.isLoading = false;
          this.notificationService.danger('connection interrompue!');
        }
      }
    });
  }

  public onGetSelectedProducts() {
    this.products = this.productService.getSelectedProducts().pipe(
      map(data => ({ DataState: DataStateEnum.LOADER, data: data })),
      startWith({ DataState: DataStateEnum.LOADING }),
      catchError(err => of({ DataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
    this.products.subscribe(res => {
      if (res) {
        if (res.DataState == DataStateEnum.LOADER) {
          this.isLoader = true;
          this.isLoading = false;
          this.rowData = res.data;
        }
        else if (res.DataState == DataStateEnum.LOADING) {
          this.isLoading = true;
          this.isLoader = false;
        }
        else if (res.DataState == DataStateEnum.ERROR) {
          this.isError = true;
          this.isLoader = false;
          this.isLoading = false;
          this.notificationService.danger('connection interrompue!');
        }
      }
    });
  }

  public onGetAvailableProducts() {
    this.products = this.productService.getAvailableProducts().pipe(
      map(data => ({ DataState: DataStateEnum.LOADER, data: data })),
      startWith({ DataState: DataStateEnum.LOADING }),
      catchError(err => of({ DataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
    this.products.subscribe(res => {
      if (res) {
        if (res.DataState == DataStateEnum.LOADER) {
          this.isLoader = true;
          this.isLoading = false;
          this.rowData = res.data
        }
        else if (res.DataState == DataStateEnum.LOADING) {
          this.isLoading = true;
          this.isLoader = false;
        }
        else if (res.DataState == DataStateEnum.ERROR) {
          this.isError = true;
          this.isLoader = false;
          this.isLoading = false;
          this.notificationService.danger('connection interrompue!');
        }
      }
    });
  }

  public onSearch(dataForm: any) {
    this.products = this.productService.searchProduct(this.searchValue).pipe(
      map(data => ({ DataState: DataStateEnum.LOADER, data: data })),
      startWith({ DataState: DataStateEnum.LOADING }),
      catchError(err => of({ DataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
    this.products.subscribe(res => {
      if (res) {
        if (res.DataState == DataStateEnum.LOADER) {
          this.isLoader = true;
          this.isLoading = false;
          this.rowData = res.data
        }
        else if (res.DataState == DataStateEnum.LOADING) {
          this.isLoading = true;
          this.isLoader = false;
        }
        else if (res.DataState == DataStateEnum.ERROR) {
          this.isError = true;
          this.isLoader = false;
          this.isLoading = false;
          this.notificationService.danger('connection interrompue!');
        }
      }
    });
  }

  public onCreateProduct() {
    const initialState = { mode: 'CREATE' };
    const modalRef: BsModalRef = this.bsModalService.show(UpdateOrCreateProductComponent, { initialState, class: 'modal-purple modal-lg' });
    modalRef.onHidden.subscribe(() => {
      const isCreated: boolean = modalRef.content.isCreated;
      const isNotCreated: boolean = modalRef.content.isNotCreated;
      if (isCreated) {
        this.onGetAllProducts();
        this.notificationService.success('le produit a été ajouté avec succès!');
      }
      if (isNotCreated) {
        this.notificationService.danger('L\'ajout du produit a échoué!');
      }
    });
  }

  public getDisplayedRows(): any[] {
    var rowCount = this.gridApi.getDisplayedRowCount();
    var lastGridIndex = rowCount - 1;
    var currentPage = this.gridApi.paginationGetCurrentPage();
    var pageSize = this.gridApi.paginationGetPageSize();
    var startPageIndex = currentPage * pageSize;
    var endPageIndex = (currentPage + 1) * pageSize - 1;
    if (endPageIndex > lastGridIndex) {
      endPageIndex = lastGridIndex;
    }
    var rowNode = [];
    for (var i = startPageIndex; i <= endPageIndex; i++) {
      rowNode.push(this.gridApi.getDisplayedRowAtIndex(i));
    }
    return rowNode;
  }

  public onDeleteMultiProducts() {
    const products: Product[] = [];
    const ids: any[] = [];
    const noms: any[] = [];
    this.getDisplayedRows().forEach(row => {
      products.push(row.data);
    });
    products.forEach(p => {
      ids.push(p.id);
      noms.push(p.name);
    });
    const initialState = { IDS: ids, names: noms, products: products };
    const modalRef: BsModalRef = this.bsModalService.show(DeleteConfirmationComponent, { initialState, class: 'modal-purple modal-lg' });
    modalRef.onHidden.subscribe(() => {
      const agree: boolean = modalRef.content.agree;
      if (agree) {
        this.productService.deleteProduct(ids).forEach(product$ => {
          product$.toPromise().then(data => {
            if (data) {
              //
            }
          });
        });
        this.productService.getAllProducts().subscribe(data => {
          this.gridApi.setRowData(data);
        });
        this.notificationService.success('les produits ont été supprimé avec succès!');
      }
    });
  }

  public onRowSelected(event: RowSelectedEvent) {
    this.productService.selectedProduct(event.data).subscribe(p => {
      this.productService.getAllProducts().subscribe(data => {
        this.rowData = data;
      })
    });
  }

  public onFilterProducts() {
    const modalRef: BsModalRef = this.bsModalService.show(FilterComponent, { class: 'modal-purple modal-lg' });
  }
}
