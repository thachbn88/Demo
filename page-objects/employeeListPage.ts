import { ActionCommon } from "../utils/actionCommon";
import { Page, expect } from "@playwright/test"

export class EmployeeListPage extends ActionCommon {
    constructor(page: Page) {
        super(page)
    }

    async employeeListPageByUrl() {
        await this.navigateByUrl('/pim/viewEmployeeList');
    }

    async clickEditEmployee(employeeId: string) {
        await this.page.locator(`xpath=//div[text()="${employeeId}"]/../following-sibling::div//i[contains(@class,"pencil")]`).click();
        await this.page.waitForResponse(r => r.url().includes('/personal-details') && r.status() === 200);
    }

    async clickDeleteEmployee(employeeId: string) {
        await this.page.locator(`xpath=//div[text()="${employeeId}"]/../following-sibling::div//i[contains(@class,"trash")]`).click();
        await this.page.locator('.oxd-dialog-sheet').getByRole('button', { name: 'Yes, Delete' }).click();
    }

    async searchOnFieldName(fieldName: string, searchText: string) {
        switch (fieldName.toLowerCase()) {
            case 'employee name':
                await this.page.getByPlaceholder('Type for hints...').first().fill(searchText);
                await this.page.getByRole('listbox').locator(`:text("${searchText}")`).waitFor();
                await this.page.getByRole('listbox').locator(`:text("${searchText}")`).click();
                break;

            case 'employee id':
                await this.fillInputByLocator('.oxd-form .oxd-input', searchText);
                break;

            default:
                throw new Error(`Unsupported field name: ${fieldName}`);
        }
        await this.page.getByRole('button', { name: ' Search ' }).click();
    }

    async verifyEmployeeListPageIsDisplayed() {
        const pageTitle = this.page.getByRole('heading', { name: 'Employee Information' });

        await Promise.all([
            expect(pageTitle).toBeVisible(),
            expect(pageTitle).toHaveText('Employee Information'),
            expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/)
        ]);
    }

    async verifyEmployeeDisplayOnListExaclty(eId1: string, fName: string, mName: string, lName: string) {
        await this.waitForLoadingToDisappear();
        const table = this.page.locator('.oxd-table-card .oxd-table-row');
        const fnameColumnValues = await table.locator('div.oxd-table-cell:nth-child(3)');
        const lnameColumnValues = await table.locator('div.oxd-table-cell:nth-child(4)');
        await expect(fnameColumnValues).toHaveText(fName + " " + mName);
        await expect(lnameColumnValues).toHaveText(lName);
    }

    async verifyEmployeeDeleteSuccefully() {
        const toastMsgDeleteSuccess = this.page.locator('.oxd-toast-content--success');
        await expect(toastMsgDeleteSuccess).toBeVisible();
        await this.clickActionButton('Search');
        await expect(this.page.locator('.oxd-table-row--clickable')).toHaveCount(0);
    }
}