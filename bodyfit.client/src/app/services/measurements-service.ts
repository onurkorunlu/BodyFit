
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Measurement } from '../models/entities/measurement';
import { MeasurementRequest } from '../models/entities/measurementRequest';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  constructor(public httpService: HttpService) { }

  get(): Observable<Measurement> {
    return this.httpService.get<any>("measurement/get");
  }

  update(model:MeasurementRequest): Observable<Measurement> {
    return this.httpService.post<Measurement>("measurement/update", model);
  }
}
