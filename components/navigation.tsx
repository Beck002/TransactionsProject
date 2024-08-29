"use client"

import { usePathname, useRouter } from "next/navigation"
import NavButton from "./nav-button"

import { Button } from "@/components/ui/button"

import { useMedia } from "react-use";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet"

const routes = [
    {
        href:"/",
        label:"Overview" 
    },
    {
        href:"/transactions",
        label:"Transactions" 
    },
    {
        href:"/accounts",
        label:"Accounts" 
    },
    {
        href:"/categories",
        label:"Categories" 
    },    
] 


export const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false); 

    const router = useRouter(); 
    const pathName = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false); 

    const onClick = ( href:string )=>{
        router.push(href);
        setIsOpen(false)
    }
    if(isMobile){
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild >
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0  text-white focus-visible:ring-transparent outline-none focus:bg-white/30 transition"
                    >
                        <MenuIcon className="size-4"/>
                    </Button>
                </SheetTrigger> 
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {
                            routes.map((route)=>(
                                <Button
                                    variant={route.href === pathName ? "secondary": "ghost"}
                                    key={route.href}
                                    onClick={()=> onClick(route.href)}
                                    className="w-full justify-center"
                                >
                                    {route.label}
                                </Button>        
                            ))
                        }
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }


    return (
    <div>
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">

            {
                routes.map((route)=>(
                    <NavButton
                        key={route.href}
                        href={route.href}
                        label={route.label}
                        isActive={ pathName === route.href}
                    />
                ))
            }
        </nav>
    </div>
  )
}

export default Navigation; 