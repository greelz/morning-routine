'use client'
import {useEffect, forwardRef, ForwardedRef, useImperativeHandle, useRef} from "react";
import {Dialog} from "./Dialog";
import Icon, {IconKeys} from "./Icon";
interface ICelebrationPopup {
  title: string;
  iconKey: IconKeys;
  text: string;
  msDisplay?: number;
}
export const CelebrationPopup = forwardRef(({title, iconKey, text, msDisplay = 1000}: ICelebrationPopup, ref: ForwardedRef<HTMLDialogElement>) => {

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
      <Icon iconKey={iconKey} />
      <p>{text}</p>
    </Dialog>
  );
});
