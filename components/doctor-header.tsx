"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Brain, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

export function DoctorHeader() {
  const doctorName = "Dr. Juan Martínez";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-semibold mr-4">
          <SidebarTrigger />
          <Link href="/dashboard/doctor" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-teal-600" />
            <span>{doctorName}</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <NotificationDropdown />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Menú usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{doctorName}</p>
                  <p className="text-xs leading-none text-muted-foreground">Neuropsicólogo</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/login" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}