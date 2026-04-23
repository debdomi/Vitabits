import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-btn font-semibold tracking-tight transition-all duration-200 ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-green text-white shadow-cta hover:bg-brand-green-hover hover:-translate-y-0.5 active:translate-y-0",
        surface:
          "bg-brand-surface text-brand-green-deep hover:bg-brand-surface/85 active:translate-y-px",
        outline:
          "border border-brand-green/30 bg-white text-brand-green-deep hover:border-brand-green/60 hover:bg-brand-green-tint",
        ghost:
          "bg-transparent text-brand-green-deep hover:bg-brand-green-tint",
        link:
          "bg-transparent text-brand-green underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm gap-1.5",
        default: "h-12 px-6 text-base gap-2",
        lg: "h-14 px-8 text-base gap-2",
        xl: "h-[56px] px-8 text-base gap-2",
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
