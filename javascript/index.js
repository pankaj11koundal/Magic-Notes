showNotes();

let searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", function(e){
    let inputval = searchBox.value;
    let cardShell = document.getElementsByClassName("card-shell");
    Array.from(cardShell).forEach(function(element){
        let cardText = element.getElementsByTagName("h2")[0].innerText;
        if (cardText.includes(inputval)) {
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
    let addText = document.getElementById("textbox");
    let notesElements = localStorage.getItem("notes");
    if (notesElements === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesElements);
    }
    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = " ";

    showNotes();
})

function showNotes() {
    let notesElements = localStorage.getItem("notes");
    if (notesElements === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesElements);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="col-lg-4 col-md-6 card-shell">
                    <div class="card">
                    <div class="card-header">
                            <h1>${index + 1}</h1>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                <h2>${element}</h2>
                            </p>
                        </div>
                        <div class="card-footer">
                            <div class="button-box">
                                <div id="${index}" onclick="deleteNotes(this.id)" class="btn btn-light btn-outline-info"><i class="fas fa-trash-alt"> </i>Delete Note</div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    });

    let notesId = document.querySelector("div#notes");
    if (notesElements != null) {
        notesId.innerHTML = html;
    }
    else {
        notesId.innerHTML = ` 
            <div class=" container-fluid row inner-notes-box " id="notes">
                <div class="col-lg-4 col-md-2 card-shell">
                    <div class="card">
                        <div class="card-header">
                            <h1>0</h1>
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                                Add some notes from above section.
                            </p>
                        </div>
                        <div class="card-footer">
                            <div class="button-box">

                                <div class="btn btn-light btn-outline-info" id="dletebtn"><i class="fas fa-trash-alt"> </i>Delete Note</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

function deleteNotes(id) {
    let notesElements = localStorage.getItem("notes");
    if (notesElements === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesElements);
    }

    notesObj.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

