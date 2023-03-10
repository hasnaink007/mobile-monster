var Webflow = Webflow || [];
      
Webflow.push(function() {

        
    var endpointUrl = 'https://mmbuild.shop';
    if(new URLSearchParams(window.location.search).get('hks_dev') == 'true'){
        endpointUrl = 'https://mmbuild.shop/version-test'
    }
    
    let hks_available_devices = []

    // Get search box OPtions data from bubble
    if($('.search_box_wrap').length > 0) {
        $('.search_suggestions').html('');

        fetch(`${endpointUrl}/api/1.1/wf/devices_json_endpoint`)
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
            switch(item.device_type){
                case 'Tablet': url = '/sell-your-tablets/'+item.webflow_slug; break;
                case 'Smart Watch': url = '/sell-your-watches/'+item.webflow_slug; break;
                default: url = '/sell-your-phone/'+item.webflow_slug; break;
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

        let regex = new RegExp(e.target.value, 'gi')
        let matches = (hks_available_devices || [])?.filter(item => regex.test(item?.display_name))
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
    })

});
        
      
        
