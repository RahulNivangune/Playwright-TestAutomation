import { FrameLocator, Locator, Page, expect } from "@playwright/test";
import { CommonPage } from '../../pages/common/CommonPage';
import path from "path";

/**
 * @Author : Rahul Nivangune 
 * @Date : 09-May-2024
 * @Use : This Page will contain most of Project Inbox Page. 
 * @Path: Task Manager -> Projects-> Inbox
 */
export class ProjectInboxPage {

    /*******Start Global Variables**************************/
    protected readonly page: Page;
    objCommonPage: CommonPage;
    str_lnk_PojectTypeCard: string;
    str_drp_Option: string;
    str_grid_DurationEndDate: string;
    str_rb_VisibilityOption: string;
    str_rb_PriorityOption: string;
    str_lnk_ProjectTab: string;
    str_rb_DistributionByOption: string;
    str_lnk_DistributionStoreName: string;
    str_grid_ProjectName: string;
    str_grid_ProjectListColumn: string;

    iframe_ProjectInbox: FrameLocator;
    lnk_CreateNew: Locator;
    inp_SearchByProjectType: Locator;
    inp_ProjectName: Locator;
    inp_CreatorDepartments: Locator;
    inp_Assignto: Locator;
    drp_Option: Locator;
    icn_DatePicker: Locator;
    grid_DurationStartDate: Locator;
    grid_DurationEndDate: Locator;
    rb_VisibilityOption: Locator;
    rb_PriorityOption: Locator;
    inp_ProjectTag: Locator;
    btn_ProjectCreateNext: Locator;
    lnk_ProjectTab: Locator;
    inp_Notes: Locator;
    inp_ProjectAttachmentsUpload: Locator;
    rb_DistributionByOption: Locator;
    inp_DistributionSearch: Locator;
    lnk_DistributionStoreName: Locator;
    btn_DistributionAdd: Locator;
    btn_FinalizeSubmit: Locator;
    inp_ProjectSubmissionMessage: Locator;
    btn_ProjectSubmissionSubmit: Locator;
    lnk_ProjectFilterIcon: Locator;
    btn_ProjectFiltersClearAll: Locator;
    btn_ProjectFiltersApply: Locator;
    inp_ProjectsFiltersProjectName: Locator;
    grid_ProjectName: Locator;
    grid_ProjectListColumn: Locator;
    /*******End Global Variables*****************************/

