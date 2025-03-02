import { APIRequestContext, APIResponse } from '@playwright/test';

export class CreateEmployeeAPI {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createEmployeeAndGetDetails(dataBody: object): Promise<{ employeeId: string; employeeNumber: string }> {
        const response: APIResponse = await this.request.post(
            'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                data: dataBody
            }
        );

        const responseBody = await response.json();
        const employeeId = responseBody.data.employeeId;
        const employeeNumber = responseBody.data.empNumber;

        console.log('Response Body:', responseBody);
        console.log('Employee ID:', employeeId);
        console.log('Employee Number:', employeeNumber);

        return { employeeId, employeeNumber };
    }
}

