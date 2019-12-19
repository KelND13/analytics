module.exports = {

    prettifyResults: (standAloneStories, packageContents) => {
        let idList = [];
        let allItems = standAloneStories.concat(packageContents);
        for (i = 0; i < allItems.length; i++) {
            if (allItems[i].id) {
                idList.push(allItems[i].id);
            }
        }
        return idList;
    }

}