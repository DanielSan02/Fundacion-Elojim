// src/app/admin/layout.tsx
"use client";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function AdminLayout({ children }) {
  return (
    <AdminPanelLayout>
      {children}
    </AdminPanelLayout>
  );
}
