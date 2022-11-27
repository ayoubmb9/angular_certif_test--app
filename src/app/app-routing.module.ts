import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockInputComponent } from './components/stock-input/stock-input.component';

const routes: Routes = [
  { path: '', redirectTo: 'stockInput', pathMatch: 'full' },
  { path: 'stockInput', component: StockInputComponent,},
  { path: 'sentiment/:id', component: SentimentComponent,},
  {path: '**',redirectTo: 'stockInput'},
]
//lazy loading ()|| standalone component

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
