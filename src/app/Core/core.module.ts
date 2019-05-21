
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Import Font Awesome Module. 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    HeaderComponent
} from './Components';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule { }