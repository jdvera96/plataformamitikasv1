import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent implements OnInit {
  show: boolean = false;
  ngOnInit(): void {

    var login=localStorage.getItem('login-mitikas');
    if(login!=null){
      this.show=true;
    }
  }
  //show: boolean = false;
  
}
