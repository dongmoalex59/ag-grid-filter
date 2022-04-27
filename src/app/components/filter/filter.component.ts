import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/modeles/product.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { AppDataState, DataStateEnum } from 'src/app/states/product.state';
import {
  FILTER_DATE_TYPE,
  FILTER_NUMBER_TYPE,
  FILTER_TEXT_TYPE,
} from './adds/filterTypeValue';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  public filterTextTypes = FILTER_TEXT_TYPE;
  public filterDateTypes = FILTER_DATE_TYPE;
  public filterNubmerTypes = FILTER_NUMBER_TYPE;

  @Input() columns: any[] = [];
  @Input() modal!: any;

  public criterias: any[] = [];

  public rulesCompt: number = 0;
  public subGroupCompt: number = 0;

  public products: Observable<AppDataState<Product[]>> | null = null;

  constructor(public modalService: BsModalService) {}

  ngOnInit(): void {}

  public filter() {
    this.setCriterias();
    if (this.criterias.length == 0) {
      this.close();
      return;
    }
    //tous les models doivent avoir comme methode record une methi=ode avec un nom pareil
    this.modal.onGetAllProducts(this.criterias);
    this.criterias = [];
  }

  /**
   * get criterias
   */
  public setCriterias() {
    for (let i = 0; i < this.rulesCompt + 1; i++) {
      let div = document.getElementById('formDiv' + i);
      if (null != div) {
        let selectFilterType = document.getElementById(
          'filterType' + i
        ) as HTMLSelectElement;
        let selectFieldName = document.getElementById(
          'colonne' + i
        ) as HTMLSelectElement;
        let inputFieldValue = document.getElementById(
          'valeur' + i
        ) as HTMLInputElement;
        let inputFieldTypeValue = document.getElementById(
          'hidden' + i
        ) as HTMLInputElement;

        let element = {
          key: selectFieldName.options[selectFieldName.selectedIndex].value,
          operation:
            selectFilterType.options[selectFilterType.selectedIndex].value,
          value: inputFieldValue.value,
          orPredicate: inputFieldTypeValue.value === '0' ? false : true,
          operatorGroup: 'ou' + i,
        };
        this.criterias.push(element);
      }
    }
  }

  public close(): void {
    this.modalService.hide();
  }

  public addSubGroup() {
    this.subGroupCompt = this.subGroupCompt + 1;
    const subGroupDiv = document.getElementById('subGroupDiv');
    const div = document.createElement('div');
    div.id = 'subGroupDiv' + this.subGroupCompt;
    let id = 'subGroupDiv' + this.subGroupCompt;
    div.style.margin = '2px';

    //select AND/OR
    const selectField = document.createElement('select');

    //Option AND
    var AndOption = document.createElement('option');
    AndOption.value = '0';
    AndOption.text = 'ET';
    selectField.appendChild(AndOption);
    let selectId = 'operator' + this.subGroupCompt;
    selectField.id = selectId;

    //Option OR
    var OrOption = document.createElement('option');
    OrOption.value = '1';
    OrOption.text = 'OU';
    selectField.appendChild(OrOption);

    //bouton d'ajout de sous-groupe
    const button1 = this.createButton('fa-plus');
    const span1 = document.createElement('span');
    span1.textContent = 'sous-groupe';
    button1.appendChild(span1);
    button1.onclick = () => this.addSubGroup();

    //bouton d'ajout de règle
    const button2 = this.createButton('fa-plus');
    button2.style.marginLeft = '15px';
    const span2 = document.createElement('span');
    span2.textContent = 'règle';
    button2.appendChild(span2);
    button2.onclick = () => this.addRule(selectId);

    //bouton de suppression de sous-groupe
    const button3 = this.createButton('fa-trash');
    button3.style.marginLeft = '15px';
    button3.onclick = () => this.deleteSubGroup(id);

    div.appendChild(selectField);
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    subGroupDiv?.appendChild(div);
  }

  public addRule(ids: string) {
    this.rulesCompt = this.rulesCompt + 1;
    let id = 'formDiv' + this.rulesCompt;

    const div = document.getElementById('formDiv');
    //creation de la division globale
    const subDiv = document.createElement('div');
    subDiv.style.display = 'flex';
    subDiv.style.justifyContent = 'space-between';
    subDiv.style.margin = '2px';
    subDiv.id = id;
    //creation de la diision pour l'ajout du
    const selectField = document.createElement('div') as HTMLDivElement;
    selectField.classList.add('form-group');

    //select pour les attributs du filtre
    var idSelect = 'colonne' + this.rulesCompt;
    var selectList = this.createSelect(idSelect, idSelect);
    selectField?.appendChild(selectList);
    //Create and append the options
    this.pushToSelectField(selectList, this.columns);

    // creation de la division pour le champ de selection des attributs
    //configuration de la valeur initial lors de la creation d'un nouveau champ du filtre
    let elt = this.columns[0];
    const selectField1 = document.createElement('div');
    selectField1.classList.add('form-group');
    //select pour les operation de filtre
    var idSelect2 = 'filterType' + this.rulesCompt;
    var selectList1 = this.createSelect(idSelect2, idSelect2);
    selectField1.onchange = () => this.updateQuery();
    selectField1?.appendChild(selectList1);

    //Choix des operations du filtre en fonciton du type de d'attribut choisis
    let filter = [];
    if (elt.type === 'date') filter = this.filterDateTypes;
    else if (elt.type === 'number') filter = this.filterNubmerTypes;
    else filter = this.filterTextTypes;
    this.pushToSelect(selectList1, filter);

    //creation de la division pour le champ de valeur
    const inputField = document.createElement('div') as HTMLDivElement;
    inputField.classList.add('form-group');

    //creation du input pour la sasie des valeur de recherches
    let idInput = 'valeur' + this.rulesCompt;
    const input = this.createInput(idInput, '', elt.type, 'Valeur...');
    input.oninput = () => {
      this.updateQuery();
    };
    inputField.appendChild(input);

    //creation d'un champ caché pour la conservation du ET ou OU
    let sel = document.getElementById(ids) as HTMLSelectElement;
    const inputHidden = this.createInput(
      'hidden' + this.rulesCompt,
      sel.options[sel.selectedIndex].value,
      'hidden'
    );
    inputField.appendChild(inputHidden);

    //div4
    const inputField1 = document.createElement('div');
    inputField1.classList.add('form-group');
    //boutton de suppression des champs de règles
    const button = this.createButton('fa-trash');
    inputField1.appendChild(button);
    button.onclick = () => this.deleteRule(id);

    //creation du label d'indication sur le type d'operateur d'une règle
    const labelOperator = document.createElement('label') as HTMLLabelElement;
    labelOperator.textContent =
      sel.options[sel.selectedIndex].value === '0' ? 'ET' : 'OU';
    labelOperator.setAttribute(
      'style',
      sel.options[sel.selectedIndex].value === '0'
        ? 'color:blue;'
        : 'color:green;'
    );
    //action de mise a jour du champ de valeur en fonction du type d'attribut
    selectList.onchange = () =>
      this.onSelectColumn(idInput, idSelect, idSelect2);
    if (div!.childElementCount === 0) labelOperator.textContent = '!!!!';
    subDiv.appendChild(labelOperator);
    subDiv?.appendChild(selectField);
    subDiv?.appendChild(selectField1);
    subDiv?.appendChild(inputField);
    subDiv?.appendChild(inputField1);
    div?.appendChild(subDiv);
    this.updateQuery();
  }

  public deleteRule(id: string) {
    const subDiv = document.getElementById(id);
    subDiv?.parentElement?.removeChild(subDiv);
    this.updateQuery();
  }

  public deleteSubGroup(id: string) {
    const subGroup = document.getElementById(id);
    subGroup?.parentElement?.removeChild(subGroup);
  }

  /**
   * pushToSelect
   */
  public pushToSelect(select: HTMLSelectElement, value: any[]) {
    for (let i = select.options.length; i >= 0; i--) {
      select.remove(i);
    }
    value.forEach((element) => {
      var option = document.createElement('option');
      option.value = element.value;
      option.text = element.name;
      select.appendChild(option);
    });
  }
  /**
   * pushToSelectField
   */
  public pushToSelectField(select: HTMLSelectElement, value: any[]) {
    value.forEach((element) => {
      var option = document.createElement('option');
      option.value = element.name;
      option.text = element.name;
      select.appendChild(option);
    });
  }

  /**
   * updateQuery
   */
  public updateQuery() {
    let p = document.getElementById('query') as HTMLParagraphElement;
    if (p.style.display !== 'none') {
      let p = document.getElementById('query') as HTMLParagraphElement;
      let content = 'SELECT * FROM ??? WHERE ';
      this.setCriterias();

      for (let i = 0; i < this.criterias.length; i++) {
        const elt = this.criterias[i];
        if (i === 0) {
          content += elt.key + ' ' + elt.operation + ' `' + elt.value + '`';
        } else {
          let op = elt.orPredicate ? 'OR' : 'AND';
          content +=
            ' ' +
            op +
            ' ' +
            elt.key +
            ' ' +
            elt.operation +
            ' `' +
            elt.value +
            '`';
        }
      }
      content += ';';
      p.textContent = content;
      this.criterias = [];
    }
  }

  /**
   * hide
   */
  public hide() {
    let p = document.getElementById('query') as HTMLParagraphElement;
    p.style.display = p.style.display === 'none' ? 'inline' : 'none';
    let btn = document.getElementById('btnbtn') as HTMLButtonElement;
    btn.textContent = p.style.display === 'none' ? 'Show Query' : 'Hide Query';
    this.updateQuery();
  }

  /**
   * createInput
   */
  public createInput(
    id: string,
    value: string,
    type: string,
    placeholder: string = ''
  ): HTMLInputElement {
    //creation d'un champ caché pour la conservation du ET ou OU
    const inputField = document.createElement('input') as HTMLInputElement;
    inputField.classList.add('form-control');
    inputField.id = id;
    inputField.type = type;
    inputField.value = value;
    inputField.placeholder = placeholder;
    return inputField;
  }

  /**
   * createDivElement
   */
  public createSelect(id: string, name: string): HTMLSelectElement {
    var selectList1 = document.createElement('select') as HTMLSelectElement;
    selectList1.name = name;
    selectList1.id = id;
    selectList1.classList.add('form-control');
    return selectList1;
  }

  /**
   * onSelectColumn
   */
  public onSelectColumn(idInput: string, idSelect: string, idSelect2: string) {
    var input = document.getElementById(idInput);
    var select = document.getElementById(idSelect) as HTMLSelectElement;
    let value = select?.options[select.selectedIndex].value;
    this.columns.forEach((elt) => {
      if (elt.name == value) {
        input?.setAttribute('type', elt.type);
        var select2 = document.getElementById(idSelect2) as HTMLSelectElement;
        if (elt.type === 'date') {
          this.pushToSelect(select2, this.filterDateTypes);
        } else if (elt.type === 'number') {
          this.pushToSelect(select2, this.filterNubmerTypes);
        } else {
          this.pushToSelect(select2, this.filterTextTypes);
        }
      }
    });
    this.updateQuery();
  }

  /**
   * createButton
   */
  public createButton(icon: string): HTMLButtonElement {
    const button = document.createElement('button') as HTMLButtonElement;
    button.classList.add('btn');
    button.classList.add(
      icon.endsWith('trash') ? 'btn-outline-danger' : 'btn-outline-primary'
    );
    button.classList.add('btn-sm');
    const i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add(icon);
    button.appendChild(i);
    return button;
  }
}
