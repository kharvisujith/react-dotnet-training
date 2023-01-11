export interface Products {
    id:number,
    name:string,
    description?:string,
    price?:number,
    pictureUrl:string,
    type?: string,
    brand?:string,
    quantityInStock?:number
}

export interface ProductParams {
    orderBy:string
    searchItem?:string 
    types:string[]
    brands:string[]
    pageNumber:number
    pageSize:number
}