import { Card, CardHeader, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { setInitialAccounts } from "@/redux/reducers/spendingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { accountSchema } from "@/types";
import { useEffect, useState } from "react";
import SpendingCard from "./spendingCard";

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
    <div className="h-full flex flex-col">
      <h3 className="text-2xl font-semibold leading-none tracking-tight whitespace-nowrap pb-3">Spending Tracker</h3>
      <Card className="grow">
        <CardHeader>
          <Tabs defaultValue="spending">
            <div className="flex flex-col lg:flex-row gap-2">
              <TabsList className="grid grid-cols-3 w-full lg:w-fit">
                <TabsTrigger value="spending">Spending</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <Select onValueChange={(val) => setSelectedAccount(val)}>
                <SelectTrigger className="w-full lg:w-fit min-w-max">
                  <SelectValue placeholder="Choose an account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test1">Test1</SelectItem>
                  <SelectItem value="test2">Test2</SelectItem>
                  <SelectItem value="test3">Test3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TabsContent value="spending">
              <SpendingCard accountName={selectedAccount} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}

// <h3 className="text-2xl font-semibold leading-none tracking-tight whitespace-nowrap">Spending Tracker</h3>