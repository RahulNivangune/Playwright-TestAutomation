import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 10 * 7000,
  expect: {
    timeout: 5000,
  },  
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
   //retries: process.env.CI ? 2 : 0,
  retries: 1,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter: [['html'],["line"],['allure-playwright']],
  //reporter: [['html'],['allure-playwright',{outputFolder: 'my-allure-result'}]],
  //reporter: 'list', //List reporter is default (except on CI where the dot reporter is default). It prints a line for each test being run.
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Base URL to use in actions like `await page.goto('/')`. */
  //   // baseURL: 'http://127.0.0.1:3000',

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //    // Name of the browser that runs tests. For example `chromium`, `firefox`, `webkit`.
  //   browserName: 'chromium',    
  //   headless: false,
  //   trace: 'on-first-retry',
  //   // Viewport used for all pages in the context.
  //   viewport: { width: 1920, height: 1080 },
  //   video: 'off',
  //   screenshot: 'only-on-failure',
  //   launchOptions:{
  //     slowMo: 1000
  //   }
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      //chrome
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',//This is use only for chrome
        //browserName: 'chromium', 
        headless: false,        
        trace: 'on',
        video: 'retain-on-failure',
        screenshot: 'on',
        ignoreHTTPSErrors: true,//Even the website is not https then accept ssl ceriticate
        permissions:['geolocation'],//Browser will accept the allow button(Location)
        //viewport: { width: 1920, height: 1080 },//Viewport used for all pages in the context.
        launchOptions:{
          slowMo: 1000
        }
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'], channel: 'chrome',
    //     headless: false      
    //   },
        
    // }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
