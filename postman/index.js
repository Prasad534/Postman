
//Utility function:
//1. Utility function to get DOM element from string
function getElementFromString(string){
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}



//initialize no of parameter
let addedParamCount = 0;

//Hide the parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

//if user click on params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", ()=>{
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
});

//if user click on json, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", ()=>{
    document.getElementById("requestJsonBox").style.display = "block";
    document.getElementById("parametersBox").style.display = "none";
});


// If user click on + button, add more parameter
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", ()=>{
    let params = document.getElementById("params");
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                    </div>`;
    //convert the element string to DOM node
    let paraElement = getElementFromString(string);
    params.appendChild(paraElement);
    //Add an eventlistener to remove parameter on clicking - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for(item of deleteParam){
        item.addEventListener("click", (e)=>{
            alert("Do you really want to delete this parameter?", e.target.parentElement.remove());

        });
    }
    addedParamCount++;
});

//if user click on submit
let submit = document.getElementById("submit");
submit.addEventListener("click", ()=>{
    //show please wait in the response box to request patience from the user
    document.getElementById("responsePrism").innerHTML = "Please wait.. Fetching response...";
    
    
    setTimeout(() => {

    //fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    // console.log(requestType);
    // console.log(contentType);



//     //if user select params option instead of json, collect all the parameters in an object

    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i+1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i+1)).value;
                let values = document.getElementById("parameterValue" + (i+1)).value;
                data[key] = values;
            }
            
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById("requestJsonText").value;
    }

//     //log all the values in console for debugging 
    console.log("url: ", url);
    console.log("requestType: ", requestType);
    console.log("contentType: ", contentType);
    console.log("data: ", data);


    //if the request type is post, invoke fetch api to create a post request
    if (requestType=="GET"){
        fetch(url, {
            method: "GET",
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById("responseJsonText").value = text;
            // Prism.highlightAll();
           document.getElementById("responsePrism").innerHTML = text;
           responsePrism.highlightAll();
        }); 
    } 

    else{
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById("responseJsonText").value = text;
            
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        }); 
    }

} ,3000);
});






