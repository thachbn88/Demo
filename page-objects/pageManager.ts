import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { EmployeeListPage } from "./employeeListPage";
import { CreateEmployeePage } from "./createEmployeePage";
import { EmployeeDetailPage } from "./employeeDetailPage";
import { ActionCommon } from "../utils/actionCommon";
import { ValidationCommon } from "../utils/validationCommon";

export class PageManager {
    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly employeeListPage: EmployeeListPage
    private readonly createEmployeePage: CreateEmployeePage
    private readonly employeeDetailPage: EmployeeDetailPage
    private readonly actionCommon: ActionCommon
    private readonly validationCommon: ValidationCommon

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.employeeListPage = new EmployeeListPage(this.page)
        this.createEmployeePage = new CreateEmployeePage(this.page)
        this.employeeDetailPage = new EmployeeDetailPage(this.page)
        this.actionCommon = new ActionCommon(this.page)
        this.validationCommon = new ValidationCommon(this.page)
    }

    onLoginPage() {
        return this.loginPage
    }

    onEmployeeListPage() {
        return this.employeeListPage
    }

    onCreateEmployeePage() {
        return this.createEmployeePage
    }

    onEmployeeDetailPage() {
        return this.employeeDetailPage
    }

    onActionCommon() {
        return this.actionCommon
    }

    onValidationCommon() {
        return this.validationCommon
    }
}