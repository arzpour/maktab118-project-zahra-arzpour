"use client";

import { useAddCategory } from "@/apis/mutations/category";
import { queryClient } from "@/providers/tanstack.provider";
import {
  categorySchema,
  categorySchemaType,
} from "@/server/validations/subcategory.validation";
import errorHandler from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "./input";
import { useAddBlog } from "@/apis/mutations/blog";
import {
  blogSchema,
  blogSchemaType,
} from "@/server/validations/blog.validation";
import { TextEditor } from "./text-editor";
import { Thumbnail } from "./thumbnail";

interface IAddBlogForm {
  setShowAddCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBlogForm: React.FC<IAddBlogForm> = ({ setShowAddCategoryModal }) => {
  const { handleSubmit, control } = useForm<blogSchemaType>({
    mode: "all",
    resolver: zodResolver(blogSchema),
  });

  const addBlog = useAddBlog();

  const onSubmit: SubmitHandler<blogSchemaType> = async (data) => {
    const formData = new FormData();

    const date = new Date();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("updatedAt", date.toString());

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }
    try {
      await addBlog.mutateAsync(formData);
      setShowAddCategoryModal(false);
      toast.success("ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد");

      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-md w-full mx-auto"
    >
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            type="text"
            placeholder="عنوان"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <TextEditor error={fieldState.error?.message} {...field} />
        )}
      />

      <Thumbnail name="thumbnail" control={control} />

      <div className="mt-6 mb-4">
        <button
          type="submit"
          className="w-full shadow-sm text-sm py-2.5 px-5 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          اضافه کن
        </button>
      </div>
    </form>
  );
};

export default AddBlogForm;
