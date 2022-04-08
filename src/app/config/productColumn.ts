import { ColDef } from "ag-grid-community";
import { BtnActionComponent } from "../components/btn-action/btn-action.component";
import { BtnDeleteComponent } from "../components/btn-delete/btn-delete.component";
import { BtnSelectionComponent } from "../components/btn-selection/btn-selection.component";
import { BtnUpdateComponent } from "../components/btn-update/btn-update.component";
import { CheckboxComponent } from "../components/checkbox/checkbox.component";
import { FilterComponent } from "../components/filter/filter.component";

export const PRODUCT_COLUMN: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
    width: 120,
    editable: false,
    floatingFilter: true,
    filter: 'FilterComponent',
    sortable: true
  },
  {
    headerName: 'NOMS',
    field: 'name',
    editable: false,
    floatingFilter: true,
    filter: true,
    sortable: true,
    width: 150
  },
  {
    headerName: 'IMAGE',
    field: 'imageUrl',
    editable: false,
    floatingFilter: true,
    filter: true,
    sortable: true,
    width: 150
  },
  {
    headerName: 'PRIX',
    field: 'price',
    editable: false,
    floatingFilter: true,
    filter: true,
    sortable: true,
    width: 130
  },
  {
    headerName: 'QUANTITES',
    field: 'quantity',
    editable: false,
    floatingFilter: true,
    filter: true,
    sortable: true,
    width: 150
  },
  {
    headerName: 'CODE PRODUIT',
    field: 'productCode',
    editable: false,
    floatingFilter: true,
    filter: true,
    sortable: true,
    width: 150
  },
  {
    headerName: 'isDISPONIBLE',
    field: 'available',
    editable: false,
    width: 140,
    cellRendererFramework: CheckboxComponent,
    floatingFilter: true,
    filter: true,
    sortable: true
  },
  {
    headerName: 'isSELECTED',
    field: 'selected',
    editable: false,
    width: 140,
    cellRendererFramework: CheckboxComponent,
    floatingFilter: true,
    filter: true,
    sortable: true
  },
  {
    headerName: 'Actions',
    field: 'sélectionner',
    editable: false,
    width: 210,
    cellRendererFramework: BtnActionComponent,
    floatingFilter: true,
    filter: true
  }
];