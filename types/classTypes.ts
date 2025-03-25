export interface ClassTypesResponse {
    id:number;
    inviteCode: string;
    title: string;
    description: string;
    accessibility: string;
  }

export interface ClassTypesCreate{
    title: string;
    description: string;
    accaccessibility: string;
}

export interface ClassTypesUpdate {
    id:number;
    title: string;
    description: string;
    accessibility: string;
  }


