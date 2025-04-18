// UK site
if(window.location.host == 'mobilemonster.uk' || window.location.host.startsWith('mobile-monster.webflow.io')){
    
    // hide/show uk related registration fields
    $('#signup_house_field').show()
    $('#signup_city_field').show()
    $('#signup_state_field').hide()
    $('#signup_suburb_field').hide()


    $('.australian-british').text('British') ;
    // $('.replace-to-$15').text('£15') ;
    $('.change-business-days').text('1 business day') ;
    $('.replace_273m_img').attr('src', 'https://cdn.prod.website-files.com/6295ec8d6adf7dabeda41909/6801682bfb3c561b0445a3a6_Group%201948755069.svg') ;
}