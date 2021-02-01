import { UserPublic } from "./UserModel";
import { Place } from "./Place+Country";

export interface BlogModel {
    title: string,
    description: string,
    id: string,
    image: string,
    tags: [string],
    user: UserPublic,
    place: Place
}