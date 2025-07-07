// components/ui/container.tsx
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente Container para centrar contenido
 * y añadir padding responsive.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={[
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
