// Give a skill the custom keyword "Soulblade" to make it function like FE17's Soulblade changing the formula when
// attacking with a sword to the average of Defense and Resistance
// By Penny

(function () {
    var alias = DamageCalculator.calculateDefense;
    DamageCalculator.calculateDefense = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
        var def = alias.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue)
        var skill = SkillControl.getPossessionCustomSkill(active, "Soulblade");
        var weaponType = weapon.getWeaponType().getName();

        if (skill != null && weaponType == "Sword") {
            def = Math.floor([RealBonus.getDef(passive) + RealBonus.getMdf(passive)]/2);
        }

        return def;
    }  



})();
