class Train {
    constructor(id, name, startPoint, endPoint, time) {
        this.id = id;
        this.name = name;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.time = time;
    }
}
let cartTrains = JSON.parse(localStorage.getItem("cartList"));

if (cartTrains != null) {
    addTrainToDom(cartTrains);
    addEventListenerToDeleteButton();
} else {
    $("#cartTrainContainer").html("<div style='margin:10px auto;text-align: center;'>You Don't Add Any Train Into Cart Yet!</div>");
}
addEventListenerToSearchButton();


function addEventListenerToSearchButton() {
    $("#btnCartSearch").on("click", searchTrain);
}

function addEventListenerToDeleteButton() {
    $(".cartBtnDelete").on("click", deleteTrain)
}

function addTrainToDom(cartTrainsList) {
    for (let i = 0; i < cartTrainsList.length; i++) {
        let trainContainer = $("#cartTrainContainer");
        trainContainer.append(`<div class="cartTrainElement" id="${cartTrainsList[i].id}">
        <div class="cartTRow">
        <div class="cartTRow">
            <div class="cartTName">${cartTrainsList[i].name}</div>
        </div>
        <div class="cartTRow">
            <div class="cartTStartPoint">${cartTrainsList[i].startPoint}</div> To
            <div class="cartTEndPoint">${cartTrainsList[i].endPoint}</div>
        </div>
        <div class="cartTRow">
            <div class="cartTTime">${cartTrainsList[i].time}</div>
        </div>  
        <input class="cartBtnDelete" type="button" value="Delete"> 
        </div>
    </div>`)
    }
}
function clearTrains() {
    $("#cartTrainContainer").html("")
}

function searchTrain() {
    let input = $("#searchCartTrain").val()
    let result = searchTrainByName(input);
    clearTrains()
    addTrainToDom(result);
}
function searchTrainByName(name) {
    let result = cartTrains.filter(train => train.name.toLowerCase().includes(name.toLowerCase()))
    return result;
}
function searchTrainIndexById(id) {
    let indexValue;
    let result = cartTrains.filter((train, index) => {
        if (train.id == id) {
            indexValue = index
            return true;
        }
        return false;
    })
    return indexValue;
}

function deleteTrain() {
    let parent = $(this).parent().parent();
    let id = $(parent).attr("id")
    let trainIndex = searchTrainIndexById(id);
    cartTrains.splice(trainIndex, 1)
    $(parent).remove();
    localStorage.setItem("cartList", JSON.stringify(cartTrains))
}
