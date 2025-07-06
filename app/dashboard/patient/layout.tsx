import { PatientNav } from "@/components/patient-nav";
import { PatientHeader } from "@/components/patient-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  console.log("✅ PatientLayout cargado");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 w-full">
        <aside className="w-64 border-r bg-white p-4">
          <PatientNav />
        </aside>
        <div className="flex flex-col flex-1">
          <PatientHeader />
          <main className="flex-1 p-6 flex justify-center items-start">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}


