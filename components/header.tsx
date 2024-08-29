import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Navigation from "./navigation";
import HeaderLogo from "./ui/header-logo";
import { Loader2 } from "lucide-react";
import WelcomeMsg from "./welcome-msg";
import { Filters } from "./filters";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">

      <div className="max-2-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center   lg:gap-x-16">
            <HeaderLogo />
            <Navigation /> 
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/"/>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400"/>
          </ClerkLoading>
        </div>
        <WelcomeMsg /> 
        <Filters />
      </div>
    </header>
  )
}

export default Header; 