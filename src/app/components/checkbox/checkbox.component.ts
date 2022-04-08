import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox',
  template: `<input type="checkbox" [checked]="params.value" (change)="onChange($event)"/>`
})
export class CheckboxComponent implements ICellRendererAngularComp {

  public params: any;

  constructor() { }

  public agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public onChange(event: any) {
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
  }

  public refresh(params: ICellRendererParams): boolean {
    return true;
  }

}
