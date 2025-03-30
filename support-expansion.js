// "By" Penny with major help from PCMath and Sir Francis
// Give a support skill {agi: x} for the support to give agility, and give a support skill {mov: x} to give it movement.

// Overwrites SupportCalculator._checkSkillStatus


(function() {
    SupportCalculator._checkSkillStatus = function(unit, targetUnit, isSelf, totalStatus) {
        var i, skill, isSet, indexArray;
        var arr = SkillControl.getDirectSkillArray(unit, SkillType.SUPPORT, '');
        var count = arr.length;

        for (i = 0; i < count; i++) {
            skill = arr[i].skill;
            isSet = false;

            if (isSelf) {
                if (skill.getRangeType() === SelectionRangeType.SELFONLY) {
                    isSet = true;
                }
            } else {
                if (skill.getRangeType() === SelectionRangeType.ALL) {
                    // If it's "All", always enable to support.
                    isSet = true;
                } else if (skill.getRangeType() === SelectionRangeType.MULTI) {
                    indexArray = IndexArray.getBestIndexArray(unit.getMapX(), unit.getMapY(), 1, skill.getRangeValue());
                    // If it's "Specify", check if the unit exists at the position in arr.
                    isSet = IndexArray.findUnit(indexArray, targetUnit);
                }
            }

            if (isSet && this._isSupportable(unit, targetUnit, skill)) {
                this._addStatus(totalStatus, skill.getSupportStatus());
                    if(!skill.custom.agi) {
                        continue  ;
                    }
                    if(totalStatus.agi) {
                        totalStatus.agi += skill.custom.agi;
                        continue  ;
                    }
                    totalStatus.agi = skill.custom.agi;
                    totalStatus.mov = skill.custom.mov;
            }
        }
    }

    var alias = AbilityCalculator.getAgility;
    AbilityCalculator.getAgility = function(active, passive, weapon) {
        var agi = alias.call(this, active, passive, weapon);
        var totalStatus = SupportCalculator.createTotalStatus(active);

        if (totalStatus.agi != null) {
            agi += totalStatus.agi;
        }

        return agi;
    }

    var alias2 = ParamBonus.getMov;
    ParamBonus.getMov = function(unit) {
        var mov = alias2.call(this, unit);
        var totalStatus = SupportCalculator.createTotalStatus(unit);

        if (totalStatus.mov != null) {
            mov += totalStatus.mov;
        }

        return mov;
    }



})();
