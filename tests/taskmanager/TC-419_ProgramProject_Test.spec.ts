import { test, expect } from '@playwright/test';
import { BaseTest } from '../../utilities/BaseTest';
import { CommonPage } from '../../pages/common/CommonPage';
import { LoginPage } from '../../pages/login/LoginPage';
import { ProjectTypePage } from '../../pages/taskmanager/ProjectTypePage';
import { ProjectInboxPage } from '../../pages/taskmanager/ProjectInboxPage';
import { ReportsPage } from '../../pages/taskmanager/ReportsPage';

/**
 * @Author : Rahul Nivangune
 * @Date : 09-May-2024
 * @ScriptName : TC-419_ProgramProject_Test
 * @Description : Create Program Project with two task and its feedback survey execution and validation
 * @TestCaseCover : TC-419_ProgramProject_Test
 */

/*******Start Global Variables**************************/
let objBaseTest: any, objLoginPage: any,objCommonPage: any, objProjectTypePage:any, objProjectInboxPage:any, objReportsPage:any;
let appUrl= 'https://knlcl01uspt.reflexisinc.com/kernel/views/authenticate/W/AUTOM.view';
let userName= '1003952', userPassword= '1003952Zebra@123!', projectType='Action',projectName='Program Project Test ZTM 4444',creatorDepartment='Corporate';
let assignTo= 'Store Manager - Store',projectEndDay='1',visibility='I',priority='1',projectTag='Action Projet',projectNoteTab='Notes',projectAttachmentTab='Attachments';
let projectDistributionTab= 'Distribution',projectFinalizeTab= 'Finalize',projectAttachmentName='Simple Project Attachment.jpg', distributionByOption='specificStore';
let projectNotes="<p>A change like this can be difficult to adjust to, so these tasks are assigned to ensure all Kitchen associates understand this new process, as well as countertop quoting basics.</p>";
let storeName='SR-ROC-Rockford IL.00102', projectSubmissionMessage='Project Submitted to Approval',projectSubmittedStatus= 'Submitted',projectGridColumnIndex= '7';

/*******End Global Variables*****************************/

//Run test file in parallel & serial mode
//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'}); //Once test failed then other test are skipped. Make dependent test
//Group Test
test.describe('All Program Project Test', () => {

    //Before All Test
    test.beforeAll('Initialize Web Environment', async ({ browser }) => {    
        //Implement code here
    })

   //Before Each Test
    test.beforeEach('Before Each Test', async ({ page }) => {
           //Initialize Pages
         objBaseTest = new BaseTest(page);
         objCommonPage = new CommonPage(page);
         objLoginPage = new LoginPage(page);
         objProjectTypePage = new ProjectTypePage(page);
         objProjectInboxPage = new ProjectInboxPage(page);
         objReportsPage = new ReportsPage(page);

          //Load Base url
          await objBaseTest.loadBaseUrl(appUrl);

          //Login into application
          await objLoginPage.doLogin(userName,userPassword);
    })


    /**TC-419_ProgramProject_Test with Annotations '@TaskManager,@Sanity,@Functional,@P1,@Mid'*/
    test('TC-419_ProgramProject_Test @TaskManager,@Sanity,@P1,@Mid', async ({ page }) => {

        //Create Project
        await objCommonPage.commonGotoLHSTreeMenu("#menu-RTM20","#main-menu-PRJ1","#submenu-IN1");       
        await objProjectInboxPage.clickProjectInboxPageCreateNewLink();
        await objProjectInboxPage.setProjectInboxPageSearchByProjectType(projectType);
        await objProjectInboxPage.clickProjectInboxPagePojectTypeCardLink(projectType);
        await objProjectInboxPage.setProjectInboxPageProjectName(projectName);
        await objProjectInboxPage.setProjectInboxPageCreatorDepartments(creatorDepartment);
        await objProjectInboxPage.clickProjectInboxPageDropdownOptionLink(creatorDepartment);
        await objProjectInboxPage.setProjectInboxPageAssignto(assignTo);
        await objProjectInboxPage.clickProjectInboxPageDropdownOptionLink(assignTo);
        await objProjectInboxPage.clickProjectInboxPageDatePicker();
        await objProjectInboxPage.clickProjectInboxPageDurationStartDate();
        await objProjectInboxPage.clickProjectInboxPageDurationEndDate(projectEndDay);
        await objProjectInboxPage.clickProjectInboxPageVisibilityOptionRadioButton(visibility);
        await objProjectInboxPage.clickProjectInboxPagePriorityRadioButton(priority);
        await objProjectInboxPage.setProjectInboxPageProjectTag(projectTag);
        await objProjectInboxPage.clickProjectInboxPageProjectCreateNextButton();

        //Add Project Notes
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(projectNoteTab);
        await objProjectInboxPage.clickProjectInboxPageProjectNotes();
        await objProjectInboxPage.setProjectInboxPageProjectNotes(projectNotes);

        //Add Project Attachments
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(projectAttachmentTab);
        await objProjectInboxPage.setProjectInboxPageAttachmentsUploadInput(projectAttachmentName);

        //Add Project Distribution
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(projectDistributionTab);
        await objProjectInboxPage.clickProjectInboxPageDistributionByOptionRadioButton(distributionByOption);
        await objProjectInboxPage.setProjectInboxPageDistributionSearch(storeName);
        await objProjectInboxPage.clickProjectInboxPageDistributionStoreLink(storeName);
        await objProjectInboxPage.clickProjectInboxPageDistributionAddButton();        

        //Submit Project
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(projectFinalizeTab);
        await objProjectInboxPage.clickProjectInboxPageFinalizeSubmitButton();
        await objProjectInboxPage.setProjectInboxPageProjectSubmissionMessage(projectSubmissionMessage);
        await objProjectInboxPage.clickProjectInboxPageProjectSubmissionSubmitButton();
        

        //Search Project
        await objProjectInboxPage.clickProjectInboxPageProjectFilterIconLink();
        await objProjectInboxPage.clickProjectInboxPageProjectFiltersClearAllButton();
        await objProjectInboxPage.setProjectInboxPageProjectFiltersProjectName(projectName);
        await objProjectInboxPage.clickProjectInboxPageProjectFiltersApplyButton();

        //Verify Submitted Project Name and Status
        await objProjectInboxPage.verifyProjectInboxPageProjectListGridProjectName(projectName);
        await objProjectInboxPage.verifyProjectInboxPageProjectListGridData(projectName,projectGridColumnIndex,projectSubmittedStatus);
        
    });

    
    //After Each Test
    test.afterEach('After Each Test', async ({ page }) => {

        //Logout from application
        await objLoginPage.doLogout();

        //Teardown web environment
        await objBaseTest.tearDownWebEnvironment();
    })

    //After All Test
    test.afterAll('TearDown Web Environment', async ({ browser }) => {
        //Implement code here
    })

})