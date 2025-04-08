'use client'
import {useEffect, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import {Dialog} from "./Dialog";
interface ICelebrationPopup {
  title: string;
  msDisplay?: number;
  children: React.ReactNode;
}
export const CelebrationPopup = forwardRef(({title, children, msDisplay = 1000}: ICelebrationPopup, ref: ForwardedRef<HTMLDialogElement>) => {

  const localRef = useRef<HTMLDialogElement>(null);

  // Expose the DOM node via the forwarded ref
  useImperativeHandle(ref, () => localRef.current as HTMLDialogElement);

  useEffect(() => {
    if (!localRef.current) return;
    localRef.current?.showModal();
    const timeout = setTimeout(() => {
      localRef.current!.close();
    }, msDisplay);
    return () => clearTimeout(timeout);
  }, [msDisplay]);

  return (
    <Dialog ref={localRef} title={title}>
      {children}
    </Dialog>
  );
});
