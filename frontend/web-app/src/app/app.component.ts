import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-app';
  current = 'devices';

  change(){
    if(this.current === 'devices'){
      this.current = 'categories';
    }else if(this.current === 'categories'){
      this.current = 'devices';
    }else{
      this.current = 'devices';
    }
  }

}
