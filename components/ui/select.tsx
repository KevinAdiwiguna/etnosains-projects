"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";


const Select = SelectPrimitive.Root;


function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}


function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "flex flex-1 text-left",
        className,
      )}
      {...props}
    />
  );
}


interface SelectTriggerProps
  extends SelectPrimitive.Trigger.Props {
  size?: "sm" | "default";
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        /* Layout */
        "flex w-full items-center justify-between gap-3",

        /* Size */
        "h-13",
        "px-3",

        /* Border */
        "border-4 border-border",

        /* Background */
        "bg-background",

        /* Typography */
        "text-sm text-foreground",

        /* Shape */
        "rounded-none",

        /* Shadow */
        "shadow-[2px_2px_0_var(--border)]",

        /* Focus */
        "outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",

        /* Disabled */
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        /* Placeholder */
        "data-placeholder:text-muted-foreground",

        /* Value */
        "*:data-[slot=select-value]:line-clamp-1",
        "*:data-[slot=select-value]:flex",
        "*:data-[slot=select-value]:items-center",

        /* Icons */
        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-5",

        className,
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="size-5 shrink-0 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  );
}


function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | "align"
    | "alignOffset"
    | "side"
    | "sideOffset"
    | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            /* Layout */
            "relative isolate z-50",
            "max-h-(--available-height)",
            "w-(--anchor-width)",
            "min-w-40",
            "overflow-x-hidden overflow-y-auto",

            /* Border */
            "border-4 border-border",

            /* Background */
            "bg-background",
            "text-foreground",

            /* Shape */
            "rounded-none",

            /* Shadow */
            "shadow-[4px_4px_0_var(--border)]",

            /* Animation */
            "origin-(--transform-origin)",
            "duration-100",

            "data-open:animate-in",
            "data-open:fade-in-0",
            "data-open:zoom-in-95",

            "data-closed:animate-out",
            "data-closed:fade-out-0",
            "data-closed:zoom-out-95",

            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />

          <SelectPrimitive.List className="p-1">
            {children}
          </SelectPrimitive.List>

          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}


function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5",
        "font-heading text-xs font-bold uppercase",
        "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}


function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        /* Layout */
        "relative flex w-full items-center gap-2",

        /* Spacing */
        "px-3 py-2.5",
        "pr-9",

        /* Typography */
        "text-sm",

        /* Shape */
        "rounded-none",

        /* Interaction */
        "cursor-default",
        "select-none",
        "outline-none",

        /* Highlight */
        "data-highlighted:bg-primary",
        "data-highlighted:text-primary-foreground",

        /* Disabled */
        "data-disabled:pointer-events-none",
        "data-disabled:opacity-50",

        /* Icons */
        "[&_svg]:pointer-events-none",
        "[&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-4",

        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 items-center gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-3 flex size-4 items-center justify-center">
            <CheckIcon className="size-4" />
          </span>
        }
      />
    </SelectPrimitive.Item>
  );
}


function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none",
        "my-1 h-0 border-t-2 border-border",
        className,
      )}
      {...props}
    />
  );
}


function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.ScrollUpArrow
>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "flex w-full items-center justify-center",
        "border-b-2 border-border",
        "bg-background py-1",
        "cursor-default",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  );
}


function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<
  typeof SelectPrimitive.ScrollDownArrow
>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "flex w-full items-center justify-center",
        "border-t-2 border-border",
        "bg-background py-1",
        "cursor-default",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  );
}

interface SelectFieldProps
  extends Omit<
    React.ComponentProps<typeof SelectPrimitive.Root>,
    "children"
  > {
  title: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}

function SelectField({
  title,
  required = false,
  children,
  className,
  placeholder,
  ...props
}: SelectFieldProps) {
  const selectId = title
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label
          htmlFor={selectId}
          className="font-heading text-base font-bold uppercase"
        >
          {title}
        </label>

        {required && (
          <span
            className="
              shrink-0
              border-2 border-border
              bg-primary
              px-2 py-1
              font-heading
              text-[10px]
              font-bold
              uppercase
              leading-none
            "
          >
            Wajib Diisi
          </span>
        )}
      </div>

      {/* Select */}
      <Select {...props}>
        <SelectTrigger id={selectId}>
          <SelectValue
            placeholder={
              placeholder ??
              `Pilih ${title.toLowerCase()}`
            }
          />
        </SelectTrigger>

        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </div>
  );
}


export {
  Select,
  SelectField,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
