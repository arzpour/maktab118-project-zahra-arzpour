"use client";
import { useEditUserById } from "@/apis/mutations/user";
import useUserById from "@/hooks/useUserById";
import { queryClient } from "@/providers/tanstack.provider";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getUserId } from "@/utils/session";
import { MdOutlineArrowBack } from "react-icons/md";
import React, { ChangeEvent } from "react";
import { profileActions } from "@/redux/features/profile.slice";

interface IEditUserInfo {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
}

const UserInfo = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newData, setNewData] = React.useState<IEditUserInfo>({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
  });

  const { profileTab } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const { data: userInformation, isLoading } = useUserById();

  const editUserInfo = useEditUserById();
  const userId = getUserId();

  const editUserInfoHandler = async () => {
    const data: Partial<IEditUserInfo> = {};

    if (newData.firstname?.trim()) data.firstname = newData.firstname.trim();
    if (newData.lastname?.trim()) data.lastname = newData.lastname.trim();
    if (newData.phoneNumber?.trim())
      data.phoneNumber = newData.phoneNumber.trim();
    if (newData.address?.trim()) data.address = newData.address.trim();

    if (Object.keys(data).length === 0) return;
    try {
      const res = await editUserInfo.mutateAsync({
        userId: userId as string,
        data,
      });
      if (res.status === "success") {
        setNewData({
          firstname: "",
          lastname: "",
          phoneNumber: "",
          address: "",
        });
        queryClient.invalidateQueries({ queryKey: ["get-user-by-id"] });
      }
    } catch (error) {
      console.log("🚀 ~ editUserInfoHandler ~ error:", error);
    }
  };

  return (
    profileTab === "userInfo" && (
      <>
        <div className="flex justify-between items-start">
          <h3 className="text-orange mb-7 text-md sm:text-xl">
            اطلاعات کاربری
          </h3>
          <button
            className="sm:hidden"
            onClick={() => dispatch(profileActions.setProfileTab(""))}
          >
            <MdOutlineArrowBack className="text-slate-200 w-6 h-6" />
          </button>
        </div>
        <div className="bg-BlueL text-white p-5 lg:p-10 rounded-xl space-y-6 sm:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-between items-center lg:w-2/3">
            <div className="flex gap-3 items-center">
              <h5 className="text-orange opacity-90">نام:</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="..."
                  value={newData.firstname}
                  className="text-sm text-slate-400 bg-BackgroundColor outline-none border-none rounded px-2 py-1"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewData((prev) => ({
                      ...prev,
                      firstname: e.target.value,
                    }))
                  }
                />
              ) : (
                <>
                  {isLoading && (
                    <div className="w-32 h-7 bg-BackgroundColor rounded-lg animate-pulse"></div>
                  )}
                  <span className="text-slate-200">
                    {userInformation?.data?.user.firstname}{" "}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <h5 className="text-orange opacity-90">نام خانوادگی:</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="..."
                  className="text-sm text-slate-400 bg-BackgroundColor outline-none border-none rounded px-2 py-1"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewData((prev) => ({
                      ...prev,
                      lastname: e.target.value,
                    }))
                  }
                />
              ) : (
                <>
                  {isLoading && (
                    <div className="w-32 h-7 bg-BackgroundColor rounded-lg animate-pulse"></div>
                  )}
                  <span className="text-slate-200">
                    {userInformation?.data?.user.lastname}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-between items-center lg:w-2/3">
            <div className="flex gap-3 items-center">
              <h5 className="text-orange opacity-90">تلفن همراه:</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="...۰۹"
                  className="text-sm text-slate-400 bg-BackgroundColor outline-none border-none rounded px-2 py-1"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              ) : (
                <>
                  {isLoading && (
                    <div className="w-40 h-7 bg-BackgroundColor rounded-lg animate-pulse"></div>
                  )}
                  <span className="text-slate-200">
                    {userInformation?.data?.user.phoneNumber}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <h5 className="text-orange opacity-90">آدرس:</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="..."
                  className="text-sm text-slate-400 bg-BackgroundColor outline-none border-none rounded px-2 py-1"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    console.log("🚀 ~ UserInfo ~ e:", e.target.value);
                    setNewData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                  }}
                />
              ) : (
                <>
                  {isLoading && (
                    <div className="w-56 h-7 bg-BackgroundColor rounded-lg animate-pulse"></div>
                  )}
                  <span className="text-slate-200">
                    {userInformation?.data?.user.address}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-orange text-BlueDark rounded-md px-5 py-1.5 mt-4 justify-end ml-3 outline-none"
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                editUserInfoHandler();
              }
            }}
          >
            {isEditing ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </>
    )
  );
};

export default UserInfo;
