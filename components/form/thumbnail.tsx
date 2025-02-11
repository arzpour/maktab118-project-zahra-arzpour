"use client";

import { productSchemaType } from "@/server/validations/product.validation";
import Image from "next/image";
import React from "react";
import { Control, useController } from "react-hook-form";

interface IThumbnail {
  name: keyof productSchemaType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  defaultValue?: string;
  status?: string;
}

export const Thumbnail: React.FC<IThumbnail> = ({
  name,
  control,
  defaultValue,
  status,
}) => {
  const [url, setUrl] = React.useState<string | undefined>(undefined);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  React.useEffect(() => {
    if (status === "edit" && defaultValue) {
      setUrl(
        `http://localhost:8000/images/products/thumbnails/${defaultValue}`
      );
    }
  }, [defaultValue, status]);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    field.onChange(file);

    if (!file) return;

    const newUrl = URL.createObjectURL(file);
    setUrl(newUrl);
  };

  const deleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setUrl(undefined);
    field.onChange(undefined);
  };

  return (
    <div className="w-full">
      <div
        onClick={onClick}
        className={`
          relative my-4 border rounded-md flex
          items-center justify-center h-36 hover:bg-slate-50 cursor-pointer
          ${!!error ? "border-red-400" : "border-slate-300"}
        `}
      >
        {!!url && (
          <>
            <Image
              src={url}
              alt="thumbnail"
              width={500}
              height={500}
              className="w-full h-full object-cover object-center rounded-md"
            />
            <button
              onClick={deleteImage}
              className="absolute top-1 right-1 bg-gray-900 opacity-70 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
            >
              ×
            </button>
          </>
        )}
        {!url && (
          <p
            className={`
              text-xs font-medium
              ${!!error ? "text-red-400" : "text-slate-500"}
            `}
          >
            عکس اصلی را وارد کنید
          </p>
        )}
        <input
          onChange={onChange}
          ref={inputRef}
          type="file"
          className="hidden"
        />
      </div>
      {!!error && (
        <p className="text-red-400 text-xs capitalize font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
};
