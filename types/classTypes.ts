export interface ClassTypesResponse {
    id:string;
    user_id: string;
    inviteCode: string;
    title: string;
    description: string;
    accessibility: string;
  }

export interface ClassTypesCreate{
    user_id: string;
    title: string;
    description: string;
    accessibility: string;
}

export interface ClassTypesUpdate {
    id:string;
    title: string;
    description: string;
    accessibility: string;
  }
  


