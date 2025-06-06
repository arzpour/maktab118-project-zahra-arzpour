"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import SelectBox from "../selectbox-categories";
import { Input } from "../input";

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<subcategorySchemaType>({
    mode: "all",
    resolver: zodResolver(subcategorySchema),
  });

  const createSubCategory = useAddSubCategory();

  const onSubmit: SubmitHandler<subcategorySchemaType> = async (data) => {
    try {
      const newData = { ...data, category: categoryId };

      await createSubCategory.mutateAsync(newData);
      setShowAddSubCategoryModal(false);

      toast.success("ایجاد شد", {
        className: "custom-toast",
      });
      queryClient.invalidateQueries({ queryKey: ["get-subcategories"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد", {
        className: "custom-toast",
      });
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
      <SelectBox
        selectItem={categoryData?.data?.categories || []}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
        error={errors.category?.message}
        label="زیر مجموعه"
      />
      <div className="mt-6 mb-4">
        <button
          type="submit"
          className="w-full mb-3 shadow-sm text-sm py-2.5 px-5 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          اضافه کن
        </button>
      </div>
    </form>
  );
};

export default AddSubCategoryForm;
