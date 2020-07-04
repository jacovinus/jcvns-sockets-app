import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }
  sendMessage( mensaje: string, user: string){
    const payload = {
      de: user,
      cuerpo: mensaje
    }
    this.wsService.emit('mensaje', payload );
  }
  getMessages():Observable<any>{
   return this.wsService.listen('mensaje-nuevo');
  }
  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }
  emitirUsuariosActivos(){
    this.wsService.emit('obtener-usuarios');
  }
}
