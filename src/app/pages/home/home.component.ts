import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/core/models/weather';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 /** Przekazane dane z api */
  state: Weather;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.state = this.api.state;
  }

}
