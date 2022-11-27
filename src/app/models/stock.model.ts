export class Stock{
    symbol!: string;
    description!: string;
    change!: number;
    opPrice!: number;
    currPrice!: number;
    highPrice!: number;
}
  
export class Sentiment{
  symbol!: string;
  month!: number;
  change!: number;
  mspr!: number;
}