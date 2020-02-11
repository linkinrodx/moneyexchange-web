export class UserResponse {
    userId : number;
    username : string;
    
    constructor(user : any) {
        this.userId = user.userId;
        this.username = user.username;
    }
}
