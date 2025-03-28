import { ClassTypesResponse } from "@/types/classTypes";

export class Class {
    id:string;
    userId: string;
    inviteCode: string;
    title: string;
    description: string;
    accessibility: boolean;
  
    constructor(data: ClassTypesResponse) {
    this.id = data.id;
    this.userId = data.userId;
    this.inviteCode = data.inviteCode;
    this.title = data.title;
    this.description = data.description;
    this.accessibility = data.accessibility;
    }
  
    toJSON() {
      return {
        id: this.id,
        userId: this.userId,
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
  