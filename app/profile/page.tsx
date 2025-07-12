import ProfileTabs from "@/components/profile/profileTabs";
import ProfileTabsMobile from "@/components/profile/profileTabsMobile";
import UserInfo from "@/components/profile/userInfo";
import UserOrders from "@/components/profile/userOrders";
import React from "react";

const Profile = () => {
  return (
    <div className="bg-BackgroundColor pb-9 text-white max-w-1770 mx-auto pt-10 h-svh">
      <div className="flex flex-col sm:flex-row">
        <div className="hidden sm:block w-20 md:w-72 h-screen shadow-lg shadow-BlueL">
          <ProfileTabs />
        </div>
        <ProfileTabsMobile />
        <div className="mx-5 sm:mx-10 w-11/12">
          <UserInfo />
          <UserOrders />
        </div>
      </div>
    </div>
  );
};

export default Profile;
