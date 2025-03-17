// By Penny
// Replicates the effects of Pragmatic from Fire Emblem
// Use the custom keyword, "pragmatic" with a custom skill

(function() {
var alias2 = DamageCalculator.calculateAttackPower;
DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var pow = alias2.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(active, "pragmatic");

	if (skill!=null && (passive.getHP() < ParamBonus.getMhp(passive))) {
		pow += 3;
	}
	
	return pow;
};

var alias3 = DamageCalculator.calculateDefense
DamageCalculator.calculateDefense = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var def = alias3.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(passive, "pragmatic");

	if (skill!=null && (active.getHP() < ParamBonus.getMhp(active))) {
		def += 1;
	}
	
	return def;
};

})();


