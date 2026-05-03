import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id:      string;
  message: string;
  type:    'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private subject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.subject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const n: Notification = { id: Date.now().toString(), message, type };
    this.subject.next([...this.subject.getValue(), n]);
    setTimeout(() => this.remove(n.id), 3000);
  }

  remove(id: string): void {
    this.subject.next(this.subject.getValue().filter(n => n.id !== id));
  }

  success(msg: string): void { this.show(msg, 'success'); }
  error(msg: string):   void { this.show(msg, 'error');   }
  info(msg: string):    void { this.show(msg, 'info');    }
}