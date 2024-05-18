import { test, expect } from '@playwright/test';
//const customtest =  require('../../resources/testdata/AUTOM/excel/TaskManager/TC_419Data');
import { BaseTest } from '../../utilities/BaseTest';
//import { DataFunctions } from '../../utilities/DataFunctions';
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
let objBaseTest: BaseTest, objCommonPage: CommonPage, objLoginPage: LoginPage, objProjectTypePage:ProjectTypePage, objProjectInboxPage:ProjectInboxPage, objReportsPage:ReportsPage;
let masterData: any, testData: any;
let projectName:string;
/*******End Global Variables*****************************/

//Run test file in parallel & serial mode
//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'}); //Once test failed then other test are skipped. Make dependent test
//Group Test
test.describe('All Program Project Test', () => {

    //Before All Test
    test.beforeAll('Initialize Web Environment', async ({ browser }) => {
        //Implement code here
        objBaseTest = new BaseTest();
        objBaseTest.initializeWebEnvironment();
        masterData = await objBaseTest.loadMasterTestData();
        testData = await objBaseTest.loadTestData('TC-419','TC-419');
        //testData = await objBaseTest.loadJSONTestData('TC-419');
        
    })

   //Before Each Test
    test.beforeEach('Before Each Test', async ({ page }) => {
           //Initialize Pages
         
         objCommonPage = new CommonPage(page);
         objLoginPage = new LoginPage(page);
         objProjectTypePage = new ProjectTypePage(page);
         objProjectInboxPage = new ProjectInboxPage(page);
         objReportsPage = new ReportsPage(page);

          //Load Base url
          await objBaseTest.loadBaseUrl(page,masterData.get('Url'));

          //Login into application
          await objLoginPage.doLogin(masterData.get('CreatorUserId').toString(), masterData.get('CreatorUserPassword'));
    })

    /*//Use loop for test data parameterization with different data set
    for(const data of testData){
       data.ProjectEndDay //use insteadOf testData.get('ProjectEndDay') in test parameter
       //add variable in test title ->test(`TC-419_ProgramProject_Test ${data.TestCaseName} @TaskManager,@Sanity,@P1,@Mid`, async ({ page }) => { });
    }*/

    /**TC-419_ProgramProject_Test with Annotations '@TaskManager,@Sanity,@Functional,@P1,@Mid'*/
    test('TC-419_ProgramProject_Test @TaskManager,@Sanity,@P1,@Mid', async ({ page }) => {     
       
        //Create Project
        await objCommonPage.commonGotoLHSTreeMenu(masterData.get('TaskManagerMenu'),masterData.get('ProjectsSubMenu'),masterData.get('ProjectsInboxMenuLink'));
        await objProjectInboxPage.clickProjectInboxPageCreateNewLink();
        await objProjectInboxPage.setProjectInboxPageSearchByProjectType(masterData.get('ActionProjectType'));
        await objProjectInboxPage.clickProjectInboxPagePojectTypeCardLink(masterData.get('ActionProjectType'));
        projectName=testData.get('ProjectName')+'5555';
        await objProjectInboxPage.setProjectInboxPageProjectName(projectName);
        await objProjectInboxPage.setProjectInboxPageCreatorDepartments(masterData.get('CorpDepartment1'));
        await objProjectInboxPage.clickProjectInboxPageDropdownOptionLink(masterData.get('CorpDepartment1'));
        await objProjectInboxPage.setProjectInboxPageAssignto(masterData.get('StoreProfile1') +' - '+masterData.get('StoreDepartment1'));
        await objProjectInboxPage.clickProjectInboxPageDropdownOptionLink(masterData.get('StoreProfile1') +' - '+masterData.get('StoreDepartment1'));
        await objProjectInboxPage.clickProjectInboxPageDatePicker();
        await objProjectInboxPage.clickProjectInboxPageDurationStartDate();
        await objProjectInboxPage.clickProjectInboxPageDurationEndDate(testData.get('ProjectEndDay'));
        await objProjectInboxPage.clickProjectInboxPageVisibilityOptionRadioButton(masterData.get('ImmediateVisibilityId'));
        await objProjectInboxPage.clickProjectInboxPagePriorityRadioButton(masterData.get('HighPriority'));
        await objProjectInboxPage.setProjectInboxPageProjectTag(testData.get('ProjectTag'));
        await objProjectInboxPage.clickProjectInboxPageProjectCreateNextButton();

        //Add Project Notes
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(masterData.get('NotesTab'));
        await objProjectInboxPage.clickProjectInboxPageProjectNotes();
        await objProjectInboxPage.setProjectInboxPageProjectNotes(testData.get('ProjectNotes'));

        //Add Project Attachments
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(masterData.get('AttachmentsTab'));
        await objProjectInboxPage.setProjectInboxPageAttachmentsUploadInput(testData.get('ProjectAttachmentName'));

        //Add Project Distribution
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(masterData.get('DistributionTab'));
        await objProjectInboxPage.clickProjectInboxPageDistributionByOptionRadioButton(masterData.get('DistributionBySpecificStoresValue'));
        await objProjectInboxPage.setProjectInboxPageDistributionSearch(masterData.get('StoreUnitName1'));
        await objProjectInboxPage.clickProjectInboxPageDistributionStoreLink(masterData.get('StoreUnitName1'));
        await objProjectInboxPage.clickProjectInboxPageDistributionAddButton();        

        //Submit Project
        await objProjectInboxPage.clickProjectInboxPageProjectTabLink(masterData.get('FinalizeTab'));
        await objProjectInboxPage.clickProjectInboxPageFinalizeSubmitButton();
        await objProjectInboxPage.setProjectInboxPageProjectSubmissionMessage(masterData.get('ProjectSubmissionMessage'));
        await objProjectInboxPage.clickProjectInboxPageProjectSubmissionSubmitButton();
        

        //Search Project
        await objProjectInboxPage.clickProjectInboxPageProjectFilterIconLink();
        await objProjectInboxPage.clickProjectInboxPageProjectFiltersClearAllButton();
        await objProjectInboxPage.setProjectInboxPageProjectFiltersProjectName(projectName);
        await objProjectInboxPage.clickProjectInboxPageProjectFiltersApplyButton();

        //Verify Submitted Project Name and Status
        await objProjectInboxPage.verifyProjectInboxPageProjectListGridProjectName(projectName);
        await objProjectInboxPage.verifyProjectInboxPageProjectListGridData(projectName,testData.get('ProjectGridColumnIndex'),masterData.get('SubmittedProjectStatus'));
        
    });

    /**Pass the TestData as fixure by extend test annotations behaviour'*/
    /*customtest.only('TC-419_ProgramProject_Test- Extend Test Behaviour @TaskManager,@Sanity,@P1,@Mid', async ({ page,testData }) => {    
        console.log("testData from custom test->"+testData.projectName);
    }); */

    //After Each Test
    test.afterEach('After Each Test', async ({ page }) => {

        //Logout from application
        await objLoginPage.doLogout();

        //Teardown web environment
        await objBaseTest.tearDownWebEnvironment(page);
    })

    //After All Test
    test.afterAll('TearDown Web Environment', async ({ browser }) => {
        //Implement code here
    })

})