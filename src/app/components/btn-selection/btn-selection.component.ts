import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { Product } from 'src/app/modeles/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-btn-selection',
  templateUrl: './btn-selection.component.html',
})
export class BtnSelectionComponent implements OnInit, AfterViewInit {

  public select: string = '';
  public isSelected?: boolean = false;

  public params: any;
  constructor(public productService: ProductService) { }

  ngAfterViewInit(): void {
    this.isSelected = this.params.data.isSelected;
  }

  ngOnInit(): void {
  }

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

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
}
