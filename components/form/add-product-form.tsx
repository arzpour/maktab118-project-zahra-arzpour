"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { queryClient } from "@/providers/tanstack.provider";
import useCategoryList from "@/hooks/useCategory";
import useSubCategoryList from "@/hooks/useSubcategory";
import {
  productSchema,
  productSchemaType,
} from "@/server/validations/product.validation";
import { useAddProducts } from "@/apis/mutations/product";
import SelectBox from "./selectbox-categories";

interface IAddProductForm {
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductForm: React.FC<IAddProductForm> = ({
  setShowAddProductModal,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");

  const { data: useCategoryData } = useCategoryList(Infinity);
  const { data: useSubCategoryData } = useSubCategoryList(Infinity);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<productSchemaType>({
    mode: "all",
    resolver: zodResolver(productSchema),
  });

  const categoryId =
    useCategoryData?.data?.categories.find(
      (category) => category.name === selectedCategory
    )?._id || "";

  const filteredSubCategoriesByCategory =
    useSubCategoryData?.data?.subcategories.filter(
      (subCategory) => subCategory.category === categoryId
    );

  const subcategoryId =
    filteredSubCategoriesByCategory?.find(
      (subCategory) => subCategory.name === selectedSubCategory
    )?._id || "";

  console.log(subcategoryId);

  const createProduct = useAddProducts();

  const onSubmit: SubmitHandler<productSchemaType> = async (data) => {
    try {
      const dataWithId = {
        ...data,
        category: categoryId,
        subcategory: subcategoryId,
        price: Number(data.price),
        quantity: Number(data.price),
      };
      console.log(dataWithId);

      await createProduct.mutateAsync(dataWithId);
      setShowAddProductModal(false);

      toast.success("ایجاد شد", {
        style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-md w-full mx-auto"
    >
      <SelectBox
        selectItem={useCategoryData?.data?.categories || []}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      {errors.category && (
        <p className="text-red-700 mt-4 text-xs font-medium text-start">
          {errors.category.message}
        </p>
      )}

      <SelectBox
        selectItem={filteredSubCategoriesByCategory!}
        selected={selectedSubCategory}
        setSelected={setSelectedSubCategory}
      />
      {errors.subcategory && (
        <p className="text-red-700 mt-4 text-xs font-medium text-start">
          {errors.subcategory.message}
        </p>
      )}

      <div className="mt-2">
        <input
          {...register("name")}
          type="text"
          className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
          placeholder="نام محصول"
        />
        {errors.name && (
          <p className="text-red-700 mt-4 text-xs font-medium text-start">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <input
          {...register("description")}
          type="text"
          className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
          placeholder="توضیحات محصول"
        />
        {errors.description && (
          <p className="text-red-700 mt-4 text-xs font-medium text-start">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <input
          {...register("brand")}
          type="text"
          className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
          placeholder="برند محصول"
        />
        {errors.brand && (
          <p className="text-red-700 mt-4 text-xs font-medium text-start">
            {errors.brand.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <input
          {...register("price")}
          type="text"
          className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
          placeholder="قیمت محصول"
        />
        {errors.price && (
          <p className="text-red-700 mt-4 text-xs font-medium text-start">
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="mt-2">
        <input
          {...register("quantity")}
          type="text"
          className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
          placeholder=" محصول مقدار "
        />
        {errors.quantity && (
          <p className="text-red-700 mt-4 text-xs font-medium text-start">
            {errors.quantity.message}
          </p>
        )}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="mb-4 mt-3 w-full shadow-sm text-sm py-2.5 px-5 bg-[#15273b] font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          اضافه کن
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
