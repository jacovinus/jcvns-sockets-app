import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto: string = ''
  mensajesSubscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;
@Input() user;
  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-messages')
    this.mensajesSubscription = this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg)
      console.log(msg)
      setTimeout(()=> {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50)
    })
  }
  enviar() {
    if( this.texto.trim().length === 0){
      return;
    }
    console.log(this.texto);
    this.chatService.sendMessage(this.texto, this.user)
    this.texto = ''
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }
}
