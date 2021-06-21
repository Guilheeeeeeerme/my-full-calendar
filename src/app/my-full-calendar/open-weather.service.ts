import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OPENWEATHER_API, OPENWEATHER_TOKEN } from 'src/environments/urls';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private http: HttpClient) { }

  public getWeatherForecast(city_name: string, cnt: number) {

    return new Promise((resolve, reject) => {

      const request = this.http.get(
        `${OPENWEATHER_API}/forecast/daily`, {
        params: {
          q: city_name,
          cnt: cnt,
          appid: OPENWEATHER_TOKEN
        }
      });

      request.subscribe(resolve, reject);
    });
  }

  // /forecast/daily?q={city name}&cnt={cnt}&appid={API key}
}
