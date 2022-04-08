import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { BtnSelectionComponent } from './components/btn-selection/btn-selection.component';
import { BtnDeleteComponent } from './components/btn-delete/btn-delete.component';
import { BtnUpdateComponent } from './components/btn-update/btn-update.component';
import { UpdateOrCreateProductComponent } from './components/update-or-create-product/update-or-create-product.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationMessageComponent } from './components/notification-message/notification-message.component';
import { BtnActionComponent } from './components/btn-action/btn-action.component';
import { FilterComponent } from './components/filter/filter.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    HomeComponent,
    CheckboxComponent,
    BtnSelectionComponent,
    BtnDeleteComponent,
    BtnUpdateComponent,
    UpdateOrCreateProductComponent,
    DeleteConfirmationComponent,
    NotificationMessageComponent,
    BtnActionComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([CheckboxComponent, BtnSelectionComponent, BtnDeleteComponent, BtnUpdateComponent, BtnActionComponent, FilterComponent]),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
