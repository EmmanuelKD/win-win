// layout
import AdminGuard from "@/guards/admin";
import { ReactNode } from "react";
import "simplebar-react/dist/simplebar.min.css";
// import DashboardLayout from "src/components/layout/_admin";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <>{children}</>
      {/* <DashboardLayout>{children}</DashboardLayout> */}
    </AdminGuard>
  );
}
