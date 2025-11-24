import { Page, Locator, expect } from "@playwright/test";

export class TodoPage {
    readonly page: Page;
    readonly input: Locator;
    readonly counter: Locator;
    readonly toggleAll: Locator;
    readonly filters: {
        all: Locator;
        active: Locator;
        completed: Locator;
    };
    readonly clearCompletedButton: Locator;
    readonly todoList: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.input = page.getByPlaceholder('What needs to be done?');
        this.counter = page.getByTestId('todo-count');
        this.toggleAll = page.getByLabel('Mark all as complete');
        this.filters = {
            all: page.getByRole('link', { name: 'All' }),
            active: page.getByRole('link',{ name: 'Active' }),
            completed: page.getByRole('link', { name: 'Completed' }),
        };
        this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
        this.todoList = page.getByRole('list', { name: 'Todo list' });
    }

    async goto() {
        await this.page.goto('http://demo.playwright.dev/todomvc/#/');
    }

    async addTodo(todoText: string) {
        await this.input.click();
        await this.input.fill(todoText);
        await this.input.press('Enter');
    }

    getTodo(todoText: string) {
        // only one matching todo item
        return this.page.getByRole('listitem').filter({ hasText: todoText });
    }

    getTodoCheckbox(todoText: string) {
        // checkbox associated with the todo item
        return this.getTodo(todoText).getByRole('checkbox');
    }

    async toggleTodo(todoText: string) {
        await this.getTodoCheckbox(todoText).click();
    }

    async expectItemsLeft(count: number) {
        await expect(this.counter).toContainText(String(count));
    }

    async filterAll() {
        await this.filters.all.click();
    }

    async filterActive() {
        await this.filters.active.click();
    }
    
    async filterCompleted() {
        await this.filters.completed.click();
    }   

    async clearCompleted() {
        if (await this.clearCompletedButton.isVisible()) {
            await this.clearCompletedButton.click();
        }
    }

    async expectVisibleTodos(todoTexts: string[]) {
        for (const todoText of todoTexts) {
            await expect(this.getTodo(todoText)).toBeVisible();
        }
    }
}