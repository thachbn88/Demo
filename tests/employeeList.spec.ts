import { test } from '@playwright/test'
import { PageManager } from "../page-objects/pageManager"
import { CreateEmployeeAPI } from "../PrepareTestData/createEmployeeAPI"

test.describe('Verify PIM-employee list page - search function on list page', { tag: ['@employee', '@searchEmployee', '@smoke'] }, () => {

    test.use({ storageState: '.auth/adminUser.json' })

    test('6. Verify that the admin user can search employee based the Employee Information filter on Employee List page', async ({ page, context }) => {
        const pm = new PageManager(page);
        await pm.onEmployeeListPage().employeeListPageByUrl();
        const firstName = 'employee';
        const middleName = 'm';
        const lastName = 'employee-' + Date.now();
        const uniqueEmployeeId = await pm.onActionCommon().generateRamdomUniqueId();
        const dataBody = {
            "firstName": firstName,
            "middleName": middleName,
            "lastName": lastName,
            "empPicture": null,
            "employeeId": uniqueEmployeeId
        };

        const employeeAPI = new CreateEmployeeAPI(context.request);
        await employeeAPI.createEmployeeAndGetDetails(dataBody);
        await pm.onEmployeeListPage().searchOnFieldName('Employee Name', lastName);
        await pm.onEmployeeListPage().verifyEmployeeDisplayOnListExaclty(uniqueEmployeeId, firstName, middleName, lastName);
    })

})