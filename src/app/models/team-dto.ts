import { UserDTO } from "./user-dto";

export interface TeamDTO{
  id: number;
  name: string;
  students: UserDTO[];
  choices: string;
}
