export interface UserTypesLogin{
    username: string;
    password: string;

}

export interface UserTypesResponse {
    id:number,
    username: string;
    email: string;
    password: string;
  }

export interface UserTypesCreate{
    username: string;
    password: string;
    email: string;
}
  