type ToastType = 'success' | 'error' | 'loading' | 'info'

interface ToastOptions {
  duration?: number
}

let toastContainer: HTMLDivElement | null = null

function getOrCreateToastContainer(): HTMLDivElement {
  if (toastContainer) return toastContainer

  toastContainer = document.createElement('div')
  toastContainer.id = 'toast-container'
  toastContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
  `
  document.body.appendChild(toastContainer)
  return toastContainer
}

function showToast(message: string, type: ToastType, options: ToastOptions = {}) {
  const { duration = 4000 } = options
  const container = getOrCreateToastContainer()

  const toast = document.createElement('div')
  toast.style.cssText = `
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
    pointer-events: auto;
    max-width: 400px;
  `

  const bgColor = {
    success: '#10b981',
    error: '#ef4444',
    loading: '#3b82f6',
    info: '#3b82f6',
  }[type]

  const textColor = 'white'

  toast.style.backgroundColor = bgColor
  toast.style.color = textColor
  toast.textContent = message

  container.appendChild(toast)

  if (type !== 'loading') {
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out'
      setTimeout(() => toast.remove(), 300)
    }, duration)
  }

  return toast
}

// Add animations to document if not already there
if (!document.getElementById('toast-styles')) {
  const style = document.createElement('style')
  style.id = 'toast-styles'
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast(message, 'success', options),
  error: (message: string, options?: ToastOptions) =>
    showToast(message, 'error', options),
  loading: (message: string, options?: ToastOptions) =>
    showToast(message, 'loading', { ...options, duration: 999999 }),
  info: (message: string, options?: ToastOptions) =>
    showToast(message, 'info', options),
}
