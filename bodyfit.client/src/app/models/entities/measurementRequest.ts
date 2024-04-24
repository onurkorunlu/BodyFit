export class MeasurementRequest {
    date: Date 
    weight: number
    neckSize: number
    chestSize: number
    epigastriumSize: number
    bellySize: number
    waistSize: number
    buttockSize: number
    haunchSize: number
    bicepsSize: number
    calfSize: number
    underArm: number

    constructor() {
        this.date = new Date()
        this.weight = 0
        this.neckSize = 0
        this.chestSize = 0
        this.epigastriumSize = 0
        this.bellySize = 0
        this.waistSize = 0
        this.buttockSize = 0
        this.haunchSize = 0
        this.bicepsSize = 0
        this.calfSize = 0
        this.underArm = 0
    }

    isValid(): boolean {

        if (this.date == null) {
            return false
        }

        if (this.weight <= 0) {
            return false
        }
        
        if (this.neckSize <= 0) {
            return false
        }

        if (this.chestSize <= 0) {
            return false
        }

        if (this.epigastriumSize <= 0) {
            return false
        }

        if (this.bellySize <= 0) {
            return false
        }

        if (this.waistSize <= 0) {
            return false
        }

        if (this.buttockSize <= 0) {
            return false
        }

        if (this.haunchSize <= 0) {
            return false
        }

        if (this.bicepsSize <= 0) {
            return false
        }

        if (this.calfSize <= 0) {
            return false
        }

        if (this.underArm <= 0) {
            return false
        }

        return true;
    }
}