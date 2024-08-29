import { Loader2 } from "lucide-react";

import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <div className="min-h-screen grid grids-col-1 lg:grid-cols-2 items-center">
        <div className="h-full lg:flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-4 pt-16">
                <h1 className="font-bold text-3xl text-[#2E2A47]">
                    Bienenido de Nuevo!
                </h1>
                <p className="text-base text-[#7E8CA0]">
                    Inicia sesion o Registrate para acceder un Dashboard
                </p>
            </div>
            <div className="flex items-center justify-items-center mt-8">
                <ClerkLoaded>
                    <SignUp />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="animate-spin text-muted-foreground" />
                </ClerkLoading>
            </div>

        </div>
        <div className="h-full bg-blue-600 hidden lg:flex items-center  justify-center">
            <Image src="/logo.svg" height={100} width={100} alt="Logo"/>
        </div>
    </div>
) 

}