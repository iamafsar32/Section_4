import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService, Transaction } from '../../services/transaction';

@Component({
  selector:    'app-dashboard',
  standalone:  true,
  imports:     [NgFor, NgIf, DecimalPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls:   ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  summary = { income: 0, expenses: 0, balance: 0 };
  recentTransactions: Transaction[] = [];
  expensesByCategory: { name: string; amount: number; percent: number }[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.summary             = this.transactionService.getSummary();
    this.expensesByCategory  = this.transactionService.getExpensesByCategory();
    this.transactionService.getTransactions().subscribe(t => {
      this.recentTransactions = t.slice(0, 5);
    });
  }
}