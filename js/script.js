

// to-review-cart
// to-login
// to-payment-method
// to-complete-order


var isDev = new URLSearchParams(window.location.search).get('hks_dev') == 'true';


var endpointUrl = 'https://mmbuild.shop/version-test';

if(!isDev) {
    endpointUrl = 'https://mmbuild.shop';
}

// On Page Load Get Working Faults 

window.addEventListener('load', function() {

    
    //alert("Trigger Direct Page checks");

    // Check if page has Cart parameter then trigger straight to the Cart.
    triggerDirectPage();


    if($('.phone_condition_box').length > 0) {

        // var BubbleTableId = document.getElementById("bubble_table_").innerHTML;

        var BubbleTableId = $('#hks-BubbleTableId').html();

        // var BubbleTableId = document.getElementById("DeadPrice").innerHTML;

        var NewPricing = document.getElementById("hks-NewPrice").innerHTML ;


        // Set Reduced Price Trigger

        try {
            var workingPrice = $('.condition_working').find('h1.amount_text').html();

            $('.reduce-price-holder').html(parseFloat(workingPrice).toFixed(2));
        } catch {

        }
        

        document.getElementById("TotalSalesValue").innerHTML = NewPricing;



        fetch(`${endpointUrl}/api/1.1/wf/get_faults_data?device_id=${BubbleTableId}`)



        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            data.response.data = JSON.parse(data.response.data)

            let faults = data.response.data ;

            var parentElement = document.getElementById('dynamic_checklisting');

            var label = document.createElement('label');

            for(var count in faults)

            {

                let localLabel = label.cloneNode(true)

                localLabel.innerHTML = `<input id="custom_chk" onclick="getValue()" type="checkbox" name="mmcheckbox" value="${faults[count].fault_value}"><span class="dy_padding">${faults[count].fault}</span>`

                parentElement.appendChild(localLabel);

            }

        })

        .catch(function (err) {

            console.log('error: ' + err);

        });   
    }



    // as jQuery add this event only on first occuring of the ID and we need on all occurings 
    /* $('#email-form').submit((e) => {
        e.preventDefault(); 
    }); */
    document.querySelectorAll('#email-form').forEach(el => {
        $(el).submit((e) => {
            e.preventDefault(); 
        })
    })

    document.querySelectorAll('#toggle-reset-popup').forEach(el => {
        $(el).click(function() {
            $('.reset-password-popup').fadeToggle(100);
        })
    })
    /* $("#toggle-reset-popup").click(function() {
        $('.reset-password-popup').fadeToggle(100);
    }); */
    document.querySelectorAll('#link-sent-btn').forEach(el => {
        $(el).click(handleResetPassword);
    })

})

// Apply Coupon Code

