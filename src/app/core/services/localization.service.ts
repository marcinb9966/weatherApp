import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor() { }

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
}
