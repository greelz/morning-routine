'use client'
import React, {useRef} from "react";
import Button from "../components/Button";

interface DialogFormProps {
  buttonCaption: string;
  action: (formData: FormData) => void | Promise<void>;
  title: string;
  children: React.ReactNode; // any child content
};


/**
 * Props for the DialogForm component.
 *
 * @property buttonCaption - text on the button to open the dialog
 * @property action - A function that handles the submitted FormData. Can be async or sync.
 * @property title - The title displayed at the top of the form.
 * @property children - Any custom React elements rendered inside the form body.
 */
export default function FormPopup({buttonCaption, action, title, children}: DialogFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <Button
        onClick={openDialog}
        caption={buttonCaption}
        className="max-w-30"
      />

      <dialog ref={dialogRef}
        onMouseDown={(event) =>
          event.target === event.currentTarget && event.currentTarget.close()}
        className="rounded-lg p-6 max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-lg text-center">{title}</h1>
        <form action={action} className="grid gap-2">
          {children}
          <div className="flex justify-end gap-2">
            <Button
              caption="Submit"
              type="submit"
              onClick={closeDialog} />
          </div>
        </form>
      </dialog >
    </>
  );
}

