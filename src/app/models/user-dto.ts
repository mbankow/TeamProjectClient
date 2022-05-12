import { RoleName } from "./enums/role-name";
import { ProjectDTO } from "./project-dto";
import { TeamDTO } from "./team-dto";

export interface UserDTO{
  id: number;
  name: string;
  lastName: string;
  firm: string;
  email: string;
  password: string;
  role: RoleName;
  teams: TeamDTO[];
  projects: ProjectDTO[];
}
