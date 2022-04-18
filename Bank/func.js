function createNew(bankName, interest, mloan, minPayment, inputLoan) {
    var accButton = document.createElement("button");
    accButton.className = "accordion";
    if (bankName !== undefined) {
        accButton.innerHTML = bankName;
    } else {
        accButton.innerHTML = "Bank";
    }

    ///creating the row
    var row = document.createElement("div");
    row.className = "row";
    row.style.display = "block";

    ///child labels
    var label_bank = document.createElement("label");
    label_bank.htmlFor = "bank_name";
    label_bank.innerHTML = "Bank Name";

    var label_interest = document.createElement("label");
    label_interest.htmlFor = "interest_rate";
    label_interest.innerHTML = "Interest Rate (%percents)";

    var label_maxloan = document.createElement("label");
    label_maxloan.htmlFor = "maxloan";
    label_maxloan.innerHTML = "Maximum Loan (maximum amount of money bank able to borrow)";

    var label_min_payment = document.createElement("label");
    label_min_payment.htmlFor = "min_down_payment";
    label_min_payment.innerHTML = "Minimum Down Payment (minimum amount of money you need to pay upfront)";

    var label_loan_tern = document.createElement("label");
    label_loan_tern.htmlFor = "loan_tern";
    label_loan_tern.innerHTML = "Loan Tern (mounth)";

    ///child inputs
    var input_bank = document.createElement("input");
    input_bank.type = "text";
    input_bank.id = "bank_name";
    input_bank.className = "bank_name";
    input_bank.placeholder = "Privat Bank";
    if (bankName !== undefined) {
        input_bank.value = bankName;
    }

    var input_interest = document.createElement("input");
    input_interest.type = "number";
    input_interest.id = "interest_rate";
    input_interest.className = "interest_rate";
    input_interest.placeholder = "10%";
    input_interest.pattern = "[0-9]{1,2}";
    input_interest.size = 2;
    if (interest !== undefined) {
        input_interest.value = interest;
    }

    var input_mloan = document.createElement("input");
    input_mloan.type = "number";
    input_mloan.id = "maxloan";
    input_mloan.className = "maxloan";
    input_mloan.placeholder = "150 000";
    input_mloan.pattern = "[0-9]{1,10}"
    if (mloan !== undefined) {
        input_mloan.value = mloan;
    }

    var input_mpayment = document.createElement("input");
    input_mpayment.type = "number";
    input_mpayment.id = "min_down_payment";
    input_mpayment.className = "min_down_payment";
    input_mpayment.placeholder = "50 000";
    input_mpayment.pattern = "[0-9]{1,10}";
    if (minPayment !== undefined) {
        input_mpayment.value = minPayment;
    }


    var input_loan = document.createElement("input");
    input_loan.type = "number";
    input_loan.id = "loan_tern";
    input_loan.className = "loan_tern";
    input_loan.placeholder = "3";
    input_loan.pattern = "[0-9]{1,2}";
    if (inputLoan !== undefined) {
        input_loan.value = inputLoan;
    }


    ///child buttons
    var createBtn = document.createElement("button");
    createBtn.type = "submit";
    createBtn.innerText = "Submit";
    createBtn.className = "btn";
    createBtn.id = "btncreate";

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "submit";
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn";
    deleteBtn.id = "btndelete";

    ///adding components to row
    row.appendChild(label_bank);
    row.appendChild(input_bank);

    row.appendChild(label_interest);
    row.appendChild(input_interest);

    row.appendChild(label_maxloan);
    row.appendChild(input_mloan);

    row.appendChild(label_min_payment);
    row.appendChild(input_mpayment);

    row.appendChild(label_loan_tern);
    row.appendChild(input_loan);

    row.appendChild(createBtn);
    row.appendChild(deleteBtn);

    document.body.append(accButton);
    document.body.append(row);

    accButton.addEventListener("click", accordionListener);
    createBtn.addEventListener("click", createListener);
    deleteBtn.addEventListener("click", deleteListener);
}

var index = 0;
var objectList = new Array(Object);
let object;
var localStorage = window.localStorage;
var flag = new Boolean(true);
const calc = document.getElementById("calc")
calc.addEventListener("click", createCalc);


///upload from localstorage func
function onStart() {
    if (localStorage.length > 0) {
        readData();
    } else {
        createNew();
    }
}

///listeners
function createListener(Event) {
    if (Event.type === "click") {
        if (isEmpty(this)) {
            writeData(this);
            objectList.push(createNew());
        }
    }
}

