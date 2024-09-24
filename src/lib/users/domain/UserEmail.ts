export class Email {
    value : string;
    constructor (value : string){
        this.value = value;
        this.isValidated();
    }

    isValidated () {
        if (!this.value.includes("@")  && !this.value.includes(".")){
            throw new Error("El coreo debe ser uno valido")
        }
    };
}