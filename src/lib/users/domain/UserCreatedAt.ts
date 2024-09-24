export class UserCreateAt{
    value: Date;
    constructor(value: Date){
        this.value = value;
        this.isValid();
    }
    isValid(){
        if(this.value > new Date()){
            throw new Error("the Date dont hace after of date of now")
        }
    }

}