const assert = require('assert');

const SettingsBill = require('../settingsBill');

describe('settings-bill', function(){

    const settingsBill = SettingsBill();

    it('should be able to record calls', function(){
        settingsBill.recordAction('call');
        
        assert.equal(0, settingsBill.actionsFor('call').length);
    });

    it('should be able to set the settings', function(){
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        assert.deepEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, settingsBill.getSettings())


    });

    it('should calculate the right totals', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(2.35, settingsBill.totals().smsTotal);
        assert.equal(3.35, settingsBill.totals().callTotal);
        assert.equal(5.70, settingsBill.totals().grandTotal);

    });

    it('should calculate the right totals for multiple actions', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.equal(4.70, settingsBill.totals().smsTotal);
        assert.equal(6.70, settingsBill.totals().callTotal);
        assert.equal(11.40, settingsBill.totals().grandTotal);

    });

    it('should know when warning level reached and grand total color shold change to be orange', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedWarningLevel());
    });

    it('should know when critical level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedCriticalLevel());

    });

    it("should return stop the total call cost from inceasing when criticalLevel has been reached", function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('sms');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        //console.log(settingsBill.getTotalCost);

        assert.equal("danger", settingsBill.addClass());

    })
});
// ends here
