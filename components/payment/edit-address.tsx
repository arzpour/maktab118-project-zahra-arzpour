"use-client";

import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserId } from "@/utils/session";
import { toast } from "react-toastify";
import { queryClient } from "@/providers/tanstack.provider";
import { useEditUserById } from "@/apis/mutations/user";
import {
  editUserSchema,
  editUserSchemaType,
} from "@/server/validations/auth.validation";

interface IEditAddressModal {
  setShowEditAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAddress: React.FC<IEditAddressModal> = ({
  setShowEditAddressModal,
}) => {
  const editUser = useEditUserById();

  const userId = getUserId();

  const { control, handleSubmit, reset } = useForm<editUserSchemaType>({
    mode: "all",
    resolver: zodResolver(editUserSchema),
  });

  const onSubmit: SubmitHandler<editUserSchemaType> = async (data) => {
    try {
      const response = await editUser.mutateAsync({
        userId: userId || "",
        address: data.address || "",
      });

      toast.success("آدرس ویرایش شد");
      setShowEditAddressModal(false);

      console.log(response, "response");
      queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative z-[100]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800 opacity-85"
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={() => setShowEditAddressModal!(false)}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-lg bg-slate-100 text-left shadow-xl transition-all sm:my-8 w-11/12 sm:w-1/2 sm:max-w-xl md:max-w-md xl:w-1/4"
          >
            <div className="bg-slate-100 px-4 pb-2 pt-2 sm:p-6 sm:pb-4">
              <div className="mt-2 mb-5 text-start">
                <p className="font-medium text-gray-800">ادیت کردن محصول</p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:max-w-xl w-full mx-auto"
              >
                <Controller
                  control={control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <Input
                      type="text"
                      placeholder="آدرس"
                      error={fieldState.error?.message}
                      className="bg-slate-100 outline-none text-sm text-slate-900 border-b border-slate-800 pb-2 pr-1.5 rounded"
                      {...field}
                    />
                  )}
                />
                <div className="mt-3 mb-1 flex gap-4 justify-end">
                  <button
                    type="submit"
                    className="mb-2 mt-3 shadow-sm text-xs py-2 px-7 bg-slate-800 font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
                  >
                    ویرایش
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditAddressModal(false)}
                    className="mb-2 mt-3 shadow-sm text-xs py-2 px-7 bg-red-600 font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
                  >
                    لغو
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
