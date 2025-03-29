import { ClassTypesResponse } from "@/types/classTypes";

export class Class {
    id:string;
    user_id: string;
    inviteCode: string;
    title: string;
    description: string;
    accessibility: string;
  
    constructor(data: ClassTypesResponse) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.inviteCode = data.inviteCode;
    this.title = data.title;
    this.description = data.description;
    this.accessibility = data.accessibility;
    }
  
    toJSON() {
      return {
        id: this.id,
        user_id: this.user_id,
        inviteCode: this.inviteCode,
        title: this.title,
        description: this.description,
        accessibility: this.accessibility,
      };
    }

    static fromResponse(data: ClassTypesResponse): Class{
        return new Class(data);
    }
  

  }
  