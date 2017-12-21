import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs/rxjs';

@Injectable()
export class CalendarioApiService{
    
    constructor(private http: Http){}

    getJuegos(fecha:string): Observable<any[]>{
        return this.http.get(this.getUrl(fecha)).map(this.getDatos).catch(this.error);
    }

    private error(error: any){
        console.log(error);
        let msg = (error.message) ? error.message : 'Error desconocido';
        console.error(msg);
        return Observable.throw(msg);
    }

    private getDatos(data: Response){
        let datos = data.json();
        return datos || [];
    }

    private getUrl(fecha: string){
      return 'https://data.nba.net/10s/prod/v1/' + fecha + '/scoreboard.json';
    }

}