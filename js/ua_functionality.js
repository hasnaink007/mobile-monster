

// var isDev = new URLSearchParams(window.location.search).get('hks_dev') == 'true';


var endpointUrl = 'https://api.mobilemonster.com.au/request/';

/* if(!isDev) {
    endpointUrl = 'https://mobile-monster.bubbleapps.io/version-live';
} */


// var endpointUrl = 'https://portal.mobilemonster.com.au/version-test';


var Webflow = Webflow || [];

Webflow.push(function () {

    
    if($('body').hasClass('page-edit-details')) {
        init_edit_details_page();
    }


    if($('body').hasClass('page-account-dashboard')) {
        init_my_account_page();
    }   


    if($('body').hasClass('page-login')) {
        init_login_page();
    }   

    $('.popup_cancel_order .confirm_button').click(function() {
        bindCancelOrderHandler();
    });


});


function redirect(loggedIn = false){
    let pathName = window.location.pathname;
    if(loggedIn){
        if( pathName.startsWith("/login") || pathName.startsWith("/register") ){
            window.location.href = window.location.origin + "/my-account-page"
        }
    }else{
        if( pathName.startsWith("/edit-details-page") || pathName.startsWith("/my-account-page") || pathName.startsWith("/thank-you") ){
            if(typeof clearAuthData == 'function')[
                clearAuthData()
            ]
            window.location.href = window.location.origin + "/login"
        }
    }
}

function authenticateAccess() {

    console.log('checking authenticity')

    /* if(window.auth?.currentUser){
        auth.currentUser.getIdToken().then(idToken => {
            fetch(endpointUrl+ 'seller_signup_with_google', {
                method:"POST",
                headers: {'content-type':'application/json'},
                body: JSON.stringify({ idToken, origin: window.location.host })
            })
            .then(res => res.json())
            .then(res => {
                if(res?.response?.success?.toLowerCase() == 'true'){
                    setLoginUserInfo(res.response.user_email, res.response.auth_key);
                }
                redirect( (res && res?.response?.success?.toLowerCase() == 'true') )
            })
            .catch(e => {
                console.log(e)
            })
        })
    }else{

        verifyUserAuthToken(true)
        .then(res => {
            if(res?.response?.success?.toLowerCase() == 'true'){
                setLoginUserInfo(res.response.user_email, res.response.auth_key);
            }
            redirect( (res && res?.response?.success?.toLowerCase() == 'true') )
        })
        .catch(e => {
            redirect( false )
            console.log(e)
        })
    } */

    verifyUserAuthToken(true)
    .then(res => {
        if(res?.response?.success?.toLowerCase() == 'true'){
            setLoginUserInfo(res.response.user_email, res.response.auth_key);
        }
        redirect( (res && res?.response?.success?.toLowerCase() == 'true') )
    })
    .catch(e => {
        redirect( false )
        console.log(e)
    })
}
authenticateAccess()








// $('.loader').fadeIn()
//  Track user login status , Update UI element upon changes on login state
/* window.auth?.onAuthStateChanged(async (user) => {
    if(auth?.currentUser){
        if(!$('#checkout-page-tabs')[0]){
            authenticateAccess()
        }
    }
}) */


/* $('#signin_with_google').on('click', () => {
    
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    firebase.auth()
    .getRedirectResult()
    .then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    });
}) */












function init_login_page() {

    /* if(!window.has_firebase_checked){
        setTimeout(init_login_page,1500)
        console.log('retrying in 1.5 seconds')
    }
    window.has_firebase_checked = false
    handleLoggedInUser(); */
    // authenticateAccess()

    $('.user-login-btn').click(function(e) {

        showLoader(true);
        e.preventDefault();


        var user_name = $('.input-login-email').val();
        var password = $('.input-login-password').val();

            
        var loginFormData = new FormData();

        loginFormData.append("email", user_name);
        loginFormData.append("password", password);
        loginFormData.append("origin", window.location.host);
        loginFormData.append('href', window.location.href);
        

        fetch(`${endpointUrl}authenticate_login`, {
            body: loginFormData,
            method: "POST"   

        })

        .then((res) => res.json() )

        .then(function (data) {
            showLoader(false);
            // console.log(data);

            if(data.response.success == "true") {

              
                setLoginUserInfo(data.response.user_email, data.response.auth_key);
                setTimeout(() => {

                    window.location.href = '/my-account-page';
                }, 2000);
                
                
            } else {
                displayProcessError( (data.response.error || "Wrong email or password") );
            }
            

        })

        .catch(error => {

            console.log("There was an error: " + error);

        });

        })


}


