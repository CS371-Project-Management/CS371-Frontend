import { UserTypesResponse } from "@/types/userTypes";

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
  
    constructor(data: UserTypesResponse) {
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.role = data.role;
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
  