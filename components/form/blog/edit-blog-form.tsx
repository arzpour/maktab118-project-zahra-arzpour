import { Input } from "@/components/form/input";
import { Thumbnail } from "@/components/form/thumbnail";
import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextEditor } from "../text-editor";
import {
  blogSchema,
  blogSchemaType,
} from "@/server/validations/blog.validation";
import { useEditBlog } from "@/apis/mutations/blog";
import useGetBlogById from "@/hooks/useGetBlogById";

interface IEditBlogForm {
  setShowEditBlogModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const EditBlogForm: React.FC<IEditBlogForm> = ({
  id,
  setShowEditBlogModal,
}) => {
  const { control, handleSubmit, reset } = useForm<blogSchemaType>({
    mode: "all",
    resolver: zodResolver(blogSchema),
  });

  const { data: blog, isSuccess } = useGetBlogById(id);

  const editBlog = useEditBlog();

  const onSubmit: SubmitHandler<blogSchemaType> = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title || "");
    formData.append("description", data.description || "");

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    try {
      await editBlog.mutateAsync({
        data: formData,
        id,
      });

      setShowEditBlogModal(false);

      toast.success("ویرایش شد");
      queryClient.invalidateQueries({ queryKey: ["get-blog"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد");
      errorHandler(error as AxiosError<IError>);
    }
  };

  React.useEffect(() => {
    if (isSuccess && blog) {
      reset({
        title: blog.title,
        description: blog.description,
        thumbnail: blog.thumbnail,
      });
    }
  }, [isSuccess, blog, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-xl w-full mx-auto"
    >
      <div className="mb-6">
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <Input
              type="text"
              placeholder="عنوان وبلاگ"
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
          <TextEditor
            defaultValue={blog?.description}
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Thumbnail
        name="thumbnail"
        control={control}
        defaultValue={blog?.thumbnail}
        status="edit"
      />

      <div className="mt-2 mb-1 flex gap-4 justify-end">
        <button
          type="submit"
          className="mb-4 mt-3 shadow-sm text-sm py-2 px-7 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          ویرایش
        </button>
        <button
          type="button"
          onClick={() => setShowEditBlogModal(false)}
          className="mb-4 mt-3 shadow-sm text-sm py-2 px-7 bg-red-600 font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
        >
          لغو
        </button>
      </div>
    </form>
  );
};

export default EditBlogForm;
