//groups user belongs to
const userGroups = document.querySelector("#usergroups");

// all repairs
const repairsList = document.querySelectorAll("[data-group]");

//event listener on groups container
userGroups.addEventListener("click", (event) => {
    sortRepairs(event, repairsList);
});

//sorting function
function sortRepairs(event, nodeList) {
    const group = event.target.dataset.groupsort;
    console.log("group:", group);
    nodeList.forEach((element) => {
        const elementGroup = nodeList[0].attributes["data-group"].value;
        console.log("element group:", elementGroup);
        if (group.toLowerCase() !== elementGroup.toLowerCase()) {
            element.classList.toggle("hidden");
        } else {
            element.classList.toggle("hidden");
        }
    });
}
