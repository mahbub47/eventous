import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const {isAuthenticated, isLoading} = useAuth();
  const navigate = useNavigate();
  console.log("IS LOADING: ", isLoading);
  useEffect(() => {
    if(!isAuthenticated){
      navigate("/");
    }
  });

  return (
    <div className="w-full min-h-screen ">
      <div className="w-full relative md:mt-30 mt-10 ">
        <div className="bg-yellow-300 text-stone-900 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Explore
        </div>
        <div className="text-stone-900 w-full lg:text-[94px]/24 font-normal md:text-[64px]/16 text-[32px]/8 ps-[20%]">
          Events
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
