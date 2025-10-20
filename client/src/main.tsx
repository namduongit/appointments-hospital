import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProductionProvider } from "./contexts/production.context";
import "./assets/index.css";

import PatientLayout from "./layouts/patient/layout";
import PatientHomePage from "./pages/patient/home/home.page";
import RotateLoading from "./components/common/others/loading";

const AssistorLayout = lazy(() => import("./layouts/assistor/layout"));
const AssistorHomePage = lazy(() => import("./pages/assistor/home/home.page"));
const AssistorAppointmentPage = lazy(() => import("./pages/assistor/appointment/appointment.page"));

const DoctorLayout = lazy(() => import("./layouts/doctor/layout"));
const DoctorHomePage = lazy(() => import("./pages/doctor/home/home.page"));
const DoctorLoginPage = lazy(() => import("./pages/doctor/login/login.page"));
const DoctorAppointmentPage = lazy(() => import("./pages/doctor/appointment/appointment.page"));
const DoctorProfilePage = lazy(() => import("./pages/doctor/profile/profile.page"));

const AdminLayout = lazy(() => import("./layouts/admin/layout"));
const AdminAccountPage = lazy(() => import("./pages/admin/account/account.page"));
const AdminDoctorPage = lazy(() => import("./pages/admin/doctor/doctor.page"));
const AdminAppointmentsPage = lazy(() => import("./pages/admin/appointment/appointment.page"));
const AdminDepartmentPage = lazy(() => import("./pages/admin/department/department.page"));
const AdminMedicinePage = lazy(() => import("./pages/admin/medicine/medicine.page"));
const AdminInventoryPage = lazy(() => import("./pages/admin/inventory/inventory.page"));
const AdminMedicineDashboardPage = lazy(() => import("./pages/admin/medicine-dashboard/medicine-dashboard.page"));
const AdminMedicalPackagePage = lazy(() => import("./pages/admin/medical-package/medical-package.page"));

const LoginPage = lazy(() => import("./pages/patient/login/login.page"));
const RegisterPage = lazy(() => import("./pages/patient/register/register.page"));
const AccountPage = lazy(() => import("./pages/patient/account/account.page"));
const BookingPage = lazy(() => import("./pages/patient/booking/booking.page"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientHomePage },
      {
        path: "auth/login",
        Component: LoginPage,
      },
      {
        path: "auth/register",
        Component: RegisterPage,
      },
      {
        path: "page/account",
        Component: AccountPage
      },
      {
        path: "page/booking",
        Component: BookingPage
      }
    ],
  },
  {
    path: "/assistor",
    Component: AssistorLayout,
    children: [
      { index: true, Component: AssistorHomePage },
      {
        path: "appointments",
        Component: AssistorAppointmentPage
      }
    ]
  },
  {
    path: "doctor",
    Component: DoctorLayout,
    children: [
      { index: true, Component: DoctorHomePage },
      {
        path: "auth/login",
        Component: DoctorLoginPage
      },
      {
        path: "appointments",
        Component: DoctorAppointmentPage
      },
      {
        path: "profile",
        Component: DoctorProfilePage
      }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "accounts",
        Component: AdminAccountPage
      },
      {
        path: "doctors-profile",
        Component: AdminDoctorPage
      },
      {
        path: "appointments",
        Component: AdminAppointmentsPage
      },
      {
        path: "department-room",
        Component: AdminDepartmentPage
      },
      {
        path: "medicine-dashboard",
        Component: AdminMedicineDashboardPage
      },
      {
        path: "medicine",
        Component: AdminMedicinePage
      },
      {
        path: "inventory",
        Component: AdminInventoryPage
      },
      {
        path: "medical-package",
        Component: AdminMedicalPackagePage
      }
    ]
  },
]);

// Render app
createRoot(document.getElementById("root")!).render(
  <ProductionProvider>
    <Suspense fallback={<RotateLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  </ProductionProvider>
);
