import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingCard from "./spendingComponents/spendingCard";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { useEffect, useState } from "react";
import { changeAccount, setInitialAccounts } from "@/redux/reducers/spendingSlice";
import { accountSchema } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { AddAccountDialog } from "@/components/ui/account-components";
import { setSelectedAccount } from "@/redux/reducers/selectedAccountSlice";

export default function SpendingPage() {

  const accountsData = useAppSelector(state => state.spending);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  // Loads data from local storage when the component mounts
  useEffect(() => {
    const localStorageData = localStorage.getItem('spending');
    try {
      if(localStorageData) {
        const loadedData = JSON.parse(localStorageData);
        const schemaParsedData = accountSchema.array().parse(loadedData);
        dispatch(setInitialAccounts(schemaParsedData));

        const defaultSelectedAccount = schemaParsedData.at(0)
        if(defaultSelectedAccount) {
          dispatch(setSelectedAccount(defaultSelectedAccount));
        }
      } else {
        dispatch(setInitialAccounts([]))
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error loading from local storage'
      });
      console.error(e);
    }
  }, [dispatch, toast]);

  // Writes data to local storage when the redux store changes
  useEffect(() => {
    if(accountsData.length !== 0) {
      localStorage.setItem('spending', JSON.stringify(accountsData))
    }
  }, [accountsData]);

  // Updates the Spending slice when the selected account slice changes
  useEffect(() => {
    if(selectedAccount.name !== '') {
      dispatch(changeAccount(selectedAccount))
    }
  }, [selectedAccount, dispatch]);

  const [addAccountDialogOpen, setAddAccountDialogOpen] = useState(false);

  const onSelectAccountChange = (selectedAccountName: string) => {
    const accountToSelect = accountsData.find(acc => acc.name === selectedAccountName);
    if(accountToSelect) {
      dispatch(setSelectedAccount(accountToSelect));
    }
  }

  const defaultAccount = accountsData.at(0)?.name
  console.log(defaultAccount)

  return (
    <>
      <div className="h-full w-full">
        <Tabs defaultValue="spending" className="w-full h-full flex flex-col">
          <div className="flex flex-col lg:flex-row w-full lg:w-fit gap-1.5">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="spending" className="px-10">Spending</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <Select onValueChange={onSelectAccountChange} defaultValue={defaultAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an account" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {accountsData.map(account => (
                    <SelectItem value={account.name} key={account.name}>{account.name}</SelectItem>
                  ))}
                  <SelectLabel className="hover:cursor-pointer" onClick={() => setAddAccountDialogOpen(true)}>
                    Add an account
                  </SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="spending" className="grow">
            <SpendingCard />
          </TabsContent>
          <TabsContent value="budget" className="grow">
            budget
          </TabsContent>
          <TabsContent value="history" className="grow">
            history
          </TabsContent>
        </Tabs>
      </div>
      <AddAccountDialog isOpen={addAccountDialogOpen} onOpenChange={setAddAccountDialogOpen} />
    </>
  );
}