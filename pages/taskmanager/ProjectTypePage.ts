import { Page } from "@playwright/test";
/**
 * @Author : Rahul Nivangune 
 * @Date : 09-May-2024
 * @Use : This Page will contain most of Project Inbox Page. 
 * Path: Task Manager -> Project Type -> Project Type Setup
 */
export class ProjectTypePage{

    /*******Start Global Variables**************************/
    protected readonly page: Page;
    /*******End Global Variables**************************/

    /**ProjectTypePage Constructor*/
    constructor(page: Page) {
        this.page = page;
        //this.inp_UserName = page.getByPlaceholder('Enter username');        
    }
    
}