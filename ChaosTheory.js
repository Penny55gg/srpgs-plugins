// Chaos Style from FE:Engage Plugin
// "By" Penny, but credit goes to LadyRena and MarkyJoe
// Instructions: give a skill the keyword, "ChaosStyle" and it works yeah

(function () {
	var chaosCheck = function(active, passive, weapon) {
		if (ItemControl.getEquippedWeapon(active) != null && ItemControl.getEquippedWeapon(passive) != null) {
		if (Miscellaneous.isPhysicsBattle(ItemControl.getEquippedWeapon(active)) && !Miscellaneous.isPhysicsBattle(ItemControl.getEquippedWeapon(passive))) {
			return true
		} else if (!Miscellaneous.isPhysicsBattle(ItemControl.getEquippedWeapon(active)) && Miscellaneous.isPhysicsBattle(ItemControl.getEquippedWeapon(passive))) {
			return true
		}}

		return false
	}

	var isBlowBonus = function(unit) {
		if (root.getCurrentScene() != SceneType.REST) {
			return unit.getUnitType() === root.getCurrentSession().getTurnType();
		}

		return false;
	}

	var isRiposteBonus = function(unit) {
		if (root.getCurrentScene() != SceneType.REST) {
			return unit.getUnitType() != root.getCurrentSession().getTurnType();
		}

		return false;
	}

	var alias = Calculator.getAgilityPlus;
	Calculator.getAgilityPlus = function(active, passive, weapon) {
		var agi = alias.call(this, active, passive, weapon);
        var skill = SkillControl.getPossessionCustomSkill(active, "ChaosStyle");
		var skillPassive =  SkillControl.getPossessionCustomSkill(passive, "ChaosStyle");

        if (skill!=null && chaosCheck(active, passive) === true && isBlowBonus(active) === true) {
            agi += 3;
        }
		if (skillPassive!=null && chaosCheck(passive, active) === true && isRiposteBonus(passive) === true) {
            agi -= 3;
        }
        
        return agi;
    }
})();