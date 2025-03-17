// Made by Penny
// Makes a weapon ignore the weapon triangle.
// Give a weapon {ignoreTriangle: true} as a custom parameter for this to take effect.

(function() {
var alias = CompatibleCalculator._getCompatible;
CompatibleCalculator._getCompatible = function(active, passive, weapon) {
	var compat = alias.call(this, active, passive, weapon);
	if (compat != null) {
    var weaponPassive = ItemControl.getEquippedWeapon(passive);

	if (weapon.custom.ignoreTriangle === true || weaponPassive.custom.ignoreTriangle === true) {
		return null;
	}
	
	return compat;
};


})();