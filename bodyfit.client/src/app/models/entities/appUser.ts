import { DailyActivityType } from './../enums/DailyActivityType';
import { ExercisePeriod } from './../enums/ExercisePeriod';
import { TargetType } from './../enums/TargetType';
import { BaseEntity } from './baseEntity';
import { GenderType } from './../enums/GenderType';

export class AppUser extends BaseEntity{
    username:string;
    emailAddress:string;
    height:number;
    targetWeight:number;
    exercisePeriod:ExercisePeriod;
    targetType:TargetType;
    dailyActivityType:DailyActivityType;
    age:number;
    gender:GenderType;

    constructor(){
        super();
        this.age = 30;
        this.gender = GenderType.Male;
        this.username = "";
        this.emailAddress = "";
        this.height = 0;
        this.targetWeight = 0;
        this.exercisePeriod = ExercisePeriod.None;
        this.targetType = TargetType.None;
        this.dailyActivityType = DailyActivityType.None;
    }
}