import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  
})

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 bg-slate-900">
      <div className="space-y-4 text-center">
        <h1 className={cn(
          "text-6xl font-bold text-white",
          font.className,
        )}>Welcome to the Auth App</h1>
        <p className="text-white">Please sign in to continue.</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}


 