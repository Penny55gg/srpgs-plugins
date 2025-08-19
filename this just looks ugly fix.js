// Fixes that stupid "???" on the menu.
// Overwrites ShopListScreen.getShopEntryArray

(function() {
    ShopListScreen._getShopEntryArray = function() {
		var i, data, entry;
		var arr = [];
		var list = this._getDataList();
		var count = list.getCount();
		
		for (i = 0; i < count; i++) {
			data = list.getData(i);
			entry = StructureBuilder.buildListEntry();
			
			entry.isAvailable = data.isShopDisplayable();
			if (entry.isAvailable) {
				entry.name = data.getName();
			}
			else {
                continue
			}
			entry.data = data;
			
			arr.push(entry);
		}
		
		return arr;
        }
})();