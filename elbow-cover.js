// By Penny
// Natural Cover and Elbow Room in one!

// Give a skill Natural Cover, and a custom parameter of {defenseBonus: x}

// ORRR

// Give a skill Elbow Room, and a custom parameter of {attackBonus: x}

// wow how cool

(function() {
    var alias = DamageCalculator.calculateDefense
    DamageCalculator.calculateDefense = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
        var def = alias.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
        var skill = SkillControl.getPossessionCustomSkill(passive, "natural-cover");
        var terrain = PosChecker.getTerrainFromPos(passive.getMapX(), passive.getMapY());

        if ((skill != null) && (terrain.getMdf() != 0 || terrain.getDef() != 0 || terrain.getAvoid() != 0 || terrain.getAutoRecoveryValue() != 0)) {
            def += skill.custom.defenseBonus;
        }

        return def;
    };

    var alias2 = DamageCalculator.calculateAttackPower;
    DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
        var pow = alias2.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
        var skill = SkillControl.getPossessionCustomSkill(active, "elbow-room");
        var terrain = PosChecker.getTerrainFromPos(active.getMapX(), active.getMapY());

        if ((skill != null) && (terrain.getMdf() == 0 && terrain.getDef() == 0 && terrain.getAvoid() == 0 && terrain.getAutoRecoveryValue() == 0)) {
            pow += skill.custom.attackBonus;
        }

        return pow;
    };

})();