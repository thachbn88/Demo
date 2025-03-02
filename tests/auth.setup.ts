import { test as setup } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

setup("Admin User", async ({ page }) => {
    const pm = new PageManager(page)
    await pm.onLoginPage().goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await pm.onLoginPage().performLogin('Admin', 'admin123')
    await page.waitForLoadState('networkidle');
    await page.context().storageState({ path: '.auth/adminUser.json' })
})