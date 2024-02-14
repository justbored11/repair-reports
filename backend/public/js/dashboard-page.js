//groups user belongs to
const userGroups = document.querySelector("#usergroups");

// all repairs
const repairsList = document.querySelectorAll("[data-group]");

//event listener on groups container
userGroups.addEventListener("click", (event) => {
    console.log(event.target.classList);
    event.target.classList.toggle("border-4");
    event.target.classList.toggle("border-sky-500");
    sortRepairs(event, repairsList);
});

//sorting function
function sortRepairs(event, nodeList) {
    const group = event.target.dataset.groupsort;

    nodeList.forEach((element) => {
        const elementGroup = element.attributes["data-group"].value;
        console.log(
            `group not the same,`,
            group,
            elementGroup,
            group.toLowerCase() != elementGroup.toLowerCase()
        );

        if (group.toLowerCase() != elementGroup.toLowerCase()) {
            console.log(`toggle hidden on :`, elementGroup, group);
            element.classList.toggle("hidden");
        }
    });
}
