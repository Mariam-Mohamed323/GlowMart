export interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export interface OrderProduct {
  _id: string
  title: string
  imageCover: string
}

export interface OrderCartItem {
  _id: string
  count: number
  price: number
  product: OrderProduct
}

export interface OrderUser {
  _id: string
  name: string
  email: string
  phone: string
}

export interface OrderI {
  _id: string
  shippingAddress: ShippingAddress
  totalOrderPrice: number
  paymentMethodType: "cash" | "card"
  isPaid: boolean
  isDelivered: boolean
  cartItems: OrderCartItem[]
  user: OrderUser
  createdAt: string
}

export type OrderResponse = OrderI[]