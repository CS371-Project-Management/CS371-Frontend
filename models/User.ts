import { UserTypesResponse } from "@/types/userTypes";

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
  
    constructor(data: UserTypesResponse) {
     this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
    }
  
    toJSON() {
      return {
        id: this.id,
        username: this.username,
        email: this.email,
        password: this.password
      };
    }

    static fromResponse(data: UserTypesResponse): User{
        return new User(data);
    }
  

  }
  