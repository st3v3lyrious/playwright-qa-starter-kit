import { test, expect } from '@playwright/test';
import { RestfulApiClient } from '../../src/api/restfulApiClient';

test.describe('Restful API Dev - objects', () => {
  test('can fetch a demo object by id', async ({ request }) => {
    const client = new RestfulApiClient(request);

    // restful-api.dev provides a few reserved IDs, for ex: 7, 8, 9, etc.
    const response = await client.getObject('7');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    // typical expected structure: { id: "7", name: "...", data: { ... } }
    expect(body).toHaveProperty('id', '7');
    expect(body).toHaveProperty('name');
  });

  test('can create a custom object and retrieve it', async ({ request }) => {
    const client = new RestfulApiClient(request);

    const createResponse = await client.createObject({
      name: 'QA test object',
      data: {
        type: 'demo',
        owner: 'playwright',
      },
    });

    expect(createResponse.ok()).toBeTruthy();
    expect(createResponse.status()).toBe(200);

    const created = await createResponse.json();

    expect(created).toHaveProperty('id');
    expect(created).toHaveProperty('name', 'QA test object');
    expect(created).toHaveProperty('data');
    expect(created.data).toHaveProperty('owner', 'playwright');

    const id = created.id as string;

    // GET to check the object was really created
    const getResponse = await client.getObject(id);
    expect(getResponse.ok()).toBeTruthy();

    const fetched = await getResponse.json();
    expect(fetched).toMatchObject(created);
  });

  test('can delete an object and receive 404 afterwards', async ({ request }) => {
    const client = new RestfulApiClient(request);

    // first create an object to delete
    const createResponse = await client.createObject({
      name: 'Temp object to delete',
      data: { temp: true },
    });

    expect(createResponse.ok()).toBeTruthy();
    const created = await createResponse.json();
    const id = created.id as string;

    // then delete it
    const deleteResponse = await client.deleteObject(id);
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(200);

    // & check it has been deleted
    const getResponse = await client.getObject(id);
    expect(getResponse.ok()).toBeFalsy();
    expect(getResponse.status()).toBe(404);
  });

  test('can update an existing object', async ({ request }) => {
    const client = new RestfulApiClient(request);

    // first create an object to update
    const createResponse = await client.createObject({
      name: 'Object to update',
      data: { version: 1 },
    });

    expect(createResponse.ok()).toBeTruthy();
    const created = await createResponse.json();
    const id = created.id as string;

    // now update it
    const updateResponse = await client.updateObject(id, {
      name: 'Updated object name',
      data: { version: 2, updated: true },
    });

    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    const updated = await updateResponse.json();

    expect(updated).toHaveProperty('id', id);
    expect(updated).toHaveProperty('name', 'Updated object name');
    expect(updated.data).toHaveProperty('version', 2);
    expect(updated.data).toHaveProperty('updated', true);

    // finally, fetch to confirm the update
    const getResponse = await client.getObject(id);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    const fetched = await getResponse.json();
    expect(fetched).toMatchObject(updated);
  });
});