function deleteListener(Event) {
    if (Event.type === "click") {
        var parent = this.parentElement;
        var accbutton = parent.previousElementSibling;
        deleteData(parent)
        accbutton.remove();
        parent.remove();
    }
}

function accordionListener(Event) {
    if (Event.type === "click") {
        console.log(this.nextElementSibling);
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}

///check on empty fields function
function isEmpty(btn) {
    const row = btn.parentElement;
    const inputElements = row.querySelectorAll("input");
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value.trim() === "") {
            return false;
        }
    }
    return true;
}

///localstorage functions
function writeData(btn) {
    const row = btn.parentElement;
    const inputElements = row.querySelectorAll("input");
    var output = [];
    for (var i = 0; i < inputElements.length; i++) {
        output[i] = inputElements[i].value;
    }
    localStorage.setItem(output[0], output[1] + "|" + output[2] + "|" + output[3] + "|" + output[4])
}

function readData() {
    for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        var storageVal = localStorage.getItem(key).split('|');
        createNew(key, storageVal[0], storageVal[1], storageVal[2], storageVal[3]);
    }
}

function deleteData(data) {
    const inputElements = data.querySelectorAll("input");
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === inputElements[0].value) {
            localStorage.removeItem(localStorage.key(i));
        }
    }
}

///calc functions
function createCalc(Event) {
    if (Event.type === "click") {
        clearBody();
        if (flag) {
            bildCalc();
            flag = false;
        } else {
            onStart();
            flag = true;
        }

    }
}

function clearBody() {
    const divs = document.body.querySelectorAll("div");
    const buttons = document.body.querySelectorAll(".accordion");
    for (var i = 0; i < divs.length; i++) {
        divs[i].remove();
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].remove();
    }
    calc.value = "Return";
}

function bildCalc() {
    const row = document.createElement("div");
    row.className = "row";

    /// labels
    const label_init_loan = document.createElement("label");
    label_init_loan.htmlFor = "input_init_loan";
    label_init_loan.innerHTML = "InitialLoan";

    const label_down_payment = document.createElement("label");
    label_down_payment.htmlFor = "input_down_payment";
    label_down_payment.innerHTML = "Down Payment";

    /// inputs
    const input_init_loan = document.createElement("input");
    input_init_loan.type = "number";

    const input_down_payment = document.createElement("input");
    input_down_payment.type = "number";

    /// dropdownMenu
    const bank_dropdown = document.createElement("div");
    bank_dropdown.className = "dropdown";

    const drop_btn = document.createElement("button");
    drop_btn.className = "dropbtn";
    drop_btn.innerHTML = "Choose Bank";

    const drop_cont = document.createElement("div");
    drop_cont.className = "dropdown-content";

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var button = document.createElement("button");
        button.innerHTML = key;
        console.log(key);
        button.addEventListener("click", dropListener);
        drop_cont.appendChild(button);
    }

    ///calculate
    const calc_btn = document.createElement("button");
    calc_btn.innerHTML = "Calculate";
    calc_btn.className = "btn";

    ///adding elemets to body
    bank_dropdown.appendChild(drop_btn);
    bank_dropdown.appendChild(drop_cont);

    row.appendChild(label_init_loan);
    row.appendChild(input_init_loan);

    row.appendChild(label_down_payment);
    row.appendChild(input_down_payment);

    row.appendChild(bank_dropdown);

    calc_btn.addEventListener("click", calculate);
    row.appendChild(calc_btn);

    document.body.append(row);
}

function dropListener(Event) {
    if (Event.type === "click") {
        index = this.innerHTML
        this.parentElement.previousElementSibling.innerHTML = this.innerHTML;
    }
}

function calculate(Event) {
    if (Event.type === "click") {
        if (isEmpty(this) && this.parentElement.querySelector(".dropbtn").innerHTML !== "Choose Bank") {
            const inputs = this.parentElement.querySelectorAll("input");
            let obj = localStorage.getItem(index).split('|')
            if (parseInt(obj[1], 10) > parseInt(inputs[0].value, 10)) {
                if ((parseInt * obj[2], 10) < parseInt(inputs[1].value, 10)) {
                    formula(inputs[0].value, inputs[1].value, obj[0], obj[3]);
                } else {
                    alert("Down payment is less than Minimal down payment")
                }
            } else {
                alert("Initial loan is more than Maximum loan");
            }

        }
    }
}

function formula(initLoan, downPayment, interest, LT) {
    var P = initLoan - downPayment;
    var r = interest / 1200;
    var x = Math.pow((1 + r), LT)
    var M = P * r * x;
    var M = M / (x - 1);
    alert("Mounth payment = " + M);
}

onStart();