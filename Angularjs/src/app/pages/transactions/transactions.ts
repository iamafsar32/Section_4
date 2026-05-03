import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionService, Transaction } from '../../services/transaction';
import { CategoryService }    from '../../services/category';
import { NotificationService } from '../../services/notification';

@Component({
  selector:    'app-transactions',
  standalone:  true,
  imports:     [NgFor, NgIf, DecimalPipe, ReactiveFormsModule],
  templateUrl: './transactions.html',
  styleUrls:   ['./transactions.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  categories:   string[]      = [];
  showForm  = false;
  editingId: string | null = null;

  form = new FormGroup({
    title:       new FormControl('', [Validators.required, Validators.minLength(2)]),
    amount:      new FormControl('', [Validators.required, Validators.min(0.01)]),
    type:        new FormControl('expense', [Validators.required]),
    category:    new FormControl('', [Validators.required]),
    date:        new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  constructor(
    private transactionService:  TransactionService,
    private categoryService:     CategoryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(t => this.transactions = t);
    this.categories = this.categoryService.getCategoryNames();
  }

  get title()    { return this.form.get('title');    }
  get amount()   { return this.form.get('amount');   }
  get category() { return this.form.get('category'); }
  get date()     { return this.form.get('date');     }

  openAddForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.form.reset({ type: 'expense' });
  }

  openEditForm(t: Transaction): void {
    this.showForm  = true;
    this.editingId = t.id;
    this.form.patchValue({ title: t.title, amount: t.amount.toString(), type: t.type, category: t.category, date: t.date, description: t.description });
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    const data = {
      title: v.title!, amount: parseFloat(v.amount!),
      type: v.type as 'income' | 'expense',
      category: v.category!, date: v.date!, description: v.description || ''
    };
    if (this.editingId) {
      this.transactionService.updateTransaction(this.editingId, data);
      this.notificationService.success('Transaction updated!');
    } else {
      this.transactionService.addTransaction(data);
      this.notificationService.success('Transaction added!');
    }
    this.closeForm();
  }

  deleteTransaction(id: string): void {
    if (confirm('Delete this transaction?')) {
      this.transactionService.deleteTransaction(id);
      this.notificationService.success('Transaction deleted!');
    }
  }
}