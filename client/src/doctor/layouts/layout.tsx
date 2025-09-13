

import { Outlet } from "react-router-dom";
import HeaderLayout from "./header/header.layout";
import FooterLayout from "./footer/footer.layout";
import DoctorSidebar from "../components/sidebar/sidebar.component";

const DoctorLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderLayout />
            <div className="flex flex-1 w-full">
                <DoctorSidebar />
                <main className="flex-1 p-4 bg-gray-150 min-h-0">
                    <Outlet />
                </main>
                 {/* <Outlet /> */}
            </div>  
            <FooterLayout />
        </div>
    );
};

export default DoctorLayout;