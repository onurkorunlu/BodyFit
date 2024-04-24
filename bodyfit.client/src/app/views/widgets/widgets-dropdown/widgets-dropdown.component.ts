import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { fill } from 'lodash-es';
import { MeasurementsService } from 'src/app/services/measurements-service';
import { Measurement } from 'src/app/models/entities/measurement';
import { ToastService } from 'src/app/services/toast.service';

interface WidgetModel {
  color: string;
  title: string;
  mainValue: number,
  minValue: number,
  maxValue: number,
  rateChange: number,
  chartData: ChartData;
}

interface ChartData {
  labels: string[];
  datasets: any[];
}

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [RowComponent,DecimalPipe, NgFor, NgIf, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink, DropdownDividerDirective, ChartjsComponent]
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private measurementService: MeasurementsService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe
  ) { }

  data: any[] = [];
  option: any = {};
  options: any[] = [];
  widgetModels: WidgetModel[] = [];

  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        border: {
          display: true,
        },
        grid: {
          display: true,
          drawBorder: true
        },
        ticks: {
          display: true,
          color: 'rgba(255,255,255,.55)',
        }
      },
      y: {
        min: 40,
        max: 200,
        display: true,
        grid: {
          display: true
        },
        ticks: {
          display: true,
          color: 'rgba(255,255,255,.55)',
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  measurementModel: Measurement = new Measurement();

  ngOnInit(): void {
    
    this.option = JSON.parse(JSON.stringify(this.optionsDefault));
    this.option.scales.y.min = 50;
    this.option.scales.y.max = 80;
    this.option.elements.line.tension = 0;

    this.measurementService.get().subscribe({
      next: (v) => {
        this.measurementModel = v;
        this.prepareWeightChart(); 
        this.prepareChestChart(); 
        this.prepareBellChart();
        this.prepareButtockChart();
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  getFormattedDate(date:Date): string  {
    return this.datePipe.transform(date, 'dd MMM yyyy') ?? '';
  }

  prepareWeightChart() {

    let dates = this.measurementModel.measurementDetails.map(x => this.getFormattedDate(x.date));
    let weights = this.measurementModel.measurementDetails.map(x => this.decimalPipe.transform(x.weight,'1.2-2')) ?? '';

    let weightChartData = {
      labels: dates,
      datasets: [{
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: weights
      }]
    };

    let finalWeight = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-1].weight;
    let beforeWeight = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-2].weight;
    let maxWeight = Math.max(...this.measurementModel.measurementDetails.map(x => x.weight));
    let minWeight = Math.min(...this.measurementModel.measurementDetails.map(x => x.weight));
    let rateChange = ((finalWeight - beforeWeight) / beforeWeight) * 100;

    this.widgetModels.push({
      color: '#222831', title: 'Kilo', mainValue: finalWeight, rateChange: rateChange, chartData: weightChartData, minValue: minWeight, maxValue: maxWeight
    });
  }

  prepareChestChart() {

    let dates = this.measurementModel.measurementDetails.map(x => this.getFormattedDate(x.date));
    let weights = this.measurementModel.measurementDetails.map(x => this.decimalPipe.transform(x.chestSize,'1.2-2')) ?? '';

    let weightChartData = {
      labels: dates,
      datasets: [{
        backgroundColor: 'transparent',
        borderColor: getStyle('--cui-white'),
        pointBackgroundColor: getStyle('--cui-white'),
        pointHoverBorderColor: getStyle('--cui-white'),
        data: weights
      }]
    };

    let final = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-1].chestSize;
    let before = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-2].chestSize;
    let max = Math.max(...this.measurementModel.measurementDetails.map(x => x.chestSize));
    let min = Math.min(...this.measurementModel.measurementDetails.map(x => x.chestSize));
    let rateChange = ((final - before) / before) * 100;

    this.widgetModels.push({
      color: '#092635', title: 'Göğüs Ölçüsü', mainValue: final, rateChange: rateChange, chartData: weightChartData, minValue: min, maxValue: max
    });
  }

  prepareBellChart() {

    let dates = this.measurementModel.measurementDetails.map(x => this.getFormattedDate(x.date));
    let weights = this.measurementModel.measurementDetails.map(x => this.decimalPipe.transform(x.bellySize,'1.2-2')) ?? '';

    let weightChartData = {
      labels: dates,
      datasets: [{
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: weights
      }]
    };

    let final = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-1].bellySize;
    let before = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-2].bellySize;
    let max = Math.max(...this.measurementModel.measurementDetails.map(x => x.bellySize));
    let min = Math.min(...this.measurementModel.measurementDetails.map(x => x.bellySize));
    let rateChange = ((final - before) / before) * 100;

    this.widgetModels.push({
      color: '#070F2B', title: 'Göbek Ölçüsü', mainValue: final, rateChange: rateChange, chartData: weightChartData, minValue: min, maxValue: max
    });
  }

  prepareButtockChart() {

    let dates = this.measurementModel.measurementDetails.map(x => this.getFormattedDate(x.date));
    let weights = this.measurementModel.measurementDetails.map(x => this.decimalPipe.transform(x.buttockSize,'1.2-2')) ?? '';

    let weightChartData = {
      labels: dates,
      datasets: [{
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: weights
      }]
    };

    let final = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-1].buttockSize;
    let before = this.measurementModel.measurementDetails[this.measurementModel.measurementDetails.length-2].buttockSize;
    let max = Math.max(...this.measurementModel.measurementDetails.map(x => x.buttockSize));
    let min = Math.min(...this.measurementModel.measurementDetails.map(x => x.buttockSize));
    let rateChange = ((final - before) / before) * 100;

    this.widgetModels.push({
      color: '#3E3232', title: 'Kalça Ölçüsü', mainValue: final, rateChange: rateChange, chartData: weightChartData, minValue: min, maxValue: max
    });
  }
  getOption(widget: WidgetModel): any {
    let opt= this.option;
    opt.scales.y.max = widget.maxValue +10;
    opt.scales.y.min = widget.minValue -10;
    return opt;
  }
}