function bindLogoutButton() {


    $('.logout.w-button').click(function() {
        // window.auth?.signOut()
        clearAuthData();
        window.location.href = "/";
    
    });

}



function addOrderRow(newNode ,orderData) {
    
    // console.log("push caled", newNode, orderData);
    // device_id: item[`PO Devices Bubble ID`],
    // order_id: item._id,
    // order_number: item[`Purchase Order ID`],
    // created_date: item[`Created Date`],
    // recieve_holder: 'N/A',
    // complete_date: "N/A",
    // order_status: item[`Status`] ,
    // price: '$' + item[`Initial Offer`],
    // order_status: item[`User Journey Status`],
  
  
    newNode.attr('order-id', orderData.order_id);
    newNode.find('.order-number-holder').html(orderData.order_number);
    newNode.find('.order-date-holder').html(orderData.created_date);
    // newNode.find('.order-status-holder').html(orderData.user_status);
    // newNode.find('.order-recive-holder').html(orderData.recieve_holder);
    // newNode.find('.order-complete-date-holder').html(orderData.complete_date);
    
    
    newNode.find('.selected-price-holder').html(orderData.price ? orderData.price : 0);
    // newNode.find('.order-status-holder').html(orderData.user_status);
    
    newNode.find('.order-recive-holder').html(orderData.total_devices);
    newNode.find('.order-status-holder').html(orderData.delivery_method);
    newNode.find('.order-complete-date-holder').html(orderData.total_price);


    if("device_title" in orderData) {
        // 1667993622998x918791403032838500 
        // ordersReadyArray[index].device_title = deviceInfo["Device Title"]);
        // ordersReadyArray[index].device_imei = deviceInfo.IMEI

        var titleSplit = orderData.device_title.split("|");
        var vendorName = titleSplit.length > 0 ? titleSplit[0] : '';
        newNode.find('.model-holder').html(vendorName);                
        newNode.find('.device-name-holder').html(orderData.device_title);    
        newNode.find('.imei-holder').html(orderData.device_imei||' ');

    }

    if(orderData.user_status == 'Completed' || orderData.user_status == 'Cancelled') {
        // console.log("removing",   newNode.find('.order_cancel-button'));
        newNode.find('.order_cancel-button').css('display','none');
        // cancelledOrders.push(item._id);
    }

    
    $('.orders_table:visible').append(newNode);
   

} 


function bindMobileOrdersCollapse() {

    

    if($('.mobile_order_table_wrap.orders_table .order_header').length > 0) {

        $('.mobile_order_table_wrap.orders_table .order_header').click(function(e) {

            console.log(this);
            $(this).next().slideToggle(200);
            
        })
        
    }


}

