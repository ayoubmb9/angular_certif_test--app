import { Component, Input, SimpleChanges } from '@angular/core';
import { Stock } from 'src/app/models/stock.model';
import { StocksService } from '../../services/stocks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-input',
  templateUrl: './stock-input.component.html',
  styleUrls: ['./stock-input.component.css']
})
export class StockInputComponent {
  stocks: Array<Stock> = [];
  stockList: Array<string> = []; //Stock symbols only
  value = '';
  storedNames='';
  constructor(private router: Router, public readonly stockService: StocksService) { }

  ngOnInit(){
    this.stockList =  JSON.parse(localStorage.getItem("stockList")!);
    if(this.stockList){
      this.stockList.forEach((element) => this.getStock(element));
    } 
    
  }


  goStock(stock: string) {
    this.stockList = this.stockList || [];
    this.stockList.push(stock);
    localStorage.setItem("stockList", JSON.stringify(this.stockList));
    this.getStock(stock);
    this.value = '';
  }

  getStock(stock: string){
    let stockObj = new Stock;
    this.stockService.getStockComp(stock).subscribe({
      next: (data) => {
        stockObj.description = data.result[0].description;
        this.stockService.getStock(stock).subscribe({
          next: (data) => {
            stockObj.symbol = stock;
            stockObj.change = data.d;
            stockObj.opPrice = data.o;
            stockObj.currPrice = data.c;
            stockObj.highPrice = data.h;
            this.stocks.push(stockObj);
          }
        });
      }
    });

  }
  onDeleteStock(stock: Stock) {
    this.stockList = this.stockList.filter(item => item !== stock.symbol);
    localStorage.setItem("stockList", JSON.stringify(this.stockList));
    this.stocks = this.stocks.filter(item => item !== stock);
  }

  onViewStock(id: string) {
    this.router.navigate(['/sentiment', id]);
  }
}
