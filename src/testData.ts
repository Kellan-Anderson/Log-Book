import { account } from "./types";

const testData1: account = {
  name: 'test account 1',
  budgets: [
    {
      name: 'budget area 1',
      color: 'bg-red-500',
      // spent: 220
      alloted: 300,
      description: 'Whatever a good description would be for the first budget'
    },
    {
      name: 'budget area 2',
      color: 'bg-blue-500',
      // spent: 260
      alloted: 200,
    },
    {
      name: 'budget area 3',
      color: 'bg-green-500',
      // spent: 180
    },
  ],
  transactions: [
    {
      amount: 10,
      budgetArea: 'budget area 1',
      date: new Date('Jan 13 2023').toString(),
      id: '1',
      type: 'withdraw'
    },
    {
      amount: 20,
      budgetArea: 'budget area 2',
      date: new Date('Feb 13 2023').toString(),
      id: '2',
      type: 'withdraw'
    },
    {
      amount: 30,
      budgetArea: 'budget area 3',
      date: new Date('Feb 13 2023').toString(),
      id: '3',
      type: 'withdraw'
    },
    {
      amount: 40,
      budgetArea: 'budget area 1',
      date: new Date('Mar 13 2023').toString(),
      id: '4',
      type: 'withdraw'
    },
    {
      amount: 50,
      budgetArea: 'budget area 2',
      date: new Date('Jun 13 2023').toString(),
      id: '5',
      type: 'withdraw'
    },
    {
      amount: 60,
      budgetArea: 'budget area 3',
      date: new Date('Jul 13 2023').toString(),
      id: '6',
      type: 'withdraw'
    },
    {
      amount: 70,
      budgetArea: 'budget area 1',
      date: new Date('Oct 13 2023').toString(),
      id: '7',
      type: 'withdraw'
    },
    {
      amount: 80,
      budgetArea: 'budget area 2',
      date: new Date('Oct 13 2023').toString(),
      id: '8',
      type: 'withdraw'
    },
    {
      amount: 90,
      budgetArea: 'budget area 3',
      date: new Date('Sep 13 2023').toString(),
      id: '9',
      type: 'withdraw'
    },
    {
      amount: 100,
      budgetArea: 'budget area 1',
      date: new Date('Aug 13 2023').toString(),
      id: '10',
      type: 'withdraw'
    },
    {
      amount: 110,
      budgetArea: 'budget area 2',
      date: new Date('Apr 13 2023').toString(),
      id: '11',
      type: 'withdraw'
    },
  ]
}

const testData2: account = {
  name: 'Test data 2',
  budgets: [],
  transactions: []
}

export const testData = testData1;