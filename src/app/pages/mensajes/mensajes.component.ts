import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
public usuario: string =''
  constructor(
    public wsService : WebsocketService
  ) { }
salir(){
  this.wsService.logoutWS();
}
  ngOnInit(): void {
    this.usuario = this.wsService.usuario.nombre
  }

}
