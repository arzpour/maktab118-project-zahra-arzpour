"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import { Input } from "./input";
import { Thumbnail } from "./thumbnail";
import { Images } from "./images";
import { TextEditor } from "./text-editor";

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

  const { control, handleSubmit } = useForm<productSchemaType>({
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

  const createProduct = useAddProducts();

  const onSubmit: SubmitHandler<productSchemaType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("brand", data.brand);
      formData.append("price", data.price.toString());
      formData.append("quantity", data.quantity.toString());
      formData.append("category", categoryId);
      formData.append("subcategory", subcategoryId);

      if (data.thumbnail instanceof File) {
        formData.append("thumbnail", data.thumbnail);
      }

      if (Array.isArray(data.images)) {
        data.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      await createProduct.mutateAsync(formData);
      setShowAddProductModal(false);

      toast.success("محصول ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد");
      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
      <div className="flex gap-2">
        <Controller
          control={control}
          name="category"
          render={({ field, fieldState }) => (
            <SelectBox
              selectItem={useCategoryData?.data?.categories || []}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              error={fieldState.error?.message}
              label="دسته بندی"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="subcategory"
          render={({ field, fieldState }) => (
            <SelectBox
              selectItem={filteredSubCategoriesByCategory || []}
              selected={selectedSubCategory}
              setSelected={setSelectedSubCategory}
              error={fieldState.error?.message}
              label="زیر مجموعه"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              type="text"
              placeholder="نام محصول"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="brand"
          render={({ field, fieldState }) => (
            <Input
              type="text"
              placeholder="برند محصول"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex gap-2 mt-4 mb-9">
        <Controller
          control={control}
          name="price"
          render={({ field, fieldState }) => (
            <Input
              type="number"
              placeholder="قیمت محصول"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="quantity"
          render={({ field, fieldState }) => (
            <Input
              type="number"
              placeholder="مقدار محصول"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <TextEditor error={fieldState.error?.message} {...field} />
        )}
      />

      <div className="flex gap-4 w-full mt-3">
        <Thumbnail name="thumbnail" control={control} />
        <Images name="images" control={control} />
      </div>

      <div className="mt-4 mb-1">
        <button
          type="submit"
          className="mb-4 mt-3 w-full shadow-sm text-sm py-2.5 px-5 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          اضافه کن
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
