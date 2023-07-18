import {FC, forwardRef, ReactNode} from "react";
import cn from "classnames";
import styles from "./button.module.css";
// import BasketIcon from './basket.svg';
import { buttonProps } from "./button.props";
export const Button = forwardRef<HTMLButtonElement, buttonProps>(({
  children,
  className,
  appearance = "green",
  ...props
}: buttonProps) => {
    Button.displayName = "Button"
    return (
    <button
      className={cn(className, [
        {
          [styles.ghost]: appearance == "ghost",
          [styles.green]: appearance == "green",
        },
        { ...props },
      ], styles.button)}
    >
      {children}{" "}
    </button>
  );
});
