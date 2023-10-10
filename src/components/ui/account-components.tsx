import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";
import { Button } from "./button";
import { useAppDispatch } from "@/redux/redux-hooks";
import { addAccount } from "@/redux/reducers/spendingSlice";

export function AddAccountDialog({ isOpen, onOpenChange } : { isOpen: boolean, onOpenChange: (arg0: boolean) => void}) {

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const dispatch = useAppDispatch();

  type accountFormType = {
    accountName: string
  }
  const { register, handleSubmit } = useForm<accountFormType>();
  const formSubmit: SubmitHandler<accountFormType> = (values) => {
    dispatch(addAccount(values.accountName));
    onOpenChange(false);
  }
  const formSubmitError: SubmitErrorHandler<accountFormType> = (values) => {
    setErrorMessage(values.accountName?.message)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Add an Account:</DialogTitle>
        <form onSubmit={handleSubmit(formSubmit, formSubmitError)} className="flex flex-col gap-2.5">
          <Label htmlFor="accName">Account Name</Label>
          <Input 
            id="accName"
            placeholder="Account Name"
            {...register('accountName', {
              required: 'Please enter an account name'
            })}
          />
          {errorMessage && <p className="py-1 text-red-500 font-semibold text-sm">{errorMessage}</p>}
          <Button type="submit">Add Account</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}