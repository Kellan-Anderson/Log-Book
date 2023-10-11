import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";
import { Button } from "./button";
import { useAppDispatch } from "@/redux/redux-hooks";
import { addAccount } from "@/redux/reducers/spendingSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

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

export function MakeAccountCard() {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  type addAccountFormType = {
    accountName: string
  }
  const { register, handleSubmit } = useForm<addAccountFormType>();
  const onFormSubmit: SubmitHandler<addAccountFormType> = (values) => {
    dispatch(addAccount(values.accountName))
  }
  const onFormSubmitError: SubmitErrorHandler<addAccountFormType> = (values) => {
    setErrorMessage(values.accountName?.message);
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle>Please make an account</CardTitle>
          <CardDescription>
            It does not appear that you have an account in your browsers localStorage. Please make an account to 
            continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
            <Label htmlFor="accountNameInput">Account Name</Label>
            <Input
              placeholder="Name:"
              id="accountNameInput"
              {...register('accountName', {
                required: 'Please enter an account name'
              })}
            />
            {errorMessage && <p className="text-red-500 font-semibold text-sm">{errorMessage}</p>}
            <Button className="w-full" type="submit">Add account</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}