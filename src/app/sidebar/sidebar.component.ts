import {Component, OnInit} from '@angular/core';
import {RouteInfo} from '../models/sidebar.model';

export let ROUTES: RouteInfo[];

// FIXME 第一次登入的時候localStorage好像還沒載完這邊就執行完了
if (localStorage.getItem('auth') === '9') {
  ROUTES = [
    {path: '/dashboard', title: '主頁', icon: 'fa fa-bank', class: ''},
    {path: '/openExam', title: '開啟考場', icon: 'fa fa-user-circle', class: ''},
    {path: '/teacherExamScreen', title: '教師端監考畫面', icon: 'fa fa-eye', class: ''},

  ];
} else if (localStorage.getItem('auth') === '1') {
  ROUTES = [
    {path: '/dashboard', title: '主頁', icon: 'fa fa-bank', class: ''},
    {path: '/enterExam', title: '進入考場', icon: 'fa fa-sign-in', class: ''},
    {path: '/studentExamScreen', title: '學生端監考畫面', icon: 'fa fa-eye', class: ''},
  ];
}
// else {
//   ROUTES = [
//     {path: '/dashboard', title: '如果你看到我代表順序錯了', icon: 'fa fa-bank', class: ''},
//   ];
// }


@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public isCollapsed = false;
  public menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
