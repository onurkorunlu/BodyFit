import { Component } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective, FormControlDirective, FormSelectDirective, RowDirective, FormCheckComponent } from '@coreui/angular';
import { SelectComponent } from '../forms/select/select.component';
import { CommonProviders } from 'src/app/helpers/commonProviders';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProfileRequest } from 'src/app/models/requestModel/profileRequest';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [CommonProviders.Set(),FormControlDirective, RowDirective ,FormControlDirective, SelectComponent, FormSelectDirective, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, AccordionComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, BgColorDirective]
})
export class ProfileComponent {
  
  updateModel : ProfileRequest = new ProfileRequest();

  constructor( public userService:UserService, public toastService:ToastService) { }

  ngOnInit() {
    this.userService.get().subscribe({
      next: (v) => {
        this.updateModel.emailAddress = v.emailAddress;
        this.updateModel.height = v.height;
        this.updateModel.targetWeight = v.targetWeight;
        this.updateModel.dailyActivityType = v.dailyActivityType;
        this.updateModel.targetType = v.targetType;
        this.updateModel.exercisePeriod = v.exercisePeriod;
        this.updateModel.username = v.username;
        this.updateModel.age = v.age;
        this.updateModel.gender = v.gender
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });
  }

  update(){

    this.updateModel.dailyActivityType = parseInt(this.updateModel.dailyActivityType.toString());
    this.updateModel.targetType = parseInt(this.updateModel.targetType.toString());
    this.updateModel.exercisePeriod = parseInt(this.updateModel.exercisePeriod.toString());
    this.updateModel.gender = parseInt(this.updateModel.gender.toString());

    this.userService.update(this.updateModel).subscribe({
      next: (v) => {
        this.toastService.showSuccess("Profil bilgileri güncellendi.");
      },
      error: (e) => this.toastService.showError(e.message),
      complete: () => console.info('complete')
    });
  }
 
}