function init_my_account_page() {

    bindLogoutButton();


    showLoader(true);   

    

    verifyUserAuthToken(true).then(function(res) {

        if(!res) {
            handleLoggedOutUser();
            return;
        }

        if(!("response" in res) || !("success" in res.response)) {
            handleLoggedOutUser();
            return;
        }

        if(res.response.success != "true") {
            handleLoggedOutUser();
            return;
        }


        var ordersData = getAuthTokensData(); 


        fetch(`${endpointUrl}get_orders_by_user`,
            {
                method:"POST",
                body: ordersData
            }
        )
        .then(apiRespRaw => apiRespRaw.json())
        .then(apiResp => {

            if(!apiResp) {
                return ;
            }

            if(!("response" in apiResp)) {
                handleLoggedOutUser();
                // alert("Error")
                return ;
            }

            if(!("data" in apiResp.response)) {

                handleLoggedOutUser();
                // alert("Error")
                return ;

            }


            var ordersData = apiResp.response.data

            // console.log(ordersData);
            // $('.order_details > div').each((index,item ) => {$(item).css('display','none')});
            


            var orderDetailsWrapper = $('<div></div>');
            var orderNode = $($('.order_details:visible').html());
            
            ordersReadyArray = [];


            $('.order_details:visible').remove();

            ordersData.forEach((item,index) => {

                var orderElement = $('<div class="order-row"></div>').append(orderNode.clone());

                deviceId = "PO Devices Bubble ID" in item && item[`PO Devices Bubble ID`].length > 0 ? item[`PO Devices Bubble ID`][0] : false;
                // console.log(item);

                ordersReadyArray[index] = {

                    device_id: item?.[`PO Devices Bubble ID`]?.length > 0 ? item?.[`PO Devices Bubble ID`]?.[0] : '',
                    order_id: item._id,
                    order_number: item[`Purchase Order ID`],
                    created_date: new Date(item[`Created Date`]).toDateString(),
                    recieve_holder: 'N/A',
                    complete_date: "N/A",
                    order_status: item[`Status`] ,
                    price: '$' + ("Initial Offer" in item ? item[`Initial Offer`] : '0'),
                    user_status: item[`User Journey Status`],
                    delivery_method: item[`Delivery Method`],
                    total_devices: item['PO Devices']?.length||0,
                    total_price: (item['Initial Offer']||[]).reduce((i,n) => i+n, 0)

                };


                if(deviceId) {

                    get_device_information(deviceId)
                    .then(deviceData => {

                        if("Device Title" in deviceData.response.device) {

                            var deviceInfo = deviceData.response.device;


                            ordersReadyArray[index].device_title = deviceInfo["Device Title"];
                            ordersReadyArray[index].device_imei = deviceInfo.IMEI
                            
                        }

                        addOrderRow(orderElement, ordersReadyArray[index])

                    })
                    .catch((rejected) => {

                        addOrderRow(orderElement, ordersReadyArray[index])

                    })
                }




            })

            setTimeout(function() {
                
                bindCancelOrderButton();

                bindMobileOrdersCollapse();
            }, 2000)

            showLoader(false);

        })


    });



}


function get_device_information(device_id) {

    return new Promise((res,rej) => {


        var requestData = getAuthTokensData();

        requestData.append('device_id', device_id);
        requestData.append('origin', window.location.host);
    
        fetch(`${endpointUrl}get_device_by_id`,
            {
                method:"POST",
                body: requestData
            }
        )
        .then(res => res.json())
        .then(deviceResponse => {
    
           res(deviceResponse);
    
        });


    })

  


}


function setParamsAndShowPopup(orderId) {

    $('.popup_cancel_order').attr('order-id', orderId);

    $('.popup_cancel_order').fadeIn(100);

}



function hidePopup(popupClass) {

    $(popupClass).fadeOut(100);

}


