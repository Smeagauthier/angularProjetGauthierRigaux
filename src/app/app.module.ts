import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VillesComponent} from './components/villes/villes.component';
import {EtapesComponent} from './components/etapes/etapes.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {HomeComponent} from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ExercicesComponent } from './components/exercices/exercices.component';

@NgModule({
  declarations: [
    AppComponent,
    VillesComponent,
    EtapesComponent,
    MainMenuComponent,
    HomeComponent,
    ExercicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
