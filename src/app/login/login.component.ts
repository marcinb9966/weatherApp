import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { LoginService } from './login.service';
/**
 * Komponent Logowania przy pomocy WEATHER API KEY
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /** Flaga informująca o wyświetlaniu pop-up z błedem */
  show = false;
  /** Szerokość geograficzna */
  latitude: number;
  /** Długość geograficzna */
  longitude: number;
  /** Formularz weather */
  weatherApiForm: FormGroup;
  /** Komunikat błedu */
  errorMsg: string;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.getCurrentLocation()
      .pipe(
        tap((coords) => {
          this.latitude = coords.latitude
          this.longitude = coords.longitude
        })).subscribe({
          next: () => { },
          error: (err) => this.errorMsg = err.message,
        })
    this.weatherApiForm = this.fb.group({
      apiKey: ['', Validators.required]
    })
  }
  /**
   *  Walidacja formularza
   */
  sumbitWeatherKey(): void {
    if (this.weatherApiForm.dirty && this.weatherApiForm.valid && this.weatherApiForm.value.apiKey && this.longitude && this.latitude) {
      this.loginService.getWeather(this.longitude, this.latitude, this.weatherApiForm.value.apiKey).pipe(
        catchError((err) => {
          if (err.status === 401) {
            return throwError(() => new Error('Niepoprawny API KEY'));
          }
          return throwError(() => new Error('Niespodziewany błąd'));
        })
      ).subscribe({
        next: (e) => this.loginService.state = e,
        error: (e) => {
          this.errorMsg = e.message
          this.show = true;
        },
        complete: () => this.router.navigate(['/home'])
      })
    } else {
      this.show = true;
    }
  }
}
