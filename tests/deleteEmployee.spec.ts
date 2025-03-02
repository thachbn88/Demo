import { test } from '@playwright/test'
import { PageManager } from "../page-objects/pageManager"
import { CreateEmployeeAPI } from "../PrepareTestData/createEmployeeAPI"

test.describe('Verify PIM-list employee page - delete function', { tag: ['@employee', '@deleteEmploye', '@smoke'] }, () => {

    let givenEmployeeId;
    test.use({ storageState: '.auth/adminUser.json' })
    test.beforeEach(async ({ page, context }) => {
        const pm = new PageManager(page);
        // Create new employee by using API
        const dataBody = {
            "firstName": "employee",
            "middleName": "m",
            "lastName": 'employee-' + Date.now(),
            "empPicture": null,
            "employeeId": await pm.onActionCommon().generateRamdomUniqueId()
        };
        const employeeAPI = new CreateEmployeeAPI(context.request);
        const { employeeId } = await employeeAPI.createEmployeeAndGetDetails(dataBody);
        givenEmployeeId = employeeId;
        await pm.onEmployeeListPage().employeeListPageByUrl();
    })

    test('10. Verify that the admin user can delete employee successully', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onEmployeeListPage().searchOnFieldName('employee id', givenEmployeeId);
        await pm.onEmployeeListPage().clickDeleteEmployee(givenEmployeeId)
        await pm.onEmployeeListPage().verifyEmployeeDeleteSuccefully();
    })
})