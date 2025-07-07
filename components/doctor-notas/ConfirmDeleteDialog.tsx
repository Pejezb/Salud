// components/doctor-notas/ConfirmDeleteDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ConfirmDeleteDialogProps {
  /** Function to call when the user confirms deletion */
  onConfirm: () => void;
  /** Optional function to call when the dialog closes without deleting */
  onCancel?: () => void;
  /** Element that triggers the dialog (e.g., a delete button) */
  trigger: React.ReactNode;
}

/**
 * Modal de confirmación para eliminar una nota clínica.
 * Uso:
 * <ConfirmDeleteDialog
 *   trigger={<Button variant="destructive">Eliminar Nota</Button>}
 *   onConfirm={handleDelete}
 * />
 */
export default function ConfirmDeleteDialog({
  onConfirm,
  onCancel,
  trigger,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar esta nota clínica? Esta acción
            no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
