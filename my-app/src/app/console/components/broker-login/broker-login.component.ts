import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-broker-login',
  templateUrl: './broker-login.component.html',
  styleUrls: ['./broker-login.component.sass']
})
export class BrokerLoginComponent implements OnInit {

  brokers = ['XTB', 'Interactive Brokers']
  loginForm = new FormGroup({
    broker: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  login() {
    // return this.http.get(`${this.BASE_URL}/fx/latest?symbols=${symbolsJoin}&token=${this.IEX_API_TOKEN}`) as Observable<LatestRate[]>
  }

}
