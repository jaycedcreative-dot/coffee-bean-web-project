$(document).ready(function(){
/*  Event Card Click Handler */
$('.event-card').on('click', function(){
    const eventName = $(this).data('event-name');

    if(eventName) {
        $('.event-card').find('.card-header i')
            .attr('class', 'fa-regular fa-circle');

        $(this).find('.card-header i')
            .attr('class', 'fa-regular fa-circle-check text-primary');

        $('#eventSelect').val(eventName);
    }
});

/* Dropdown Change Handler */
$('#eventSelect').on('change', function(){
    const selectValue = $(this).val();

    $('.event-card').each(function(){
        if($(this).data('event-name') === selectValue){
             $('.event-card').find('.card-header i')
                .attr('class', 'fa-regular fa-circle');

            $(this).find('.card-header i')
                .attr('class', 'fa-regular fa-circle-check text-primary');
        }
    });
});

/* Validation Helper Functions */
function showError($groupEle){
    $groupEle.removeClass('success').addClass('error');$groupEle.find('.error-message').slideDown(150);
}

function showSuccess($groupEle){
    $groupEle.removeClass('error').addClass('success');$groupEle.find('.error-message').slideUp(150);
}

/* 4. Individual Input Validations */
function validaterFirstName(){
    const val = $('#firstName').val().trim();
    const  $group =$('#groupFirstName');
    if(val.length < 2){
        showError($group);
        return false;
    } else {
        showSuccess($group);
        return true;
    }
}

function validaterLastName(){
    const val = $('#lastName').val().trim();
    const  $group =$('#groupLastName');
    if(val.length < 2){
        showError($group);
        return false;
    } else {
        showSuccess($group);
        return true;
    }
}

function isValidEmail(strEmail){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(strEmail);
}

function validaterEmail(){
    const val = $('#email').val().trim();
    const  $group =$('#groupEmail');
    if(!isValidEmail(val)){
        showError($group);
        return false;
    } else {
        showSuccess($group);
        return true;
    }
}

/* Real-time Event Listeners */
$('#firstName').on('keyup blur', validaterFirstName);
$('#lastName').on('keyup blur', validaterLastName);
$('#email').on('keyup blur', validaterEmail);

    /* Form Submission Handling */
$('#multiEventForm').on('submit', function(e) {
    e.preventDefault();

    const flagFirstName = validaterFirstName();
    const flagLastName = validaterLastName();
    const flagEmail = validaterEmail();

    const eventname = $('#eventSelect').val();
    const fname = $('#firstName').val().trim();
    const lname = $('#lastName').val().trim();
    const email = $('#email').val().trim();

    if (flagFirstName && flagLastName && flagEmail && eventname) {
        // Success Toastify
        Toastify({
            text: `Success! Thank you ${fname} ${lname}. Your ticket for ${eventname} has been registered.`,
            duration: 4000,
            gravity: "top",
            position: "right",
            close: true,
            stopOnFocus: true,
            style: { background: "#677C69" }
        }).showToast();

        // Mail To Function
        const recipient = "beanboutique@gmail.com";
        const subject = encodeURIComponent(`Event Registration: ${eventname}`);
        const body = encodeURIComponent(
            `Hello Bean Boutique,\n\n` +
            `I would like to register for the following event.\n\n` +
            `First Name: ${fname}\n` +
            `Last Name: ${lname}\n` +
            `Customer Email: ${email}\n` +
            `Selected Event: ${eventname}\n\n` +
            `Thank you.`
        );

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    } else {
        // Error Toastify
        Toastify({
            text: !eventname
                ? "Please select an event."
                : "Please fill in all required fields correctly.",
            duration: 3500,
            gravity: "top",
            position: "right",
            close: true,
            stopOnFocus: true,
            style: { background: "#dc3545" }
        }).showToast();
    }
});

});