    /**ProjectInboxPage Constructor*/
    constructor(page: Page) {
        this.page = page;
        this.objCommonPage = new CommonPage(page);

         //Iframe
         this.iframe_ProjectInbox = page.frameLocator("//iframe[@id='RTM20_IN1']");

        //Input
        this.inp_SearchByProjectType = this.iframe_ProjectInbox.locator("//app-project-type-list//input[@id='search-term']");
        this.inp_ProjectName = this.iframe_ProjectInbox.locator("//input[@id='projectTitleKey']");
        this.inp_CreatorDepartments = this.iframe_ProjectInbox.locator("//input[@id='input-unq-projDepartmentId']");
        this.inp_Assignto = this.iframe_ProjectInbox.locator("//input[@id='input-unq-projAssigneeId']");
        this.inp_ProjectTag = this.iframe_ProjectInbox.locator("//input[@id='input-unq-projDetailTagsId']");
        this.inp_Notes = this.iframe_ProjectInbox.locator("//div[@id='notes']//div[@role='textbox']");
        this.inp_ProjectAttachmentsUpload = this.iframe_ProjectInbox.locator("//div[@id='attach']//input[@name='fileUpload']");
        this.inp_DistributionSearch = this.iframe_ProjectInbox.locator("//input[@id='specificStoreSearchInput']");
        this.inp_ProjectSubmissionMessage = this.iframe_ProjectInbox.locator("//app-submit-mini-form//mat-form-field//textarea");
        this.inp_ProjectsFiltersProjectName = this.iframe_ProjectInbox.locator("#inboxFilterProjectTitle");

        //Button
        this.btn_ProjectCreateNext = this.iframe_ProjectInbox.locator("//button[@id='miniFormNextBtn']");
        this.btn_DistributionAdd = this.iframe_ProjectInbox.locator("//button[@id='specificStoreSaveBtn']");
        this.btn_FinalizeSubmit = this.iframe_ProjectInbox.locator("//button[@id='miniFormSubmitActionBtn']");
        this.btn_ProjectSubmissionSubmit = this.iframe_ProjectInbox.locator("//button[@id='submitMiniFormBtn']");
        this.btn_ProjectFiltersClearAll = this.iframe_ProjectInbox.locator("//button[@id='clearAllId']");
        this.btn_ProjectFiltersApply = this.iframe_ProjectInbox.locator("//button[@id='applyId']");

        //Radio Button
        this.str_rb_VisibilityOption = "//mat-radio-button[@id='##VisibilityOption##']//input";
        this.str_rb_PriorityOption = "//input[@name='items.priorityName' and @id='##PriorityOption##']/ancestor::label";
        this.str_rb_DistributionByOption = "//input[@value='##DistributionByOption##']";

        //Link
        this.lnk_CreateNew = this.iframe_ProjectInbox.locator('#createNewId');
        this.str_lnk_PojectTypeCard = "//div[@class='project-type-card']//h3[@title='##ProjectType##']";        
        this.str_lnk_ProjectTab = "//div[@class='project-tabs-container']//div[contains(text(),'##ProjectTabName##')]";
        this.str_lnk_DistributionStoreName = "//div[@id='dist']//span[contains(text(),'##StoreName##')]";
        this.lnk_ProjectFilterIcon = this.iframe_ProjectInbox.locator('#inbox-filter-icon');


        //Icon
        this.icn_DatePicker = this.iframe_ProjectInbox.locator('#datePicker');      

        //Dropdown
        this.str_drp_Option = "//mat-option//span[@class='mat-option-text']/div//*[normalize-space()='##DrpOption##']";

        //Grid
        this.grid_DurationStartDate = this.iframe_ProjectInbox.locator("(//div[contains(@class,'calendar left')]//td[contains(@class,'disabled off')]/following::td[contains(@class,'active start-date') or contains(@class,'start-date') or contains(@class,'active') or contains(@class,'available')])[1]");
        this.str_grid_DurationEndDate = "(//div[contains(@class,'calendar left')]//td[contains(@class,'disabled off') or not(contains(@class,'disabled off')) ]/following::td[contains(@class,'active start-date') or contains(@class,'start-date') or contains(@class,'active') or contains(@class,'available')])[##ProjectEndDay##]";
        this.str_grid_ProjectName = '(//table[@id="inboxProjectListTable"]/tbody/tr/td/span[contains(@title,"##ProjectName##") or contains(text(),"##ProjectName##")])[1]';
        this.str_grid_ProjectListColumn = '(//table[@id="inboxProjectListTable"]/tbody/tr[td[span[contains(@title,"##ProjectName##") or contains(text(),"##ProjectName##")]]]/td[##ColumnIndex##])[1]';

    }

    // Switch To Project Inbox Iframe on Project Inbox Page  - By Rahul Nivangune -09-May-2024
    public async switchToProjectInboxPageProjectInboxIframe() {
        await this.iframe_ProjectInbox
        await this.objCommonPage.waitForClockLoaderToDisappear(this.iframe_ProjectInbox);
    }

