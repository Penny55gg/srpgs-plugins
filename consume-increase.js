// This is the plugin that increases healing by a multiplier
// Set a skill to custom and use the keyword "consume-increase"
// Then set a multiplier using the custom param {multiplier: x}, if none is set it defaults to 2.

(function() {
    var alias = HpRecoveryEventCommand._getRecoveyValue;
        HpRecoveryEventCommand._getRecoveyValue = function() {
        var heal = alias.call(this);
        var targetUnit = root.getEventCommandObject().getTargetUnit();
	    var skill = SkillControl.getPossessionCustomSkill(targetUnit, "consume-increase");

        if (skill != null) {
            heal *= skill.custom.multiplier || 2;
        }
        
        return Math.floor(heal);
    };
    })();