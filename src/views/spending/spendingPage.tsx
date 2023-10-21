// Shadcn ui components
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { AddAccountDialog, MakeAccountCard } from "@/components/ui/account-components";

// React
import { useEffect, useRef, useState } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { changeAccount, setInitialAccounts } from "@/redux/reducers/spendingSlice";
import { setSelectedAccount } from "@/redux/reducers/selectedAccountSlice";

// App Displays
import SpendingCard from "./spendingComponents/spendingCard";
import BudgetArea from "./spendingComponents/budgetArea";

// Types
import { accountSchema } from "@/types";

export default function SpendingPage() {

  const accountsData = useAppSelector(state => state.spending);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const componentHasMounted = useRef(false);

  // Loads data from local storage when the component mounts
  useEffect(() => {
    componentHasMounted.current = true;

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
      localStorage.setItem('spending', JSON.stringify(accountsData));
      if(selectedAccount.name === '') {
        dispatch(setSelectedAccount(accountsData[0]))
      }
    }
  }, [accountsData, dispatch]);

  // useEffect(() => {
  //   dispatch(setInitialAccounts([testData]))
  //   dispatch(setSelectedAccount(testData))
  // }, [])

  // Updates the Spending slice when the selected account slice changes
  useEffect(() => {
    if(selectedAccount.name !== '') {
      dispatch(changeAccount(selectedAccount))
    }
  }, [selectedAccount, dispatch]);

  // Controls add account dialog
  const [addAccountDialogOpen, setAddAccountDialogOpen] = useState(false);

  const onSelectAccountChange = (selectedAccountName: string) => {
    const accountToSelect = accountsData.find(acc => acc.name === selectedAccountName);
    if(accountToSelect) {
      dispatch(setSelectedAccount(accountToSelect));
    }
  }

  if(accountsData.length === 0 && componentHasMounted) {
    console.log(accountsData)
    return (
      <MakeAccountCard />
    );
  }

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
            <Select onValueChange={onSelectAccountChange} defaultValue={accountsData.at(0)?.name}>
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
            <BudgetArea />
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