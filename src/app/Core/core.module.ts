
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Import Font Awesome Module. 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    HeaderComponent,
    MenuComponent
} from './Components';

@NgModule({
    declarations: [
        HeaderComponent,
        MenuComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        HeaderComponent,
        MenuComponent
    ]
})
export class CoreModule { }