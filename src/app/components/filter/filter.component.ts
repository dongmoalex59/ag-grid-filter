import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, AgPromise, IFilterParams } from 'ag-grid-community';
import { BsModalService } from 'ngx-bootstrap/modal';

export enum FilterType {
  contains = 'Contient',
  notContains = 'Ne contient pas',
  equals = 'égal à',
  notEqual = 'différent de',
  startsWidth = 'commence par',
  endsWith = 'se termine par',
  lessThan = 'plus pétit que',
  greaterThan = 'plus grand que',
  lessThanOrEqual = 'plus pétit ou égale à',
  greaterThanOrEqual = 'plus grand ou égale à',
  andCondition = 'Et',
  orCondition = 'Ou',
  inRange = 'dans l\'intervalle'
}


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, IFilterAngularComp {
  public filterTypes: string[] = Object.values(FilterType);
  public filterType = new FormControl(FilterType.contains);

  public columns: string[] = ['id', 'name', 'imageUrl', 'price', 'quantity', 'productCode', 'available', 'selected'];
  public columnValue: string = '';
  public optionValue: string = '';

  public subGroup: any[] = [];
  public rules: any[] = [];
  public subGroupLenght: number = this.subGroup.length;
  public rulesLenght: number = this.rules.length;
  public rulesCompt: number = 0;
  public subGroupCompt: number = 0;

  constructor(
    public modalService: BsModalService
  ) { }

  isFilterActive(): boolean {
    throw new Error('Method not implemented.');
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    throw new Error('Method not implemented.');
  }

  getModel() {
    throw new Error('Method not implemented.');
  }

  setModel(model: any): void | AgPromise<void> {
    throw new Error('Method not implemented.');
  }

  agInit(params: IFilterParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  public filter() { }

  public resetFilter() { }

  public close(): void {
    this.modalService.hide();
  }

  printcolumn(event: any) {
    console.log(this.columnValue);
  }

  printOption(event: any) {
    console.log(this.optionValue);
  }



  public addSubGroup() {
    this.subGroupCompt = this.subGroupCompt + 1;
    this.subGroupLenght = this.subGroupCompt;
    const subGroupDiv = document.getElementById('subGroupDiv');
    const div = document.createElement('div');
    div.id = 'subGroupDiv' + this.subGroupCompt;
    let id = 'subGroupDiv' + this.subGroupCompt;
    div.style.margin = '2px';

    //select AND/OR
    const selectField = document.createElement("select");

    //Option AND
    var AndOption = document.createElement("option");
    AndOption.value = 'AND';
    AndOption.text = 'ET';
    selectField.appendChild(AndOption);

    //Option OR
    var OrOption = document.createElement("option");
    OrOption.value = 'OR';
    OrOption.text = 'OU';
    selectField.appendChild(OrOption);

    //bouton d'ajout de sous-groupe
    const button1 = document.createElement("button");
    button1.classList.add("btn");
    button1.classList.add("btn-outline-primary");
    button1.classList.add("btn-sm");
    button1.style.marginLeft = '15px';
    const li1 = document.createElement("li");
    li1.classList.add("fa");
    li1.classList.add("fa-plus");
    const span1 = document.createElement("span");
    span1.textContent = 'sous-groupe';
    button1.appendChild(li1);
    button1.appendChild(span1);
    button1.onclick = () => this.addSubGroup();

    //bouton d'ajout de règle
    const button2 = document.createElement("button");
    button2.classList.add("btn");
    button2.classList.add("btn-outline-primary");
    button2.classList.add("btn-sm");
    button2.style.marginLeft = '15px';
    const li2 = document.createElement("li");
    li2.classList.add("fa");
    li2.classList.add("fa-plus");
    const span2 = document.createElement("span");
    span2.textContent = 'règle';
    button2.appendChild(li2);
    button2.appendChild(span2);
    button2.onclick = () => this.addRule();


    //bouton de suppression de sous-groupe
    const button3 = document.createElement("button");
    button3.classList.add("btn");
    button3.classList.add("btn-outline-danger");
    button3.classList.add("btn-sm");
    button3.style.marginLeft = '15px';
    const li3 = document.createElement("li");
    li3.classList.add("fa");
    li3.classList.add("fa-trash");
    button3.appendChild(li3);
    button3.onclick = () => this.deleteSubGroup(id);



    div.appendChild(selectField);
    div.appendChild(button1);
    div.appendChild(button2);
    div.appendChild(button3);
    subGroupDiv?.appendChild(div);

    console.log(id);


  }

  public addRule() {
    this.rulesCompt = this.rulesCompt + 1;
    this.rulesLenght = this.rulesCompt;

    const div = document.getElementById('formDiv');
    const subDiv = document.createElement('div');
    subDiv.style.display = 'flex';
    subDiv.style.justifyContent = 'space-between';
    subDiv.style.margin = '2px';

    subDiv.id = 'formDiv' + this.rulesCompt;
    let id = 'formDiv' + this.rulesCompt;

    const selectField = document.createElement('div');
    selectField.classList.add('form-group');

    var selectList = document.createElement("select");
    selectList.name = "colonne" + this.rulesCompt;
    selectList.classList.add('form-control');
    selectField?.appendChild(selectList);

    //Create and append the options
    this.columns.forEach(element => {
      var option = document.createElement("option");
      option.value = element;
      option.text = element;
      selectList.appendChild(option);
    });


    // div2

    const selectField1 = document.createElement('div');
    selectField1.classList.add('form-group');

    var selectList1 = document.createElement("select");
    selectList1.name = "filterType" + this.rulesCompt;
    selectList1.classList.add('form-control');
    selectField1?.appendChild(selectList1);

    //Create and append the options
    this.filterTypes.forEach(element => {
      var option = document.createElement("option");
      option.value = element;
      option.text = element;
      selectList1.appendChild(option);
    });

    //div3
    const inputField = document.createElement('div');
    inputField.classList.add('form-group');

    const input = document.createElement('input');
    input.classList.add('form-control');
    input.placeholder = 'Valeur...';
    input.name = 'valeur0';
    inputField.appendChild(input);

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





    subDiv?.appendChild(selectField);
    subDiv?.appendChild(selectField1);
    subDiv?.appendChild(inputField);
    subDiv?.appendChild(inputField1);
    div?.appendChild(subDiv);

    console.log(id);

  }

  public deleteRule(id: string) {
    const subDiv = document.getElementById(id);
    subDiv?.parentElement?.removeChild(subDiv);
  }

  public deleteSubGroup(id: string) {
    const subGroup = document.getElementById(id);
    subGroup?.parentElement?.removeChild(subGroup);
  }
}
