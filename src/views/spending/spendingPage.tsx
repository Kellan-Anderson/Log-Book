import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { setInitialAccounts } from "@/redux/reducers/spendingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { accountSchema } from "@/types";
import { useEffect, useState } from "react";
import SpendingCard from "./spendingCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"

export default function SpendingPage() {

  const accounts = useAppSelector(state => state.spending);
  const [selectedAccount, setSelectedAccount] = useState(accounts.at(0)?.name)
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    const localStorageData = localStorage.getItem('spending');
    if(localStorageData !== null) {
      try {
        const parsedData = accountSchema.array().parse(localStorageData);
        dispatch(setInitialAccounts(parsedData));
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was an error getting your data.'
        });
        console.log(err);
      }
    }
  }, []);
  
  return (
    <>
      <h1 className="w-full text-center">Spending</h1>
      <Tabs defaultValue="spending" className="flex flex-col grow">
        <TabsList className="h-7 w-full flex mt-2">
          <TabsTrigger value="spending" className="p-[2px] grow">Spending</TabsTrigger>
          <TabsTrigger value="budget" className="p-[2px] grow">Budget</TabsTrigger>
          <TabsTrigger value="history" className="p-[2px] grow">History</TabsTrigger>
        </TabsList>
        <Select>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test1">Test 1</SelectItem>
            <SelectItem value="test2">Test 2</SelectItem>
            <SelectItem value="test3">Test 3</SelectItem>
          </SelectContent>
        </Select>
        <TabsContent value="spending" className="grow">
          <SpendingCard accountName="" />
        </TabsContent>
      </Tabs>
      <Button className="rounded-full p-0 px-2 fixed bottom-0 right-0 mb-8 mr-8 overflow-hidden">
        <Plus/>
      </Button>
    </>
  );
}

// <h3 className="text-2xl font-semibold leading-none tracking-tight whitespace-nowrap">Spending Tracker</h3>