import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Trade} from "../../../core/models/trade";
import {MatSidenav} from "@angular/material/sidenav";
import {ModelService} from "../../services/model.service";
import firebase from "firebase";
import {NotificationService} from "../../../services/notification/notification.service";
import firestore = firebase.firestore;

interface Dimension {
  value: string;
  viewValue: string;
  valueList?: Array<string>
  type?: string;
}

interface DimensionGroup {
  disabled?: boolean;
  name: string;
  properties: Dimension[];
}

type strOperation = '<' | '==' | '>' | 'includes'

export interface Filter {
  property?: string
  strOperation?: strOperation
  value: any
  viewValue?: string
  includes: boolean
  valueList?: Array<string>
}

@Component({
  selector: 'app-filter-builder',
  templateUrl: './filter-builder.component.html',
  styleUrls: ['./filter-builder.component.sass']
})
export class FilterBuilderComponent implements OnInit {

  @Input() modelId: string
  @Input('sidenav') sidenav: MatSidenav

  values = {
    boolean: [
      {viewName: 'True', value: true},
      {viewName: 'False', value: false},
      {viewName: 'Undefined', value: undefined},
    ],
  }
  strOperations = {
    number: [
      {viewName: 'Less than', value: '<'},
      {viewName: 'Equal to', value: '=='},
      {viewName: 'Greater than', value: '>'},
    ],
    boolean: [
      {viewName: 'Equal to', value: '=='},
      {viewName: 'Different than', value: '!='},
    ],
    string: [
      {viewName: 'Contains', value: 'contains'},
      {viewName: 'Starts With', value: 'startsWith'},
    ]
  }
  selectedDimension = {type: '', viewName: '', value: ''}
  selectedDimensionValues = []

  filterForm = new FormGroup({
    include: new FormControl(false),
    property: new FormControl(''),
    strOperation: new FormControl(''),
    value: new FormControl(),
  })

  dimensionGroups: DimensionGroup[] = [
    {
      name: 'Trade',
      properties: [
        {value: 'symbol', viewValue: 'Symbol', type: 'string'},
        {value: 'type', viewValue: 'Type', valueList: ["BUY", "SELL"]},
        {value: 'timeframe', viewValue: 'Timeframe', valueList: ["M15", "H1", "H4", "D1"]},
        {value: 'outcome', viewValue: 'Outcome', valueList: ["WIN", "LOSS"]},
        {value: 'quantity', viewValue: 'Quantity', type: 'number'},
        {value: 'profit', viewValue: 'Profit', type: 'number'},
        {value: 'valid', viewValue: 'Valid', type: 'boolean', valueList: ["true", "false"]},
      ]
    },
    {
      name: 'Custom',
      properties: []
    },
    {
      name: 'filterTags',
      disabled: false,
      properties: []
    },
  ];

  constructor(
    private modelService: ModelService,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
  }

  add(): void {
    // Add our tag
    const filterForm = this.filterForm.value
    const newFilter = {
      includes: true,
      property: filterForm.property.value,
      strOperation: filterForm.strOperation,
      value: filterForm.value[0]
    }

    this.modelService.updateModel(this.modelId, {
      filters: firestore.FieldValue.arrayUnion(newFilter)
    }).then(() => this.notification.success('Added filter'))
      .catch(err => this.notification.error(err))
  }
}
