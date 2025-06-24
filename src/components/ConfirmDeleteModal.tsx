import React from "react";

interface ConfirmDeleteModalProps {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this entry?",
  confirmLabel = "Yes, Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
 return (
  <dialog className="modal modal-open">
    <div className="modal-box">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="py-4">{message}</p>
      <div className="modal-action">
        <button className="btn btn-error" onClick={onConfirm}>
          {confirmLabel || "Delete"}
        </button>
        <button className="btn btn-outline" onClick={onCancel}>
          {cancelLabel || "Cancel"}
        </button>
      </div>
    </div>
  </dialog>
);
};

export default ConfirmDeleteModal;
