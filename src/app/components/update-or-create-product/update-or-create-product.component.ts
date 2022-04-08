import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/modeles/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-update-or-create-product',
  templateUrl: './update-or-create-product.component.html',
  styleUrls: ['./update-or-create-product.component.css']
})
export class UpdateOrCreateProductComponent implements OnInit {

  public mode: string = 'CREATE';
  public isLoading: boolean = false;
  public product: any;
  public isCreated: boolean = false;
  public isNotCreated: boolean = false;
  public isUpdated: boolean = false;
  public isNotUpdated: boolean = false;

  public form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public modalService: BsModalRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.form = this.fb.group({
      id: [],
      name: ['', Validators.required],
      price: [Validators.required],
      quantity: [0, Validators.required],
      available: [false],
      selected: [false],
      productCode: [''],
      imageUrl: ['', Validators.required]
    });
    if (this.mode === "UPDATE") {
      this.form.patchValue({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity,
        selected: this.product.selected,
        available: this.product.available,
        productCode: this.product.productCode,
        imageUrl: this.product.imageUrl
      });
    }
  }

  public create() {
    const product: Product = this.form.value;
    this.productService.createProduct(product).toPromise().then(data => {
      if (data) {
        this.isCreated = true;
        this.close();
      }
    }).catch(err => {
      this.isNotCreated = true;
      alert('erreur survenue lors de la création dans le modale');
      this.close();
    }).finally(() => {
      this.close();
    });
  }

  public update() {
    const product: Product = this.form.value;
    this.productService.updateProduct(product).toPromise().then(data => {
      if (data) {
        this.isUpdated = true;
        this.close();
      }
    }).catch(err => {
      this.isNotUpdated = true;
      alert('erreur survenue lors de la mise à jour dans le modale');
      this.close();
    }).finally(() => {
      this.close();
    });
  }

  public close(): void {
    this.modalService.hide();
  }

}
