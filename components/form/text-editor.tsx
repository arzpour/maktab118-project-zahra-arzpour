// "use client";

// import React, { useCallback, useState, useMemo } from "react";
// import JoditEditor from "jodit-react";
// import "jodit-react/build/jodit-react.js";

// interface ITextEditor {
//   defaultValue?: string;
//   error?: string;
//   onChange: (value: string) => void;
// }

// export const TextEditor: React.FC<ITextEditor> = ({
//   defaultValue,
//   error,
//   onChange,
// }) => {
//   const [content, setContent] = useState<string>(defaultValue || "");

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "توضیحات را وارد کنید",
//       style: {
//         fontSize: "14px",
//       },
//     }),
//     []
//   );

//   const stripHTML = (html: string) => {
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;
//     return tempDiv.textContent || tempDiv.innerText || "";
//   };

//   const onBlur = useCallback(
//     (newContent: string) => {
//       const plainText = stripHTML(newContent);
//       setContent(plainText);
//       onChange(plainText);
//     },
//     [onChange]
//   );

//   return (
//     <div>
//       <JoditEditor
//         value={content}
//         config={config}
//         onBlur={onBlur}
//         onChange={(newContent: string) => setContent(newContent)}
//       />
//       {!!error && (
//         <p className="text-red-400 text-start text-xs font-semibold capitalize">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

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
      setContent(htmlContent); // نگه داشتن HTML به‌طور کامل
      onChange(htmlContent); // ارسال به والد بدون تغییر
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
