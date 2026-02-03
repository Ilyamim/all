import { test, expect } from '@playwright/test';

const organizerEmail = process.env.E2E_ORGANIZER_EMAIL || 'organizer@example.com';
const organizerPassword = process.env.E2E_ORGANIZER_PASSWORD || 'password123';
const volunteerEmail = process.env.E2E_VOLUNTEER_EMAIL || 'volunteer@example.com';
const volunteerPassword = process.env.E2E_VOLUNTEER_PASSWORD || 'password123';

const login = async (page, email: string, password: string) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
};

test('organizer creates event, volunteer joins and checks in, organizer approves', async ({ page }) => {
  await login(page, organizerEmail, organizerPassword);
  await page.goto('/organizer/events/new');
  await page.getByLabel('Title').fill('E2E Community Day');
  await page.getByLabel('Location').fill('Main Plaza');
  await page.getByLabel('Start time').fill('2024-10-10T09:00');
  await page.getByLabel('End time').fill('2024-10-10T12:00');
  await page.getByLabel('Capacity').fill('25');
  await page.getByRole('button', { name: 'Create event' }).click();

  await login(page, volunteerEmail, volunteerPassword);
  await page.goto('/events');
  await expect(page.getByText('Explore events')).toBeVisible();

  await page.goto('/checkin?eventId=event-1&token=alpha123');
  await page.getByRole('button', { name: 'Check in now' }).click();
  await expect(page.getByText('Check-in successful.')).toBeVisible();

  await login(page, organizerEmail, organizerPassword);
  await page.goto('/organizer/events/event-1');
  await page.getByRole('button', { name: 'Approve' }).first().click();
});
