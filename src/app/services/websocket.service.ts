import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario = null;
  constructor(
    private socket: Socket
  ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    })
    this.socket.on('disconnect', () => {
      console.log('desconectado del servidor');
      this.socketStatus = false;

    })
  }
  emit(evt: string, payload?: any, cb?: Function) {
    console.log('Emitiendo', evt);

    this.socket.emit(evt, payload, cb)
  }

  listen(evt: string) {
    return this.socket.fromEvent(evt);
  }
  getUSuario(){
    return this.usuario;
  }
  loginWS(nombre: string, sala?:string) {
    console.log('configurando', nombre, sala)
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre, sala }, res => {
        this.usuario = new Usuario(nombre, sala);
        this.guardarStorage();
        resolve()
      })
    })


  }
  guardarStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }
  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse( localStorage.getItem('usuario'))
      this.loginWS(this.usuario.nombre)
    }
  }
}