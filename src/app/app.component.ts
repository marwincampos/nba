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
  juegos:any;
  detalleJuego:any;
  showDetalles:boolean = false;
  showJuegos:boolean = true;
  isLogged:boolean = false;
  dia:string = '';
  mes:string = '';
  anio:string = '';

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
        this.getToday();
        this.mostrarJuegos();
      }
    ).catch(error => console.log(error));
  }
  
  logout(): void {
    this.authService.signOut();
    this.juegos = '';
    this.isLogged = false;

  }

  mostrarJuegos(){
    console.log('Fecha a buscar:');
    console.log(this.anio + '' + this.mes + '' + this.dia);
    
    this.servicioCalendario.getJuegos(this.anio + '' + this.mes + '' + this.dia).subscribe(data => {
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
    
    this.dia = dd;
    this.mes = mm;
    this.anio = yyyy;
  }
}
