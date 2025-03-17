// By Penny
// If the description of a unit is blank, uses the class description instead.

(function() {
    var alias = UnitMenuScreen._getBottomDescription;
    UnitMenuScreen._getBottomDescription = function() {
        var desc = alias.call(this);
        if (desc === '') {
            desc = this._unit.getClass().getDescription();
        }

        return desc;
    }

})();
