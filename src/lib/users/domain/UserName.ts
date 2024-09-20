export class UserName {
    value: string;

    constructor(value: string){
        this.value = value;
    }

    private isValid(){
        if(this.value.length < 3){
            throw new Error("El nombre debe de tener mas de 3 caracteres")
        };
    };
}