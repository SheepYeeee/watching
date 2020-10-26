import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-enterexam',
    styleUrls: ['index.component.css'],
    templateUrl: 'index.component.html'
})

export class IndexComponent implements OnInit {

  constructor(
  ) { }

  public page: string;
  public path: string;

  ngOnInit() {
    if(localStorage.getItem('auth')=='9'){
      this.page = '開啟考場';
      this.path = '/openExam';
    }else if(localStorage.getItem('auth')=='1'){
      this.page = '進入考場';
      this.path = '/enterExam';
    }
  }

}
