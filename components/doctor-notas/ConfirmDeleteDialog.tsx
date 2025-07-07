// components/doctor-notas/ConfirmDeleteDialog.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface ConfirmDeleteDialogProps {
  /** Llamado cuando el usuario confirma la eliminación */
  onConfirm: () => void;
  /** Opcional: llamado cuando el usuario cancela la eliminación */
  onCancel?: () => void;
  /** Elemento que dispara la apertura del diálogo */
  trigger: React.ReactNode;
}

export default function ConfirmDeleteDialog({
  onConfirm,
  onCancel,
  trigger,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar esta nota clínica? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onConfirm}>
              Eliminar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
