import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/core/models/weather';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 /** Przekazane dane z api */
  state: Weather;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.state = this.loginService.state;
  }

}
