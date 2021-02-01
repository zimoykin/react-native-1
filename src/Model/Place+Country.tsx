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