import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
  categories : Category[] = [];

  categoryForm = new FormGroup({
    name: new FormControl('',),
  })

  //Contrutor injetando o serviço das categorias
  constructor(private categoryService :CategoryService) { }
  
  //quando o componente estiver pronto, utiliza a função getCategories para obter a lista de categorias
  ngOnInit(): void {
    this.getCategories();
    this.categoryForm = new FormGroup({
      name : new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(128),
          
        ]
      )
    })
  }

  get name() { return this.categoryForm.get('name');}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.categoryForm.value);
    var name = this.categoryForm.value.name;
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category)
      .subscribe();

      this.getCategories();
  }

  //Obtem todas as categorias presentes na DB
  // Usando o serviço, utiliza a função getCategories que então retorna um objeto observable, este deve então
  // ser inscrito para poder receber sua alteração e atualizar a pagina com as informações.
  getCategories(){
    return this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  //Deleta uma categoria escolhida
  // Ao ser pressionado o botão de uma categoria para deletala, seleciona ela, obtem ela, remove ela do array atual
  // de categorias e então utiliza o serviço para remover ela na DB.
  delete(category : Category){
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category.ID_Category).subscribe();
  }


  //Adiciona uma categoria
  // Preenchendo o form, ao envialo, caso haja nome, utiliza o serviço para adicionar uma categoria nova e então
  // atualiza a lista de categorias novamente.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoryService.addCategory({ name } as Category)
      .subscribe();

      this.getCategories();
  }

  

}
