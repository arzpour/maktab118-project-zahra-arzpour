"use client";

import React, { useCallback, useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import "jodit-react/build/jodit-react.js";

interface ITextEditor {
  defaultValue?: string;
  error?: string;
  onChange: (value: string) => void;
}

export const TextEditor: React.FC<ITextEditor> = ({
  defaultValue,
  error,
  onChange,
}) => {
  const [content, setContent] = useState<string>(defaultValue || "");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "توضیحات را وارد کنید",
      style: {
        fontSize: "14px",
      },
    }),
    []
  );

  const handleBlur = useCallback(
    (htmlContent: string) => {
      setContent(htmlContent);
      onChange(htmlContent);
    },
    [onChange]
  );

  return (
    <div>
      <JoditEditor
        value={content}
        config={config}
        onBlur={handleBlur}
        onChange={(htmlContent: string) => setContent(htmlContent)} // دریافت HTML کامل
      />
      {!!error && (
        <p className="text-red-400 text-start text-xs font-semibold capitalize">
          {error}
        </p>
      )}
    </div>
  );
};
