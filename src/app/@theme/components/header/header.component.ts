import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  buttonSessionTxt:String;
  show: boolean = false;
  

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'corporate';

  userMenu = [ { title: 'Profile' }, { title: 'Cerrar Sesion' } ];

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }



  ngOnInit() {    
    
    var login=localStorage.getItem('login-mitikas');
    console.log(login);

    if(login!=null){
      this.show=true;
      let array=login.split('-');
      this.user={
        'name' : array[1],
        'picture':"assets/images/alan.png"
      };
      this.buttonSessionTxt = "Cerrar Sesión";
    }else{
      this.user={
        'name' : "",
        'picture':"assets/images/Profile.png"
      };
      
      this.buttonSessionTxt = "Iniciar Sesión";
    }

    this.currentTheme = this.themeService.currentTheme;
    console.log(this.userService.getUsers());
      console.log(this.user);
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigateByUrl("./");
    return false;
  }

  cerrarSesion(){
    var login=localStorage.getItem('login-mitikas');
    if(login!=null){
      localStorage.removeItem('login-mitikas');
      location.href="http://localhost:4200/";
    }else{
      this.router.navigateByUrl("./");
    }
  }
}
