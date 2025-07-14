// tests/flow-builder.spec.js
import { test, expect } from '@playwright/test';

test.describe('Chatbot Flow Builder', () => {
  // This hook runs before each test in this file
  test.beforeEach(async ({ page }) => {
    // ARRANGE: Go to the page before each test
    await page.goto('/');
  });

  test('should allow creating, connecting, editing, and saving a valid flow', async ({
    page,
  }) => {
    const nodesPanel = page.locator('aside');
    const canvas = page.locator('.react-flow__pane');

    await nodesPanel.getByText('Message').dragTo(canvas);
    await nodesPanel
      .getByText('Message')
      .dragTo(canvas, { targetPosition: { x: 400, y: 100 } });
    await expect(page.locator('.react-flow__node')).toHaveCount(2);

    const sourceHandle = page.locator('.react-flow__handle.source').first();
    const targetHandle = page.locator('.react-flow__handle.target').nth(1);
    await sourceHandle.dragTo(targetHandle);
    await expect(page.locator('.react-flow__edge')).toHaveCount(1);

    await page.locator('.react-flow__node').first().click();
    const settingsPanelTextarea = page.locator('textarea');
    await settingsPanelTextarea.fill('Hello, BiteSpeed!');
    await expect(settingsPanelTextarea).toHaveValue('Hello, BiteSpeed!');
    const firstNode = page.locator('.react-flow__node').first();
    await expect(firstNode.getByText('Hello, BiteSpeed!')).toBeVisible();

    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Flow saved successfully!')).toBeVisible();
  });

  test('should show an error when saving an invalid flow', async ({ page }) => {
    const nodesPanel = page.locator('aside');
    const canvas = page.locator('.react-flow__pane');
    await nodesPanel.getByText('Message').dragTo(canvas);
    await nodesPanel
      .getByText('Message')
      .dragTo(canvas, { targetPosition: { x: 400, y: 100 } });
    await expect(page.locator('.react-flow__node')).toHaveCount(2);

    await page.getByRole('button', { name: 'Save Changes' }).click();

    await expect(page.getByText('Cannot save flow')).toBeVisible();
  });

  test('should clear unsaved nodes on refresh, but persist saved flow', async ({
    page,
  }) => {
    const nodesPanel = page.locator('aside');
    const canvas = page.locator('.react-flow__pane');

    // --- Unsuccessful Save (invalid flow) ---
    await nodesPanel.getByText('Message').dragTo(canvas);
    await nodesPanel
      .getByText('Message')
      .dragTo(canvas, { targetPosition: { x: 400, y: 100 } });
    await expect(page.locator('.react-flow__node')).toHaveCount(2);
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Cannot save flow')).toBeVisible();
    // Refresh
    await page.reload();
    // Should be empty
    await expect(page.locator('.react-flow__node')).toHaveCount(0);

    // --- Successful Save (valid flow) ---
    // Add two nodes again
    await nodesPanel.getByText('Message').dragTo(canvas);
    await nodesPanel
      .getByText('Message')
      .dragTo(canvas, { targetPosition: { x: 400, y: 100 } });
    await expect(page.locator('.react-flow__node')).toHaveCount(2);
    // Connect them
    const sourceHandle = page.locator('.react-flow__handle.source').first();
    const targetHandle = page.locator('.react-flow__handle.target').nth(1);
    await sourceHandle.dragTo(targetHandle);
    await expect(page.locator('.react-flow__edge')).toHaveCount(1);
    // Save
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Flow saved successfully!')).toBeVisible();
    // Refresh
    await page.reload();
    // Should persist
    await expect(page.locator('.react-flow__node')).toHaveCount(2);
    await expect(page.locator('.react-flow__edge')).toHaveCount(1);
  });

  test('should clear the canvas when Clear button is pressed', async ({
    page,
  }) => {
    const nodesPanel = page.locator('aside');
    const canvas = page.locator('.react-flow__pane');
    await nodesPanel.getByText('Message').dragTo(canvas);
    await nodesPanel
      .getByText('Message')
      .dragTo(canvas, { targetPosition: { x: 400, y: 100 } });
    await expect(page.locator('.react-flow__node')).toHaveCount(2);
    // Click Clear button
    await page.getByRole('button', { name: 'Clear' }).click();
    // Confirm the dialog
    await page.getByRole('button', { name: 'Confirm' }).click();
    // Should be empty
    await expect(page.locator('.react-flow__node')).toHaveCount(0);
  });
});
