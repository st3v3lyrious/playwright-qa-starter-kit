import {test} from '@playwright/test';
import { TodoPage } from '../../src/page-objects/todomvc/TodoPage';

const TODO_URL = 'http://demo.playwright.dev/todomvc/#/';

test.describe('TodoMVC - with page object', () => {
  test('add two todos and see correct counter', async ({page}) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();  

    await todoPage.addTodo('Buy milk');
    await todoPage.addTodo('Buy bread');

    await todoPage.getTodo('Buy milk').waitFor();
    await todoPage.getTodo('Buy bread').waitFor();

    await todoPage.expectItemsLeft(2);
  });
});