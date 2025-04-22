// UK site
if(window.location.host == 'mobilemonster.uk' || window.location.host.startsWith('mobile-monster.webflow.io')){
    
    // hide/show uk related registration fields
    $('#signup_house_field').show()
    $('#signup_city_field').show()
    $('#signup_state_field').hide()
    $('#signup_suburb_field').hide()
    $('.not-to-show-for-uk').hide();
    $('.uk-hidden').hide()
    $('.visibility-hidden').css({"visibility": "hidden"})

    if(window.location.pathname.startsWith('/drop-off-option')){
        window.location.href = window.location.href.replace('/drop-off-option', '/shipping');
    }
    
    $('.replace_monster_img').attr('src', 'https://cdn.prod.website-files.com/6295ec8d6adf7dabeda41909/6801682bfb3c561b0445a3a6_Group%201948755069.svg').attr('srcset','') ;
    
    let ukTexts = {
        '.australian-british': 'British',
        '.replace_max_amount': '£15',
        '.change-business-days': '1 business day',
        '.change-uk-address': 'MobileMonster C/O BlankIT Ltd<br>Unit 43 Parkhall Biz Village<br>Parkhall Road<br>Stoke on Trent<br>ST3 5XA',
        '.uk-search-text': 'Send your device<br>to our mailing address',
    }

    Object.keys(ukTexts).forEach(key => {
        $(key).html(ukTexts[key])
    })

    $('.sell-iphone-brand-description').html($('.sell-iphone-brand-description').html()?.replaceAll("\n", '')?.replace( new RegExp(`<p>When you trade in your iPhone, we’ll give you a fair and professional(.*)Post satchel for mailed submissions.</p>`,'ig'), `
        <p>When you trade in your iPhone, we’ll give you a fair and professional appraisal of its value. To do so, we ask you to rate its condition according to one of the following categories:</p>
        <ul>
            <li><b>Brand New</b> - A brand new, unactivated device that comes in its original sealed box including its accessories</li>
            <li><b>Excellent</b> - This device is used but has been very well looked after, it basically looks as if it was brand new with no signs of any marks of wear on the device. It must be fully functional and unlocked.</li>
            <li><b>Very Good</b> - This is also a used device but unlike the previous grade shows signs of use in the form of minor to moderate scratches to the screen or body. It must be fully functional and unlocked</li>
            <li><b>Poor</b> - This device physically shows heavy signs of use in the form deep scratches to the screen or body. It might also have small cracks to the glass and minor issues such as buttons or speakers not in functional condition. The device however must not have any missing parts, must not be bent or liquid damaged. Device must still be unlocked.</li>
        </ul>
        <p>We hear it all the time: I want to sell my iPhone, but I don’t know what it’s worth. Well, our process works like this: you make your assessment as above, then send the phone to us, free of charge. We’ll confirm its condition, make you an offer based on one of the categories above, with better prices offered for better condition. Our offers are always 5% above our competitors and, if you don’t like what you hear, we’ll send it back for free.</p>
    `))



}

if(window.location.host != 'mobilemonster.uk'){
    // hide/show uk related registration fields
    $('#signup_house_field').hide()
    $('#signup_city_field').hide()
    $('#signup_state_field').show()
    $('#signup_suburb_field').show()

    if(window.location.pathname.startsWith('/shipping')){
        window.location.href = window.location.href.replace('/shipping', '/drop-off-option');
    }
}