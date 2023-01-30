

var isDev = new URLSearchParams(window.location.search).get('hks_dev') == 'true';


var endpointUrl = 'https://mmbuild.shop/version-test';

if(!isDev) {
    endpointUrl = 'https://mmbuild.shop';
}

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

function clearAuthData() {

    localStorage.removeItem(`HKS_MM_auth_key`);
    localStorage.removeItem(`HKS_MM_user_email`);

    return true;
}


function setLoginUserInfo(email, auth_key) {

    setLocalDataValue('user_email', email);
    setLocalDataValue('auth_key', auth_key);
    

}

function verifyUserAuthToken(returnData = false) {

    return new Promise((res, rej) => {

            
        var auth_key = getLocalDataValue('auth_key');
        var user_email = getLocalDataValue('user_email');

        if(!auth_key || !user_email) {
            res(false);
            return;
        }

        var formDataToVerify = new FormData();

        formDataToVerify.append('auth_key', auth_key);
        formDataToVerify.append('user_email', user_email);

        fetch(`${endpointUrl}/api/1.1/wf/verify_auth_token`, {
            method:"POST",
            body: formDataToVerify
        })
        .then(resp => resp.json())
        .then(response => {


            if(response.response.success == "true") {

                if(returnData) {

                    res(response);
                }  else {
                    res(true);
                }
                return;
            } else {

                res(false);
                return;
            }

            
        })

    })


    // return true | false

}





function showLoader(show) {

    if(show) {
        $('.loader').fadeIn(10);


    } else {
        $('.loader').fadeOut(10);
    }

}

function handleLoggedOutUser() {

    // alert("You are not logged in");
    displayProcessError("You are not logged in.");

    window.location.href = "/login";

    return ;

}


function handleLoggedInUser() {
    
    verifyUserAuthToken(true).then(function(res) {


        if(!res) {
            // handleLoggedOutUser();
            return;
        }

        if(!("response" in res) || !("success" in res.response)) {
            // handleLoggedOutUser();
            return;
        }

        if(res.response.success != "true") {
            // handleLoggedOutUser();
            return;
        }

        window.location.href = "/my-account-page";
        // handleLoggedInUser();


    });
    

}