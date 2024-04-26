export class ProfileRequest {
    username: string;
    emailAddress: string;
    height: number | null;
    targetWeight: number | null;
    dailyActivityType: number;
    targetType: number;
    exercisePeriod: number;
    gender: number ;
    age: number | null;
    constructor() {
        this.username = "";
        this.emailAddress = "";
        this.height = null;
        this.targetWeight = null;
        this.dailyActivityType = 0;
        this.targetType = 0;
        this.exercisePeriod = 0;
        this.age = 0;
        this.gender = -1;
    }

    public isValid(): boolean {

        if (this.username.trim() == "") {
            return false;
        }

        if (this.emailAddress.trim() == "") {
            return false;
        }

        if (this.height == null || this.height <= 0) {
            return false;
        }

        if (this.targetWeight == null || this.targetWeight <= 0) {
            return false;
        }

        if (this.dailyActivityType == 0) {
            return false;
        }

        if (this.targetType == 0) {
            return false;
        }

        if (this.exercisePeriod == 0) {
            return false;
        }

        return true;
    }
}