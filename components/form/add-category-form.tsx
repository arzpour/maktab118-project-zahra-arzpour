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

interface IAddCategoryForm {
  setShowAddCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryForm: React.FC<IAddCategoryForm> = ({
  setShowAddCategoryModal,
}) => {
  const { handleSubmit, control } = useForm<categorySchemaType>({
    mode: "all",
    resolver: zodResolver(categorySchema),
  });

  const createCategory = useAddCategory();

  console.log(createCategory.data?.data?.category);

  const onSubmit: SubmitHandler<categorySchemaType> = async (data) => {
    try {
      console.log(data);
      await createCategory.mutateAsync(data);
      setShowAddCategoryModal(false);
      toast.success("ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
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
        name="name"
        render={({ field, fieldState }) => (
          <Input
            type="text"
            placeholder="نام دسته بندی"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

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

export default AddCategoryForm;
