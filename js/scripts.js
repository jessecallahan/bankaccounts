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




bankAccounts.prototype.withdrawal = function (amount) {
    this.accountAmount -= amount;
    return this.accountAmount;
}

// bankAccounts.prototype.depositTwo = function (amount) {
//     this.accountAmount += amount;
//     return this.balance;
// }

// Business Logic for Contacts ---------
function Account(accountName, accountAmount) {
    this.accountName = accountName,
        this.accountAmount = accountAmount
}







// User Interface Logic ---------
var bankAccounts = new bankAccounts();
$(document).ready(function () {
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

        $("form#01").submit(function () {
            event.preventDefault();
            var inputtedAmount2 = parseInt($("input.new-deposit-amount2").val());
            console.log(inputtedAmount2);
            account.accountAmount += inputtedAmount2;
            $(".last-name").html(account.accountAmount);
        });

    };



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


    attachAccountListeners();
    $("form#new-account").submit(function (event) {
        event.preventDefault();
        var inputtedName = $("input#new-name").val();
        var inputtedAmount = parseInt($("input#new-deposit-amount").val());
        var inputtednewInput = 0;
        $("input#new-name").val("");
        $("input#new-deposit-amount").val("");
        var newAccount = new Account(inputtedName, inputtedAmount, inputtednewInput);
        bankAccounts.addAccount(newAccount);
        displayAccountDetails(bankAccounts);
        console.log(bankAccounts.accounts);
    });
});
