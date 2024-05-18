const base = require('@playwright/test');
//creating new object and extend from base(default test object)  
//Create a custom test behaviour
exports.customtest = base.test.extend({
 
    testData :{
        ProjectName: "Program Project Test ZTM 5555",
        ProjectEndDay: "1",
        ProjectTag: "Action Project",
        ProjectNotes: "<p>A change like this can be difficult to adjust to, so these tasks are assigned to ensure all Kitchen associates understand this new process, as well as countertop quoting basics.</p>",
        ProjectAttachmentName: "Simple Project Attachment.jpg",
        ProjectGridColumnIndex: "7"
    }
});