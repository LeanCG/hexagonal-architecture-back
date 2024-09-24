export class UserPasword {
    value: String;

    constructor(value:string){
        this.value = value;
        this.isValid()
    }

    private isValid(){
        if (this.value !=null){
            if(this.value.length < 5 &&  this.value.includes(typeof "number")){
                throw new Error("your password needed one upper case");
            }
        }
    }
}