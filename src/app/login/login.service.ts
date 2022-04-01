import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 routes = {
    weatherApi: (long: number, lat: number, key: string) => `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${long}&aqi=no`
  }

  state: any;

  constructor(private api: HttpClient) { }
/**
 * Pobieranie lokalizacji od użytkownika
 * @returns strumień z informacją o lokalizaji lub błędem
 */
  getCurrentLocation(): Observable<GeolocationCoordinates> {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err),
        {timeout: 1000}
      );
    }).pipe(
      catchError((error) => {
      return throwError(() => new Error(this.showError(error)));
      })
    );
  }
  /**
   * Mapowanie kodów błędu na odpowiedni literał
   * @param error błąd lokalizacji
   * @returns treść błędu
   */
  private showError(error: GeolocationPositionError): string {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return "Użytkownik odrzucił prośbę o geolokalizację"
      case error.POSITION_UNAVAILABLE:
        return "Informacje o lokalizacji są niedostępne."
      case error.TIMEOUT:
        return "Przekroczono limit czasu żądania lokalizacji użytkownika."
        default:
        return 'Niepodziewany błąd'
    }
  }
  /**
   * Pobieranie pogody dla odpowiednich koordynatów
   * @param long długość geograficzna
   * @param lat szerokość geograficzna
   * @param key klucz WEATHER API
   * @returns strumień danych odpowiedzi z api
   */
  getWeather(long: number, lat: number, key: string) {
    return this.api.get<any>(this.routes.weatherApi(long, lat, key)
    );
  }
}
