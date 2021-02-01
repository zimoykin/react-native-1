

export interface Page <T> {

    items: [T],
    metadata: Metadata

}

export interface Metadata {
    page: number
    per: number
    total: number
}