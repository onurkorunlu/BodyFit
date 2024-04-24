import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, FormSelectDirective } from '@coreui/angular';
import { RegisterModel } from 'src/app/models/requestModel/registerModel';
import { UserService } from 'src/app/services/user.service';
import { RegisterResultModel } from 'src/app/models/responseModel/registerResultModel';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../forms/select/select.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [RouterModule,FormSelectDirective, FormsModule,ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {

  registerModel: RegisterModel = new RegisterModel();
  constructor(private userService:UserService,private tokenStorageService: TokenStorageService, private toastService: ToastService, private router: Router) { }

  public register() {

    this.registerModel.dailyActivityType = parseInt(this.registerModel.dailyActivityType.toString());
    this.registerModel.targetType = parseInt(this.registerModel.targetType.toString());
    this.registerModel.exercisePeriod = parseInt(this.registerModel.exercisePeriod.toString());

    this.userService.register(this.registerModel).subscribe({
      next: (result: RegisterResultModel) => {
        console.log(result);
        if (result.isSuccess) {
          this.tokenStorageService.saveToken(result.token);
          this.tokenStorageService.saveUser(result.appUser);
          this.tokenStorageService.saveRole(result.appUserRole);
          this.toastService.showSuccess('Giriş Başarılı');
          this.router.navigate([""]);
        }
        else {
          this.toastService.showError(result.message);
        }
      },
      complete: () => { },
      error: (err) => {
        if(err.errors){
          Object.values(err.errors).forEach((e: any) => {
            e.forEach((e: any) => {
              this.toastService.showError(e);
            });
          });
        }
      }
    });
  }
}
