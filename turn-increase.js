// By Penny
// This is the Odd Rhythm or Even Rhythm or Give Boost between these turns Plugin
// I know it's a lot

// Give a skill the custom keyword, "turn-increase" and give it the following custom parameters

// rhythm: Either "even" or "odd" to decide which rhythm skill it is (Optional, if using turns)

// turns: An array of two numbers, the first one is the starting turn, the second one is the ending turn. (Optional, if using rhythm)
// For example, for a turn range of 7-10, you will put [7,10]. Yes, it is inclusive. 

// YOU MUST USE ONE OF THE CUSTOM PARAMETERS ABOVE!!! RAHHHH!! or you can use both :)

// moveBonus: How much Move standing on this terrain gives you (Optional)
// avoidBonus: How much Avoid standing on this terrain gives you (Optional)
// hitBonus: How much hit standing on this terrain gives you (Optional)
// attackBonus: How much attack standing on this terrain gives you (Optional)
// defenseBonus: How much defense standing on this terrain gives you (Optional)

(function() {
    var alias = ParamBonus.getMov;
    ParamBonus.getMov = function(unit) {
        var mov = alias.call(this, unit);
	    var skill = SkillControl.getPossessionCustomSkill(unit, "turn-increase");

        if (skill != null && turnChecker(unit) == true && skill.custom.moveBonus != null) {
            mov += skill.custom.moveBonus;
        }

        return mov;
    };

    var alias2 = AbilityCalculator.getAvoid;
    AbilityCalculator.getAvoid = function(unit) {
        var avoid = alias2.call(this, unit);
	    var skill = SkillControl.getPossessionCustomSkill(unit, "turn-increase");

        if (skill != null && turnChecker(unit) == true && skill.custom.avoidBonus != null) {
            avoid += skill.custom.avoidBonus;
        }

        return avoid;
    };

    var alias3 = AbilityCalculator.getHit;
    AbilityCalculator.getHit = function(unit, weapon) {
        var hit = alias3.call(this, unit, weapon);
	    var skill = SkillControl.getPossessionCustomSkill(unit, "turn-increase");

        if (skill != null && turnChecker(unit) == true && skill.custom.hitBonus != null) {
            hit += skill.custom.hitBonus;
        }

        return hit;
    };

    var alias4 = DamageCalculator.calculateAttackPower;
    DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var pow = alias4.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(active, "turn-increase");

	if (skill != null && turnChecker(unit) == true && skill.custom.attackBonus != null) {
		pow += skill.custom.attackBonus;
	}
	
	return pow;
};

    var alias5 = DamageCalculator.calculateDefense
    DamageCalculator.calculateDefense = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var def = alias5.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(passive, "turn-increase");

	if (skill != null && turnChecker(unit) == true && skill.custom.defenseBonus != null) {
		def += skill.custom.defenseBonus;
	}
	
	return def;
};

function turnChecker(unit) {
	var skill = SkillControl.getPossessionCustomSkill(unit, "turn-increase");
    var turn = root.getCurrentSession().getTurnCount();
    var rhythmCheck = (skill.custom.rhythm == null) || (skill.custom.rhythm == "even" && turn % 2 == 0 || skill.custom.rhythm == "odd" && turn % 2 == 1);
    var turnsCheck = (skill.custom.turns == null) || (typeof skill.custom.turns === "object" && turn >= skill.custom.turns[0] && turn <= skill.custom.turns[1]);

    return rhythmCheck && turnsCheck;
}


})();