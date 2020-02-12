import { UserController } from "./controller/UserController";

export const Routes = [
{
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all"
}
];