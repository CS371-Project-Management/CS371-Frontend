export interface ClassTypesResponse {
  id: number;
  inviteCode: string;
  title: string;
  description: string;
  accessibility: string;
}

export interface ClassTypesCreate {
  user_id: string,
  title: string;
  description: string;
  accessibility: "0" | "1";
}

export interface ClassTypesUpdate {
    id:string;
    user_id: string;
    inviteCode: string;
    title: string;
    description: string;
    accessibility: string;
  }


  


