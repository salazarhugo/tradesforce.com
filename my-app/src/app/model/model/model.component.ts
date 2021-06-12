import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModelService} from "../services/model.service";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.sass']
})
export class ModelComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data)
      this.modelService.setModel(data.model)
    })
  }

}
