import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { Modal } from '../../models/modal.model';
import { ModalService } from '../../services/modal.service';
import { Location } from '@angular/common';
@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    private modalService: ModalService;

    public isCollapsed = true;
    @ViewChild('navbar-cmp') button;


    constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        let navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }

    /**
     * 取得頁面標題
     *
     * @returns
     * @memberof NavbarComponent
     */
    getTitle() {
      let titlee = this.location.prepareExternalUrl(this.location.path());
      if (titlee.charAt(0) === '#') {
          titlee = titlee.slice( 1 );
      }
      for (let item = 0; item < this.listTitles.length; item++) {
          if (this.listTitles[item].path === titlee) {
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    /**
     * 取得登入者基本資料
     *
     * @returns
     * @memberof NavbarComponent
     */
    getInfo() {
      if (localStorage.getItem(`${environment.auth}`) === '9') {
        return localStorage.getItem(`${environment.keyOfTeacherName}`);
      } else if (localStorage.getItem(`${environment.auth}`) === '1') {
        return localStorage.getItem(`${environment.keyOfStudentId}`) + localStorage.getItem(`${environment.keyOfStudentName}`);
      }
    }

    /**
     * 會員登出
     *
     * @memberof NavbarComponent
     */
    logout() {

      if (localStorage.getItem(`${environment.auth}`) === '9') {
        localStorage.removeItem(`${environment.keyOfTeacherName}`);
      } else if (localStorage.getItem(`${environment.auth}`) === '1') {
        localStorage.removeItem(`${environment.keyOfStudentId}`);
        localStorage.removeItem(`${environment.keyOfStudentName}`);
      }
      localStorage.removeItem(`${environment.keyOfToken}`);
      localStorage.removeItem(`${environment.auth}`);

      // 跳轉首頁
      this.router.navigate(['login']);
    }




    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
        setTimeout(function() {
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');
        if (window.innerWidth < 991) {
          mainPanel.style.position = 'fixed';
        }
        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
        if (window.innerWidth < 991) {
          setTimeout(function() {
            // FIXME mainPanel在教師端剛登入時會變成undefined
            console.log(mainPanel);
            mainPanel.style.position = '';
          }, 500);
        }
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    collapse() {
      this.isCollapsed = !this.isCollapsed;
      const navbar = document.getElementsByTagName('nav')[0];
      console.log(navbar);
      if (!this.isCollapsed) {
        navbar.classList.remove('navbar-transparent');
        navbar.classList.add('bg-white');
      } else {
        navbar.classList.add('navbar-transparent');
        navbar.classList.remove('bg-white');
      }

    }

}