    // Click 'CreateNew Link' on Project Inbox Page  - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageCreateNewLink() {
        await this.lnk_CreateNew.click();
        await this.objCommonPage.waitForClockLoaderToDisappear(this.iframe_ProjectInbox);        
    }

    // Set 'Search By Project Type' on Project Inbox Page  - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageSearchByProjectType(projectType: string) {        
        await this.inp_SearchByProjectType.isVisible();
        await this.inp_SearchByProjectType.fill(projectType);
    }

    // Click 'PojectTypeCard Link' on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPagePojectTypeCardLink(projectType: string) {
        await this.objCommonPage.waitForDefaultProgressLoaderToDisappear(this.iframe_ProjectInbox);
        let str_lnk_PojectTypeCard = this.str_lnk_PojectTypeCard.replace("##ProjectType##", projectType); 
        await this.iframe_ProjectInbox.locator(str_lnk_PojectTypeCard).waitFor({state: "visible",timeout:5000});
        await this.iframe_ProjectInbox.locator(str_lnk_PojectTypeCard).click();
        await this.objCommonPage.waitForDefaultProgressLoaderToDisappear(this.iframe_ProjectInbox);
    }

    // Set 'ProjectName' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageProjectName(projectName: string) {
        await this.inp_ProjectName.isVisible();
        await this.inp_ProjectName.fill(projectName);
    }

    // Set 'ProjectName' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageCreatorDepartments(creatorDepartment: string) {
        await this.inp_CreatorDepartments.isVisible();
        await this.inp_CreatorDepartments.fill(creatorDepartment);
    }

    // Common Click Dropdown Option Link on Project Inbox Page- By Rahul Nivangune-09-May-2024 
    public async clickProjectInboxPageDropdownOptionLink(drpOption: string) {
        if (drpOption !== "") {
            let str_drp_Option = this.str_drp_Option.replace("##DrpOption##", drpOption);
            await this.iframe_ProjectInbox.locator(str_drp_Option).waitFor({state: "visible",timeout:5000});
            await this.iframe_ProjectInbox.locator(str_drp_Option).click();
        }
    }

    // Set 'Assignto' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageAssignto(assignTo: string) {
        await this.inp_Assignto.isVisible();
        await this.inp_Assignto.fill(assignTo);
    }

    // Click on Date Picker on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageDatePicker() {
        await this.icn_DatePicker.isVisible();
        await this.icn_DatePicker.click();
    }

    // Select 'Project Duration Start Date' on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageDurationStartDate() {
        await this.grid_DurationStartDate.isVisible();
        await this.grid_DurationStartDate.click({force: true});
    }

    // Select 'Project Duration End Date' on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageDurationEndDate(projectEndDay: string) {
        let str_grid_DurationEndDate = this.str_grid_DurationEndDate.replace("##ProjectEndDay##", projectEndDay);
        await this.iframe_ProjectInbox.locator(str_grid_DurationEndDate).waitFor({state: "visible",timeout:5000});
        await this.iframe_ProjectInbox.locator(str_grid_DurationEndDate).click({force: true});
    }

    // Click Visibility Option radio button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageVisibilityOptionRadioButton(visibilityOption: string) {
        //await this.page.waitForTimeout(5000);
        let str_rb_VisibilityOption = this.str_rb_VisibilityOption.replace("##VisibilityOption##", visibilityOption);
        await this.iframe_ProjectInbox.locator(str_rb_VisibilityOption).waitFor({state: "visible",timeout:5000});
        await this.iframe_ProjectInbox.locator(str_rb_VisibilityOption).check({force: true});
    }

    // Click Priority radio button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPagePriorityRadioButton(priority: string) {
        //await this.page.waitForTimeout(5000);
        let str_rb_PriorityOption = this.str_rb_PriorityOption.replace("##PriorityOption##", priority);
        await this.iframe_ProjectInbox.locator(str_rb_PriorityOption).waitFor({state: "visible",timeout:5000});
        await this.iframe_ProjectInbox.locator(str_rb_PriorityOption).check({force: true});
    }

    // Set 'ProjectTag' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageProjectTag(projectTag: string) {
        await this.inp_ProjectTag.isVisible();
        await this.inp_ProjectTag.fill(projectTag);
    }

    // Click on Date Picker on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageProjectCreateNextButton() {
        await this.btn_ProjectCreateNext.isVisible();
        await this.btn_ProjectCreateNext.click();
    }

    // Common Click Project Tab Link on Project Inbox Page- By Rahul Nivangune-09-May-2024 
    public async clickProjectInboxPageProjectTabLink(projectTabName: string) {
        if (projectTabName !== "") {
            let str_lnk_ProjectTab = this.str_lnk_ProjectTab.replace("##ProjectTabName##", projectTabName);
            await this.iframe_ProjectInbox.locator(str_lnk_ProjectTab).waitFor({state: "visible",timeout:5000});
            await this.iframe_ProjectInbox.locator(str_lnk_ProjectTab).click();
        }
    }

    //Click 'Project Notes' TextArea on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageProjectNotes() {
        await this.inp_Notes.isVisible();
        await this.inp_Notes.click();
    }

    // Set 'ProjectNotes' TextArea on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageProjectNotes(projectNotes: string) {
        await this.inp_Notes.isVisible();
        await this.inp_Notes.fill(projectNotes);
    }

    // Set 'Attachments Upload' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageAttachmentsUploadInput(projectAttachmentName: string) {
        await this.inp_ProjectAttachmentsUpload.setInputFiles(path.join(process.cwd()+"\\resources\\testdata\\AUTOM\\docs\\", projectAttachmentName));
        await this.page.waitForTimeout(5000);
    }

    //Click Distribution By Option radio button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageDistributionByOptionRadioButton(distributionByOption: string) {
        if (distributionByOption !== "") {
            let str_rb_DistributionByOption = this.str_rb_DistributionByOption.replace("##DistributionByOption##", distributionByOption);
            await this.iframe_ProjectInbox.locator(str_rb_DistributionByOption).waitFor({state: "visible",timeout:5000});
            await this.iframe_ProjectInbox.locator(str_rb_DistributionByOption).check({force: true});
        }
    }

    // Set 'Distribution Search' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageDistributionSearch(storeName: string) {
        await this.inp_DistributionSearch.isVisible();
        await this.inp_DistributionSearch.fill(storeName);
    }

    //Click Distribution Store Link on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageDistributionStoreLink(storeName: string) {
        if (storeName !== "") {
            let str_lnk_DistributionStoreName = this.str_lnk_DistributionStoreName.replace("##StoreName##", storeName);
            await this.iframe_ProjectInbox.locator(str_lnk_DistributionStoreName).waitFor({state: "visible",timeout:5000});
            await this.iframe_ProjectInbox.locator(str_lnk_DistributionStoreName).click();
        }
    }

    //Click 'Distribution Add' Button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageDistributionAddButton() {
        //await this.btn_DistributionAdd.isVisible();
        await this.btn_DistributionAdd.click();
    }

    //Click 'Finalize Submit' Button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageFinalizeSubmitButton() {
        //await this.btn_FinalizeSubmit.isVisible();
        await this.btn_FinalizeSubmit.click();
        await this.objCommonPage.waitForDefaultProgressLoaderToDisappear(this.iframe_ProjectInbox);
    }

    // Set 'Project Submission Message' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageProjectSubmissionMessage(submissionMessage: string) {
        await this.inp_ProjectSubmissionMessage.isVisible();
        await this.inp_ProjectSubmissionMessage.fill(submissionMessage);
    }

    //Click 'Project Submission Submit' Button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageProjectSubmissionSubmitButton() {
        await this.btn_ProjectSubmissionSubmit.isVisible();
        await this.btn_ProjectSubmissionSubmit.click();
        await this.objCommonPage.waitForDefaultProgressLoaderToDisappear(this.iframe_ProjectInbox);
    }

    //Click 'Project Filter Icon' Link on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageProjectFilterIconLink() {
        await this.lnk_ProjectFilterIcon.isVisible();
        await this.lnk_ProjectFilterIcon.click();
    }

    // Set 'Project Filters Project Name' Input on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async setProjectInboxPageProjectFiltersProjectName(projectName: string) {
        await this.inp_ProjectsFiltersProjectName.isVisible();
        await this.inp_ProjectsFiltersProjectName.fill(projectName);
    }

    //Click 'Project Filters Clear All' Button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageProjectFiltersClearAllButton() {
        await this.btn_ProjectFiltersClearAll.isVisible();
        await this.btn_ProjectFiltersClearAll.click();
    }

    //Click 'Project Filters Apply' Button on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async clickProjectInboxPageProjectFiltersApplyButton() {
        await this.btn_ProjectFiltersApply.isVisible();
        await this.btn_ProjectFiltersApply.click();
        await this.objCommonPage.waitForDefaultProgressLoaderToDisappear(this.iframe_ProjectInbox);
    }

    //Verify 'Project Name' on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async verifyProjectInboxPageProjectListGridProjectName(projectName: string) {
        if (projectName !== "") {
            let str_grid_ProjectName = this.str_grid_ProjectName.replace("##ProjectName##", projectName).replace("##ProjectName##", projectName);
            await this.iframe_ProjectInbox.locator(str_grid_ProjectName).waitFor({state: "visible",timeout:5000});
            await expect(this.iframe_ProjectInbox.locator(str_grid_ProjectName)).toBeVisible();
            await expect(this.iframe_ProjectInbox.locator(str_grid_ProjectName)).toContainText(projectName);
        }
    }

    //Verify 'Project List Grid Data' on Project Inbox Page - By Rahul Nivangune -09-May-2024
    public async verifyProjectInboxPageProjectListGridData(projectName: string, columnIndex: string, columnValue: string) {
        if (projectName !== "" && columnIndex !== "" && columnValue !== "") {
            let str_grid_ProjectListColumn = this.str_grid_ProjectListColumn.replace("##ProjectName##", projectName).replace("##ProjectName##", projectName).replace("##ColumnIndex##", columnIndex);
            await this.iframe_ProjectInbox.locator(str_grid_ProjectListColumn).waitFor({state: "visible",timeout:5000});
            await expect(this.iframe_ProjectInbox.locator(str_grid_ProjectListColumn)).toBeVisible();
            await expect(this.iframe_ProjectInbox.locator(str_grid_ProjectListColumn)).toContainText(columnValue);
        }
    }

}