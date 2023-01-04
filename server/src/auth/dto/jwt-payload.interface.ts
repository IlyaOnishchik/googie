import { Role } from "src/roles/entities/role.entity";

export class JwtPayload {
    id: string;
    email: string;
    roles: Role[];
}