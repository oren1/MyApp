export class Coin {
    id: string
    symbol: string
    coinName: string 
    imageUrl: string

     constructor(id: string, symbol: string, coinName: string, imageUrl: string) {
         this.id = id
         this.coinName = coinName
         this.symbol = symbol
         this.imageUrl = imageUrl
     }
}
export class Point {
    x: string
    y: string

    constructor(x: string, y: string) {
        this.x = x
        this.y = y
    }

    
    static ParsePoint(point: Dictionary){
        return new Point(point.start, point.close)
    }
    // get x(){
    //     return this._x;
    // }

    // set x(val:any){
    //     this._x = val;
    // }
}

export interface Dictionary {
    [index: string]: string
    coinName: string
  }

export interface CoinObject {
    [index: string]: Dictionary
}



export type Nullable<Type> = Type | null
export type GetHistoryCallback = (points: Nullable<Point[]>, error: Nullable<Error>) => void

