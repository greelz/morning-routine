'use client'
import React, {useRef} from "react";
import Button from "../components/Button";
import {Dialog} from "./Dialog";

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

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <Dialog
      ref={dialogRef}
      openDialogButtonCaption={buttonCaption}
      title={title}
    >
      <form action={action} className="grid gap-2">
        {children}
        <div className="flex justify-end gap-2">
          <Button
            caption="Submit"
            type="submit"
            onClick={closeDialog} />
        </div>
      </form>
    </Dialog>
  );
}
