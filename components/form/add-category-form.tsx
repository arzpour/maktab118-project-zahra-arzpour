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
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IAddCategoryForm {
  setShowAddCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryForm: React.FC<IAddCategoryForm> = ({
  setShowAddCategoryModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<categorySchemaType>({
    mode: "all",
    resolver: zodResolver(categorySchema),
  });

  const createCategory = useAddCategory();

  const onSubmit: SubmitHandler<categorySchemaType> = async (data) => {
    try {
      console.log(data);
      await createCategory.mutateAsync(data);
      setShowAddCategoryModal(false);
      toast.success("ایجاد شد", {
        style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    } catch (error) {
      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-md w-full mx-auto"
    >
      <div>
        <div className="relative flex items-center text-gray-900">
          <input
            {...register("name")}
            type="text"
            required
            className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
            placeholder="نام دسته بندی"
          />
        </div>
        {errors.name && (
          <p className="text-red-700 mt-4 text-xs font-medium text-start">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="mt-9">
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
