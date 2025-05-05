// By Penny
// State increase plugin
// If the enemy is inflicted with a certain state, deal more damage.

// To set this one up, give a skill the keyword, "state-increase"
// Give it the custom parameters id, dmg, and category

// For example say you want it to deal 6 more physical damage, if they had a state with the id 0. You would give the custom parameters of:
// {id: 0, dmg: 6, category: "physical"}


(function() {
    var alias = DamageCalculator.calculateDamage;
    DamageCalculator.calculateDamage = function(active, passive, weapon, isCritical, activeTotalStatus, passiveTotalStatus, trueHitValue) {
        var dmg = alias.call(this, active, passive, weapon, isCritical, activeTotalStatus, passiveTotalStatus, trueHitValue)
        var skill = SkillControl.getPossessionCustomSkill(active, "state-increase");


        if (skill != null) {
            var list = passive.getTurnStateList();
            var count = list.getCount();
            var checkId = skill.custom.id;

            for (i = 0; i < count; i++) {
                stateId = list.getData(i).getState().getId();
                if (stateId === checkId) {
                    if (skill.custom.category == "both" || skill.custom.category != null) {
                        dmg += skill.custom.dmg;
                        break;
                    } else if (!Miscellaneous.isPhysicsBattle(weapon) && skill.custom.category == "magical") {
                        dmg += skill.custom.dmg;
                        break;
                    } else if (Miscellaneous.isPhysicsBattle(weapon) && skill.custom.category == "physical") {
                        dmg += skill.custom.dmg;
                        break;
                    }
                }
            }
        }


        return dmg;
    }




})();
