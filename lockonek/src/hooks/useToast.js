import { useState, useCallback, useRef } from "react";

export function useToast() {
  const [toast, setToast] = useState({ msg: "", type: "", visible: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((msg, type = "default") => {
    setToast({ msg, type, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((p) => ({ ...p, visible: false })),
      3000
    );
  }, []);

  return { toast, showToast };
}
