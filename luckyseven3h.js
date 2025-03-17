// By Penny
// This is what I call LuckySevenThreeHouses Plugin
// Give a unit a custom skill with the keyword "LuckySevenHouse" for this to take effect
// Set the custom parameters to a list of states you want to inflict on the user, for example:

// {stateList: [0, 12]} would inflict state ID 0, and state ID 12 onto the unit randomly.
// This is most effective if each state only has a duration of 1.
// If you don't want it to only last for the first seven turns, go to line 28, and delete "&& (root.getCurrentSession().getTurnCount() <= 7)"

// For a very specific skill where they pick a state at random to give a unit every single turn until turn 7

(function () {
    alias1 = TurnChangeStart.doLastAction;
    TurnChangeStart.doLastAction = function() {
        alias1.call(this);

        var i, unit;
		var list = TurnControl.getActorList();
		var count = list.getCount();
        
		for (i = 0 ; i < count; i++) {
            // Enter your list of state IDs to give the unit here.
			unit = list.getData(i);
            var skill = SkillControl.getPossessionCustomSkill(unit, "LuckySevenHouse");
            if (skill != null) {
            var stateList = skill.custom.stateList;
			random = Math.floor(Math.random() * stateList.length);

			if ((stateList.length != 0) && (root.getCurrentSession().getTurnCount() <= 7)) {
                var state = root.getBaseData().getStateList().getDataFromId(stateList[random]);
                StateControl.arrangeState(unit, state, IncreaseType.INCREASE);
            }
		}
    }
}




})();