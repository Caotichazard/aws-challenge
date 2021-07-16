import { Component, OnInit } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../device.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  //Controlador para validação de dados ao adicionar um dispositivo
  deviceForm = new FormGroup({
    color: new FormControl(''),
    partNumber: new FormControl(''),
    ID_Category : new FormControl('')
  });


  device : Device = {
    ID_Category : -1,
    ID_Device : -1,
    color : "",
    partNumber : -1
  }
  devices : Device[] = [];
  categories : Category[] = [];

  //Contrutor injetando o serviço das categorias
  constructor(private deviceService :DeviceService,private categoryService :CategoryService) { }
  
  //quando o componente estiver pronto, utiliza a função getDevices para obter a lista de categorias
  ngOnInit(): void {
    this.getDevices();
    this.getCategories();
    this.deviceForm = new FormGroup({
      color: new FormControl(null, [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern('^[a-zA-Z]*$') // <-- Here's how you pass in the custom validator.
      ]),
      partNumber : new FormControl(null,[
        Validators.required,
        
        Validators.pattern('^[0-9]*$') // <-- Here's how you pass in the custom validator.
      ]),
      ID_Category : new FormControl(null,[ Validators.required ])
      
    });
  }

  //Getters para atributos do Form
  get color() { return this.deviceForm.get('color'); }

  get partNumber() { return this.deviceForm.get('partNumber'); }
  get ID_Category() { return this.deviceForm.get('ID_Category'); }


  //Função auxiliar para substituit o id da categoria pelo nome da mesma na tabela
  categoryName(catId : number) : string{
    var catName = '';
    this.categories.forEach((element) => {
      if (element.ID_Category === catId) {
        catName = element.name;
      }
    })
    return catName;
  }

  //Com o formulario preenchido, adiciona o elemento novo a DB
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.deviceForm.value);
    var color = String(this.deviceForm.value.color).trim();
    var ID_Category : number = Number(this.deviceForm.value.ID_Category)
    var partNumber : number = Number(this.deviceForm.value.partNumber)
    if (!color || !ID_Category || !partNumber) { return; }
    this.deviceService.addDevice({ ID_Category,color,partNumber } as Device)
      .subscribe();

      this.getDevices();
  }

  //Obtem todas as categorias presentes na DB
  // Usando o serviço, utiliza a função getDevices que então retorna um objeto observable, este deve então
  // ser inscrito para poder receber sua alteração e atualizar a pagina com as informações.
  getDevices(){
    return this.deviceService.getDevices().subscribe(devices => this.devices = devices);
  }

  getCategories(){
    return this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  //Deleta uma categoria escolhida
  // Ao ser pressionado o botão de uma categoria para deletala, seleciona ela, obtem ela, remove ela do array atual
  // de categorias e então utiliza o serviço para remover ela na DB.
  delete(device : Device){
    //this.devices = this.devices.filter(c => c !== device);
    console.log(this.deviceService.deleteDevice(device.ID_Device).subscribe());
    this.getDevices();
  }


  //Adiciona uma categoria
  // Preenchendo o form, ao envialo, caso haja nome, utiliza o serviço para adicionar uma categoria nova e então
  // atualiza a lista de categorias novamente.
  add(id: string, color: string, partNum : string): void {
    color = color.trim();
    var ID_Category : number = +id
    var partNumber : number = +partNum
    if (!color || !ID_Category || !partNumber) { return; }
    this.deviceService.addDevice({ ID_Category,color,partNumber } as Device)
      .subscribe();

      this.getDevices();
  }

}
