import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-sm inline-flex min-h-11 items-center justify-center gap-2 border font-body text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-horizon bg-horizon px-5 text-obsidian hover:bg-[#d1f5ed]",
        outline: "border-white/25 bg-transparent px-5 text-porcelain hover:border-white/60 hover:bg-white/[0.06]",
        ghost: "border-transparent bg-transparent px-3 text-porcelain hover:bg-white/[0.07]",
      },
      size: { sm: "h-9 min-h-9 px-3 text-xs", default: "h-11 min-h-11 px-5 text-sm", lg: "h-13 min-h-13 px-7 text-base", icon: "size-11 min-h-11 p-0" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
