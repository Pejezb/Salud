"use client";

import React, { forwardRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

const NotificationBell = forwardRef<HTMLButtonElement, NotificationBellProps>(
  ({ count, className, ...props }, ref) => (
    <Button
      ref={ref}
      {...props}
      variant="ghost"
      size="icon"
      className={`relative ${className ?? ""}`}
    >
      <Bell className="h-5 w-5 text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {count}
        </span>
      )}
      <span className="sr-only">
        {count > 0 ? `${count} nuevas notificaciones` : "Sin notificaciones"}
      </span>
    </Button>
  )
);

NotificationBell.displayName = "NotificationBell";

export default NotificationBell;