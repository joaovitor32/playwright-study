import { expect } from '@playwright/test';
import test from './next-fixture';

test.describe('Mock request tests', () => {
  test('Test client side mock request', async ({ page, port, requestInterceptor, rest }) => {
    requestInterceptor.use(
      rest.get(`https://pokeapi.co/api/v2/pokemon/1/`, (req, res, ctx) =>
        res(
          ctx.json({
            pokemon: 'Pikachu',
          })
        )
      )
    );
    await page.route(`http://localhost:${port}/api/reviews`, (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          {
            id: '60333292-7ca1-4361-bf38-b6b43b90cb16',
            title: 'John Maverick',
            description:
              'Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!',
          },
        ]),
      })
    );

    await page.goto(`http://localhost:${port}/ssr`);
    await page.click('button');
    const description = await page.innerText('ul li p');
    expect(description).toMatch(/^John Maverick/);
  });
});
