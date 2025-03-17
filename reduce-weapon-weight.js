// By Penny
// Assign a custom skill the keyword "reduceWT" and then give it a custom parameter of {weight:XX} to reduce weight by that amount.

(function () {
	var alias = AbilityCalculator.getAgility;
	AbilityCalculator.getAgility = function (unit, weapon) {
	  var agi = alias.call(this, unit, weapon);
	  var skill = SkillControl.getPossessionCustomSkill(unit, "reduceWT");
	  var weightDifference;
  
	  if (skill != null && !(weapon === null || !DataConfig.isItemWeightDisplayable())) {
		var SpeedDifference = ParamBonus.getSpd(unit) - agi;
		if (DataConfig.isBuildDisplayable()) {
		  weightDifference = ParamBonus.getBld(unit) - weapon.getWeight();
		} else {
		  if (Miscellaneous.isPhysicsBattle(weapon)) {
			weightDifference = ParamBonus.getStr(unit) - weapon.getWeight();
		  } else {
			weightDifference = ParamBonus.getMag(unit) - weapon.getWeight();
		  }
		}
  
		if (weightDifference < 0) {
		  if (SpeedDifference > skill.custom.weight) {
			agi += skill.custom.weight;
			return agi;
		  } else {
			return ParamBonus.getSpd(unit);
		  }
		} else {
		  return agi;
		}
	  } else {
		return agi;
	  }
	};
  })();
  