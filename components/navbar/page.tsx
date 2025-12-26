"use client"
import React, { useContext } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { HeartIcon, Loader, Menu, ShoppingCart, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { CartContext } from '../context/CartContext'
import { Button } from '../ui/button'
import { signOut, useSession } from 'next-auth/react'
import { WishlistContext } from '../wishlistContext/wishlistContext'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"



export default function Navbar() {
    const session = useSession()
    
    const { cartData, isLoading } = useContext(CartContext);
    const { wishlistData, loading } = useContext(WishlistContext);

    return (
        <>
            <nav className='bg-gray-100 shadow sticky top-0 text-2xl font-semibold py-3'>
                <div className="container mx-auto w-[80%]">
                    <div className="flex items-center justify-between">
                        <h1 className='flex justify-center items-center gap-2'><Link href={"/"}><Button className='text-white font-bold text-2xl'>G</Button> <span className='hidden sm:inline'>GlowMart</span></Link></h1>
                        
                        <div className="flex items-center gap-x-3">
                            <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-gray-200 transition">
                                        <Menu />
                                    </Button>
                                </SheetTrigger>

                                    <SheetContent side="right" className='text-lg
                                data-[state=open]:animate-in
                                data-[state=closed]:animate-out
                                data-[state=open]:slide-in-from-right
                                data-[state=closed]:slide-out-to-right
                                data-[state=open]:fade-in
                                data-[state=closed]:fade-out'>
                                        <VisuallyHidden>
                                            <SheetTitle>Navigation Menu</SheetTitle>
                                        </VisuallyHidden>
                                        <nav className='flex flex-col gap-5 mt-10 ms-5'>
                                            <Link className="hover:translate-x-1 transition" href="/products">Products</Link>
                                            <Link className="hover:translate-x-1 transition"  href="/brands">Brands</Link>
                                            <Link className="hover:translate-x-1 transition" href="/categories">Categories</Link>
                                            {session.status === "authenticated" && (
                                                <>
                                                    <Link className='flex items-center gap-3' href={"/cart"}>
                                                        <ShoppingCartIcon />
                                                        Cart
                                                        <Badge className="ms-auto">
                                                            {isLoading ? (
                                                                <Loader className="size-4 animate-spin" />
                                                            ) : (
                                                                cartData?.numOfCartItems
                                                            )}
                                                        </Badge>
                                                    </Link>
                                                    <Link className='flex gap-3' href={"/wishlist"}>
                                                        <HeartIcon/>
                                                        Wishlist
                                                        <Badge className="ms-auto">
                                                            {loading ? (
                                                                <Loader className="size-4 animate-spin" />
                                                            ) : (
                                                                wishlistData?.count
                                                            )}
                                                            </Badge>
                                                    </Link>
                                                <Link  href={"/profile"}>Profile</Link>
                                                <button onClick={()=>signOut({callbackUrl:"/login"})} className='text-left text-red-500 cursor-pointer hover:opacity-80 transition'>Logout</button>
                                            </>
                                        )}
                                        {session.status !== "authenticated"&&(
                                            <>
                                            <Link href={"/login"}>Login</Link>
                                            <Link href={"/register"}>Register</Link>
                                            </>
                                        )}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                        </div>


                        <NavigationMenu className='hidden md:flex'>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/products">Products</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/brands">Brands</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link href="/categories">Categories</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <div className="flex items-center gap-x-4">
                            <DropdownMenu>
                            <DropdownMenuTrigger><UserIcon/></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {session.status=="authenticated"?<>
                                        <Link href={"/profile"}>
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onClick={() => signOut({
                                            callbackUrl:"/login"
                                        })}>Logout</DropdownMenuItem>
                                    </>:<>
                                        <Link href={"/login"}>
                                            <DropdownMenuItem>Login</DropdownMenuItem>
                                        </Link>
                                        <Link href={"/register"}>
                                            <DropdownMenuItem>Register</DropdownMenuItem>
                                        </Link>
                                    </>
                                    }
                                    
                                    
                                
                            </DropdownMenuContent>
                            </DropdownMenu>
                            {
                                session.status == "authenticated" && <div className="relative hidden md:flex items-center gap-x-4">
                                <Link href={"/cart"}>
                                    <ShoppingCartIcon />
                                    <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono tabular-nums">
                                        {isLoading ? <Loader className='animate-spin' /> : cartData?.numOfCartItems}
                                    </Badge>
                                </Link>
                            </div>
                            }

                            {
                                session.status == "authenticated" && <div className="relative hidden md:flex items-center gap-x-4">
                                <Link href={"/wishlist"}>
                                    <HeartIcon />
                                    <Badge className="h-5 min-w-5 absolute -top-3 -end-3 rounded-full px-1 font-mono tabular-nums">
                                        {loading ? <Loader className='animate-spin'/> : wishlistData?.count}
                                    </Badge>
                                </Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
