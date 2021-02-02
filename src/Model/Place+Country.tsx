import { BlogModel } from "./BlogModel";

export interface Place {
    title: string,
    description: string,
    id: string,
    latitude: number,
    longtitude: number,
    country: Country
}

export interface Country {
    title: string,
    description: string,
    id: string
}

export interface PlaceFull {
    id: string,
    title: string ,
    description: string,
    country: Country,
    blogs: [BlogModel]
  }