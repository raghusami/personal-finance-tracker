// components/ToastPortal.tsx

export const showToast = (
  type: 'info' | 'success' | 'error' | 'warning',
  message: string
) => {
  const toastContainer = document.getElementById("daisy-toast");
  if (!toastContainer) return;

  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}\ shadow-lg mb-2 text-sm`;

  alertDiv.innerHTML = `
    <span>${message}</span>
  `;

  toastContainer.appendChild(alertDiv);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toastContainer.removeChild(alertDiv);
  }, 3000); // ✅ 3 seconds
};
