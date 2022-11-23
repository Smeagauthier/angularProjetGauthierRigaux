import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EtapesComponent} from './components/etapes/etapes.component';
import {VillesComponent} from './components/villes/villes.component';
import {HomeComponent} from './components/home/home.component';
import {ExercicesComponent} from "./components/exercices/exercices.component";
const routes: Routes = [
  {path: 'villes', component: VillesComponent},
  {path: 'etapes', component: EtapesComponent},
  {path : "exercices", component : ExercicesComponent},
  {path: '', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
