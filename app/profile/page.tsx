import ProfileTabs from "@/components/profile/profileTabs";
import UserInfo from "@/components/profile/userInfo";
import UserOrders from "@/components/profile/userOrders";
import React from "react";

const Profile = () => {
  return (
    <div className="bg-BackgroundColor pb-9 text-white max-w-1770 mx-auto pt-10 h-svh">
      <div className="max-w-1400 mx-auto flex">
        <div className="fixed top-0 right-0 z-40 w-64 h-screen shadow-lg shadow-BlueL transition-transform -translate-x-full sm:translate-x-0">
          <ProfileTabs />
        </div>
        <div className="mr-64 w-full">
          <UserInfo />
          <UserOrders />
        </div>
      </div>
    </div>
  );
};

export default Profile;