function bindCancelOrderHandler() {

    hidePopup('.popup_cancel_order');
    showLoader(true);

    var order_id = $('.popup_cancel_order').attr('order-id');

    if(order_id == '' || !order_id) {
        showLoader(false);
        return;
    }

    var requestData = getAuthTokensData();
    var cancelReason = $('[data-name="Cancel_order_form"] select').val() != '' ? $('[data-name="Cancel_order_form"] select').val()  : "none";

    var auth_key = getLocalDataValue('auth_key');
    var user_email = getLocalDataValue('user_email');
    
    requestData.append('order_id', order_id);
    requestData.append('cancel_reason', cancelReason);
    requestData.append('user_email', user_email);
    requestData.append("auth_token", auth_key);
    requestData.append("origin", window.location.host);

    fetch(`https://hook.eu1.make.com/t27plodxwj81thw9ut4mbrndq3rsttme`,
        {
            method: "POST",
            body: requestData
        }
    )
    .then(res => res.json())
    .then(cancelResponse => {
        console.log(cancelResponse);
        console.log("Full response:", cancelResponse);
        console.log("Body value:", cancelResponse[0]?.body);
        console.log("Body type:", typeof cancelResponse[0]?.body);
        
        showLoader(false);
        
        if (cancelResponse === false || cancelResponse === 'false') {
          alert("Cancellation failed! Order already processed/cancelled.");
        } else {
          alert("Order cancelled.");
          setTimeout(() => window.location.reload(), 1500);
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
        showLoader(false);
    });
}

// bindCancelOrderHandler
function bindCancelOrderButton() {

    $(".order_cancel-button").click(function(e) {

        e.preventDefault();


        showLoader(true);

        var elem = $(e.target);

        var order_id = elem.parents().closest('[order-id]').attr('order-id');

        if(!order_id) {
            return ;
        }

        setParamsAndShowPopup(order_id);
        showLoader(false);

        


    })



}


function init_edit_details_page() {

    loadUserData();
    loadFormListener();
    
}

async function validateAustraliaAddress(opts) {
    const { suburb, postcode, state, messageEl, submitBtn } = opts;

    if (!suburb || !postcode || !state) {
        messageEl.text('').hide();
        submitBtn.prop('disabled', true);
        return false;
    }
    
    submitBtn.prop('disabled', true);
    messageEl.css('color', '#444').text('Validating address...').fadeIn(150);

    try {
        const response = await fetch('https://portal.mobilemonster.com.au/version-live/api/1.1/wf/validate_australia_suburb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ suburb, postcode, state })
        });

        const result = await response.json();
        const isValid = result.found === true;

        if (isValid) {
            messageEl.css('display', 'none');
            submitBtn.prop('disabled', false);
        } else {
            messageEl.css('color', '#d00').text('We can\'t validate your address, please recheck your Suburb, Postcode and State combination.').fadeIn(150);
            submitBtn.prop('disabled', true);
        }

        return isValid;
    } catch (err) {
        return false;
    }
}


function loadFormListener() {
    $('#email-form-5').submit(function(e) { e.preventDefault(); });

    const submitBtn = $('#email-form-5 input[type="submit"]');
    const suburbInput = $('.input-suburb');
    const postcodeInput = $('.input-postcode');
    const stateInput = $('.input-state');

    let messageEl = $('#address-error');
    if (!messageEl.length) {
        messageEl = $('<div id="address-error" style="color:#d00;margin-top:8px;font-size:14px;display:none;"></div>');
        submitBtn.before(messageEl);
    }

    const originHost = window.location.host;
    const isAU = originHost.includes('.com.au');
    let debounceTimer;
    let isAddressValid = !isAU; 

    // Debounce wrapper
    function debounceValidateAddress() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            isAddressValid = await validateAustraliaAddress({
                suburb: suburbInput.val()?.trim(),
                postcode: postcodeInput.val()?.trim(),
                state: stateInput.val()?.trim(),
                messageEl,
                submitBtn
            });
        }, 800);
    }

    if (isAU) {
        suburbInput.on('input', debounceValidateAddress);
        postcodeInput.on('input', debounceValidateAddress);
        stateInput.on('input', debounceValidateAddress);
    }

    // Main Submit Logic
    submitBtn.on('click', async e => {
        e.preventDefault();
        messageEl.text('').hide();

        const auth_key = getLocalDataValue('auth_key');
        const user_email = getLocalDataValue('user_email');
        if (!user_email || !auth_key) return;

        const password = $('.input-reg-password').val();
        const confirmPassword = $('.input-reg-confirm-password').val();
        if (password.length > 0 && password.length < 6) {
            displayProcessError("Validation error: Password should be at least 6 characters.");
            return;
        }
        if (password && confirmPassword && password !== confirmPassword) {
            displayProcessError("Error: Passwords do not match");
            return;
        }

        const data = new FormData();
        data.append('type', 'update_data');
        data.append('first_name', $('.input-first-name').val());
        data.append('last_name', $('.input-last-name').val());
        data.append('phone', $('.input-mobile').val());
        data.append('address1', $('.input-address-one').val());
        data.append('address2', $('.input-address-two').val());
        data.append('suburb', suburbInput.val());
        data.append('postcode', postcodeInput.val());
        data.append('state', stateInput.val());
        data.append('city', $('#city[name="city"]').val());
        data.append('house', $('#house[data-name="house"]').val());
        data.append('user_email', user_email);
        data.append("auth_token", auth_key);
        data.append("origin", window.location.host);
        if (password) data.append('password', password);

        submitBtn.prop('disabled', true).val('Updating...');

        try {
            const res = await fetch(`${endpointUrl}user_details_data`, { method: "POST", body: data });
            const response = await res.json();
            console.log(response);

            $('.success_popup .success_msg').text('Profile updated.');
            $('.success_popup').fadeIn(10);
            $('.input-reg-password, .input-reg-confirm-password').val("");
            setTimeout(() => { $('.success_popup').fadeOut(10); }, 3000);
        } catch (err) {
            console.error('Update failed:', err);
            messageEl.css('color', '#d00').text('Something went wrong. Please try again.').fadeIn(150);
        } finally {
            submitBtn.prop('disabled', false).val('Update Details');
        }
    });
}


