// Skill that halves the amount of critical damage taken.
// By Penny

(function(){

    var alias = DamageCalculator.calculateDamage;
    DamageCalculator.calculateDamage = function(active, passive, weapon, isCritical, activeTotalStatus, passiveTotalStatus, trueHitValue) {
        var damage = alias.call(this, active, passive, weapon, isCritical, activeTotalStatus, passiveTotalStatus, trueHitValue);
        var skill = SkillControl.getPossessionCustomSkill(passive, "crit-defense");

		if (DamageCalculator.isCritical(active, passive, weapon, isCritical, trueHitValue) && skill != null) {
			damage -= ((damage - (damage / this.getCriticalFactor())) / 2)
		}

        return this.validValue(active, passive, weapon, damage);
    }

})();