import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Transaction {
  id: string; title: string; amount: number;
  type: 'income' | 'expense'; category: string;
  date: string; description: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactions: Transaction[] = [
    { id:'1', title:'Monthly Salary',    amount:50000, type:'income',  category:'Salary',    date:'2024-11-01', description:'November salary'       },
    { id:'2', title:'Rent Payment',      amount:15000, type:'expense', category:'Housing',   date:'2024-11-02', description:'Monthly rent'           },
    { id:'3', title:'Grocery Shopping',  amount:3500,  type:'expense', category:'Food',      date:'2024-11-05', description:'Weekly groceries'       },
    { id:'4', title:'Freelance Project', amount:12000, type:'income',  category:'Freelance', date:'2024-11-10', description:'Web development project' },
    { id:'5', title:'Electricity Bill',  amount:2500,  type:'expense', category:'Utilities', date:'2024-11-12', description:'Monthly electricity'     }
  ];

  private subject = new BehaviorSubject<Transaction[]>(this.transactions);

  getTransactions(): Observable<Transaction[]> {
    return this.subject.asObservable();
  }

  addTransaction(t: Omit<Transaction, 'id'>): void {
    this.transactions = [{ ...t, id: Date.now().toString() }, ...this.transactions];
    this.subject.next(this.transactions);
  }

  updateTransaction(id: string, updates: Partial<Transaction>): void {
    this.transactions = this.transactions.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    this.subject.next(this.transactions);
  }

  deleteTransaction(id: string): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.subject.next(this.transactions);
  }

  getSummary() {
    const income   = this.transactions.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
    const expenses = this.transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }

  getExpensesByCategory() {
    const expenses = this.transactions.filter(t => t.type === 'expense');
    const total    = expenses.reduce((s,t) => s + t.amount, 0);
    const grouped: Record<string,number> = {};
    expenses.forEach(t => { grouped[t.category] = (grouped[t.category] || 0) + t.amount; });
    return Object.entries(grouped).map(([name, amount]) => ({
      name, amount, percent: total > 0 ? Math.round((amount/total)*100) : 0
    }));
  }
}