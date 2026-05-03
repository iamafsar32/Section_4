import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Category {
  id: string; name: string; icon: string; color: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categories: Category[] = [
    { id: '1', name: 'Salary',     icon: '💼', color: '#48bb78' },
    { id: '2', name: 'Freelance',  icon: '💻', color: '#4299e1' },
    { id: '3', name: 'Housing',    icon: '🏠', color: '#ed8936' },
    { id: '4', name: 'Food',       icon: '🍔', color: '#f56565' },
    { id: '5', name: 'Transport',  icon: '🚗', color: '#9f7aea' },
    { id: '6', name: 'Utilities',  icon: '💡', color: '#ecc94b' },
    { id: '7', name: 'Healthcare', icon: '🏥', color: '#fc8181' },
    { id: '8', name: 'Education',  icon: '📚', color: '#76e4f7' }
  ];

  private subject = new BehaviorSubject<Category[]>(this.categories);

  getCategories(): Observable<Category[]> {
    return this.subject.asObservable();
  }

  addCategory(cat: Omit<Category, 'id'>): void {
    this.categories = [...this.categories, { ...cat, id: Date.now().toString() }];
    this.subject.next(this.categories);
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter(c => c.id !== id);
    this.subject.next(this.categories);
  }

  getCategoryNames(): string[] {
    return this.categories.map(c => c.name);
  }
}