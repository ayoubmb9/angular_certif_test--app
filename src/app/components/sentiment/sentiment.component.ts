import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StocksService } from 'src/app/services/stocks.service';

export interface Sentiments {
  change: number;
  month: number;
  mspr: number;
  symbol: string;
  year: number;
}

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})


export class SentimentComponent {
  monthsToDisplay = [(new Date(). getMonth() - 2),  (new Date(). getMonth() - 1),  (new Date(). getMonth())];
  sentiments!: Sentiments[];
  id = "";
  title = "";
  constructor(private router: Router,
    private route: ActivatedRoute,
    public readonly stockService : StocksService){}
  
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.stockService.getStockComp(this.id).subscribe({
      next: (data) => {
        this.title = data.result[0].description;
        this.stockService.getSentiment(this.id).subscribe({
          next: (data) => {
            this.sentiments = data.data;
            this.filterSentiment();
            
          }})
      }})
  }


  filterSentiment() {
    this.sentiments = this.sentiments.filter( x => this.monthsToDisplay.indexOf(x.month)  > -1);
  }

  goBack(){
    this.router.navigate(['']);
  }


  
}