function loadUserData() {

    showLoader(true);
    verifyUserAuthToken(true).then(async function(res) {
        showLoader(false);

        if(!res) {
            // alert("Unauhtorized USer");
            handleLoggedOutUser();
            return;
        }

        if(!("response" in res) || !("success" in res.response)) {

            // alert("Unauthorized");   
            handleLoggedOutUser();
            return;
        }

        if(res.response.success != "true") {
            // alert("Unauthorized");
            handleLoggedOutUser();
            return;
        }

        var userData = res.response;

        var firstName = ("firstName" in userData) ? userData.firstName : '';
        var lastName = ("lastName" in userData) ? userData.lastName : '';
        var mobileNumber = ("mobileNumber" in userData) ? userData.mobileNumber : '';
        var user_email = ("user_email" in userData) ? userData.user_email : '';
        var address = ("address" in userData) ? userData.address : ''
        var city = ("city" in userData) ? userData.city : ''
        var house = ("house" in userData) ? userData.house : ''
        var addressValid = userData?.addressValid

        // console.log(userData);

        var fieldValues = {

            "input-reg-email" : {
                value: user_email
            },

            "input-first-name": {
                value: firstName
            }, 
            "input-last-name" : {
                value: lastName
            },
            "input-mobile": {
                value: mobileNumber
            },
            "input-address-one": {
                value: address
                
            },
            "input-address-two" : {
                value: userData.address2,
            },

            "input-suburb" : {
                value: userData.suburb,
            },
            "input-postcode" : {
                value: userData.postcode,
            },
            "input-state" : {
                value: userData.state,
            },
            "input-reg-email-edit-page": {
                value: userData.user_email,
            },
            "input-reg-password" : {
            },
            "input-reg-confirm-password": {
            },
            "input-house-name-number" : {
                value: house,
            },
            "input-town-city" : {
                value: city,
            },

        }


        for(val in fieldValues) {

            item = fieldValues[val];

            if("value" in item ){
                
                $(`.${val}`).val(item.value);

            }

        }
        $('.input-reg-email-edit-page')[0].disabled = true;

        
        const originHost = window.location.host;
        const isAU = originHost.includes('.com.au');

        if(isAU){
            const submitBtn = $('#email-form-5 input[type="submit"]');
            let messageEl = $('#address-error');
            if (!messageEl.length) {
                messageEl = $('<div id="address-error" style="color:#d00;margin-top:8px;font-size:14px;display:none;"></div>');
                submitBtn.before(messageEl);
            }
            const isAddressValid = await validateAustraliaAddress({
                suburb: userData.suburb,
                postcode: userData.postcode,
                state: userData.state,
                messageEl,
                submitBtn
            });

            // if(isAddressValid && !addressValid){
            //      messageEl.css('color', '#FFA500').text('Please confirm your address by clicking "Update details".').fadeIn(150);
            // }
        }
    });

}





function getAuthTokensData() {

    var auth_key = getLocalDataValue('auth_key');
    var user_email = getLocalDataValue('user_email');

    var formData = new FormData();

    if(!auth_key || !user_email) {
        return formData
    }


    formData.append("user_email", user_email);
    formData.append("auth_key", auth_key);
    formData.append("origin", window.location.host);
    formData.append('href', window.location.href);
    
    return formData
}
