import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../Services/menu.service';
// import { MenuService } from '@core/Services/menu.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'hl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isMenuActive: boolean;
  subscription: Subscription;
  
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.subscription = this.menuService.menuSubj.subscribe(status => {
      this.isMenuActive = status;
    })
  }

}
