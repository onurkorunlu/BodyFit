export class RegisterModel{
    username:string;
    emailAddress:string;
    password:string;
    password2:string;
    height: number | null;
    targetWeight: number | null;
    dailyActivityType: number;
    targetType: number;
    exercisePeriod: number;

    constructor(){
        this.username = "";
        this.emailAddress = "";
        this.password = "";
        this.password2 = "";
        this.height = null;
        this.targetWeight = null;
        this.dailyActivityType = 0;
        this.targetType = 0;
        this.exercisePeriod = 0;
    }

    public isValid(): boolean{

        if(this.username.trim() == ""){
            return false;
        }

        if(this.emailAddress.trim() == ""){
            return false;
        }

        if(this.password.trim() == ""){
            return false;
        }

        if(this.password2.trim() != this.password.trim()){
            return false;
        }

        if(this.height == null || this.height <= 0){
            return false;
        }

        if(this.targetWeight == null || this.targetWeight <= 0){
            return false;
        }

        if(this.dailyActivityType == 0){
            return false;
        }

        if(this.targetType == 0){
            return false;
        }

        if(this.exercisePeriod == 0){
            return false;
        }

        return true;
    }
}