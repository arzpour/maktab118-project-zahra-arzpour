"use client";

import { productSchemaType } from "@/server/validations/product.validation";
import Image from "next/image";
import React from "react";
import { Control, useController } from "react-hook-form";

interface IImages {
  name: keyof productSchemaType;
  control: Control<any>;
  defaultValue?: string[];
  status?: string;
}

export const Images: React.FC<IImages> = ({
  name,
  control,
  defaultValue,
  status,
}) => {
  const [pastUrls, setPastUrls] = React.useState<string[] | undefined>(
    defaultValue
  );
  const [urls, setUrls] = React.useState<string[] | undefined>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  React.useEffect(() => {
    if (status === "edit" && defaultValue) {
      setPastUrls(defaultValue);
    }
  }, [defaultValue, status]);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const filesList = event.target.files;

    if (!filesList) return;

    const arrayFiles = Array.from(filesList);

    const allFiles = [...files, ...arrayFiles];
    setFiles(allFiles);
    field.onChange(allFiles);

    if (allFiles.length === 0) {
      setUrls([]);
      setPastUrls([]);
      return;
    }

    const filesUrl = allFiles.map((file) => URL.createObjectURL(file));
    // setUrls(pastUrls ? [...pastUrls, ...filesUrl] : filesUrl);
    setUrls(filesUrl);
  };

  const deletImage = (imageIndex: number) => {
    const newFiles = files.filter((_, item) => item !== imageIndex);
    const newUrls = urls?.filter((_, item) => item !== imageIndex);

    setFiles(newFiles);
    setUrls(newUrls);

    field.onChange(newFiles);
  };

  const deletPastImage = (imageIndex: number) => {
    const newPastUrls = pastUrls?.filter((_, item) => item !== imageIndex);

    setPastUrls(newPastUrls);

    // field.onChange(newPastUrls);
    field.onChange(newPastUrls?.length ? newPastUrls : []);
  };

  console.log(urls);

  console.log(pastUrls);

  return (
    <div className="w-full">
      <div
        onClick={onClick}
        className={`
          relative my-4 border rounded-md flex
          items-center justify-center h-36 hover:bg-slate-50 cursor-pointer overflow-auto scrollbar
          ${!!error ? "border-red-400" : "border-slate-300"}`}
      >
        {!!urls && urls.length > 0 && (
          <div className="flex flex-wrap gap-2 absolute top-0 py-4">
            {urls?.map((image, index) => (
              <div
                key={index}
                className="relative w-20 rounded-md overflow-hidden"
              >
                {/* <Image
                  // src={`/${image}`}
                  src={image}
                  width={500}
                  height={500}
                  alt={`Image ${index + 1}`}
                  className="object-center"
                /> */}
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-center"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletImage(index);
                  }}
                  className="absolute top-1 right-1 bg-gray-900 opacity-70 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {!!pastUrls && pastUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 absolute top-0 py-4">
            {pastUrls?.map((image, index) => (
              <div
                key={index}
                className="relative w-20 rounded-md overflow-hidden"
              >
                <Image
                  src={`http://localhost:8000/images/products/images/${image}`}
                  width={500}
                  height={500}
                  alt={`Image ${index + 1}`}
                  className="object-center"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletPastImage(index);
                  }}
                  className="absolute top-1 right-1 bg-gray-900 opacity-70 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          onChange={onChange}
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
        />
        {!urls && !pastUrls && (
          <p
            className={`
            text-xs font-medium
            ${!!error ? "text-red-400" : "text-slate-500"}`}
          >
            عکس هایتان را وارد کنید
          </p>
        )}
      </div>
      {!!error && error.message && (
        <p className="text-red-400 text-xs capitalize font-semibold">
          {error.message}
        </p>
      )}
    </div>
  );
};
