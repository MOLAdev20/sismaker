import { useEffect } from "react";

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const Modal = ({
  open,
  title,
  children,
  footer,
  onClose,
  size = "md",
  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${sizeClass} overflow-hidden rounded-xl bg-white shadow-xl`}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Dialog"}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || showClose) && (
          <div className=" border-b border-slate-200 p-2 sm:p-3">
            <div>
              {title && (
                <h2 className="text-center text-lg font-semibold text-slate-900">
                  {title}
                </h2>
              )}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-5">{children}</div>

        {footer && (
          <div className="border-t border-slate-200 p-4 sm:p-5">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
