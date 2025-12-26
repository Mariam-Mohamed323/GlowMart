import { UserResponse } from "./login";

export interface ChangePasswordResponse{
    message: string,
    user: UserResponse,
    token: string
}