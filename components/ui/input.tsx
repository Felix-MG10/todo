import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    console.log(className);
    console.log(type);
    console.log(props);
    return (
      <div className="relative flex items-center">
       {/* Icone de recherche */}
       <Search className="absolute left-3 text-muted-foreground" />
        {/* Champ de saisie */}
        <input
          type={type}
          placeholder="Search anything here"
          className={cn(
            "h-9 w-full rounded-md border border-input bg-transparent pl-10 pr-5 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
         
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
