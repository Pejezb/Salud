"use client";

import { formatDistanceToNow } from "date-fns";
import { Notification } from "@/types/notification";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
  notification: Notification;
  onRead: () => void;
}

export default function NotificationItem({
  notification,
  onRead,
}: Props) {
  return (
    <DropdownMenuItem
      className="flex flex-col space-y-1"
      onSelect={onRead}
    >
      <span className="text-sm">{notification.descripcion}</span>
      <span className="text-xs text-muted-foreground">
        {formatDistanceToNow(new Date(notification.fecha), {
          addSuffix: true,
        })}
      </span>
    </DropdownMenuItem>
  );
}
