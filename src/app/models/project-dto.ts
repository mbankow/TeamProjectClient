import { UserDTO } from "./user-dto";

export interface ProjectDTO{
  id: number;
  name: string;
  description: string;
  owner: UserDTO;
}
