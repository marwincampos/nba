import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { CalendarioApiService } from './servicios/calendarioApi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  user: SocialUser;
  fecha: string;
  juegos:any;
  detalleJuego:any;
  showDetalles:boolean = false;
  showJuegos:boolean = true;
  isLogged:boolean = false;

  constructor(
    private servicioCalendario: CalendarioApiService, 
    private authService: AuthService
  ){

  }

  ngOnInit() {
    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(
      socialUser => { // Success
        this.user = socialUser;
        console.log(this.user);
        this.isLogged = true;
        this.fecha = this.getToday();
        console.log(this.fecha);
        
        this.mostrarJuegos();
      }
    ).catch(error => console.log(error));
  }
  
  logout(): void {
    this.authService.signOut();
    this.juegos = '';
    this.fecha = '';
    this.isLogged = false;

  }

  mostrarJuegos(){
    console.log(this.fecha);
    this.formatDate();
    console.log(this.fecha);
    
    this.servicioCalendario.getJuegos(this.fecha.replace(/-/g, '')).subscribe(data => {
      console.log(data);
      this.juegos = data
    });
  }
  
  mostrarDetalleJuego(juego){
    this.detalleJuego = juego;
    this.showDetalles = true;
    this.showJuegos = false;
  }

  ocultarDetalleJuego(){
    this.showDetalles = false;
    this.showJuegos = true;
  }

  getToday(){
    let today:any = new Date();
    let dd:any = today.getDate();
    
    let mm:any = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10){
        dd = '0' + dd;
    } 
    
    if(mm<10){
        mm = '0' + mm;
    } 
    // today = dd+'/'+mm+'/'+yyyy;
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  formatDate(){
    let fechaArray = this.fecha.split("-");
    console.log(fechaArray);
    if(Number(fechaArray[1]) > 12){
      this.fecha = fechaArray[0] + '-' + fechaArray[2] + '-' + fechaArray[1];
    }
  }
}
