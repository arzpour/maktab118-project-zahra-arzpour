import { Input } from "@/components/form/input";
import SelectBox from "@/components/form/selectbox-categories";
import { Textarea } from "@/components/form/textarea";
import { Thumbnail } from "@/components/form/thumbnail";
import useCategoryList from "@/hooks/useCategory";
import useSubCategoryList from "@/hooks/useSubcategory";
import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Images } from "./images";
import {
  editProductSchema,
  editProductSchemaType,
} from "@/server/validations/product.validation";
import useGetProductById from "@/hooks/useGetProductById";
import { useEditProducts } from "@/apis/mutations/product";

interface IEditProductForm {
  setShowEditProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const EditProductForm: React.FC<IEditProductForm> = ({
  id,
  setShowEditProductModal,
}) => {
  const { control, handleSubmit, reset } = useForm<editProductSchemaType>({
    mode: "all",
    resolver: zodResolver(editProductSchema),
  });

  const { data, isSuccess } = useGetProductById(id);

  console.log(data, "all data");

  const { data: useCategoryData } = useCategoryList(Infinity);
  const { data: useSubCategoryData } = useSubCategoryList(Infinity);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] =
    React.useState<string>("");

  const categoryName = data?.category.name;
  const subcategoryName = data?.subcategory.name;

  React.useEffect(() => {
    if (isSuccess && data) {
      reset({
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        price: data.price,
      });

      setSelectedCategory(categoryName!);
      setSelectedSubCategory(subcategoryName!);
    }
  }, [isSuccess, data, reset]);

  const editProduct = useEditProducts();

  const categoryId =
    useCategoryData?.data?.categories.find(
      (category) => category.name === selectedCategory
    )?._id || "";

  const filteredSubCategoriesByCategoryByName =
    useSubCategoryData?.data?.subcategories.filter(
      (subCategory) => subCategory.category === categoryId
    );

  console.log(categoryId, "cate");

  const subcategoryId =
    filteredSubCategoriesByCategoryByName?.find(
      (subCategory) => subCategory.name === selectedSubCategory
    )?._id || "";

  console.log(subcategoryId, "sub");

  const onSubmit: SubmitHandler<editProductSchemaType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", categoryId);
      formData.append("subcategory", subcategoryId);
      formData.append("price", data.price.toString());
      formData.append("quantity", data.quantity.toString());

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
      await editProduct.mutateAsync({
        data: formData,
        id: id,
      });

      setShowEditProductModal(false);

      toast.success("ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد");
      errorHandler(error as AxiosError<IError>);
    }
  };

  console.log(data?.thumbnail, "thum");

  console.log(data?.images, "iimg");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-md w-full mx-auto"
    >
      <div className="flex gap-2 mb-4">
        <Controller
          control={control}
          name="category"
          defaultValue={categoryName}
          render={({ field, fieldState }) => (
            <SelectBox
              selectItem={useCategoryData?.data?.categories || []}
              selected={selectedCategory!}
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
          defaultValue={subcategoryName}
          render={({ field, fieldState }) => (
            <SelectBox
              selectItem={filteredSubCategoriesByCategoryByName || []}
              selected={selectedSubCategory!}
              setSelected={setSelectedSubCategory}
              error={fieldState.error?.message}
              label="زیر مجموعه"
              {...field}
            />
          )}
        />
      </div>

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

      <div className="flex gap-3 mt-2">
        <Controller
          control={control}
          name="price"
          render={({ field, fieldState }) => (
            <Input type="text" placeholder="قیمت محصول" {...field} />
          )}
        />
        <Controller
          control={control}
          name="quantity"
          render={({ field, fieldState }) => (
            <Input type="text" placeholder="تعداد محصول" {...field} />
          )}
        />
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Textarea
            type="text"
            placeholder="توضیحات محصول"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <div className="flex gap-4 w-full">
        <Thumbnail
          name="thumbnail"
          control={control}
          defaultValue={data?.thumbnail}
          status="edit"
        />

        <Images name="images" control={control} defaultValue={data?.images} />
      </div>

      <div className="mt-2 mb-1 flex gap-4 justify-end">
        <button
          type="submit"
          className="mb-4 mt-3 shadow-sm text-sm py-2 px-7 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          ویرایش
        </button>
        <button
          type="button"
          onClick={() => setShowEditProductModal(false)}
          className="mb-4 mt-3 shadow-sm text-sm py-2 px-7 bg-red-600 font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          لغو
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
