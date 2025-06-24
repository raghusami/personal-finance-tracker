// components/ToastPortal.tsx

export const showToast = (
  type: 'info' | 'success' | 'error' | 'warning',
  message: string
) => {
  const toastContainer = document.getElementById("daisy-toast");
  if (!toastContainer) return;

  const alertDiv = document.createElement("div");

  alertDiv.className = `alert alert-${type} shadow-lg mb-2 text-sm animate-fade-in`;

  // Create span and add text safely
  const span = document.createElement("span");
  span.textContent = message;
  alertDiv.appendChild(span);

  // Append to toast container
  toastContainer.appendChild(alertDiv);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toastContainer.removeChild(alertDiv);
  }, 3000);
};