let couponStatus, couponAmount, couponId;
document.getElementById("applyButton").addEventListener("click", () => {
  const couponCode = document.getElementById("couponInput").value;

  const inputData = {
    coupon: couponCode
  };

  fetch('https://mobile-monster.bubbleapps.io/version-test/api/1.1/wf/mm_check_coupon/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        const response = data.response;
        couponStatus = response.couponStatus;
        couponAmount = response.couponAmount;
        couponId = response.couponId;

        if (couponStatus === "Active" && couponId) {
          document.getElementById("message_success").innerHTML = `Congratulations! The coupon code has been successfully applied. You will now receive an additional <strong>$${couponAmount}</strong> in your total.`;
        } else {
          document.getElementById("message_error").innerHTML = "Invalid coupon code. Please try again.";
        }
      } else {
        document.getElementById("message_error").innerHTML = "Error: Failed to process the coupon code. Please try again later.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Load Functionality END


function handleResetPassword(e) {
    
    e.preventDefault();


    user_email = $('#recover-pass-email').val();

    if(user_email == '') {

        $('.reset-password-popup').fadeOut(100);
        displayProcessError("Please add a vaid email address.");

        setTimeout(function() {

            clearProcessErrors();

        }, 2000);

        return false;

    }   

    var requestData = new FormData();
    requestData.append('seller_email', user_email);

    fetch(`${endpointUrl}/api/1.1/wf/reset_password_api`, {
        method:"POST",
        body:requestData,
    })  
    .then(res => res.json())
    .then(response => {


        if(response.response.success) {

            displayProcessError("Your new password has been sent to your inbox.");
        } else {
            displayProcessError("No user with this email was found, please recheck your email.");

        }

        $('#recover-pass-email').val('');

        

    })
    .finally(function() {


        setTimeout(function() {

            clearProcessErrors();

        }, 2000);

        $('.reset-password-popup').fadeOut(100);

    });

}


if($('.phone_condition_box').length > 0) {


// Count Final Price

var working_fault_price = document.getElementById("hks-WorkingPrice").innerHTML;

}




function getValue() {

    var checkboxes = document.getElementsByName('mmcheckbox');

    var result = 0;

    for (var i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {

        result = result + parseInt(checkboxes[i].value) ;

        }

    }

    var sum = working_fault_price - result ;

    var DeadPrice = document.getElementById("hks-DeadPrice").innerHTML;
    var totalPrice;
    

    if(sum < DeadPrice) {

        totalPrice = $('#Quantity').val() * DeadPrice;
        
        var perUnitFinalPricingBox = document.getElementById("per_unit_final_pricing");
        if(perUnitFinalPricingBox) {
            perUnitFinalPricingBox.innerHTML = DeadPrice;
        }

        var finalPriceBox = document.getElementById("final_price");
        if(finalPriceBox) {
            finalPriceBox.innerHTML = "$" + totalPrice;
        }


        var unitPriceBox = document.getElementById("UnitPrice");
        if(unitPriceBox) {
            unitPriceBox.innerHTML = DeadPrice;
        }


        
        var TotalSalesValueBox = document.getElementById("TotalSalesValue");
        if(TotalSalesValueBox) {
            TotalSalesValueBox.innerHTML = totalPrice;
        }

        
        
        var TotalPriceBox = document.getElementById("TotalPrice");
        if(TotalPriceBox) {
            TotalPriceBox.innerHTML = totalPrice;
        }


        // document.getElementById("per_unit_final_pricing").innerHTML = DeadPrice ;

        // document.getElementById("final_price").innerHTML = "$" + totalPrice ;

        // document.getElementById("UnitPrice").innerHTML = DeadPrice ;

        // document.getElementById("TotalSalesValue").innerHTML = totalPrice ;

        // document.getElementById("TotalPrice").innerHTML = totalPrice ;

    } else {
        totalPrice = $('#Quantity').val() * sum;

        

        var perUnitFinalPricingBox = document.getElementById("per_unit_final_pricing");
        if(perUnitFinalPricingBox) {
            perUnitFinalPricingBox.innerHTML = sum;
        }

        var finalPriceBox = document.getElementById("final_price");
        if(finalPriceBox) {
            finalPriceBox.innerHTML = "$" + totalPrice;
        }


        var unitPriceBox = document.getElementById("UnitPrice");
        if(unitPriceBox) {
            unitPriceBox.innerHTML = sum;
        }


        
        var TotalSalesValueBox = document.getElementById("TotalSalesValue");
        if(TotalSalesValueBox) {
            TotalSalesValueBox.innerHTML = totalPrice;
        }

        
        
        var TotalPriceBox = document.getElementById("TotalPrice");
        if(TotalPriceBox) {
            TotalPriceBox.innerHTML = totalPrice;
        }

        

        // document.getElementById("per_unit_final_pricing").innerHTML = sum ;

        // document.getElementById("final_price").innerHTML = "$" + totalPrice ;

        // document.getElementById("UnitPrice") ?  document.getElementById("UnitPrice").innerHTML = sum : null;

        // document.getElementById("TotalSalesValue").innerHTML = totalPrice ;

        // document.getElementById("TotalPrice").innerHTML = totalPrice ;

    }

}


// Handle Login Form
$('#wf-form-SigninForm').submit(function(e) {

    e.preventDefault();
    Authenticate() ;


})


function Authenticate() {

    var loginFormData = new FormData();

    loginFormData.append("email", $('#LoginEmail').val());
    loginFormData.append("password", $('#LoginPassword-2').val());
    

    fetch(`${endpointUrl}/api/1.1/wf/authenticate_login`, {
        body: loginFormData,
        method: "POST"   

    })
    .then((res) => res.json() )

    .then(function (data) {

        console.log(data);

        if(data.response.success == "true") {

           
            loginSuccessful();
            
            
        } else {
            loginError(data.reponse.error)
        }
        

    })

    .catch(error => {

        console.log("There was an error: " + error);

    });

}


function loginSuccessful() {



    $('.op-step-3').fadeOut(20);
    $('.op-step-4').fadeIn(20);
    // Take to Review Details View




}

function loginError(message) {


    $('.login-error').html(`Erorr: ${message}`);

}


// add items
// .op-step-1

// Review cart
// .op-step-2

// Login signup
// .op-step-3

// Choose payment
// .op-step-4






// Signup on Mobile Monster (Bubble)




// authentication Handlers


$('#SignUp').click(handleRegistration);
// $('#SignIn').click(handleLogin);
document.querySelectorAll('#SignIn').forEach(btn => {
    btn.setAttribute('type', 'button')
    $(btn).click(handleLogin);
})

if(!need_imei_number()) {
    // $('.emi_section').fadeOut(0);
    $('.emi_section .emi-box *').fadeOut(0);
    $('.input-emei').val("").change();
}


function validateCompleteOrder() {

    clearProcessErrors();
    var payment_method = getPaymentMethod();

   

    if(payment_method == 'cheque') {

        if($('.input-cheque-name').val() == '')  {

            displayProcessError("Please enter your Cheque name.");
            return false;
        }

    }

    if(payment_method == 'bank') {
 
        if($('.input-accont-number').val() == '')  {

            displayProcessError("Please enter your Account number.");
            return false;
        }

        if($('.input-bank-name').val() == '')  {

            displayProcessError("Please enter your Bank Name.");
            return false;
        }


        if($('.input-account-name').val() == '')  {

            displayProcessError("Please enter your Bank account name.");
            return false;
        }

        if($('.input-account-bsb').val() == '')  {

            displayProcessError("Please enter your Bank BSB Number.");
            return false;
        }


 
    }


    if(payment_method == 'paypal') {

       
        if($('.input-paypal-address').val() == '')  {

            displayProcessError("Please enter your paypal email.");
            return false;
        }

    }

    return true;



}




function validateLogin() {
    
    clearProcessErrors();
    
    if($('.input-login-email:visible').val() == '') {
        $('.input-login-email:visible').addClass('error-border');
        displayProcessError("Please enter your email");
        return false
    }

    
    if($('.input-login-password:visible').val() == '') {
        $('.input-login-password:visible').addClass('error-border');
        displayProcessError("Please enter your Password");
        return false
    }

    clearProcessErrors();
    return true;


}


function handleLogin(e) {

    e.preventDefault();

    if(!validateLogin()){
        return false;
    }

    clearProcessErrors();

    showLoader(true);

    var SendData = {

      "email" : $('.input-login-email:visible').val(),
      "password" : $('.input-login-password:visible').val()


    }

    
    var loginFormData = new FormData();

    for (var property in SendData) {

        loginFormData.append(property, SendData[property]);


    }


    fetch(`${endpointUrl}/api/1.1/wf/authenticate_login`, {

        method: 'POST',

        body: loginFormData

    })

    .then(resp => resp.json()) 

    .then(response => {

        showLoader(false);
        if(response.response.success != "true") {

            displayProcessError(response.response.error);
            return;

        }

        setUserValues(response);

        setLoginUserInfo(response.response.user_email, response.response.auth_key );        

        displayProcessError("Login successfully...");
        setTimeout(function() {
            if (typeof authenticateAccess == 'function' ){
                authenticateAccess()
            }
            clearProcessErrors();
            if($('#checkout-page-tabs')[0]){
                validateUserDetails(response)
            }else{
                stepMoveToPaymentMethods();
            }
        }, 2000);
        // ("Login successfully...");

        


    });


}






function validateRegistrationForm() {


    clearProcessErrors();

    var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var phoneNumberAntiPattern = /[a-zA-Z]/;
     
    if($('.input-first-name').val() == '') {

        $('.input-first-name').addClass('error-border');

        displayProcessError("Please enter your First Name.");
        return false;
    }

    if($('.input-last-name').val() == '') {
        
        $('.input-last-name').addClass('error-border');
        displayProcessError("Please enter your Last Name.");
        return false;
    }


    if($('.input-mobile').val() == '') {
        
        $('.input-mobile').addClass('error-border');
        displayProcessError("Please enter your phone number.");
        return false;
    }

    if($('.input-mobile').val().match(phoneNumberAntiPattern)) {
        
        $('.input-mobile').addClass('error-border');
        displayProcessError("Your phone number should only contain numbers.");
        return false;
    }



    

    if($('.input-address-one').val() == '') {
        
        $('.input-address-one').addClass('error-border');
        displayProcessError("Please enter your address.");
        return false;
    }

    // if($('.input-address-two').val() == '') {
        

    //     displayProcessError("Please enter your address.");
    //     return false;
    // }

    if($('.input-state').val() == '') {
        
        $('.input-state').addClass('error-border');
        displayProcessError("Please enter your State.");
        return false;
    }



    if($('.input-reg-email').val() == '') {
        
        $('.input-reg-email').addClass('error-border');
        displayProcessError("Please enter your Email.");
        return false;
    }


    if($('.input-reg-confirm-email').val() == '') {
        
        $('.input-reg-confirm-email').addClass('error-border');
        displayProcessError("Pleae enter your Confirm Email.");
        return false;
    }


    
    if(!$('.input-reg-email-register').val().match(emailPattern)) { 

        $('.input-reg-email-register').addClass('error-border');
        displayProcessError("Please enter a valid Email.");
        return false;
    }

    

    if($('.input-reg-confirm-email').val() != $('.input-reg-email-register').val()) {

        $('.input-reg-confirm-email').addClass('error-border');
        $('.input-reg-email-register').addClass('error-border');

        displayProcessError("Email isn't matching with Confirm Email");
        return false;

    }


    if($('.input-reg-password').val() == '') {
        
        $('.input-reg-password').addClass('error-border');
        displayProcessError("Pleae enter a Password");
        return false;
    }


    
    if($('.input-reg-confirm-password').val() == '') {
        
        $('.input-reg-confirm-password').addClass('error-border');
        displayProcessError("Please Confirm your Password.");
        return false;
    }


    if($('.input-reg-confirm-password').val() != $('.input-reg-password').val()) {

             
        $('.input-reg-confirm-password').addClass('error-border');
        $('.input-reg-password').addClass('error-border');
        displayProcessError("Passwords do not match.");
        return false;
        
    }

    let fieldsMsgMap = {
        "#Suburb": "Please enter your suburb",
        "#postcode": "Please enter your postcode",
        "#State": "Please select a state",
        "#Hear-about-us": "Please tell us how did you heard about us?",
    }
    for(id in fieldsMsgMap){
        if($(id).val()?.trim() == '' ){
            displayProcessError(fieldsMsgMap[id])
            $(id).addClass('error-border');
            return false;
        }
    }

    

    // input-reg-email
    // input-reg-confirm-email

    // input-reg-password
    // input-reg-confirm-password





    clearProcessErrors();
    return true;
}

function handleRegistration(e){

    e.preventDefault();

    
    clearProcessErrors();

    if(!validateRegistrationForm()) {

        return false;

    }

    
    showLoader(true);


    var SendData = {

            "FirstName":    $('#FirstName-2').val() ,
    
            "LastName":     $('#LastName-2').val(),
    
            "PhoneNumber":  $('#MobileNo').val(),
    
            "Address":      $('#AddressLine-3').val(),
            
            "Address2":     $('#AddressLine2').val(),
    
            "Suburb":       $('#Suburb').val(),
            
            "Postcode":     $('#postcode').val(),
            
            "State":        $('#State').val(),
            
            "Email":        $('#SignupEmail').val(),
            
            "Password" :    $('#name-3').val(),

            "HearAboutUs" : $('#Hear-about-us').val()

    
    }


    var regFormData = new FormData();

    for (var property in SendData) {

        regFormData.append(property, SendData[property]);


    }

    fetch(`${endpointUrl}/api/1.1/wf/seller_signup`, {

        method: 'POST',

        body: regFormData

    })

    .then(resp => resp.json()) 

    .then(response => {

        showLoader(false);
        if(response.response.success != "true") {

            var errorMessage = response.response.error_message != "" ? response.response.error_message : "There is an error creating your account please try again";

            displayProcessError(errorMessage);
            
            return;


        }


        setUserValues(response);

        setLoginUserInfo(response.response.user_email, response.response.auth_key );        

        displayProcessError("Registration Successful.");


        setTimeout(function() {

            clearProcessErrors();
            if (typeof authenticateAccess == 'function' ){
                authenticateAccess()
            }
            stepMoveToPaymentMethods();

        }, 1500)




    });



        


} 



function handlePaymentMethodContinue() {

    if(!validateCompleteOrder()) {

        return false;
    }


    $('html, body').animate({
        scrollTop: $(".send_device_options").offset().top -100
    }, 500);


}


function handleCompleteOrderProcess() {

    if(!validateCompleteOrder()) {
        // displayProcessErro
        return false;
    }

    clearProcessErrors();
    // show popup
    $('.popup_confirm_order').fadeIn(100);


}


function scrollUIToTop() {

    $('html, body').animate({
        scrollTop: $("#checkout-page-tabs").offset().top -100
    }, 500);

}


// document.getElementById("SignUp").onclick = function() {

//     QuickSignup() ;

// }

// function QuickSignup () {

//     var SendData = {

//         "FirstName":    $('[name="FirstName"]').val() ,

//         "LastName":     $('[name="LastName"]').val(),

//         "PhoneNumber":  $('[name="MobileNo"]').val(),

//         "Address":      $('[name="AddressLine1"]').val(),

//         "Email":        $('[name="SignupEmail"]').val()

//     }

//     var SignForm = [];



//     for (var property in SendData) {

//         var encodedKey = encodeURIComponent(property);

//         var encodedValue = encodeURIComponent(SendData[property]);

//         SignForm.push(encodedKey + "=" + encodedValue);

//     }

//     SignForm = SignForm.join("&");



//     fetch('https://mmbuild.shop/version-test/api/1.1/wf/seller_signup', {

//         method: 'POST',

//         headers: {

//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'

//         },

//         body: SignForm

//     })

//     .then(function (response) {

//         return response.json();

//     })

//     .then(function(data){

       

//         if(data.response.success != "true") {

//             alert('There is some error registering your account. Please try again later.');
//             return;

//         }

//         data.response.Count = JSON.parse(data.response.is_account)

//         data.response.SignupData = JSON.parse(data.response.SignupData)

//         var status = data.response.is_account

//         var signinfo = data.response.SignupData

//         if(status == 2 && signinfo !== null){

//             $("#RegisterSignup div.w-form-done").show(1000);

//             $("##RegisterSignup div#email-form-5").hide(1000);


//         } else {

//             $("#LoginBox div.w-form-fail").show(1000);

//         }


//     })

//     .catch(error => {

//         console.log("There was an error: " + error);

//     });

// }


function disableTopTabsNav() {

    $('.tabs-menu').css('position','relative');
var wrapElem = $("<div class='disable_layer'></div>");
wrapElem.css('position','absolute');
wrapElem.css('top','0px');
wrapElem.css('bottom','0px');
wrapElem.css('left','0px');
wrapElem.css('right','0px');
wrapElem.css('z-index',15);

$('.tabs-menu').prepend(wrapElem)

}


var Webflow = Webflow || [];

Webflow.push(function () {

    $('.search-button').click(e => e.preventDefault());

    // Find and Load Search bar
    // https://mobile-monster.bubbleapps.io/version-hks-dev-v5-ua/api/1.1/wf/devices_json_endpoint

    


    disableTopTabsNav();
    $('.step_tabs').unbind();

    shouldScroll = false;
    $($('.phone_condition_box')[0]).click();


    let quantities = document.querySelectorAll('#Quantity')
    quantities.forEach(el => {
        el.addEventListener('change', (e)=>{
            quantities.forEach(select => {
                select.value = e.target.value
            })
        })
    })

    // wORKS
    $('.to-review-cart').on('click', function () {

        clearProcessErrors();

        // validate device condition

        // Validate IMEI

        // validate criteria policy


        // read imei and setup


        if(getPhoneCondition() == 'As New' && $('.input-criteria-mismatch input:checked').val() == undefined) {
            
            $('.accept_box').addClass('error-border');
            displayProcessError("Please select what to do if your device doesn't meet the criteria.")

            return;

        }

        
        if(getPhoneCondition() == '') {
            $($('.phone_condition_box').slice(0,3)).addClass('error-border');
            displayProcessError("Please select device condition.");
            return;

        }

        
        if(need_imei_number() && $('.input-emei').val() == '' && getPhoneCondition() != 'Dead') {
            $('.input-emei').addClass('error-border');
            displayProcessError("Please Add IMEI for your phone.");
            return;

        }

        // console.log("TEsting");
        if(need_imei_number() && ($('.input-emei').val().length < 10 || $('.input-emei').val().length > 15) && getPhoneCondition() != 'Dead') {

            $('.input-emei').addClass('error-border');
            displayProcessError("IMEI should be 10-15 characters long.");
            return;

        }

        let devices = JSON.parse( window.localStorage.hksSelectedDevices || '[]' )

        
        let device = {
            tableID: getBubbleTableID(),
            price: getSelectedPrice(),
            name: getDeviceName(),
            model: getDeviceModel(),
            productID: getDeviceID(),
            storage: getDeviceStorage(),
            type: getDeviceType(),
            vendor: getDeviceVendor(),
            productID: getDeviceID(),
            IMEI: $('#WokingIMEI').val(),
            quantiity: $('#Quantity').val(),
            condition: getPhoneCondition(),
            thumb: getDeviceThumb(),
            sendBack: $('#SendBack')[0]?.checked,
            
            lockProvider: devices.find(d => d.tableID == getBubbleTableID())?.lockProvider,
            workingFaults: [],
            faultNotes: ""
        }


        if(device.condition == "working") {
            // Add Working faults
            if($('#dynamic_checklisting input:checked').length > 0) {
                var checkedFaults = $('#dynamic_checklisting input:checked');
                var totalFaultPrice = 0;

                // checkedFaults.forEach()
                checkedFaults.each(function(index, value) {
                    var faultLabel = $(value).next().html();
                    var faultPrice = $(value).val();
                    totalFaultPrice = totalFaultPrice + Number(faultPrice);

                    device.workingFaults.push({
                        label: faultLabel,
                        price: faultPrice
                    });

                    if(faultLabel) {

                        device.faultNotes = device.faultNotes + ". " + faultLabel;
                    }
                })

            }
        }
        
        
        device.price = device.price - getWorkingFaultsTotal();

        // recalculate total
        device.total_sum = Number($('#Quantity').val()) * Number(device.price),



        device.condition = device.condition[0]?.toUpperCase() + device.condition.slice(1)


        let flag = false;
        devices = devices.map(d => {
            // if(d?.tableID == device.tableID){
            if(JSON.stringify(d) == JSON.stringify(device)){
                flag = true
                return device
            }else{
                return d
            }
        })

        if(!flag){
            devices.push(device)
        }
        window.localStorage.hksSelectedDevices = JSON.stringify( devices )

        populateSelectedDevices(devices)

        
        showLoader(true);
        stepMoveToReviewCart();

    })



    $('.to-complete-order').on('click' , function() {

        handleCompleteOrderProcess();

    });


    $('.validate_payment').on('click', function() {


        handlePaymentMethodContinue();
    });


    $('.to-login').on('click', function () {

        stepMoveToLoginPage();

        
    });



    $('.to-payment-method').on('click', function () {


        // make sure user is logged in
        if(!isUserLoggedIn()) {
            // trigger error


            return;
        }

        stepMoveToPaymentMethods();

    })


    // Bind Event listeners

    $('.input-cheque-name').change(function(e) {
        
        $('.cheque-name-holder').html(e.target.value);


    })

    $('.input-paypal-address').change(function(e) {
        $('.paypal-email-holder').html(e.target.value);
    })

    $('.input-accont-number').change(function(e) {

        $('.bank-acc-number-holder').html(e.target.value);


    })



    $('.input-bank-name').change(function(e) {

        $('.bank-name-holder').html(e.target.value);


    })


    $('.input-account-name').change(function(e) {

        $('.bank-acc-name-holder').html(e.target.value);


    })



    $('.input-account-bsb').change(function(e) {

        $('.bank-bssb-holder').html(e.target.value);


    })


    $('.input-paypal-address').change(function(e) {

        $('.paypal-email-holder').html(e.target.value);


    })


    $('.payment_optioms').click(function(e) {
        let nextSection = e.target?.closest('.choose_method_sec')?.nextElementSibling
        nextSection?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        nextSection?.animate([{background: '#ffff0030'},{background: 'transparent'}], {
            duration: 1000,
            iterations: 1,
        })
        setTimeout(function() {
            var payment_method = getPaymentMethod();

            $('.payment-method-holder').html(capitalizeFirstLetter(payment_method));
        },800)
       
    });




    $('.delivery_method').click(function() {
        console.log('runing')
        
        let nextSection = $('.shipping-info')[0]
        nextSection?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        nextSection?.animate([{background: '#ffff0030'},{background: 'transparent'}], {
            duration: 1000,
            iterations: 1,
        })

        setTimeout(function() {
            var delivery_method = getDeliveryMethod();

            // console.log(delivery_method);
            $('.delivery-method-holder').html(capitalizeFirstLetter(delivery_method));

        },800)
       

    });
    // 
// payment-method-holder

    


// $('#complete').click(submitPurchaseOrder);

    // On Load END
});


function populateSelectedDevices(devices){

    devices = Array.isArray(devices) ? devices : JSON.parse(window.localStorage.hksSelectedDevices || '[]')

    let titlesHTML = $('.s2-devices-grid.header-titles')[0]?.outerHTML
    let html = ''

    devices.forEach(d => {
        html += `<div class="s2-devices-grid hks-selected-device-row" style="background-color: transparent" data-id=${d?.tableID}>
            <div class="hks-devices-cell thumb"><img src="${d?.thumb}"></div>
            <div class="hks-devices-cell name">${d?.name}</div>
            <div class="hks-devices-cell condition">${d?.condition}</div>
            <div class="hks-devices-cell imei">${d?.IMEI}</div>
            <div class="hks-devices-cell selected-deviceprice">$${d?.price}</div>
            <div class="hks-devices-cell lockProvider">
                <select id="LockedProvider" name="LockedProvider" required="" class="input-quantity w-select hks-device-lock-provider">
                    <option value="No" selected>No</option>
                    <option value="Telstra">Telstra</option>
                    <option value="Optus">Optus</option>
                    <option value="Vodafone">Vodafone</option>
                    <option value="Other" >Other</option>
                </select>
            </div>
            <div class="hks-devices-cell remove">x</div>

        </div>`
    })

    html += `<style>
        .hks-devices-cell{
            font-size: 14px;
            font-weight: normal;
            line-height: 30px;
        }
        .hks-devices-cell img{
            width: 50px;
        }
        .hks-devices-cell.condition{
            text-transform: capitalize;
        }
        .hks-devices-cell.remove{
            width: 20px;
            height: 20px;
            border-radius: 100%;
            background: red;
            color: #fff;
            padding: 2px;
            line-height: 12px;
            text-align: center;
            cursor: pointer;
        }
        .hks-selected-device-row{
            padding: 15px 10px;
            border-bottom: 1px solid #ccc;
            grid-template-columns: 0.9fr 1.2fr 1fr 1fr 0.8fr 1.2fr .1fr;
        }
        #popup-device-list .s2-devices-grid.hks-selected-device-row{
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        #popup-device-list .imei, #popup-device-list #LockedProvider, #popup-device-list .remove{
            display: none;
        }
    </style>`

    $('#selected-devices-list').html(titlesHTML + html)
    

    $('.step2_content select[name="LockedProvider"]').each((index, item) => {
      

            $(item).val(devices[index]?.lockProvider)
      
    })

    $('#popup-device-list').html(html)

    let total = devices.reduce((total, d) => total+d.total_sum, 0 )
    $('#TotalSalesValue').text( total );

    $('.selected-price-holder').text( '$'  + total );

    $('#popup-total-price').text( total )

    $('.hks-device-lock-provider').change(e => {
        let id = e.target?.closest('.hks-selected-device-row')?.getAttribute('data-id')
        let deviceIndex = devices.findIndex(d => d?.tableID == id)
        if(deviceIndex !== -1){
            devices[deviceIndex].lockProvider = e.target.value
        }

        window.localStorage.hksSelectedDevices = JSON.stringify( devices )
    })


    $('.hks-devices-cell.remove').click(e => {
        let id = e.target?.closest('.hks-selected-device-row')?.getAttribute('data-id')
        
        devices = devices.filter(d => d?.tableID != id )
        
        window,localStorage.hksSelectedDevices = JSON.stringify( devices )
        populateSelectedDevices(devices)

        if(devices.length == 0){
            $('.op-step-1').fadeIn(20);
            $('.op-step-2').fadeOut(20);
        }
    })
}





/*        STEPS Functions          */


function stepMoveToPaymentMethods() {
    
    setProgressTab(4);
    $('div#tab_2').hide() ;
    $('div#tab_4').show() ;

}


/* HKS Commented for Checkout Page
function stepMoveToLoginPage() {

    showLoader(true);
    isUserLoggedIn().then(function(response){

        if(response) {
            
            showLoader(false);

            console.log(response);
            
            if("firstName" in response.response && "lastName" in response.response && "mobileNumber" in response.response && "user_email" in response.response && "address" in response.response &&  response.response.address != "Not available" ) {


                    
                var firstName = response.response.firstName
                var lastName = response.response.lastName
                var mobileNumber = response.response.mobileNumber;
                var email = response.response.user_email;
                var address = response.response.address;
            
                $('.user-firstname-holder').html(firstName);
                $('.user-last-name-holder').html(lastName);
                $('.user-email-holder').html(email);
                $('.user-mobile-number-hoder').html(mobileNumber);
                $('.user-address-one-hoder').html(firstName);
                $('.user-full-name-holder').html(firstName + '' + lastName);
                $('.user-full-address').html(address);

                $('div#tab_1').hide() ;
                stepMoveToPaymentMethods();

            } else {


                setProgressTab(3);

                $('div#tab_1').hide() ;
            
                $('div#tab_2').show() ;
                

            }


        } else {
            showLoader(false);
            setProgressTab(3);

            $('div#tab_1').hide() ;
        
            $('div#tab_2').show() ;
        }

    })



}
*/

function stepMoveToLoginPage() {

    showLoader(true);

    if(auth?.currentUser){
        console.log('checking firebase auth')
        auth.currentUser.getIdToken().then(idToken => {
            fetch(endpointUrl+ '/api/1.1/wf/seller_signup_with_google', {
                method:"POST",
                headers: {'content-type':'application/json'},
                body: JSON.stringify({ idToken })
            })
            .then(res => res.json())
            .then(validateUserDetails)
        })
    } else {
        console.log('checking token auth')
        verifyUserAuthToken(true)
        .then(res => {
            validateUserDetails(res)
        })
    }


    scrollUIToTop();
}



function triggerDirectPage() {

    showLoader(true);
    var windowUrl = window.location.href;
    var urlObj = new URL(windowUrl);
    var searchParams = new URLSearchParams(urlObj.search);
    
    if(searchParams.get('cart') && searchParams.get('cart') == "true") {

        loadReviewCart();
        setTimeout(function() {

            loadReviewCart();

        }, 1500)

    }


    showLoader(false);


}

function loadReviewCart() {

    let devices = JSON.parse( window.localStorage.hksSelectedDevices || '[]' )
    window.localStorage.hksSelectedDevices = JSON.stringify( devices )
    populateSelectedDevices(devices)
    
    showLoader(true);
    stepMoveToReviewCart();

}



function stepMoveToReviewCart() {
    showLoader(false);
    setProgressTab(2);
    $('div#tab_3').hide() ;
    $('div#tab_1').show() ;

    $('html, body').animate({
        scrollTop: $("#selected-devices-list").offset().top -100
    }, 500);

}





/*        STEPS Functions END          */


hks_toast = {
    options: {
        close: true, gravity: "top", position: "left", stopOnFocus: true,
        style: { background: "green", fontSize: '20px' },
        onClick: function(){} // Callback after click
    },
    error: function (text='', style={}){
        Toastify({ ...this.options, text, style: { ...this.options.style, ...style, background: 'red' } }).showToast();
    },
    success: function (text='', style={}){
        Toastify({ ...this.options, text, style: { ...this.options.style, ...style, background: 'green' } }).showToast();
    },
    warning: function (text='', style={}){
        Toastify({ ...this.options, text, style: { ...this.options.style, ...style, background: '#ffbf00' } }).showToast();
    },
}

validateUserDetails = res => {
    
    showLoader(false);
    setProgressTab(3);
    $('div#tab_1').hide() ;
    $('div#tab_2').show() ;

    if(res && res?.response?.success?.toLowerCase() == 'true'){
        setLoginUserInfo(res.response.user_email, res.response.auth_key)
        let missingFields = [];
        let section = $('.signup-details')

        let fieldsMap = {
            "#FirstName-2": res.response.firstName || '',
            "#LastName-2": res.response.lastName || '',
            "#MobileNo": res.response.mobileNumber || '',
            "#AddressLine-3": res.response.address || '',
            "#AddressLine2": res.response.address2 || '',
            "#Suburb": res.response.suburb || '',
            "#postcode": res.response.postcode || '',
            "#State": res.response.state || '',
            "#Hear-about-us": res.response.referrer || '',
        }
        for(field in fieldsMap){
            section.find(field).val(fieldsMap[field])
        }

        ["user_email","firstName","lastName","mobileNumber","address","suburb","postcode","state","referrer"].forEach(field => {
            if(!res.response[field]){
                missingFields.push(field)
            }
        })
        if(missingFields.length > 0){
            hks_toast.error("Please fill in the required fields [ "+ missingFields.join(', ') +" ]")

            section.find('div.register').text('Please fill in the required details')
            section.find('.column-7.w-col.w-col-6').hide()
            section.find('.column-6.w-col.w-col-6')
            .addClass('w-col-12 column-12')
            .removeClass('column-6 w-col-6')
            .css({border: 'none'})
            .find('form')
            .css({padding: '0px'})

            section.find('#SignupEmails').hide()
            section.find('#SignupPasswords').hide()
            section.find('.remember-feild.aboutus').hide()
            
            if(!$('#saveMissingData')[0]){
                section.find('#SignUp').hide()
                .after('<input type="button" id="saveMissingData" value="Save & Continue" class="register-button w-button">')
            }
            section.find('#saveMissingData').click(e => saveMissingData(e, res, fieldsMap))
            $('.login_popup').fadeOut()

        }else{
            
            $('.user-firstname-holder').html(res.response.firstName);
            $('.user-last-name-holder').html(res.response.lastName);
            $('.user-email-holder').html(res.response.user_email);
            $('.user-mobile-number-hoder').html(res.response.mobileNumber);
            $('.user-address-one-hoder').html(res.response.firstName);
            $('.user-full-name-holder').html(res.response.firstName + '' + res.response.lastName);
            $('.user-full-address').html(res.response.address);
            $('.login_popup').fadeOut()
            stepMoveToPaymentMethods()
        }
    }else{
        if(res && res?.response?.error){
            hks_toast.error(res.response.error)
        }
        showLoader(false);
        setProgressTab(3);
        $('div#tab_1').hide();
        $('div#tab_2').show()
    }
    //
}

saveMissingData = (e, res, fieldsMap) => {
    e.preventDefault()
    let section = $('.signup-details')

    let missing = '';
    let values = {
        fname: res.response.firstName || '',
        lname: res.response.lastName || '',
        mobile: res.response.mobileNumber || '',
        address: res.response.address || '',
        suburb: res.response.suburb || '',
        postcode: res.response.postcode || '',
        state: res.response.state || '',
        referrer: res.response.referrer || '',
        user_email: res.response.user_email,
        auth: res.response.auth_key,
    }
    delete fieldsMap['#AddressLine2']
    for(field in fieldsMap){
        if( section.find(field).val()?.trim() == '' || !section.find(field)[0]?.checkValidity() ){
            missing = 'Please fill in all the required fields'
        }else{
            values[Object.keys(values)[Object.keys(fieldsMap).indexOf(field)]] = section.find(field).val()?.trim()
        }
    }
    if(missing){
        return hks_toast.warning(missing)
    }
    values.address2 = $('#AddressLine2').val(),
    
    showLoader(true)
    fetch(endpointUrl+'/api/1.1/wf/update_details_from_checkout', {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(res => {
        validateUserDetails(res)
        
    })
}


/*       CHANGE Listeners         */

$('.input-emei').change(function(event) {

    if(event.target) {

        $('.imei-holder').html(event.target.value);


        // temporary
        $('#ImeiNumber').html(event.target.value);

    }   

});

$('.input-quantiity').change(function() {

    console.log("Quanity Update");
    console.log(getSelectedPrice());
    reSyncUpdatePrices();
});






$('.phone_condition_box').click(function(e) {

    var phoneCondition = null;
    
    if($(e.target).hasClass('phone_new')) {

        phoneCondition = 'As New';

    }

    if($(e.target).hasClass('phone_working')) {

        phoneCondition = 'working';

    }


    if($(e.target).hasClass('phone_dead')) {

        phoneCondition = 'Dead';

    }
    // var phoneCondition = getPhoneCondition();

    if(phoneCondition) {

        
        $('.phone-condition-holder').html(capitalizeFirstLetter(phoneCondition));


        // temporary 
        $('#Condition').html(capitalizeFirstLetter(phoneCondition));

    }


    reSyncUpdatePrices();

    
    if(window.innerWidth > 1200 && shouldScroll && e.target.nodeName == "IMG") {
        console.log('scrolling');
        $('html,body').animate({
            scrollTop: $('.phone_heading').offset().top - 100
        },'slow'); 
    }

    shouldScroll = true;



});


function getWorkingFaultsTotal() {


    if(getPhoneCondition() != "working") {
        return 0;
    }  
    
    var totalFaultPrice = 0;

    if($('#dynamic_checklisting input:checked').length > 0) {
        var checkedFaults = $('#dynamic_checklisting input:checked');
      
    
        // checkedFaults.forEach()
        checkedFaults.each(function(index, value) {
            var faultLabel = $(value).next().html();
            var faultPrice = $(value).val();
            totalFaultPrice = totalFaultPrice + Number(faultPrice);
    
        })
    
        // console.log(totalFaultPrice);
    }   


    var workingPrice =  $('#hks-WorkingPrice').text()

    var deadPrice = $('#hks-DeadPrice').text()

    if((Number(workingPrice) - totalFaultPrice) < Number(deadPrice)) {
        return Number(workingPrice) - Number(deadPrice);
    }

    return totalFaultPrice;


}



function reSyncUpdatePrices() {
    
    if(getSelectedPrice()) {
       
        setTimeout(function() {

            var targetPriceContainer = null;

            var newPrice = $('.condition_new').find('h1.amount_text').html();
            var workingPrice = $('.condition_working').find('h1.amount_text').html();
            var deadPrice = $('.condition_dead').find('h1.amount_text').html();


            // if (phoneCondition  == 'As New') {


            //     targetPriceContainer = $('.condition_new .selected-price-holder');
            // }

            // if (phoneCondition  == 'working') {


            //     workingPrince = $('.condition_working .selected-price-holder');
            // }

            // if (phoneCondition  == 'dead') {


            //     targetPriceContainer = $('.condition_dead .selected-price-holder');
            // }

            $('.selected-price-holder').html('$' + ((getSelectedPrice() - getWorkingFaultsTotal()) * getSelectedQuantity()) );

            $('.condition_new .selected-price-holder').html(newPrice);
            $('.condition_working .selected-price-holder').html(workingPrice);
            $('.condition_dead .selected-price-holder').html(deadPrice);


        },500);
        
    } 
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*       CHANGE Listeners  END       */


// to-review-cart
// to-login
// to-payment-method
// to-complete-order


// Get Values in HTML Elements

$(document).ready(function(){
    

  	let MobileIMEI = '' ;

    var NewIMEI = document.getElementById('IMEI') ;

    var WokingIMEI = document.getElementById('WokingIMEI') ;

    var DeadIMEI = document.getElementById('DeadIMEI') ;

  	var FirstName = document.getElementById('FirstName') ;

  	var Mobile = document.getElementById('Mobile') ;

  	var AddressLine1 = document.getElementById('AddressLine1') ;

  	var SellerEmail = document.getElementById('SellerEmail');

    // $("#IMEI").change(function(){

    //     MobileIMEI = IMEI.value ;

    //     document.getElementById("ImeiNumber").innerHTML = NewIMEI.value ;

    // });

    // $("#WokingIMEI").change(function(){

    //     MobileIMEI = WokingIMEI.value ;

    //     document.getElementById("ImeiNumber").innerHTML = WokingIMEI.value ;

    // });

    // $("#DeadIMEI").change(function(){

    //     MobileIMEI = DeadIMEI.value ;

    //     document.getElementById("ImeiNumber").innerHTML = DeadIMEI.value ;

    // });

    $("#FirstName").change(function(){

        document.getElementById("GetName").innerHTML = FirstName.value ;

    });

    $("#Mobile").change(function(){

        document.getElementById("GetMobileNum").innerHTML = Mobile.value ;

    });

    $("#AddressLine1").change(function(){

        document.getElementById("AddressLine").innerHTML = AddressLine1.value ;

    });

    $("#SellerEmail").change(function(){

        document.getElementById("GetEmail").innerHTML = SellerEmail.value ;

    });

    

});

// device-name-holder
// device-storage-holder
// selected-price-holder
    // delivery-method-holder
// payment-method-holder
// cheque-name-holder
// paypal-email-holder
// bank-acc-number-holder
// bank-acc-name-holder
// bank-name-holder
// bank-bssb-holder




// Replace Order on Bubble Mobile Monster APP


// all webhook fields

// Device_BubbleId
// Seller_Firstname
// Seller_Lastname
// Condition
// Device - device title
// IMEI
// TotalSalesPrice
// SenBack
// Seller_Address_line1
// Seller_Address_line2
// Seller_Bank_Account_BSB
// Seller_Bank_Account_Name
// Seller_Bank_Account_Number
// Seller_Bank_Name
// Seller_Cheque_Name
// Paypal_Email
// Seller_Phoneno
// Seller_Email
// PurchaseOrder_DeliveryMethod
// Storage





$('#complete').click(submitPurchaseOrder);

function submitPurchaseOrder (e) {

    e.preventDefault(0);

    if(!validateCheckboxes()) {
        console.log("Please fill in all details")
        showLoader(false)
        return false;
    }


    validateCompleteOrder();



    clearProcessErrors();

    showLoader(true);

    verifyUserAuthToken(true)
    .then(async (response) => {

        if(!response) {
            alert("You must login or register to place an order.");
            return;
        }

        let ip = {};
        try{
            let req = await fetch('https://api.ipify.org/?format=json')
            ip = await req.json()
            ip = ip.ip
        }catch(e){
            console.log(e)
        }

        // console.log(response);
        var firstName = response.response.firstName
        var lastName = response.response.lastName
        var mobileNumber = response.response.mobileNumber;
        var email = response.response.user_email;
        var address = response.response.address;
        var state = response.response.state;

        var paymentMethod = getPaymentMethod();


        var optInForCrm = $('.input-opt-for-exclusive input:checked').val() == "on" ? true : false;

        switch(paymentMethod){
            case 'cheque': paymentMethod = 'Cheque'; break;
            case 'bank': paymentMethod = 'Bank'; break;
            case 'paypal': paymentMethod = 'PayPal'; break;
        }
        var deliveryMethod = getDeliveryMethod();

        var details = {
            'Seller_Firstname': firstName, 
            'Seller_Lastname': lastName,
            'Seller_Phoneno': mobileNumber, 
            'Seller_Email': email,
            "State": state,
            'Delivery_Method' : deliveryMethod,
            'Address': address,
            'UID': response.response.uid,
            'Payment_Method': paymentMethod,
            'ip_address': ip,
            "optForCrm" : optInForCrm
        }


        if(paymentMethod == 'PayPal') {
            details['Paypal_Email'] = $('.input-paypal-address').val();
        }

        if(paymentMethod == 'Cheque') {
            details['Seller_Cheque_Name'] = $('.input-cheque-name').val();
        }

        if(paymentMethod == 'Bank') {
            details['Seller_Bank_Account_BSB'] = $('.input-account-bsb').val();
            details['Seller_Bank_Account_Name'] = $('.input-account-name').val();
            details['Seller_Bank_Account_Number'] = $('.input-accont-number').val();
            details['Seller_Bank_Name'] = $('.input-bank-name').val();
        }

        let devices = []
        try{
            devices = JSON.parse(window.localStorage.hksSelectedDevices || '[]')
        }catch(e){
            alert('There were some issue processing your order. Please clear you browser cache and try again')
            return
        }
        if(devices?.length == 0){
            alert('Please select some devices to sell.')
            return
        }

        details.origin = isDev ? "DEV" : "LIVE";
        details.devices = devices

       

        // device.workingFaults.push({
        //     label: faultLabel,
        //     price: faultPrice
        // });


        console.log(details)

        // fetch('https://hook.us1.make.celonis.com/lbgi4ft3y1vqd7d3wnjj4fgs83va381a', {
        fetch('https://hook.eu1.make.com/ec8sqrys0afdv8en9ur3joton393qpia', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(details)
        })
        .then(res => res.json())
        .then(function(response){
            // console.log(response);



            showLoader(false);
            showSuccess();

            // return

            // Clear selected devices

            window.localStorage.hksSelectedDevices = '[]'
            // window.location.href = window.location.origin + '/thank-you?order_id=MM-TEST-ORDER';
            // window.location.href = window.location.origin + '/my-account-page';
            window.location.href = window.location.origin + '/thank-you?order_id=' +response.purchase_order_id ;

        })
        .catch((error) => {
            alert("Some error occured during your order.");
            console.error('Error:', error)
        });
    }) 
}





// Utility Functons


function setLocalDataValue(key, value) {

    if (typeof(Storage) == "undefined") {
        return false;
    }

    localStorage.setItem(`HKS_MM_${key}`, value);

    return true;
}

function getLocalDataValue(key) {
    
    
    return localStorage.getItem(`HKS_MM_${key}`);


}



function setRegisterError(error) {


}


function handleRegisterSuccess(formEvent) {

    formEvent.preventDefault();

}


function displayProcessError(message) {

      
        $('.error-message').html(message);
        $('.errors-popup').show();



}



function clearProcessErrors() {

    $('.error-border').removeClass('error-border');
    $('.error-message').html('');
    $('.errors-popup').fadeOut(10);



}



function isUserLoggedIn() {

    return verifyUserAuthToken(true);

}


function setProgressTab(tab_number) {


    $('.step_tabs').each(function(index,item) {

        if($(item).hasClass('w--current')) {
            $(item).removeClass('w--current');
            $(item).children().first().hide();
            $(item).children().last().show();
        }

    });
    $($('.step_tabs')[tab_number - 1]).addClass('w--current'); 

    $($('.step_tabs')[tab_number - 1]).children().first().show();
    $($('.step_tabs')[tab_number - 1]).children().last().hide();


}


function getPaymentMethod() {

    var payment_method = null;


    $('.payment_method img:nth-child(2)').each(function(index,item) {

        if($(item).css('display') != 'none') {
            // console.log(item);
            if($(item).hasClass('via_cheque')) {
                payment_method = 'cheque';
            }


            
            if($(item).hasClass('via_paypal')) {
                payment_method =  'paypal';
            }


            
            if($(item).hasClass('via_bank')) {
                payment_method =  'bank';
            }


        }

    })

    
    return payment_method;

}




function getDeliveryMethod() {


    var deliveryMethod = null;


    let item = $('.delivery_method img:nth-child(2):visible')

    if(item.hasClass('shipping_australia_post')) {
        deliveryMethod = 'Send myself';
    }

    if(item.hasClass('shipping_satchel')) {
        deliveryMethod =  'Satchel';
    }

    if(item.hasClass('shipping_drop_off')) {
        deliveryMethod =  'Drop Off';
    }
    
    return deliveryMethod;
}

function criteriaMismatchOption() {


    if($('#AcceptReduceValue:checked').length > 0) {
        return 'reduced';
    } else {
        return 'send_back';
    }


}

function getPhoneCondition() {

    var phoneCondition = null;

    if($('.new_active').css('display') != 'none') {
        phoneCondition = 'As New';
    }

    if($('.working_active').css('display') != 'none') {
        phoneCondition = 'working';
    }

    if($('.dead_selected').css('display') != 'none') {
        phoneCondition = 'Dead';
    }

    return phoneCondition;

}

function getBubbleTableID() {
    return $('#hks-BubbleTableId').length > 0 ? $('#hks-BubbleTableId').html() : '343hd737dh3';
}


function getSelectedQuantity() {
    var quantity = $('.input-quantiity:visible').val();


    return parseInt(quantity);
}

function getSelectedPrice() {

    var selectedPrice = 0;
    
    switch(getPhoneCondition()){
        case 'As New':
            selectedPrice = $('#hks-NewPrice').text()
            break;
        case 'working': 
            selectedPrice =  $('#hks-WorkingPrice').text()
            break;
        case 'Dead': 
            selectedPrice = $('#hks-DeadPrice').text()
            break;
        default: 
            selectedPrice = $('#hks-DeadPrice').text() 
    }

    return parseInt(selectedPrice);
}

function getDeviceName() {
    return $('#hks-DeviceName').text()
}

function getDeviceModel() {
    return $('#hks-DeviceModel').text()
}

function getDeviceID() {
    return $('#hks-ProductID').text()
}

function getDeviceStorage() {
    return $('#hks-Storage').text()
}

function getDeviceType() {
    return $('#hks-Type').text()
}

function getDeviceVendor() {
    return $('#hks-Vendor').text()
}

function getDeviceThumb() {
    return $('#hks-DeviceThumb img')[0].src
}



function validateCheckboxes() {

    clearProcessErrors();


    if($('.input-term-and-conditions input:checked').val() == undefined) {

        displayProcessError("Please accept Terms and conditions first.");
        return false;   

    }

    if($('.input-yes-details-correct input:checked').val() == undefined) {

        displayProcessError("Please confirm if the details are correct.");
        return false;   

    }

    

   return true;

}


function setUserValues(response) {
    
    if(!response) {
        return false;
    }
                    
    var firstName = response.response.firstName
    var lastName = response.response.lastName
    var mobileNumber = response.response.mobileNumber;
    var email = response.response.user_email;
    var address = response.response.address;

    $('.user-firstname-holder').html(firstName);
    $('.user-last-name-holder').html(lastName);
    $('.user-email-holder').html(email);
    $('.user-mobile-number-hoder').html(mobileNumber);
    $('.user-address-one-hoder').html(firstName);
    $('.user-full-name-holder').html(firstName + '' + lastName);
    $('.user-full-address').html(address);

}


function showLoader(show) {

    if(show) {
        $('.loader').fadeIn(10);


    } else {
        $('.loader').fadeOut(10);
    }

}


function showSuccess() {


    $('.success_popup').fadeIn(10);

}



// functionality for conditional IMEI 

function need_imei_number() {


    var conditon_mapping = {
        "default": true,
        "5G" : true,
        "4G" : true,
        "WIFI + Cellular" : true,
        "WIFI" : true,
        "GPS + Cellular" : true

    };
    if(window.location.pathname.startsWith('/sell-your-watches/')){
        return false
    }

    var connectivity = $('.connectivity-holder').html();

    if(connectivity == "") {
        return true;
    }
    
    if(conditon_mapping[connectivity]) {
        return conditon_mapping[connectivity];
    } else {
        conditon_mapping["default"];
    }


}
