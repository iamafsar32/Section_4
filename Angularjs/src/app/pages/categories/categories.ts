import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../services/category';
import { NotificationService }       from '../../services/notification';

@Component({
  selector:    'app-categories',
  standalone:  true,
  imports:     [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrls:   ['./categories.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  showForm = false;

  form = new FormGroup({
    name:  new FormControl('', [Validators.required, Validators.minLength(2)]),
    icon:  new FormControl('🏷️', [Validators.required]),
    color: new FormControl('#4299e1', [Validators.required])
  });

  constructor(
    private categoryService:     CategoryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }

  get name() { return this.form.get('name'); }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    this.categoryService.addCategory({ name: v.name!, icon: v.icon!, color: v.color! });
    this.notificationService.success('Category added!');
    this.showForm = false;
    this.form.reset({ icon: '🏷️', color: '#4299e1' });
  }

  deleteCategory(id: string): void {
    if (confirm('Delete this category?')) {
      this.categoryService.deleteCategory(id);
      this.notificationService.success('Category deleted!');
    }
  }
}