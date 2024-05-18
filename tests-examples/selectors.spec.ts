import {test,expect} from '@playwright/test'

test('Selectors Test', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');

  //Open the playwright inspector window
  await page.pause();

  //Using any object property
  await page.click('id=user-name');
  await page.locator('[id="user-name"]').fill('Einsten');
  await page.locator('id=user-name').fill('Edison');
  await page.locator('input[id="user-name"]').fill('Edison');

  //Using CSS selector 
  await page.locator('#login-button').click();

  //Using Xpath
  await page.locator('xpath=//input[@id="user-name"]').fill('Faraday');
  await page.locator('//input[@id="user-name"]').fill('Ramanjun');

  //Using Text
await page.locator('text=LOGIN').click();
await page.locator('input:has-text("LOGIN")').click();
await page.locator('figure').filter({hasText:'High'}).click();

//GetByPlaceHolder
await page.getByPlaceholder('Enter username').click();

//GetByText
await page.getByText('Notes').click();
await page.getByText('Notes').first().click();
await page.getByText('Submitted',{exact: true}).click();
await page.getByText('Files').setInputFiles('img1.png');

//GetByLabel
await page.getByLabel('Creator Department *').click();
await page.getByLabel('Link Name').fill('Link name'); 
await page.getByLabel('Choose Type *').locator('span').click();

//GetByRole
await page.getByRole('button',{name:'Add Link'}).click();
await page.getByRole('heading',{name:'Action', exact:true}).click();
await page.getByRole('option',{name:'Corporate'}).locator('div').click();
await page.getByRole('row').filter({has:page.getByText('Notes')});//fine row with have notes test locator

})