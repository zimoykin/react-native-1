

export interface UserModel {
    username: string,
    accessToken: string,
    refreshToken: string,
    id:string
}

export interface UserPublic {
    username: string,
    email: string,
    id:string,
    image:string
}