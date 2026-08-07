"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastContextValue = {
  showToast: (msg: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({
    show: false,
    msg: "",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast({ show: true, msg });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setToast({ show: false, msg: "" }),
      2400,
    );
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <div className="app-toast fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 [animation:toastIn_0.25s_ease] rounded-md bg-[#0F172A] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
          {toast.msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
