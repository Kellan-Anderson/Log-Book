import { Card, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { setInitialAccounts } from "@/redux/reducers/spendingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { accountSchema } from "@/types";
import { useEffect } from "react";

export default function SpendingPage() {

  const accounts = useAppSelector(state => state.spending);
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    const localStorageData = localStorage.getItem('spending');
    if(localStorageData !== null) {
      try {
        const parsedData = accountSchema.parse(localStorageData);
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
      <h3 className="text-2xl font-semibold leading-none tracking-tight pb-3">Spending Tracker</h3>
      <Card className="h-full">
        <Tabs>
          <TabsList>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="spending">

          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}