// Business Logic for AddressBook ---------
function bankAccounts() {
    this.accounts = [],
        this.currentId = 0
}

bankAccounts.prototype.addAccount = function (account) {
    account.id = this.assignId();
    this.accounts.push(account);
}

bankAccounts.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
}

bankAccounts.prototype.findAccount = function (id) {
    for (var i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i]) {
            if (this.accounts[i].id == id) {
                return this.accounts[i];
            }
        }
    };
    return false;
}

bankAccounts.prototype.changeAccount = function (id) {
    for (var i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i]) {
            if (this.accounts[i].id == id) {
                console.log(this.accounts[i].accountAmount);
                return this.accounts[i].accountAmount;

            }
        }
    };
    return false;
}

// Business Logic for Contacts ---------
function Account(accountName, accountAmount) {
    this.accountName = accountName,
        this.accountAmount = accountAmount
}


// User Interface Logic ---------
var bankAccounts = new bankAccounts();

function displayAccountDetails(addressBookToDisplay) {
    var contactsList = $("ul#accounts");
    var htmlForContactInfo = "";
    addressBookToDisplay.accounts.forEach(function (account) {
        htmlForContactInfo += "<li id=" + account.id + ">" + account.accountName + " " + account.accountAmount + "</li>";
    });
    contactsList.html(htmlForContactInfo);
};

function showAccounts(accountId) {
    var account = bankAccounts.findAccount(accountId);
    $("#show-account").show();
    $(".first-name").html(account.accountName);
    $(".last-name").html(account.accountAmount);
    var buttons = $("#buttons");
    buttons.empty();
    //buttons.append("<button class='deleteButton' id=" + account.id + ">Delete</button>");
    buttons.append("<input type='text' class='new-deposit'></input> <button class='makeDeposit' id=" + account.id + ">Make Deposit</button>");
    var newAmount = parseInt($(".makeDeposit").val());
    console.log(newAmount);
    var show = newAmount + bankAccounts.accounts[0].accountAmount
    $("#show-deposit").append(show);
}

function attachAccountListeners() {
    $("ul#accounts").on("click", "li", function () {
        showAccounts(this.id);
    });
    $("#buttons").on("click", ".makeDeposit", function () {
        bankAccounts.changeAccount(this.id);
        //$("#show-account").hide();
        displayAccountDetails(bankAccounts);
    });
};

$(document).ready(function () {
    attachAccountListeners();
    $("form#new-account").submit(function (event) {
        event.preventDefault();
        var inputtedName = $("input#new-name").val();
        var inputtedAmount = $("input#new-deposit-amount").val();
        $("input#new-name").val("");
        $("input#new-deposit-amount").val("");
        var newAccount = new Account(inputtedName, inputtedAmount);
        bankAccounts.addAccount(newAccount);
        displayAccountDetails(bankAccounts);
        console.log(bankAccounts.accounts);
    })
})