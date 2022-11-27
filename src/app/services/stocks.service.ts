import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  baseUrl!: string;
  constructor(private readonly http: HttpClient) { }

  getStock(id: string): Observable<any> {
    return this.http.get("https://finnhub.io/api/v1/quote?symbol="+id+"&token=bu4f8kn48v6uehqi3cqg")
  }
  getStockComp(id: string): Observable<any> {
    return this.http.get("https://finnhub.io/api/v1/search?q="+id+"&token=bu4f8kn48v6uehqi3cqg")
  }

  last = formatDate(new Date(new Date().getFullYear(), 11, 31), 'YYYY-MM-dd','en-US');
  first = formatDate(new Date(new Date().getFullYear(), 0, 2), 'YYYY-MM-dd','en-US'); // new Date().getFullYear(), 0, 1) gives 2021-01-01
  getSentiment(id: string): Observable<any> {
    return this.http.get("https://finnhub.io/api/v1/stock/insider-sentiment?symbol="+id+"&from="+this.first+"&to="+this.last+"&token=bu4f8kn48v6uehqi3cqg")
  }
}
