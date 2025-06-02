// By Penny
// Set a skill's custom parameter to "double-terrain" (without the quotes) to double the effects of terrain

(function() {
    var alias = AbilityCalculator.getAvoid;
    AbilityCalculator.getAvoid = function(unit) {
        var avoid = alias.call(this, unit);
        var cls = unit.getClass();
        var skill = SkillControl.getPossessionCustomSkill(unit, "double-terrain");
    
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        if (skill!=null && cls.getClassType().isTerrainBonusEnabled() && terrain !== null) {
            avoid += terrain.getAvoid()
        }
        
        return avoid;
    };

    var alias2 = RealBonus.getDef;
    RealBonus.getDef = function(unit) {
        var def = alias2.call(this, unit);
        var cls = unit.getClass();
        var skill = SkillControl.getPossessionCustomSkill(unit, "double-terrain");
    
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        if (skill!=null && cls.getClassType().isTerrainBonusEnabled() && terrain !== null) {
            def += terrain.getDef()
        }
        
        return def;
    }

    var alias3 = RealBonus.getMdf;
    RealBonus.getMdf = function(unit) {
        var mdf = alias3.call(this, unit);
        var cls = unit.getClass();
        var skill = SkillControl.getPossessionCustomSkill(unit, "double-terrain");
    
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        if (skill!=null && cls.getClassType().isTerrainBonusEnabled() && terrain !== null) {
            mdf += terrain.getMdf()
        }
        
        return mdf;
    }

    var alias4 = RecoveryAllFlowEntry._getRecoveryValueInternalForTerrain;
    RecoveryAllFlowEntry._getRecoveryValueInternalForTerrain = function(unit) {
        var recoveryValue = alias4.call(this, unit);
        var cls = unit.getClass();
        var skill = SkillControl.getPossessionCustomSkill(unit, "double-terrain");
    
        var terrain = PosChecker.getTerrainFromPos(unit.getMapX(), unit.getMapY());
        if (skill!=null && cls.getClassType().isTerrainBonusEnabled() && terrain !== null) {
            recoveryValue += terrain.getAutoRecoveryValue()
        }
        
        return recoveryValue;
    }


})();