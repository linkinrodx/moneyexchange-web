export class UserResponse {
    userId : number;
    username : string;
    
    constructor(user) {
        this.userId = user.userId;
        this.username = user.username;
    }
}
