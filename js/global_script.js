var Webflow = Webflow || [];
console. log("%cHooray", 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;');
      
Webflow.push(function() {



    showConditionalNavButtons();


    
    var endpointUrl = 'https://api.mobilemonster.com.au/request/';
    // if(new URLSearchParams(window.location.search).get('hks_dev') == 'true'){
    //     endpointUrl = 'https://mobile-monster.bubbleapps.io/version-test'
    // }
    
    let hks_available_devices = []

    // Get search box OPtions data from bubble
    if($('.search_box_wrap').length > 0) {
        $('.search_suggestions').html('');

        fetch(`${endpointUrl}devices_json_endpoint`)
        .then(res => res.json())
        .then(results => {

            // console.log(results)
            /* let devices = Array.isArray(results) ? results : []
            let titles = []

            devices.forEach(device => {
                if(!titles.includes(device.display_name)){
                    titles.push(device.display_name)
                    hks_available_devices.push(device)
                }
            }) */
            hks_available_devices = Array.isArray(results) ? results : []


            $('.search_box_wrap .search_suggestions').html(makeOptionsListHTML(hks_available_devices))
            return

        })
        .catch(e => {
            console.log(e)
        })
    }

    let makeOptionsListHTML = (list = []) => {
        // console.log(list)
        let items = list.map((item, index) => {
            let url  = '';
            let parts = (item.webflow_slug?.split('-000-')||[]);
            switch(item.device_type){
                // case 'Tablet': url = '/sell-your-tablets/'+item.webflow_slug; break;
                // case 'Smart Watch': url = '/sell-your-watches/'+item.webflow_slug; break;
                case 'Laptop': url = `/sell-your-laptop/${parts[0]}/laptops/${parts[1]}/${parts[2]}`; break;
                case 'Tablet': url = `/sell-your-tablet/${parts[0]}/tablets/${parts[1]}/${parts[2]}`; break;
                case 'Smart Watch': url = `/sell-your-watch/${parts[0]}/watches/${parts[1]}/${parts[2]}`; break;
                default: url = `/sell-your-phone/${parts[0]}/mobiles/${parts[1]}/${parts[2]}`; break;
            }
            return `<div role="listitem" class="collection-item-12 search-item w-dyn-item search-option ${index==0 ? 'active':''}"><a href="${url}" class="link-23">${item.display_name}</a></div>`
        })
        
        if(!Array.isArray(hks_available_devices)){
            return `<div role="listitem" class="collection-item-12 search-item w-dyn-item search-option"><a href="#" class="link-23">Loading data...</a></div>`
        }
        if(list.length == 0){
            return `<div role="listitem" class="collection-item-12 search-item w-dyn-item search-option"><a href="#" class="link-23">No device found</a></div>`
        }

        return items.join('\n')
    }

    // if(new URLSearchParams(window.location.search).get('hks_dev') == 'true'){

        // console.log('return form the main function')
    // }

    let container = $('.search_box_wrap .search_suggestions')
    $('#mm_input_search')
    .on('keydown', e => {
        // console.log(e)
        if(e.key == 'Enter'){
            e.preventDefault()
        }

        let option = $('div[role="listitem"].active')
        switch(e.key){
            case 'ArrowDown':
                if(option.next()[0]){
                    option.removeClass('active').next().addClass('active');
                    e.target.value = option.next().text()
                }
                break;
                case 'ArrowUp': 
                if(option.prev()[0]){
                    option.removeClass('active').prev().addClass('active');
                    e.target.value = option.prev().text()
                }
            break;
            case 'Enter':
                $('div[role="listitem"].active a')[0]?.click()
            break;
        }
        let el = $('div[role="listitem"].active')[0]
        el?.parentElement.scrollTo(0, el?.offsetTop-50)

    })
    .on('focus', e => {
        if(!e.target.value?.trim()){
            container.html( makeOptionsListHTML(hks_available_devices || []) ).show()
        }else{
            container.show()
        }
    })
    .on('input', e => {
        // console.log(e)
        container.show()

        let search = e.target.value.replaceAll(' ', '')?.toLowerCase()
        let regex = new RegExp(search, 'gi')
        let matches = (hks_available_devices || [])?.filter(item => {
            let name = item?.display_name?.replaceAll(' ', '')?.toLowerCase()
            let matched =  regex.test(name)
            if(matched || name?.includes(search)){
                return true
            }
        })
        matches = matches.filter(item => item?.display_name)
        container.html( makeOptionsListHTML(matches) )
    })
    .on('blur', e => {
        setTimeout(() => {
            $('.search_box_wrap .search_suggestions').hide()
        }, 300)
    })


    //handle button click

    $('.search-bar-wrap .inner_btn_search button,.search-bar-wrap .search_button_wrap button')
    .on('click', (e) => {
        // console.log($('div[role="listitem"].active a')[0])
        if($('#mm_input_search').val()?.trim()){
            $('div[role="listitem"].active a')[0]?.click()
        }
    });



    if($('#join-club-form').length > 0){

        $('#join-club-form').submit(function(e) {

            e.preventDefault();

        });

        $('#join-club-form #join-club-submit').click(function(e){
    
           
            handleJoinClubNewsletterForm();
    
    
        });

    } 



});
        


function showConditionalNavButtons() {

    var devices = JSON.parse( window.localStorage.hksSelectedDevices || '[]' )

    if(devices.length > 0) {
        let localDevices = JSON.parse(window.localStorage.hksSelectedDevices);
        let url = null;
        if(localDevices[localDevices.length - 1].url){
            try{
                url = new URL(localDevices[localDevices.length - 1].url);
                url = url.origin + url.pathname + '?step=2';
            }catch(e){
                console.log(e)
                url = null;
            }
        }else{
            url = null;
        }

        $('#check-page-link').show().append($(`<span class="item-count">${devices.length}</span>`));
        if(url != null){
            $('#check-page-link').attr('href', url);
        }


    }

}


function handleJoinClubNewsletterForm() {

    var formContainer = $('#join-club-form');

    var inputName = $('#join-club-form input#name');

    var inputEmail = $('#join-club-form input#email');


    if(inputName.val() == '' || inputEmail.val() == '') {

        // Aler the user that the information should be filled
        showMessagePopup("Name or email cannot be empty","error");
        // alert("Name or email cant be empty.")
        return false;
    }


    var integromatHookUrl = "https://hook.eu1.make.com/wwo6xo0te5d2m9knwtirnrxgk19xtir5";

    // var submissionData = {
    //     name: inputName.val(),
    //     email:inputEmail.val()
    // };


        
    var submissionData = {
        
        name: inputName.val(),
        email: inputEmail.val(),
    }

    fetch(integromatHookUrl, {

        method:"POST",
        body: JSON.stringify(submissionData),
        headers:{
            "Content-Type": "application/json",

        }

    })

    .then(res => res.json())
    .then(response => {

        console.log(response);

        if(response.success) {
            showMessagePopup("Thanks for the subscription, you are subscribed successfully to the club!","success");
        }
    })

}




function showMessagePopup(message,type = "notification", duration = 2000) {


    hideMessagePopup();

    $('body').prepend($(`<div class="popup-overlay"></div>`));
    
    $('.popup-overlay').click(function(){

        hideMessagePopup();

    });


    var activeClasses = $('#message-popup').attr('class');

    console.log(activeClasses);

    $('#message-popup').attr('default-classes', activeClasses).addClass(type).addClass('active').css('display', 'flex').css('transform', 'translate(-50%,-50%)').html($(`<span>${message}</span>`));


    setTimeout(function() {

        hideMessagePopup()

    }, duration);

}

function hideMessagePopup() {

    $('.popup-overlay').remove();
    var defaultClass = $('#message-popup').attr('default-classes');

    $('#message-popup').attr('class',defaultClass).css('display', 'none').html('');

}
