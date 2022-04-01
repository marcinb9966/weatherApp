import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state: any;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.state = this.loginService.state;
  }

}
