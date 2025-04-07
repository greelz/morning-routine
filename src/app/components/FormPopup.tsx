'use client'
import React, {useRef} from "react";

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
      <button onClick={openDialog} className="p-2 rounded max-w-30 bg-blue-600 text-white">
        {buttonCaption}
      </button>

      <dialog ref={dialogRef}
        onMouseDown={(event) =>
          event.target === event.currentTarget && event.currentTarget.close()}
        className="rounded-lg p-6 max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow">
        <h1>{title}</h1>
        <form action={action}>
          {children}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="py-2 px-3 bg-blue-600 text-white rounded"
              onClick={closeDialog}>Submit</button>
          </div>
        </form>
      </dialog >
    </>
  );
}

