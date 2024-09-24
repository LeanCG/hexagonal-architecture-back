export class TypeState {
    value: number;

    constructor(value:number){
        this.value = value;
        this.isValid();
    }

    private isValid(){
        if(typeof this.value != 'number'){
            throw new Error("the status type must be a number")
        }
    }
}