// If you are at max skills... it prevents you from using any items that give you skills.
// I feel like this is a thing that should just exist already
// By Penny

(function() {
    var alias = ItemControl.isItemUsable;
    ItemControl.isItemUsable = function(unit, item) {
    var use = alias.call(this, unit, item);
    var maxCount = DataConfig.getMaxSkillCount();
    var list = unit.getSkillReferenceList();
    var count = list.getTypeCount();
    var type = item.getItemType();

    if (count == maxCount && type === ItemType.SKILLGET) {
        return false;
    }

    return use;
}






})();
