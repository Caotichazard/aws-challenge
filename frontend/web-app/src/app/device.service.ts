import { Injectable } from '@angular/core';
import { Device } from './device';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
//serviço injetável para usar de interface com a api de dispositivos

@Injectable({
  providedIn: 'root'
})


export class DeviceService {
  private devicesUrl = 'http://localhost:3000/devices';//url para obter as dispositivos
  
  //Construtor, recebe tanto o cliente para realizar as operações com a API quanto o Serviço de Mensagens
  constructor(private http: HttpClient,private messageService: MessageService) { }

  //headers para poder realizar a operação de adicionar uma dispositivo
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  //usando o serviço de mensagens adiciona uma mensagem desejada
  private log(message: string) {
    this.messageService.add(`DeviceServices: ${message}`);
  }

  //obtem todas as dispositivos da API
  //Observable configura ele como uma operação assincrona, nesse caso ele envia a mensagem dizendo que está
  //recebendo as dispositivos e envia o pedido para a api, isso imediatamente retorna um observable que, para ser usado
  //dever ser "subscribed", e quando o mesmo tiver o retorno da API, será atualizado.
  getDevices(): Observable<Device[]> {
    this.log("fetching devices")
    return this.http.get<Device[]>(this.devicesUrl);
  }

  //dado o ID de uma dispositivo, deleta a mesma
  //usando o url base, da um append para colocar como parametro o id da dispositivo
  deleteDevice(id:number): Observable<Device>{
    const url = `${this.devicesUrl}/${id}`;
    this.log("deleting device id:" + id );
    return this.http.delete<Device>(url);
  }

  //cria uma dispositivo nova
  addDevice(device:Device):Observable<Device>{
    this.log("adding device id:" + device.ID_Category);
    return this.http.post<Device>(this.devicesUrl, device, this.httpOptions)
  }


  
}
