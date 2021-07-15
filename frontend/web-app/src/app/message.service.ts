import { Injectable } from '@angular/core';
//Serviço injetavel para enviar mensagens para o usuário
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  //adiciona uma mensagem para a lista de mensagens
  add(message: string) {
    this.messages.push(message);
  }

  //limpa a lista de mensagens
  clear() {
    this.messages = [];
  }
}