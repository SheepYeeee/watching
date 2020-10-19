import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '../models/sidebar.model';

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: '主頁', icon: 'nc-bank', class: ''},
    // { path: '/user', title: '個人資料', icon: 'nc-badge', class: ''},
    { path: '/openExam', title: '開啟考場', icon: 'nc-hat-3', class: '' },
    { path: '/enterExam', title: '進入考場', icon: 'nc-user-run', class: '' },
    { path: '/studentExamScreen', title: '學生端監考畫面', icon: 'nc-camera-compact', class: '' },
    { path: '/teacherExamScreen', title: '教師端監考畫面', icon: 'nc-camera-compact', class: '' },
    // { path: '/studentRecord', title: '學生考試紀錄', icon: 'nc-paper', class: '' },
    // { path: '/teacherRecord', title: '老師考試紀錄', icon: 'nc-paper', class: '' },

];

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
