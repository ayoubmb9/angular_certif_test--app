import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SentimentInt {
    data: [{
      change: number;
      month: number;
      mspr: number;
      symbol: string;
      year: number;
    }];
    symbol:string;
    
  }
export interface StockInfo{
  c:number;
  d:number;
  dp:number;
  h:number;
  l:number;
  o:number;
  pc:number;

}
export interface StockDescription{
  count:number;
  result:[{
    description:string;
    displaySymbol:string;
    symbol:string;
    type:string;
  }];
  
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  baseUrl!: string;
  constructor(private readonly http: HttpClient) { }

  getStock(id: string): Observable<StockInfo> {
    return this.http.get<StockInfo>("https://finnhub.io/api/v1/quote?symbol="+id+"&token=bu4f8kn48v6uehqi3cqg")
    .pipe(map(res =>{
      return res
     } ))
  }
  getStockComp(id: string): Observable<StockDescription> {
    return this.http.get<StockDescription>("https://finnhub.io/api/v1/search?q="+id+"&token=bu4f8kn48v6uehqi3cqg")
    .pipe(map(res =>{
      return res
     } ))
  }

  last = formatDate(new Date(new Date().getFullYear(), 11, 31), 'YYYY-MM-dd','en-US');
  first = formatDate(new Date(new Date().getFullYear(), 0, 2), 'YYYY-MM-dd','en-US'); // new Date().getFullYear(), 0, 1) gives 2021-01-01
  getSentiment(id: string): Observable<SentimentInt> {
    return  this.http.get<SentimentInt>("https://finnhub.io/api/v1/stock/insider-sentiment?symbol="+id+"&from="+this.first+"&to="+this.last+"&token=bu4f8kn48v6uehqi3cqg")
    .pipe(map(res =>{
       return res
      } ))
    
  }
}
