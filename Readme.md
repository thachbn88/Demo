# Playwright Automation Project - Setup & Usage Guide

## Project Overview
This project is an automation testing framework built with Playwright for testing an Employee Management System (PIM Module). It includes UI and API test automation to verify employee creation, updating, deletion, searching and validation.

## Features
- Playwright-based UI testing
- API test integration
- Page Object Model (POM) for better maintainability
- Common utilities for reusable actions
- Authentication handling for admin users
- Detailed test reports

## Project Structure
```
Project
│── .auth/                      # Stores authentication storage state (e.g., admin session)
│   ├── adminUser.json          # Authentication session file
│
│── page-objects/               # Page Object Model (POM) for UI testing
│   ├── createEmployeePage.ts   # Employee creation page
│   ├── employeeDetailPage.ts   # Employee details page
│   ├── employeeListPage.ts     # Employee list page
│   ├── loginPage.ts            # Login page actions
│   ├── pageManager.ts          # Manages page navigation
│
│── playwright-report/          # Stores Playwright test reports
│
│── PrepareTestData/            # API test utilities for creating test data
│   ├── createEmployeeAPI.ts    # API calls for employee creation
│
│── test-results/               # Stores test execution results
│
│── tests/                      # Playwright test cases
│   ├── auth.setup.ts           # Authentication setup
│   ├── createEmployee.spec.ts  # Create employee test cases
│   ├── deleteEmployee.spec.ts  # Delete employee test cases
│   ├── employeeList.spec.ts    # Employee list test cases
│   ├── updateEmployee.spec.ts  # Update employee test cases
│
│── utils/                      # Utility functions for common actions
│   ├── actionCommon.ts         # Common UI actions
│   ├── validationCommon.ts     # Common validation methods
│
│── .gitignore                  # Files to ignore in Git
│── package.json                # Project dependencies & scripts
│── playwright.config.ts        # Playwright test configuration
│── Readme.md                   # Project documentation
```

## Installation & Setup
### 1. Clone the Repository
```sh
git clone <repository-url>
```
### 2. Install Dependencies
```sh
npm install
```
### 3. Configure Playwright (if not installed)
```sh
npx playwright install
```

## Run Tests
### Run All Tests:
```sh
npx playwright test
```
### Run a Specific Test File:
```sh
npx playwright test tests/createEmployee.spec.ts
```
### Run Tests in UI Mode:
```sh
npx playwright test --ui
```
### Run Tests in Headed Mode (visible browser):
```sh
npx playwright test --headed
```
### Run Tests in Debug Mode:
```sh
npx playwright test --debug
```
### View Playwright Report:
```sh
npx playwright show-report
```

## Notes
- The framework follows the **Page Object Model (POM)** for better maintainability.
- `pageManager.ts` manages all navigation between pages.
- API requests for test precondition data are handled under `PrepareTestData/`.
- Common UI actions and validations are inside the `utils/` folder.


