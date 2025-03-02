import { Page } from "@playwright/test";

export class ActionCommon {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async waitForLoadingToDisappear(): Promise<void> {
        const loadingSpinner = this.page.locator('.oxd-loading-spinner');

        if (await loadingSpinner.count()) {
            await loadingSpinner.first().waitFor({ state: 'hidden', timeout: 15000 });
        }
    }

    async generateRamdomUniqueId() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }

    async navigateByUrl(path: string) {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php' + path);
        await this.page.waitForLoadState('networkidle');
    }

    async fillInputByPlaceholder(field: string, value: string): Promise<void> {
        await this.page.getByPlaceholder(field).fill(value);
    }

    async fillInputByLocator(selector: string, value: string): Promise<void> {
        await this.page.locator(selector).fill(value);
    }

    async clickActionButton(buttonName: string) {
        const button = this.page.getByRole("button", { name: buttonName }).first();

        if (['save', 'add', 'cancel', 'search'].includes(buttonName.toLowerCase())) {
            await button.click();
        } else {
            throw new Error(`Button with name "${buttonName}" is not recognized.`);
        }
    }
}