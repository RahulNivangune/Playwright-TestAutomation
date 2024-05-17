import { Page } from "@playwright/test";
/**
 * @Author : Rahul Nivangune 
 * @Date : 09-May-2024
 * @Use : This Page will contain most of Project Inbox Page. 
 * Path: Task Manager -> Reports-> Reports Page
 */
export class ReportsPage{

    /*******Start Global Variables**************************/
    protected readonly page: Page;
    /*******End Global Variables**************************/
    
    /**ReportsPage Constructor*/
    constructor(page: Page) {
        this.page = page;
        //this.inp_UserName = page.getByPlaceholder('Enter username');        
    }
    
}