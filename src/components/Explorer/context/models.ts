// export interface Asset<T, C, R> {
//     id: number
//     name: string
//     co2: number
//     cert: Certificate<T>
//     parents: number[]
//     composition: number[]
//     traceability: Transport<R>[]
//     metadata: T
// }

// export type ExplorableAsset = Asset<{
//     backImage: string
//     image: string
//     heading: string
//     properties: { name: string, icon: string }[]
// }, {}, {}>

// export interface Certificate<T> {
//     metadata: T
// }

// export interface Transport<T> {
//     metadata: T
// }

export interface Asset {
    id: number
    name: string
    co2: number
    cert: number
    metadata: {
        backImage: string
        image: string
        heading: string
        fabricator: string
        properties: { name: string, icon: string }[]
    }
}

export interface Certificate { }
export interface Movement { }

