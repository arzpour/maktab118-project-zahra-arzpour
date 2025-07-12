import React from "react";

export interface IUseDebounce {
  orgValue: string;
  timeout: number;
}

export const useDebounce = ({ orgValue, timeout = 1000 }: IUseDebounce) => {
  const [value, setValue] = React.useState<string>("");
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setValue(orgValue);
    }, timeout);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [orgValue, timeout]);

  return value;
};
