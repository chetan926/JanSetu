import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF9933] text-[#0F172A] font-bold shadow-md shadow-saffron/20 hover:bg-[#E69500] hover:shadow-lg hover:shadow-saffron/30",
        navy:
          "bg-[#0F172A] text-white font-medium shadow-md hover:bg-[#002D62]",
        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-700",
        outline:
          "border border-slate-300 bg-white text-[#0F172A] hover:bg-slate-50 hover:border-slate-400",
        secondary:
          "bg-slate-100 text-[#0F172A] hover:bg-slate-200 border border-slate-200",
        ghost:
          "text-slate-700 hover:bg-slate-100 hover:text-[#0F172A]",
        link: "text-[#FF9933] underline-offset-4 hover:underline",
        glass: "bg-white/80 text-[#0F172A] border border-slate-200 hover:border-saffron/50 hover:bg-amber-50/50",
        saffronOutline: "border-2 border-[#FF9933] bg-white text-[#0F172A] hover:bg-amber-50 font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
