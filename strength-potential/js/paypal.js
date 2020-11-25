var getChoice = function() {
    var rbs = document.querySelectorAll('input[name="product"]');
    var selectedValue, choice = { total: '', description: '' };
    [].forEach.call(rbs, function(rb) {
        if (rb.checked) {
            selectedValue = rb.value;
        }
    });
    switch (selectedValue) {
        case 'Basic':
            choice.total = '500';
            choice.description = 'Mest basic pakke.';
            break;
        case 'Plus':
            choice.total = '1000';
            choice.description = 'Litt ekstra, men ganske basic.';
            break;
        case 'Premium':
            choice.total = '2000';
            choice.description = 'Ordentlig premium shit.';
            break;
        default:
            break;
    }
    return choice;
}

// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    createOrder: function(data, actions) {
        // This function sets up the details of the transaction,
        // including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.01'
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
            // This function shows a transaction success message to your buyer.
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');
