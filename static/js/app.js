function charge(amount) {

    $.ajax({
        url: "/charge/",
        type: "POST",
        data: JSON.stringify({percentage: amount}),
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data, status) {
            if (status === "success") {
                let valuerPercentage = $("#current_charge");
                let valueButtons = $(".donate_charge");
                let confirmButton = $("#confirm");

                valueButtons.each(function () {
                    $(this).addClass("normal");
                    $(this).removeClass("inverted");
                });

                confirmButton.addClass("normal");
                confirmButton.removeClass("inverted");
                confirmButton.text("Confirm");

                blocked = false;
                selected_amount = 0;

                valuerPercentage.prop('number', valuerPercentage.text()).animateNumber({number: data['current_charge']}, function () {
                    $(".share-buttons").css({visibility: "visible"});
                });
                wave.setPercentage((1 - (data['current_charge'] / 100)));

            }
            else {
                blocked = false;
                let valueButtons = $(".donate_charge");
                let confirmButton = $("#confirm");
                valueButtons.each(function () {
                    $(this).addClass("normal");
                    $(this).removeClass("inverted");
                });

                confirmButton.addClass("normal");
                confirmButton.removeClass("inverted");
                confirmButton.text("Confirm");

                alert("Data: " + data + "\nStatus: " + status);
            }
        }
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}