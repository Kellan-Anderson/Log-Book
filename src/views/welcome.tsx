import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, CircleDollarSign, Clock, type LucideIcon } from "lucide-react"
import React, { ReactElement } from "react";

export default function WelcomeArea() {
  return (
    <>
      <Card className="lg:h-full h-fit overflow-y-auto">
        <div className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Hello!</CardTitle>
            <CardDescription>
              This app is meant to act as a tool for items that you want to track. Tracking is supported for calories, 
              spending and time management. Your data is important, and thats why we do not store any of the information 
              that you provide to this app. Instead, the device you use keeps track of it for you, syncing your data with 
              the local storage on your device. Check out some of the apps below!
            </CardDescription>
          </CardHeader>
          <CardContent className="lg:block hidden lg:grow">
            <div className="flex flex-wrap h-full">
              <SpendingCard />
              <TimeCard />
              <CalorieCard />
            </div>
          </CardContent>
        </div>
      </Card>
      <div className="block lg:hidden">
        <SpendingCard />
        <TimeCard />
        <CalorieCard />
      </div>
    </>
  );
}

function SpendingCard() {
  return (
    <AppCard icon={<CircleDollarSign />} name="Spending">
      The spending tracker app lets you keep track of your funds while keeping your data safe! By using the app you
      can...
      <ul className="list-disc list-inside py-1">
        <li>Track spending and earnings that only you can see</li>
        <li className="">Create budgets and see them update as you track your spending</li>
        <li>Add different accounts, each with their own spending and budgets</li>
        <li>See your spending over time and export them to .csv documents for use elsewhere</li>
      </ul>
    </AppCard>
  );
}

function TimeCard() {
  return (
    <AppCard icon={<Clock/>} name="Time">
      The time tracker app helps you to keep up with the time you spend on different jobs and projects! By using the
      time tracker app you can...
      <ul className="list-disc list-inside py-1">
        <li>Keep track of how much time you are spending at work or on projects</li>
        <li>Clock in and out in an easy-to-use UI</li>
        <li>View your total work hours in a per day/week/month format</li>
        <li>Export your time sheets</li>
      </ul>
    </AppCard>
  );
}

function CalorieCard() {
  return (
    <AppCard icon={<Apple/>} name="Calories" >
      The calories tracker app helps you to live a healthier lifestyle by making it easy to keep track of the 
      calories you intake. By using the calories tracker app you can...
      <ul className="list-disc list-inside py-1">
        <li>See your calorie intake from the past 24-hours to the past week</li>
        <li>Set goals for yourself and track how you're doing towards those goals</li>
        <li>View info on the foods you've eaten to help you see what benefits your goals the most</li>
        <li>Rate your best foods for top performance</li>
      </ul>
    </AppCard>
  );
}

function AppCard(props : {
  children: React.ReactNode,
  name: string,
  icon: ReactElement<LucideIcon>,
}) {
  return (
    <div className="w-full lg:w-1/3 py-2 lg:px-2">
      <Card className="h-full min-w-min flex flex-col">
        <CardHeader className="w-full justify-center items-center">
          {props.icon}
          <CardTitle className="pt-2">{props.name} Tracker</CardTitle>
        </CardHeader>
        <CardContent className="grow">
          {props.children}
        </CardContent>
        <CardFooter className="w-full justify-center pb-12">
          <Button asChild>
            <a href={`/${props.name.toLowerCase()}`}>
              Go to {props.name}
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}