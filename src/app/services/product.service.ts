import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../modeles/product.model';
import { SearchCriterias } from '../modeles/searchCriterias.model';
import { DeleteProductState } from '../states/deleteProduct.state';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //lister tout les produits
  public getAllProducts(
    criterias?: Array<SearchCriterias>,
    page?: number,
    size?: number,
    sort?: string
  ): Observable<any> {
    let host = environment.host;
    return this.http.post<any>(host + '/etat-compte/records', criterias);
  }

  //lister tout les produits sélectionnés
  public getSelectedProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products?isSelected=true');
  }

  //lister tout les produits disponibles
  public getAvailableProducts(): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products?isDisponible=true');
  }

  //rechercher des produits
  public searchProduct(keyword: string): Observable<Product[]> {
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products?nom_like=' + keyword);
  }

  //créer un nouveau produit
  public createProduct(product: Product): Observable<Product> {
    let host = environment.host;
    return this.http.post<Product>(host + '/products/add', product);
  }

  //mettre à jour un produit
  public updateProduct(product: Product): Observable<Product> {
    let host = environment.host;
    return this.http.put<Product>(host + '/products/update', product);
  }

  //sélectionner un produit
  public selectedProduct(product: Product): Observable<Product> {
    let host = environment.host;
    product.selected = !product.selected;
    return this.http.put<Product>(host + '/products/' + product.id, product);
  }

  //supprimer un ou plusieurs produits
  public deleteProduct(
    ids: number[]
  ): Observable<DeleteProductState<Product>>[] {
    let host = environment.host;
    const products: Observable<DeleteProductState<Product>>[] = [];
    let product: Observable<DeleteProductState<Product>>;
    ids.forEach((id) => {
      product = this.http.delete<DeleteProductState<Product>>(
        host + '/products/delete/' + id
      );
      products.push(product);
    });
    return products;
  }
}
