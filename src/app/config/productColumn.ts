export const ACCOUNTSTATE_COLUMNS_DEFS: any[] = [
  {
    headerName: '',
    valueGetter: (params: { node: { rowIndex: number } }) => {
      return params.node.rowIndex + 1;
    },
    type: ['checkboxColunm', 'nonEditableColumn'],
    filter: false,
  },
  {
    headerName: '',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    floatingFilter: false,
    width: 60,
    editable: false,
  },
  {
    headerName: 'id',
    field: 'id',
    width: 70,
    editable: false,
  },
  {
    headerName: 'dateEtat',
    field: 'dateEtat',
    cellEditor: 'dateEditorComponent',
  },
  {
    headerName: 'libelle',
    field: 'libelle',
  },
  {
    headerName: 'montantActuelle',
    field: 'montantActuelle',
    valueGetter: (params: { data: { montantActuelle: any } }) => {
      return params.data.montantActuelle;
    },
    valueSetter: (params: {
      newValue: any;
      data: { montantActuelle: number };
    }) => {
      var newValNunber = Number(params.newValue);
      if (params.data.montantActuelle !== newValNunber) {
        params.data.montantActuelle = newValNunber;
      }
      return true;
    },
  },
  {
    headerName: 'montantReserve',
    field: 'montantReserve',
    valueGetter: (params: { data: { montantReserve: any } }) => {
      return params.data.montantReserve;
    },
    valueSetter: (params: {
      newValue: any;
      data: { montantReserve: number };
    }) => {
      var newValNunber = Number(params.newValue);
      if (params.data.montantReserve !== newValNunber) {
        params.data.montantReserve = newValNunber;
      }
      return true;
    },
  },
  {
    headerName: 'aVirer',
    field: 'aVirer',
    valueGetter: (params: { data: { aVirer: any } }) => {
      return params.data.aVirer;
    },
    valueSetter: (params: { newValue: any; data: { aVirer: number } }) => {
      var newValNunber = Number(params.newValue);
      if (params.data.aVirer !== newValNunber) {
        params.data.aVirer = newValNunber;
      }
      return true;
    },
  },
  {
    headerName: 'compte',
    field: 'compte',
  },
  {
    headerName: 'cmt',
    field: 'cmt',
    cellEditor: 'agLargeTextCellEditor',
    cellEditorParams: {
      rows: 5,
      cols: 20,
      maxLength: 200,
    },
  },
];
