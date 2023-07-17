import { InputProps } from "./Input.props";
import cn from "classnames";
import styles from "./Input.module.css";
import { ForwardedRef, forwardRef } from "react";
// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.inputWrapper, className, "w-full")}>
        <input
          className={cn(className, styles.input, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
