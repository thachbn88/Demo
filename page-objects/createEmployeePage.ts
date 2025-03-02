import { ActionCommon } from "../utils/actionCommon";
import { Page, expect } from "@playwright/test"

export class CreateEmployeePage extends ActionCommon {
    constructor(page: Page) {
        super(page)
    }

    async createEmployeePageByUrl() {
        await this.navigateByUrl('/pim/addEmployee');
    }

    async inputEmpoyeeIdNumber(eId: string) {
        await this.page.locator('.oxd-grid-2 .oxd-input')
            .fill(eId);
    }

    async createEmployeeWithInformation(firstName: string, middleName: string, lastName: string, employeeId?: string) {
        await this.fillInputByPlaceholder('First Name', firstName)
        await this.fillInputByPlaceholder('Middle Name', middleName)
        await this.fillInputByPlaceholder('Last Name', lastName)

        if (employeeId) {
            await this.fillInputByLocator('.oxd-grid-2 .oxd-input', employeeId);
        }
        await this.clickActionButton('Save');
        await this.page.waitForResponse(r => r.url().includes('/personal-details') && r.status() === 200);
    }

    async verifyErrorMsgDuplicateEmployeeId() {
        const errMsg = "Employee Id already exists";
        const e = await this.page.locator('label:has-text("Employee Id")')
            .locator('xpath=./parent::div/following-sibling::span');
        await expect(e).toHaveText(errMsg);
    }
}

