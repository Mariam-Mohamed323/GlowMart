export interface AddressResponse {
    results?:number
    status: string
    message?: string
    data: AddressI[]
}

export interface AddressI{
    city: string
    details: string
    name:string
    phone: string
    _id: string
    isDefault?: boolean
}