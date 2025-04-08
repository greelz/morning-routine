import {useRef, forwardRef, useImperativeHandle, ForwardedRef} from "react";
import Button from "@/components/Button";
interface IDialogProps {
  title: string;
  children: React.ReactNode;
  openDialogButtonCaption?: string;
}

export const Dialog = forwardRef<HTMLDialogElement, IDialogProps>(({title, children, openDialogButtonCaption}: IDialogProps, ref: ForwardedRef<HTMLDialogElement>) => {
  const localRef = useRef<HTMLDialogElement>(null);

  // Expose the DOM node via the forwarded ref
  useImperativeHandle(ref, () => localRef.current as HTMLDialogElement);

  const openDialog = () => {
    localRef.current?.showModal();
  };

  return (
    <>
      {openDialogButtonCaption && <Button
        onClick={openDialog}
        caption={openDialogButtonCaption}
        className="max-w-30"
      />
      }
      <dialog ref={localRef}
        onMouseDown={(event) =>
          event.target === event.currentTarget && event.currentTarget.close()}
        className="rounded-lg p-6 max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-lg text-center">{title}</h1>
        {children}
      </dialog>
    </>
  );
});
