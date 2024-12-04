"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { queryClient } from "@/providers/tanstack.provider";
import useCategoryList from "@/hooks/useCategory";
import {
  subcategorySchema,
  subcategorySchemaType,
} from "@/server/validations/subcategory.validation";
import { useAddSubCategory } from "@/apis/mutations/subcategory";
import SelectBoxCategory from "./selectbox-category";

interface IAddSubCategoryForm {
  setShowAddSubCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSubCategoryForm: React.FC<IAddSubCategoryForm> = ({
  setShowAddSubCategoryModal,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const { data: categoryData } = useCategoryList();

  const categoryId =
    categoryData?.data?.categories.find(
      (category) => category.name === selectedCategory
    )?._id || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<subcategorySchemaType>({
    mode: "all",
    resolver: zodResolver(subcategorySchema),
  });

  const createSubCategory = useAddSubCategory();

  const onSubmit: SubmitHandler<subcategorySchemaType> = async (data) => {
    try {
      console.log(data);
      const newData = { ...data, category: categoryId };
      console.log(newData);

      await createSubCategory.mutateAsync(newData);
      setShowAddSubCategoryModal(false);

      toast.success("ایجاد شد", {
        style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-subcategories"] });
    } catch (error) {
      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-md w-full mx-auto"
    >
      <div className="relative flex items-center text-gray-900">
        <input
          {...register("name")}
          type="text"
          required
          className="w-full bg-slate-200 rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
          placeholder="نام زیر مجموعه"
        />
      </div>
      {errors.name && (
        <p className="text-red-700 mt-4 text-xs font-medium text-start">
          {errors.name.message}
        </p>
      )}
      <SelectBoxCategory
        categories={categoryData?.data?.categories || []}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {errors.category && (
        <p className="text-red-700 mt-4 text-xs font-medium text-start">
          {errors.category.message}
        </p>
      )}

      <div className="mt-9">
        <button
          type="submit"
          className="w-full mb-3 shadow-sm text-sm py-2.5 px-5 bg-[#15273b] font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          اضافه کن
        </button>
      </div>
    </form>
  );
};

export default AddSubCategoryForm;
