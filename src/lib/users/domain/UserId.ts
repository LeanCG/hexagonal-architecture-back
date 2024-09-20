export class UserId {
    value: number;
    
    constructor (UserId : number){
        this.value = UserId;
        this.isValid();
    };

    private isValid(){
        if(typeof this.value != 'number'){
            throw new Error("debes de ingreasar un numero");
        }
    }

}

