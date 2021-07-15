import { Injectable } from '@angular/core';
import { Category } from './category';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
//serviço injetável para usar de interface com a api de categorias

@Injectable({
  providedIn: 'root'
})


export class CategoryService {
  private categoriesUrl = 'http://localhost:3000/categories';//url para obter as categorias
  
  //Construtor, recebe tanto o cliente para realizar as operações com a API quanto o Serviço de Mensagens
  constructor(private http: HttpClient,private messageService: MessageService) { }

  //headers para poder realizar a operação de adicionar uma categoria
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  //usando o serviço de mensagens adiciona uma mensagem desejada
  private log(message: string) {
    this.messageService.add(`CategoryServices: ${message}`);
  }

  //obtem todas as categorias da API
  //Observable configura ele como uma operação assincrona, nesse caso ele envia a mensagem dizendo que está
  //recebendo as categorias e envia o pedido para a api, isso imediatamente retorna um observable que, para ser usado
  //dever ser "subscribed", e quando o mesmo tiver o retorno da API, será atualizado.
  getCategories(): Observable<Category[]> {
    this.log("fetching categories")
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  //dado o ID de uma categoria, deleta a mesma
  //usando o url base, da um append para colocar como parametro o id da categoria
  deleteCategory(id:number): Observable<Category>{
    const url = `${this.categoriesUrl}/${id}`;
    this.log("deleting category " + id );
    return this.http.delete<Category>(url);
  }

  //cria uma categoria nova
  addCategory(category:Category):Observable<Category>{
    this.log("adding category " + category.name);
    return this.http.post<Category>(this.categoriesUrl, category, this.httpOptions)
  }


  
}
