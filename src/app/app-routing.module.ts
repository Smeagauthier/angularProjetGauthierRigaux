import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EtapesComponent} from './components/etapes/etapes.component';
import {VillesComponent} from './components/villes/villes.component';
import {HomeComponent} from './components/home/home.component';
import {ExercicesComponent} from "./components/exercices/exercices.component";
import {NewvilleComponent} from "./components/newville/newville.component";
import {EditvilleComponent} from "./components/editville/editville.component";
import {ExamenComponent} from "./components/examen/examen.component";
const routes: Routes = [
  {path: 'villes', component: VillesComponent},
  {path: 'etapes', component: EtapesComponent},
  {path : "exercices", component : ExercicesComponent},
  {path: '', component: HomeComponent},
  {path: 'newVille', component: NewvilleComponent},
  {path: 'editVille/:idville', component: EditvilleComponent},
  {path : 'examen', component: ExamenComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
