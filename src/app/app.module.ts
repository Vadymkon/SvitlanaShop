import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SmtpformComponent } from './components/smtpform/smtpform.component';
import { TextboxComponent } from "./components/textbox/textbox.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        BodyComponent,
        GalleryComponent,
        SmtpformComponent,
        TextboxComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
