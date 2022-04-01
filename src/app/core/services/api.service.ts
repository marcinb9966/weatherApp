import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  routes = {
    weatherApi: (long: number, lat: number, key: string) => `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`
  }

  /** Przekazane dane z api */
  state: Weather;

  constructor(private api: HttpClient) { }

  /**
 * Pobieranie pogody dla odpowiednich koordynatów
 * @param long długość geograficzna
 * @param lat szerokość geograficzna
 * @param key klucz WEATHER API
 * @returns strumień danych odpowiedzi z api
 */
  getWeather(long: number, lat: number, key: string): Observable<Weather> {
    return this.api.get<Weather>(this.routes.weatherApi(long, lat, key)
    );
  }
}
