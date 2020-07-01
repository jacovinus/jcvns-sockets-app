import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: string = '';
  constructor(
    public webSocketService : WebsocketService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }
  ingresar() {
    console.log(this.nombre)

    this.webSocketService.loginWS(this.nombre);
    this.webSocketService.loginWS(this.nombre).then(
      ()=> {
        this.router.navigateByUrl('/mensajes');
      }
    )
  }
}
