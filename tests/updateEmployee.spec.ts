import { test } from '@playwright/test'
import { PageManager } from "../page-objects/pageManager"
import { CreateEmployeeAPI } from "../PrepareTestData/createEmployeeAPI"

test.describe('Verify PIM-employee detail page - update employee function', { tag: ['@employee', '@updateEmploye', '@smoke'] }, () => {

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
        const { employeeNumber } = await employeeAPI.createEmployeeAndGetDetails(dataBody);
        await pm.onEmployeeDetailPage().employeeDetailPageByUrl(employeeNumber);
    });

    test('7. Verify that the employee information has been updated successfully.', async ({ page }) => {
        const pm = new PageManager(page);
        const firstNameUpdate = 'update first name' + Date.now();
        const middleNameUpdate = 'mid' + Date.now();;
        const lastNameUpdate = 'user-update-' + Date.now();
        await pm.onEmployeeDetailPage().updateEmployeeWithInformation(firstNameUpdate, middleNameUpdate, lastNameUpdate);
        await pm.onEmployeeDetailPage().verifyEmployeeInformation(firstNameUpdate, middleNameUpdate, lastNameUpdate);
    })

    test('8. Verify that the admin user can edit the custom fields of employee successfully', async ({ page }) => {
        const pm = new PageManager(page);
        const bloodType = 'B+';
        const testField = 'this is a test';
        await pm.onEmployeeDetailPage().inputCustomFieldsInformation(bloodType, testField)
        await pm.onEmployeeDetailPage().verifyCustomfiledUpdatedSuccessfully(bloodType, testField);
    })

    test('9. Verify that the admin user cannot edit personal details of employee without adding all mandartory fields', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onEmployeeDetailPage().clearFirstName();
        await pm.onValidationCommon().verifyRequiredErrorMsgDisplayBasedOnPlaceHolder('First Name');
    })
})