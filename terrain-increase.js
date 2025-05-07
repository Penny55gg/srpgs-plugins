// By Penny
// Gives a boost to movement, hit and avoid when standing on a terrain with a specific name (For example: a forest)

// Give a skill the custom keyword, "terrain-increase" and give it the following custom parameters
// terrainName: The name of the terrain (Mandatory)
// moveBonus: How much Move standing on this terrain gives you (Optional)
// avoidBonus: How much Avoid standing on this terrain gives you (Optional)
// hitBonus: How much hit standing on this terrain gives you (Optional)
// attackBonus: How much attack standing on this terrain gives you (Optional)
// defenseBonus: How much defense standing on this terrain gives you (Optional)

// For example, if you wanted a unit to gain +2 Movement, and +10 Avoid and Hit while standing on a forest you would put:
// {terrainName: "Forest", moveBonus: 2, avoidBonus: 10, hitBonus: 10}

// You can even put terrainName in a list!
// If I wanted to give those effects to the Path terrain too, I would put
// {terrainName: ["Forest", "Path"], moveBonus: 2, avoidBonus: 10, hitBonus: 10}

(function() {
    var alias = ParamBonus.getMov;
    ParamBonus.getMov = function(unit) {
        var mov = alias.call(this, unit);
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        var skill = SkillControl.getPossessionCustomSkill(unit, "terrain-increase");

        if (skill != null && terrainChecker(unit, terrain) == true && skill.custom.moveBonus != null) {
            mov += skill.custom.moveBonus;
        }

        return mov;
    };

    var alias2 = AbilityCalculator.getAvoid;
    AbilityCalculator.getAvoid = function(unit) {
        var avoid = alias2.call(this, unit);
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        var skill = SkillControl.getPossessionCustomSkill(unit, "terrain-increase");

        if (skill != null && terrainChecker(unit, terrain) == true && skill.custom.avoidBonus != null) {
            avoid += skill.custom.avoidBonus;
        }

        return avoid;
    };

    var alias3 = AbilityCalculator.getHit;
    AbilityCalculator.getHit = function(unit, weapon) {
        var hit = alias3.call(this, unit, weapon);
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        var skill = SkillControl.getPossessionCustomSkill(unit, "terrain-increase");

        if (skill != null && terrainChecker(unit, terrain) == true && skill.custom.hitBonus != null) {
            hit += skill.custom.hitBonus;
        }

        return hit;
    };

    var alias4 = DamageCalculator.calculateAttackPower;
    DamageCalculator.calculateAttackPower = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var pow = alias4.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(active, "terrain-increase");
    var terrain = PosChecker.getTerrainFromPos(active.getMapX(), active.getMapY());

	if (skill != null && terrainChecker(active, terrain) == true && skill.custom.attackBonus != null) {
		pow += skill.custom.attackBonus;
	}
	
	return pow;
};

    var alias5 = DamageCalculator.calculateDefense
    DamageCalculator.calculateDefense = function(active, passive, weapon, isCritical, totalStatus, trueHitValue) {
	var def = alias5.call(this, active, passive, weapon, isCritical, totalStatus, trueHitValue);
	var skill = SkillControl.getPossessionCustomSkill(passive, "terrain-increase");
    var terrain = PosChecker.getTerrainFromPos(passive.getMapX(), passive.getMapY());

	if (skill != null && terrainChecker(passive, terrain) == true && skill.custom.defenseBonus != null) {
		def += skill.custom.defenseBonus;
	}
	
	return def;
};
    function terrainChecker(unit, terrain) {
        var skill = SkillControl.getPossessionCustomSkill(unit, "terrain-increase");
        if (skill != null) {
        var terrainName = skill.custom.terrainName;
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());;

        if (typeof terrainName === "object") {
            var count = terrainName.length;

            for (i = 0; i < count; i++) {
                if (terrain.getName() == terrainName[i]) {
                    return true;
                }
            }
        } else if (typeof terrainName === "string") {
            return terrain.getName() == skill.custom.terrainName;
        }}

        return false
    }

    


})();