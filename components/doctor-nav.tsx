// components/doctor-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Users, MessageCircle, Inbox } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export function DoctorNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Panel Principal",
      href: "/dashboard/doctor",
      icon: Home,
    },
    {
      title: "Pacientes",
      href: "/dashboard/doctor/patients",
      icon: Users,
    },
    {
      title: "Citas",
      href: "/dashboard/doctor/appointments",
      icon: Calendar,
    },
    {
      title: "Historias Clinicas",
      href: "/dashboard/doctor/notas",
      icon: MessageCircle,
    },
    {
      title: "Solicitudes",
      href: "/dashboard/doctor/solicitudes",
      icon: Inbox,
    },
  ];

  return (
    <div className="mt-4">
      <SidebarGroup>
        <SidebarGroupLabel>Administración</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}
