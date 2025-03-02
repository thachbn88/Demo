import { Page, expect } from "@playwright/test"

export class ValidationCommon {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async verifyRequiredErrorMsgDisplayBasedOnPlaceHolder(placeHolder: string) {
        const requiredMsg = this.page.locator(`//input[@placeholder="${placeHolder}"]/parent::div/following-sibling::span[contains(@class,"error-message")]`);
        await expect(requiredMsg).toBeVisible();
        await expect(requiredMsg).toHaveText('Required');
    }
}