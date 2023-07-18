import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface buttonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
  appearance?: "ghost" | "green";
}
