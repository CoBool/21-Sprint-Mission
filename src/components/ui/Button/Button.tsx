import type { ButtonHTMLAttributes } from "react";
import type { LinkProps } from "react-router";

import { Link } from "react-router";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const baseButton =
  [
    // layout
    "inline-flex items-center justify-center whitespace-nowrap shrink-0",
    "gap-1.5",

    // typography
    "text-sm font-medium",

    // shape
    "rounded-lg border border-transparent bg-clip-padding",

    // interaction
    "transition-all select-none outline-none",
    "focus-visible:ring-[3px]",
    "disabled:pointer-events-none disabled:opacity-50",

    // accessibility
    "focus-visible:border-ring focus-visible:ring-ring/50",
    "aria-invalid:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive dark:aria-invalid:border-destructive/50",

    // icon handling
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",

    // group
    "group/button",
  ].join(" ");

const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",

  outline:
    "border-border bg-background hover:bg-muted hover:text-foreground \
       dark:bg-input/30 dark:border-input dark:hover:bg-input/50 \
       aria-expanded:bg-muted aria-expanded:text-foreground",

  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 \
       aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",

  ghost:
    "hover:bg-muted hover:text-foreground \
       dark:hover:bg-muted/50 \
       aria-expanded:bg-muted aria-expanded:text-foreground",

  destructive:
    "bg-destructive/10 text-destructive hover:bg-destructive/20 \
       focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 \
       dark:bg-destructive/20 dark:hover:bg-destructive/30 \
       focus-visible:border-destructive/40",

  link: "text-primary underline-offset-4 hover:underline",
}

const sizeStyles = {
  default:
    "h-8 px-2.5 gap-1.5 \
       has-data-[icon=inline-start]:pl-2 \
       has-data-[icon=inline-end]:pr-2",

  xs:
    "h-6 px-2 text-xs gap-1 \
       rounded-[min(var(--radius-md),10px)] \
       has-data-[icon=inline-start]:pl-1.5 \
       has-data-[icon=inline-end]:pr-1.5 \
       [&_svg:not([class*='size-'])]:size-3",

  sm:
    "h-7 px-2.5 text-[0.8rem] gap-1 \
       rounded-[min(var(--radius-md),12px)] \
       has-data-[icon=inline-start]:pl-1.5 \
       has-data-[icon=inline-end]:pr-1.5 \
       [&_svg:not([class*='size-'])]:size-3.5",

  lg:
    "h-9 px-2.5 gap-1.5 \
       has-data-[icon=inline-start]:pl-3 \
       has-data-[icon=inline-end]:pr-3",

  icon: "size-8",
  "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)]",
  "icon-lg": "size-9",
}


const buttonVariants = cva(baseButton, {
  variants: {
    variant: variantStyles,
    size: sizeStyles,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type CommonProps = ButtonVariantProps & {
  className?: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;

function Button({ className, variant, size, ...props }: ButtonProps) {

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type="button"
      {...props}
    />
  )
}

export type ButtonLinkProps = LinkProps & CommonProps;

function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, ButtonLink };