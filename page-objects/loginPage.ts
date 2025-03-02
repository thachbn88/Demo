import { ActionCommon } from "../utils/actionCommon";
import { Page } from "@playwright/test"

export class LoginPage extends ActionCommon {

    constructor(page: Page) {
        super(page)
    }

    async goto(url: string) {
        await this.page.goto(url)
    }

    async performLogin(username: string, password: string) {
        await this.fillInputByPlaceholder('Username', username);
        await this.fillInputByPlaceholder('Password', password);
        await this.page.getByRole("button", { name: 'login' }).click();
    }
}