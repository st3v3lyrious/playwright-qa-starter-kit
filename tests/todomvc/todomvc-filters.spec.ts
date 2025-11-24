import { test, expect } from '@playwright/test';
import { TodoPage } from '../../src/page-objects/todomvc/TodoPage';

test.describe('TodoMVC - filters and completion', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    // always start with a known set of todos
    await todoPage.addTodo('Buy milk');
    await todoPage.addTodo('Buy bread');
    await todoPage.addTodo('Walk dog');

    await todoPage.expectItemsLeft(3);
  });

  test('can complete a todo and update counter', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.toggleTodo('Buy milk');

    // "Buy milk" is completed → 2 left
    await todoPage.expectItemsLeft(2);

    const todoItem = todoPage.getTodo('Buy milk');
    await expect(todoItem).toHaveClass(/completed/); // class CSS "completed"
  });

  test('filters Active vs Completed', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // Complete 2 todos
    await todoPage.toggleTodo('Buy milk');
    await todoPage.toggleTodo('Buy bread');
    await todoPage.expectItemsLeft(1);

    // Filter "Active" → seulement "Walk dog"
    await todoPage.filterActive();
    await todoPage.expectVisibleTodos(['Walk dog']);

    // Filter "Completed" → "Buy milk", "Buy bread"
    await todoPage.filterCompleted();
    await todoPage.expectVisibleTodos(['Buy milk', 'Buy bread']);

    // Return to "All" → All 3
    await todoPage.filterAll();
    await todoPage.expectVisibleTodos(['Buy milk', 'Buy bread', 'Walk dog']);
  });

  test('clear completed removes only completed todos', async ({ page }) => {
    const todoPage = new TodoPage(page);

    // Let's complete "Buy milk" and "Buy bread"
    await todoPage.toggleTodo('Buy milk');
    await todoPage.toggleTodo('Buy bread');

    await todoPage.clearCompleted();

    // Must remain only "Walk dog"
    await todoPage.expectVisibleTodos(['Walk dog']);
    await todoPage.expectItemsLeft(1);
  });
});
