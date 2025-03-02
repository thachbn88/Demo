import { test } from '@playwright/test'
import { PageManager } from "../page-objects/pageManager"
import { CreateEmployeeAPI } from "../PrepareTestData/createEmployeeAPI"

test.describe('Verify PIM-add employee page - add employee function', { tag: ['@employee', '@createEmploye', '@smoke'] }, () => {

    let firstName: string;
    let middleName: string;
    let lastName: string;
    let givenEmployeeId: string;

    test.use({ storageState: '.auth/adminUser.json' })
    test.beforeEach(async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onCreateEmployeePage().createEmployeePageByUrl();
        firstName = 'employee';
        middleName = 'm';
        lastName = 'employee-' + Date.now();
        givenEmployeeId = await pm.onActionCommon().generateRamdomUniqueId();
    })

    test('1. Verify that the admin user can create new employee from the employee list page successfully', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onEmployeeListPage().employeeListPageByUrl();
        await pm.onActionCommon().clickActionButton('Add');
        await pm.onCreateEmployeePage().createEmployeeWithInformation(firstName, middleName, lastName, givenEmployeeId);
        await pm.onEmployeeDetailPage().verifyEmployeeInformation(firstName, middleName, lastName, givenEmployeeId);
    })

    test('2. Verify that the admin user can create new employee from the add employee page successfully', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onCreateEmployeePage().createEmployeeWithInformation(firstName, middleName, lastName, givenEmployeeId);
        await pm.onEmployeeDetailPage().verifyEmployeeInformation(firstName, middleName, lastName, givenEmployeeId);

    })

    test('3. Verify that the admin user cannot create new employee wihtout adding all mandartory fields', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onActionCommon().clickActionButton('Save');
        await pm.onValidationCommon().verifyRequiredErrorMsgDisplayBasedOnPlaceHolder('First Name');
        await pm.onValidationCommon().verifyRequiredErrorMsgDisplayBasedOnPlaceHolder('Last Name');
    })

    test('4. Verify that the admin user cannot create new employee with duplicate employeeID', async ({ page, context }) => {
        const pm = new PageManager(page);
        const dataBody = {
            "firstName": firstName,
            "middleName": middleName,
            "lastName": lastName,
            "empPicture": null,
            "employeeId": givenEmployeeId
        };

        const employeeAPI = new CreateEmployeeAPI(context.request);
        const { employeeId } = await employeeAPI.createEmployeeAndGetDetails(dataBody);
        await pm.onCreateEmployeePage().inputEmpoyeeIdNumber(employeeId);
        await pm.onActionCommon().clickActionButton('Save');
        await pm.onCreateEmployeePage().verifyErrorMsgDuplicateEmployeeId();
    })

    test('5. Verify that the employee list will be returned when admin cancel to add new employee', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onActionCommon().clickActionButton('Cancel');
        await pm.onEmployeeListPage().verifyEmployeeListPageIsDisplayed();
    })
})