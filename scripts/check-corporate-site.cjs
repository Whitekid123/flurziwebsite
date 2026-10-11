const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[2] || 'http://localhost:3411';
const output = 'screenshots/corporate-site';
const slugs = ['endnovel', 'flurzi360', 'commit', 'flurzix', 'flurzirush', 'cortex', 'cinema'];
const routes = ['/', '/about', '/products', '/innovation', '/partnerships', '/contact', '/faq', ...slugs.map(s => '/products/' + s), '/privacy-policy', '/terms', '/disclaimer', '/data-protection'];
const checks = [], errors = [], internalLinks = new Set(), externalLinks = new Set();
const check = (passed, label) => checks.push({label, passed: Boolean(passed)});
fs.mkdirSync(output, {recursive: true});
(async () => {
  const browser = await chromium.launch({executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true});
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const route of routes) {
      const response = await page.goto(base + route, {waitUntil: 'networkidle'});
      check(response.status() === 200, route + ' returns 200');
      check(await page.locator('h1').count() === 1, route + ' has one main heading');
      check((await page.title()).includes('Flurzi Limited'), route + ' has corporate metadata');
      check((await page.locator('link[rel=canonical]').getAttribute('href')).replace(/\/$/, '') === ('https://www.flurzi.com' + route).replace(/\/$/, ''), route + ' canonical');
      const text = await page.locator('body').innerText();
      check(!/Flurzi Mobile App Limited|Future-focused Lifestyle|Four products|hello@flurzimobileapp/.test(text), route + ' has no superseded company content');
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + ' desktop fits');
      const links = await page.locator('a').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')));
      check(links.every(href => href && href !== '#' && !href.includes('undefined')), route + ' has concrete link destinations');
      for (const href of links) {
        if (href.startsWith('/')) internalLinks.add(href.split('#')[0].split('?')[0]);
        if (href.startsWith('http')) externalLinks.add(href);
        if (href.startsWith('#')) check(await page.locator('[id="' + href.slice(1) + '"]').count() > 0, route + ' anchor ' + href);
      }
      await page.locator('img').evaluateAll(images => images.forEach(i => i.loading = 'eager'));
      await page.waitForFunction(() => [...document.images].every(i => i.complete), {timeout: 15000});
      check(await page.locator('img').evaluateAll(images => images.every(i => i.naturalWidth > 0 && i.hasAttribute('alt'))), route + ' images load and have alt attributes');
      if (['/', '/about', '/products', '/innovation', '/partnerships', '/contact'].includes(route)) await page.screenshot({path: path.join(output, (route === '/' ? 'home' : route.slice(1)) + '-desktop.png'), fullPage: true});
      await page.setViewportSize({width: 390, height: 844});
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + ' mobile fits');
      if (['/', '/products', '/contact', '/about'].includes(route)) await page.screenshot({path: path.join(output, (route === '/' ? 'home' : route.slice(1)) + '-mobile.png'), fullPage: true});
      await page.setViewportSize({width: 1440, height: 1000});
    }
    for (const href of internalLinks) {
      const response = await page.request.get(base + href);
      check(response.ok(), 'Linked route works: ' + href);
    }
    for (const [old, current] of [['/projects', '/innovation'], ['/products/sponsorsafe', '/products/flurzi360'], ['/products/playvault', '/products/flurzirush'], ['/products/flurzi-x', '/products/flurzix']]) {
      const response = await page.request.get(base + old, {maxRedirects: 0});
      check(response.status() === 308 && response.headers().location === current, old + ' preserves legacy access with permanent redirect');
    }
    const missing = await page.goto(base + '/missing-page-test');
    check(missing.status() === 404 && await page.getByRole('link', {name: 'Flurzi home', exact: false}).count() > 0, 'Unknown route provides useful 404');
    await page.goto(base + '/products');
    check(await page.locator('.platform-row').count() === 7, 'All seven platforms in ecosystem');
    for (const [sector, count] of [['Business', 2], ['Finance', 1], ['Entertainment', 3], ['Technology', 1], ['All platforms', 7]]) {
      await page.getByRole('button', {name: sector, exact: true}).click();
      check(await page.locator('.platform-row').count() === count, sector + ' filter');
      check(await page.getByRole('button', {name: sector, exact: true}).getAttribute('aria-pressed') === 'true', sector + ' filter exposes state');
    }
    for (const width of [320, 390, 768, 1024]) {
      await page.setViewportSize({width, height: 844});
      await page.goto(base);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Homepage fits ' + width);
      const button = page.locator('.editorial-menu-button');
      await button.click();
      check(await button.getAttribute('aria-expanded') === 'true', 'Menu opens at ' + width);
      check(await page.locator('#main').evaluate(el => el.inert), 'Open menu isolates background at ' + width);
      const last = page.locator('#site-menu a').last();
      await last.focus(); await page.keyboard.press('Tab');
      check(await button.evaluate(el => el === document.activeElement), 'Menu traps Tab at ' + width);
      await page.keyboard.press('Shift+Tab');
      check(await last.evaluate(el => el === document.activeElement), 'Menu traps Shift+Tab at ' + width);
      await page.keyboard.press('Escape');
      check(await button.getAttribute('aria-expanded') === 'false', 'Escape closes menu at ' + width);
      check(await button.evaluate(el => el === document.activeElement), 'Menu returns focus at ' + width);
      await button.click();
      await page.locator('#site-menu nav').getByRole('link', {name: 'Technology & Innovation'}).click();
      await page.waitForURL('**/innovation');
      check(await page.locator('#site-menu').count() === 0, 'Menu navigation closes drawer at ' + width);
    }
    await page.setViewportSize({width: 390, height: 844});
    for (const [query, expected] of [['topic=partnership', 'Partnership opportunity'], ['topic=business', 'Business enquiry'], ['topic=opportunity', 'Future opportunity'], ['topic=platform', 'Platform enquiry'], ['product=flurzi360', 'Flurzi360 business enquiry'], ['product=commit', 'Flurzi Commit enquiry'], ['topic=privacy', 'Privacy and data protection']]) {
      await page.goto(base + '/contact?' + query, {waitUntil: 'networkidle'});
      check(await page.locator('#contact-topic').inputValue() === expected, 'Contact routes ' + query);
    }
    await page.locator('button[type=submit]').click();
    check(await page.locator('#contact-name').evaluate(el => !el.validity.valid), 'Enquiry requires name');
    await page.locator('#contact-name').fill('Local QA');
    await page.locator('#contact-email').fill('qa@example.com');
    await page.locator('#contact-message').fill('Local validation only. This draft must not be sent.');
    const downloadEvent = page.waitForEvent('download');
    await page.locator('button[type=submit]').click();
    const download = await downloadEvent;
    const draft = fs.readFileSync(await download.path(), 'utf8');
    check(download.suggestedFilename() === 'flurzi-enquiry.txt' && draft.includes('Privacy and data protection') && draft.includes('qa@example.com'), 'Downloaded enquiry contains selected topic and details');
    check((await page.locator('[role=status]').innerText()).includes('not been sent'), 'Enquiry never claims delivery');
    await page.setViewportSize({width: 320, height: 844});
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Contact fits 320px');
    await page.goto(base + '/faq');
    const question = page.locator('#brand-meaning summary');
    await question.click();
    check(await page.locator('#brand-meaning').getAttribute('open') !== null, 'FAQ expands');
    check((await page.locator('#brand-meaning p').innerText()).includes('Fear Limits Us, Rising Zeal Imprints'), 'FAQ has approved brand meaning');
    const xml = await (await page.request.get(base + '/sitemap.xml')).text();
    check(routes.every(route => xml.includes('https://www.flurzi.com' + route + '</loc>')), 'Sitemap includes every current public route');
    check(errors.length === 0, 'No browser runtime errors');
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, 'validation.json'), JSON.stringify({checks, errors, internalLinks: [...internalLinks], externalLinks: [...externalLinks]}, null, 2));
    console.log(JSON.stringify({passed: checks.filter(x => x.passed).length, total: checks.length, failures: checks.filter(x => !x.passed), errors}, null, 2));
    if (checks.some(x => !x.passed) || errors.length) process.exitCode = 1;
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
