import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingCard from "./spendingComponents/spendingCard";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { useEffect } from "react";
import { setInitialAccounts } from "@/redux/reducers/spendingSlice";
import { accountSchema } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export default function SpendingPage() {

  const accountsData = useAppSelector(state => state.spending);
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    const localStorageData = localStorage.getItem('spending');

    try {
      if(localStorageData) {
        const data = accountSchema.array().parse(JSON.parse(localStorageData));
        dispatch(setInitialAccounts(data));
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
  }, []);

  useEffect(() => {
    if(accountsData.length !== 0) {
      localStorage.setItem('spending', JSON.stringify(accountsData))
    }
  }, [accountsData]);

  return (
    <div className="h-full w-full ">
      <Tabs defaultValue="spending" className="w-full h-full flex flex-col">
        <div className="flex flex-col lg:flex-row w-full lg:w-fit gap-1.5">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="spending" className="px-5">Spending</TabsTrigger>
            <TabsTrigger value="budget" className="px-5">Budget</TabsTrigger>
            <TabsTrigger value="history" className="px-5">History</TabsTrigger>
          </TabsList>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose an account" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO Change to loop over accounts from redux store */}
              <SelectItem value="Account1">Account 1</SelectItem>
              <SelectItem value="Account2">Account 2</SelectItem>
              <SelectItem value="Account3">Account 3</SelectItem>
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
  );
}

// Need to have:
/**

graph,
total deposited,
total spent
previous 5 transactions
button to add transaction

 */