const assert = require('assert');

const SettingsBill = require('../settingsBill');

describe("test settings bill factory function", function(){
    it("should be able to set the call cost", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);

//testing callCost of 1.85
        settingsBill.setCallCost(1.85);     
        assert.equal(1.85, settingsBill.getCallCost());
//testing a different value of callCost
        let settingsBill2 = SettingsBill();
        settingsBill2.setCallCost(2.75);     
        assert.equal(2.75, settingsBill2.getCallCost());
    });

    it("should be able to set the sms cost", function(){
        let settingsBill = SettingsBill();
//testing smsCost of 1.85
        settingsBill.setSmsCost(0.85);     
        assert.equal(0.85, settingsBill.getSmsCost());
//testing a different value of smsCost
        let settingsBill2 = SettingsBill();
        settingsBill2.setSmsCost(0.75);     
        assert.equal(0.75, settingsBill2.getSmsCost());
    });

    //testing both sms and calls

    it("should be able to set the sms and call cost", function(){
        let settingsBill = SettingsBill();
//testing callCost of 2.75 and smsCost of 1.85
        settingsBill.setCallCost(2.75);                                                        
        settingsBill.setSmsCost(0.85); 

        assert.equal(2.75, settingsBill.getCallCost());
        assert.equal(0.85, settingsBill.getSmsCost());

        let settingsBill2 = SettingsBill();

        settingsBill2.setCallCost(1.75);                                                        
        settingsBill2.setSmsCost(0.65);

        assert.equal(1.75, settingsBill2.getCallCost());
        assert.equal(0.65, settingsBill2.getSmsCost());
    });

    it("should be able to set the warningLevel and call cost", function(){
        let settingsBill = SettingsBill();
        
//testing warningLevel 

        settingsBill.setWarningLevel(20);

        assert.equal(20, settingsBill.getWarningLevel());
    });

    it("should be able to set the criticalLevel", function(){
        let settingsBill = SettingsBill();
        
//testing warningLevel 

        settingsBill.setCriticalLevel(30);

        assert.equal(30, settingsBill.getCriticalLevel());
    });

    //
    it("should be able to set the warning and criticalLevel", function(){
        let settingsBill = SettingsBill();
        
//testing warningLevel 

        settingsBill.setWarningLevel(15);
        settingsBill.setCriticalLevel(25);

        assert.equal(15, settingsBill.getWarningLevel());
        assert.equal(25, settingsBill.getCriticalLevel());
    });

})

//done so far
//set all the prices that we going to need and 
//ways of SETTING and GETTING values

//************we wanna USE the VALUES of sms and call**************************//
describe("use values", function(){
    it("should be able to use the cost set", function(){
        let settingsBill = SettingsBill();

        //set criticalLevel where I am using my values
        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost(0.85);
    // state: how many calls = 3 calls made
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(6.75, settingsBill.getTotalCost());
        assert.equal(6.75, settingsBill.getTotalCallCost());
        assert.equal(0.00, settingsBill.getTotalSmsCost());
    });

    it("should be able to use the call cost set for 2 calls at 1.35 each", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        // state: how many calls made = 2
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(2.70, settingsBill.getTotalCost());
        assert.equal(2.70, settingsBill.getTotalCallCost());
        assert.equal(0.00, settingsBill.getTotalSmsCost());
    });


    it("should be able to send 2 sms's at 0.85 each", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        // state: how many calls made = 2
        settingsBill.sendSms();
        settingsBill.sendSms();

        assert.equal(1.70, settingsBill.getTotalCost());
        assert.equal(0.00, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());
    });


    it("this instance...should be able to send 2 sms's at 0.85 each and 1 call at 1.35", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);

        // state: how many sms = 2 sent sms's and 1 call made
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.makeCall();

        assert.equal(3.05, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

})

//************add test for warning and critical Level**************************//

describe("warning and critical level", function(){
    //create a function that have a class that are dom can use to see which class to add to a dom to the dom to make the total red or orange
    it("should return a class name of warning if warning level is reached", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);
        // state: how many sms = 2 sent sms's and 1 call made
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        //console.log(settingsBill.getTotalCost);

        assert.equal("warning", settingsBill.totalClassName());
    })

    it("should return a class name of critical if critical level is reached", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);
        // state: how many sms = 2 sent sms's and 1 call made
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        //console.log(settingsBill.getTotalCost);

        assert.equal("critical", settingsBill.totalClassName());
    })

    it("should return stop the total call cost from inceasing when criticalLevel has been reached", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);
        // state: how many sms = 2 sent sms's and 1 call made
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();


        //console.log(settingsBill.getTotalCost);

        assert.equal("critical", settingsBill.totalClassName());
        assert.equal(10, settingsBill.getTotalCallCost());
    })

    //set critical level to a new value ....whether it will increase the total cost
    it("should allow the total to increase after reaching the critical level and upping the critical level", function(){
        let settingsBill = SettingsBill();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(8);
        settingsBill.setCriticalLevel(10);
        // state: how many sms = 2 sent sms's and 1 call made
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();


        //console.log(settingsBill.getTotalCost);

        assert.equal("critical", settingsBill.totalClassName());
        assert.equal(10, settingsBill.getTotalCallCost());

        settingsBill.setCriticalLevel(20);
        assert.equal("warning", settingsBill.totalClassName());
        settingsBill.makeCall();
        settingsBill.makeCall();
        assert.equal(15, settingsBill.getTotalCallCost());

    })
    


})

//so far we set prices, use prics for calls and sms.....next we will use critical levels


