export interface UserTypesLogin{
    username: string;
    password: string;

}

export interface UserTypesResponse {
    id:string,
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
  }

export interface UserTypesCreate{
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
}
  