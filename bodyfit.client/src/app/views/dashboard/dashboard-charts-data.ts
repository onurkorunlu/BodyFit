import { Injectable } from '@angular/core';
import {
  ChartData,
  ChartDataset,
  ChartOptions,
  ChartType,
  PluginOptionsByType,
  ScaleOptions,
  TooltipLabelStyle
} from 'chart.js';
import { DeepPartial } from 'chart.js/dist/types/utils';
import { getStyle, hexToRgba } from '@coreui/utils';
import { MeasurementsService } from 'src/app/services/measurements-service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { AppUser } from 'src/app/models/entities/appUser';
import { Measurement, MeasurementDetail } from 'src/app/models/entities/measurement';
import { GenderType } from 'src/app/models/enums/GenderType';
import { DatePipe, DecimalPipe } from '@angular/common';

export interface IChartProps {
  data?: ChartData;
  labels?: any;
  options?: ChartOptions;
  colors?: any;
  type: ChartType;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {

  measurementModel: Measurement = new Measurement();
  lastMeasurementModel: MeasurementDetail = new MeasurementDetail();
  appUser: AppUser = new AppUser();

  constructor(public measurementService: MeasurementsService, public toastService: ToastService, public userService: UserService,public datePipe: DatePipe, public decimalPipe: DecimalPipe) {
    this.measurementService.get().subscribe({
      next: (v) => {
        this.measurementModel = v;
        this.lastMeasurementModel = v.measurementDetails[v.measurementDetails.length - 1];
        this.initMainChart();
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });

    this.userService.get().subscribe({
      next: (v) => {
        this.appUser = v;
        this.initMainChart();
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });
  }

  public mainChart: IChartProps = { type: 'line' };

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info') ?? '#20a8d8', 10);
    const brandDanger = getStyle('--cui-danger') ?? '#f86c6b';
    const brandWarning = getStyle('--cui-warning') ?? '#f86c6b';

    // mainChart
    this.mainChart['elements'] = 52;
    this.mainChart['Weight'] = [];
    this.mainChart['BodFatMass'] = [];
    this.mainChart['BMI'] = [];

    // generate random values for mainChart
    this.measurementModel.measurementDetails.forEach(element => {
      this.mainChart['Weight'].push(this.decimalPipe.transform(element.weight, '1.2-2') ?? '');
      this.mainChart['BodFatMass'].push(this.decimalPipe.transform(this.getBodyFatMass(element), '1.2-2') ?? '');
      this.mainChart['BMI'].push(this.decimalPipe.transform(this.getBMI(element), '1.2-2') ?? '');
    });

    let labels: string[] = [];
    this.measurementModel.measurementDetails.forEach(element => {
        labels.push(this.datePipe.transform(element.date, 'dd.MM.yyyy') ?? '');
    });
   

    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5]
      }
      ,
      {
        // brandWarning
        backgroundColor: 'transparent',
        borderColor: brandWarning || '#f86c6b',
        pointHoverBackgroundColor: brandWarning,
        borderWidth: 5,
      }
    ];

    const datasets: ChartDataset[] = [
      {
        data: this.mainChart['Weight'],
        label: 'Kilo',
        ...colors[0]
      },
      {
        data: this.mainChart['BodFatMass'],
        label: 'Yağ Kütlesi',
        ...colors[3]
      },
      {
        data: this.mainChart['BMI'],
        label: 'BMI',
        ...colors[2]
      }
    ];

    const plugins: DeepPartial<PluginOptionsByType<any>> = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: (context) => ({ backgroundColor: context.dataset.borderColor } as TooltipLabelStyle)
        }
      }
    };

    const scales = this.getScales();

    const options: ChartOptions = {
      maintainAspectRatio: false,
      plugins,
      scales,
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

  getScales() {
    const colorBorderTranslucent = getStyle('--cui-border-color-translucent');
    const colorBody = getStyle('--cui-body-color');

    const scales: ScaleOptions<any> = {
      x: {
        grid: {
          color: colorBorderTranslucent,
          drawOnChartArea: false
        },
        ticks: {
          color: colorBody
        }
      },
      y: {
        border: {
          color: colorBorderTranslucent
        },
        grid: {
          color: colorBorderTranslucent
        },
        max: 250,
        beginAtZero: true,
        ticks: {
          color: colorBody,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5)
        }
      }
    };
    return scales;
  }

  getBMI(measurementDetail:MeasurementDetail | null): number {
    if (!measurementDetail) {
      return 0;
    }
    return measurementDetail.weight / Math.pow(this.appUser.height / 100, 2);
  }

  getBodyFatRatio(measurementDetail:MeasurementDetail | null): number {

    if (!measurementDetail) {
      return 0;
    }

    if (this.appUser.gender == GenderType.Male) {
      return (1.2 * this.getBMI(measurementDetail)) + (0.23 * this.appUser.age) - 16.2;
    }
    else {
      return (1.2 * this.getBMI(measurementDetail)) + (0.23 * this.appUser.age) - 5.4;
    }
  }

  getBodyFatMass(measurementDetail:MeasurementDetail | null){
    if (!measurementDetail) {
      return 0;
    }
    return this.getBodyFatRatio(measurementDetail) * measurementDetail.weight / 100;
  }

  getBodyMassRatio(measurementDetail:MeasurementDetail): number {
    if (this.appUser.gender == GenderType.Male) {
      return Math.pow(this.appUser.height,2) * this.getBMI(measurementDetail);
    }
    else {
      return (1.2 * this.getBMI(measurementDetail)) + (0.23 * this.appUser.age) - 5.4;
    }
  }
}
