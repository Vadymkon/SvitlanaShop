import { Component } from '@angular/core';
import {lang} from "../../data/lang";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   lang = lang;
}
