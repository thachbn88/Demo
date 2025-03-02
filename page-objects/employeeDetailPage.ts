import { ActionCommon } from "../utils/actionCommon";
import { Page, expect } from "@playwright/test"

export class EmployeeDetailPage extends ActionCommon {
    constructor(page: Page) {
        super(page)
    }

    async employeeDetailPageByUrl(employeeId: string) {
        await this.navigateByUrl('/pim/viewPersonalDetails/empNumber/' + employeeId);
    }

    async inputCustomFieldsInformation(bloodType?: string, testField?: string) {
        if (bloodType) {
            await this.page.locator('.orangehrm-custom-fields .oxd-select-text--arrow').click();
            await this.page.getByRole('option', { name: bloodType, exact: true }).click();
        }
        if (testField) {
            await this.page.locator('label:has-text("Test_Field")').locator('xpath=./parent::div/following-sibling::div//input')
                .fill(testField);
        }

        await this.page.getByRole('button', { name: ' Save ' }).nth(1).click();
    }

    async clearFirstName() {
        await this.fillInputByPlaceholder('First Name', '')
    }

    async updateEmployeeWithInformation(firstName: string, middleName: string, lastName: string, employeeId?: string) {
        await this.fillInputByPlaceholder('First Name', firstName)
        await this.fillInputByPlaceholder('Middle Name', middleName)
        await this.fillInputByPlaceholder('Last Name', lastName)

        if (employeeId) {
            await this.fillInputByLocator('.oxd-grid-2 .oxd-input', employeeId);
        }

        await this.clickActionButton('Save');
        await this.page.waitForResponse(r => r.url().includes('/personal-details') && r.status() === 200);
    }

    async verifyCustomfiledUpdatedSuccessfully(bloodType, testField) {
        await expect(this.page.locator('.orangehrm-custom-fields .oxd-select-text-input')).toHaveText(bloodType);
        await expect(this.page.locator('label:has-text("Test_Field")').locator('xpath=./parent::div/following-sibling::div//input')).toHaveValue(testField);
    }

    async verifyEmployeeInformation(firstName: string, middleName: string, lastName: string, employeeId?: string) {
        await this.waitForLoadingToDisappear();
        await expect(this.page.locator('[name="firstName"]')).toHaveValue(firstName);
        await expect(this.page.locator('[name="middleName"]')).toHaveValue(middleName);
        await expect(this.page.locator('[name="lastName"]')).toHaveValue(lastName);
        const employeeIdInput = await this.page.locator('label:has-text("Employee Id")')
            .locator('xpath=./parent::div/following-sibling::div//input');
        const actualEmployeeId = await employeeIdInput.inputValue();
        if (employeeId) {
            await expect(actualEmployeeId).toBe(employeeId);
        }
    }
}