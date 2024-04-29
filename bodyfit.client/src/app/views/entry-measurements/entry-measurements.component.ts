import { Component } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective, FormControlDirective, FormSelectDirective, RowDirective, FormCheckComponent } from '@coreui/angular';
import { SelectComponent } from '../forms/select/select.component';
import { CommonProviders } from 'src/app/helpers/commonProviders';
import { MeasurementsService } from 'src/app/services/measurements-service';
import { ToastService } from 'src/app/services/toast.service';
import { RegisterModel } from 'src/app/models/requestModel/registerModel';
import { Measurement, MeasurementDetail } from 'src/app/models/entities/measurement';
import { MeasurementRequest } from 'src/app/models/entities/measurementRequest';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entry-measurements',
  templateUrl: './entry-measurements.component.html',
  styleUrls: ['./entry-measurements.component.scss'],
  standalone: true,
  imports: [CommonProviders.Set(), DatePipe , FormControlDirective, RowDirective, FormControlDirective, SelectComponent, FormSelectDirective, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective]
})
export class EntryMeasurementsComponent {

  measurementModel: Measurement = new Measurement();
  updateModel: MeasurementRequest = new MeasurementRequest();
  

  constructor(public measurementService: MeasurementsService, public toastService: ToastService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.measurementService.get().subscribe({
      next: (v) => {
        this.measurementModel = v;
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });
  }

  update() {
    this.updateModel.date = new Date(this.updateModel.date.toString());
    this.measurementService.update(this.updateModel).subscribe({
      next: (v) => {
        this.toastService.showSuccess("Profil bilgileri güncellendi.");
        this.measurementModel = v;
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });
  }

  DateChanged() {

    let date = new Date(this.updateModel.date.toString());

    if(this.measurementModel?.measurementDetails){
      let item = this.measurementModel.measurementDetails.filter(x=>this.toDate(new Date(x.date.toString())) == this.toDate(date));
      if (item.length > 0) {
        this.updateModel.bellySize = item[0].bellySize;
        this.updateModel.bicepsSize = item[0].bicepsSize;
        this.updateModel.chestSize = item[0].chestSize;
        this.updateModel.date = item[0].date;
        this.updateModel.buttockSize = item[0].buttockSize;
        this.updateModel.calfSize = item[0].calfSize;
        this.updateModel.epigastriumSize = item[0].epigastriumSize;
        this.updateModel.haunchSize = item[0].haunchSize;
        this.updateModel.neckSize = item[0].neckSize;
        this.updateModel.underArm = item[0].underArm;
        this.updateModel.waistSize = item[0].waistSize;
        this.updateModel.weight = item[0].weight;
      }
      else{
        this.updateModel = new MeasurementRequest();
        this.updateModel.date = date;
      }
    }
    else{
      this.updateModel = new MeasurementRequest();
      this.updateModel.date = date;
    }
  }

  toDate(date:Date) {
    return date.setHours(0,0,0,0);
 }
}
