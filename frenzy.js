// By Penny
// This is the frenzy plugin. Use the keyword frenzy on a custom skill.
// This has two custom paramters, if not put in it will use defaults.

// damageTaken: The amount of damage taken to increase by damageDealt
// damageDealt: The amount of damage increased when you take damageTaken.

// For example, if I was making a skill that increased damage by 5 per 10 damage dealt, it would be this.
// {damageDealt: 5, damageTaken: 10}


(function() {
    var alias = DamageCalculator.calculateAttackPower;
    DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var pow = alias.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(active, "frenzy");

	if (skill != null) {
        var damageTaken = skill.custom.damageTaken || 2
        var damageDealt = skill.custom.damageDealt || 1

		pow += Math.floor(((ParamBonus.getMhp(active) - active.getHp()) / damageTaken) * damageDealt)
	}
	
	return pow;
};

})();