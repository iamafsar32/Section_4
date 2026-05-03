# Angular Personal Finance Tracker

A personal finance tracker built with Angular.
Assignment 4C — Deckzi Software Developer Pre-Recruitment Program — Section 4.

---

## Live Demo

https://angular-finance-tracker-9cigfgf70-velkarthik84-clouds-projects.vercel.app

---

## What This Project Does

A fully functional personal finance tracker with three pages:

- Dashboard showing income vs expenses summary with category chart
- Transactions page to view add edit and delete transactions
- Categories page to manage spending categories

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Angular 17+ | Frontend framework |
| TypeScript | Typed language |
| RxJS | Reactive programming |
| Angular Router | Page navigation |
| Reactive Forms | Form handling and validation |
| Angular Services | Shared data and logic |
| HTTP Interceptor | Centralised error handling |
| Environment Files | Dev and prod configuration |
| Vercel | Deployment |

---

## Project Structure
angular-finance-tracker/
├── src/
│   ├── app/
│   │   ├── interceptors/
│   │   │   └── error.interceptor.ts     ← HTTP error handling
│   │   ├── pages/
│   │   │   ├── dashboard/               ← Dashboard page
│   │   │   ├── transactions/            ← Transactions page
│   │   │   └── categories/              ← Categories page
│   │   ├── services/
│   │   │   ├── transaction.service.ts   ← Transaction data logic
│   │   │   ├── category.service.ts      ← Category data logic
│   │   │   └── notification.service.ts  ← Toast notifications
│   │   ├── shared/
│   │   │   ├── navbar/                  ← Navigation bar
│   │   │   └── notification/            ← Notification display
│   │   ├── app.component.ts             ← Root component
│   │   ├── app.config.ts                ← App configuration
│   │   └── app.routes.ts                ← Route definitions
│   ├── environments/
│   │   ├── environment.ts               ← Development config
│   │   └── environment.prod.ts          ← Production config
│   └── styles.css                       ← Global styles
├── vercel.json                          ← Vercel deployment config
├── angular.json
├── package.json
└── README.md

---

## Requirements

- Node.js 18+
- Angular CLI 17+

Check versions:
node --version
ng version

---

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/velkarthik84-cloud/angular-finance-tracker.git
cd angular-finance-tracker

### 2. Install dependencies
npm install

### 3. Run development server
ng serve

### 4. Open in browser
http://localhost:4200

---

## Pages

### Dashboard
- Total income summary card
- Total expenses summary card
- Current balance card
- Expenses by category bar chart
- Recent transactions list with link to all transactions

### Transactions
- View all transactions in a list
- Add new transaction with form validation
- Edit existing transaction
- Delete transaction with confirmation
- Each transaction shows title category date and amount

### Categories
- View all spending categories with icon and color
- Add new category with name icon and color picker
- Delete category with confirmation

---

## Features

### Reactive Forms with Validation
- Required field validation on all forms
- Minimum length validation on title and name fields
- Numeric validation on amount field
- Amount must be greater than zero
- Inline error messages shown on touch
- Form submit blocked if invalid

### Angular Services
- All data logic in services
- No HTTP calls made directly in components
- BehaviorSubject for reactive data updates
- Services injected via dependency injection

### HTTP Interceptor
- Centralised error handling for all HTTP requests
- User friendly notification shown on any API error
- Handles network errors connection failures and server errors

### Environment Files
- Development: src/environments/environment.ts
- Production: src/environments/environment.prod.ts
- API base URL configured separately per environment

### Routing
- Dashboard at /dashboard
- Transactions at /transactions
- Categories at /categories
- Default redirect to /dashboard
- Wildcard redirect to /dashboard

---

## API Endpoints Used

This application uses in-memory data storage.
No backend API required for the pages to be navigable.
HTTP interceptor is configured and ready for real API integration.

---

## Build
ng build

Output goes to:
dist/angular-finance-tracker/browser

---

## Deployment

Deployed on Vercel with vercel.json configuration for Angular routing support.

vercel.json:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/angular-finance-tracker/browser",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Skills Demonstrated

- Angular CLI project creation and component generation
- Component architecture with templates and data binding
- Angular Router with route configuration and navigation
- Services and dependency injection for shared logic
- HttpClient setup with interceptors
- RxJS Observable BehaviorSubject map and async pipe
- Reactive Forms with FormGroup FormControl and validators
- Angular pipes for data transformation
- HTTP interceptor for centralised error handling
- Environment files for dev and prod configuration
- Deployed to Vercel with live public URL

---

## Common Issues

### ng not found
npm install -g @angular/cli

### Port already in use
ng serve --port 4201

### Build fails
npm install
ng build

