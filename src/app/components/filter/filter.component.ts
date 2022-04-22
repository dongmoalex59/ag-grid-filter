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
    const button1 = document.createElement('button');
    button1.classList.add('btn');
    button1.classList.add('btn-outline-primary');
    button1.classList.add('btn-sm');
    button1.style.marginLeft = '15px';
    const li1 = document.createElement('li');
    li1.classList.add('fa');
    li1.classList.add('fa-plus');
    const span1 = document.createElement('span');
    span1.textContent = 'sous-groupe';
    button1.appendChild(li1);
    button1.appendChild(span1);
    button1.onclick = () => this.addSubGroup();

    //bouton d'ajout de règle
    const button2 = document.createElement('button');
    button2.classList.add('btn');
    button2.classList.add('btn-outline-primary');
    button2.classList.add('btn-sm');
    button2.style.marginLeft = '15px';
    const li2 = document.createElement('li');
    li2.classList.add('fa');
    li2.classList.add('fa-plus');
    const span2 = document.createElement('span');
    span2.textContent = 'règle';
    button2.appendChild(li2);
    button2.appendChild(span2);
    button2.onclick = () => this.addRule(selectId);

    //bouton de suppression de sous-groupe
    const button3 = document.createElement('button');
    button3.classList.add('btn');
    button3.classList.add('btn-outline-danger');
    button3.classList.add('btn-sm');
    button3.style.marginLeft = '15px';
    const li3 = document.createElement('li');
    li3.classList.add('fa');
    li3.classList.add('fa-trash');
    button3.appendChild(li3);
    button3.onclick = () => this.deleteSubGroup(id);

    div.appendChild(selectField);
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    subGroupDiv?.appendChild(div);
  }

  public addRule(ids: string) {
    this.rulesCompt = this.rulesCompt + 1;

    const div = document.getElementById('formDiv');
    const subDiv = document.createElement('div');
    subDiv.style.display = 'flex';
    subDiv.style.justifyContent = 'space-between';
    subDiv.style.margin = '2px';

    subDiv.id = 'formDiv' + this.rulesCompt;
    let id = 'formDiv' + this.rulesCompt;

    const selectField = document.createElement('div');
    selectField.classList.add('form-group');

    var selectList = document.createElement('select');
    selectList.name = 'colonne' + this.rulesCompt;
    var idSelect = 'colonne' + this.rulesCompt;
    selectList.id = idSelect;
    selectList.classList.add('form-control');
    selectField?.appendChild(selectList);

    //Create and append the options

    //Create and append the options
    this.pushToSelectField(selectList, this.columns);

    // div2

    let elt = this.columns[0];
    const selectField1 = document.createElement('div');
    selectField1.classList.add('form-group');

    var selectList1 = document.createElement('select');
    var idSelect2 = 'filterType' + this.rulesCompt;
    selectList1.name = 'filterType' + this.rulesCompt;
    selectList1.id = idSelect2;
    selectList1.classList.add('form-control');
    selectField1?.appendChild(selectList1);
    selectField1.onchange = () => {
      this.updateQuery();
    };

    //Create and append the options
    let filter = [];
    if (elt.type === 'date') filter = this.filterDateTypes;
    else if (elt.type === 'number') filter = this.filterNubmerTypes;
    else filter = this.filterTextTypes;
    this.pushToSelect(selectList1, filter);

    //div3
    const inputField = document.createElement('div') as HTMLDivElement;
    inputField.classList.add('form-group');

    const input = document.createElement('input') as HTMLInputElement;
    input.classList.add('form-control');
    input.placeholder = 'Valeur...';
    input.name = 'valeur' + this.rulesCompt;
    let idInput = 'valeur' + this.rulesCompt;
    input.id = idInput;
    input.type = elt.type;
    input.oninput = () => {
      this.updateQuery();
    };
    inputField.appendChild(input);

    //creation d'un champ caché pour la conservation du ET ou OU
    const inputHidden = document.createElement('input');
    inputHidden.classList.add('form-control');
    inputHidden.id = 'hidden' + this.rulesCompt;
    inputHidden.type = 'hidden';
    let sel = document.getElementById(ids) as HTMLSelectElement;
    inputHidden.value = sel.options[sel.selectedIndex].value;

    inputField.appendChild(inputHidden);

    //add action to select field value
    selectList.onchange = () => {
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
    };

    //div4
    const inputField1 = document.createElement('div');
    inputField1.classList.add('form-group');
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-danger');
    button.classList.add('btn-sm');
    const i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add('fa-trash');
    button.appendChild(i);
    inputField1.appendChild(button);
    button.onclick = () => this.deleteRule(id);

    const labelOperator = document.createElement('label') as HTMLLabelElement;
    labelOperator.textContent =
      sel.options[sel.selectedIndex].value === '0' ? 'ET' : 'OU';
    labelOperator.setAttribute(
      'style',
      sel.options[sel.selectedIndex].value === '0'
        ? 'color:blue;'
        : 'color:green;'
    );

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
}
