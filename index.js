class Train {
    constructor(id, name, startPoint, endPoint, time) {
        this.id = id;
        this.name = name;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.time = time;
    }
}
let trains = JSON.parse(localStorage.getItem("trains"));
let trainCount = localStorage.getItem("trainCount");
if (trainCount == null) trainCount = 0;
if (trains != null) {
    addTrainToDom(trains);
    addMouseEnterToTrainElement();
    addMouseLeaveToTrainElement();
    addEventListenerToDeleteButton();
    addEventListenerToAddToCartButton();
    hideAllTrainButtons();
} else {
    $("#trainContainer").html("<div style='margin:10px auto;'>Go to Admin page and add train</div>");
}
addEventListenerToSearchButton();
addEventListenerToAddButton();

function addEventListenerToAddButton() {
    $("#btnAdd").on("click", addTrain);
}
function addEventListenerToSearchButton() {
    $("#btnSearch").on("click", searchTrain);
}
function addMouseEnterToTrainElement() {
    $(".trainElement").on("mouseenter", showTrainButtons)
}
function addMouseLeaveToTrainElement() {
    $(".trainElement").on("mouseleave", hideTrainButtons)
}
function addEventListenerToDeleteButton() {
    $(".btnDelete").on("click", deleteTrain)
}
function addEventListenerToAddToCartButton() {
    $(".btnAddToCart").on("click", addTrainToCart)
}

function addTrain() {
    let inputs = $(".input");
    if (trains == null) {
        trains = [];
    }
    let train = new Train(trainCount, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
    trains.push(train)
    localStorage.setItem("trains", JSON.stringify(trains))
    trainCount++;
    localStorage.setItem("trainCount", trainCount)
    alert("Train added")
    clearInputs(inputs);
}
function addTrainToDom(trainsList) {
    for (let i = 0; i < trainsList.length; i++) {
        let trainContainer = $("#trainContainer");
        trainContainer.append(`<div class="trainElement" id="${trainsList[i].id}">
        <div class="tRow">
            <div class="tName">${trainsList[i].name}</div>
        </div>
        <div class="tRow">
            <div class="tStartPoint">${trainsList[i].startPoint}</div> To
            <div class="tEndPoint">${trainsList[i].endPoint}</div>
        </div>
        <div class="tRow">
            <div class="tTime">${trainsList[i].time}</div>
        </div>
        <div class="tRow">
            <input class="btnDelete" type="button" value="Delete">        
            <input class="btnAddToCart" type="button" value="Add To Cart">        
        </div>
    </div>`)
    }
}
function clearTrains() {
    $("#trainContainer").html("")
}
function clearInputs(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}
function searchTrain() {
    let input = $("#searchTrain").val()
    let result = searchTrainByName(input);
    clearTrains()
    addTrainToDom(result);
    addMouseEnterToTrainElement();
    addMouseLeaveToTrainElement();
    addEventListenerToDeleteButton();
    addEventListenerToAddToCartButton();
    hideAllTrainButtons();
}
function searchTrainByName(name) {
    let result = trains.filter(train => train.name.toLowerCase().includes(name.toLowerCase()))
    return result;
}
function searchTrainById(trainsList, id) {
    let result = trainsList.filter(train => train.id == id)
    return result[0];
}
function showTrainButtons() {
    $(this).find(".btnDelete").show()
    $(this).find(".btnAddToCart").show()
}
function hideTrainButtons() {
    $(this).find(".btnDelete").hide();
    $(this).find(".btnAddToCart").hide()
}
function deleteTrain() {
    let parent = $(this).parent().parent();
    let id = $(parent).attr("id")
    console.log(id)
    let cartTrains = JSON.parse(localStorage.getItem("cartList"))
    cartTrains = cartTrains.filter(train => train.id != id)
    trains = trains.filter(train => train.id != id)
    localStorage.setItem("cartList", JSON.stringify(cartTrains));
    localStorage.setItem("trains", JSON.stringify(trains))
    $(parent).remove();
    updateCartCount(cartTrains.length);
}
function hideAllTrainButtons() {
    $(".trainElement").find(".btnDelete").hide();
    $(".trainElement").find(".btnAddToCart").hide();
}
function addTrainToCart() {
    let parent = $(this).parent().parent();
    let id = $(parent).attr("id")
    let train = searchTrainById(trains, id);
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    if (cartList == null) {
        cartList = [];
    }
    if (cartList.find(value => value.id == train.id)) {
        alert("Train is already in Cart")
        return;
    }
    cartList.push(train);
    localStorage.setItem("cartList", JSON.stringify(cartList));
    updateCartCount(cartList.length)
}
function updateCartCount(count) {
    $("#cartCount").text(count)
}