// UK site
if(window.location.host == 'mobilemonster.uk' || window.location.host.startsWith('mobile-monster.webflow.io')){
    
    // hide/show uk related registration fields
    $('.progress_inner_uk').show();
    $('.progress_inner_au_nz').hide();
    $('#signup_house_field').show();
    $('#signup_city_field').show();
    $('#signup_state_field').hide();
    $('#signup_suburb_field').hide();
    $('.not-to-show-for-uk').hide();
    $('.uk-hidden').hide();
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
        '.uk-quick-payment': 'Quick payment',
        '.uk-getpaid-text':'Get paid within 24 hours',
        '.uk-risk-free-service-1':'All devices tested using Phonecheck Diagnostics. ',
        '.uk-risk-free-service-2':'Should you not be happy with the results we will send your device back free of charge',
        '.answer_tab.ans-cond-diff': `
            <p><b>Brand New</b> - A brand new, unactivated device that comes in its original sealed box including its accessories</p>
            <p><b>Excellent</b> - This device is used but has been very well looked after, it basically looks as if it was brand new with no signs of any marks of wear on the device. It must be fully functional and unlocked.</p>
            <p><b>Very Good</b> - This is also a used device but unlike the previous grade shows signs of use in the form of minor to moderate scratches to the screen or body. It must be fully functional and unlocked</p>
            <p><b>Poor</b> - This device physically shows heavy signs of use in the form deep scratches to the screen or body. It might also have small cracks to the glass and minor issues such as buttons or speakers not in functional condition. The device however must not have any missing parts, must not be bent or liquid damaged. Device must still be unlocked.</p>
            <p>We hear it all the time: I want to sell my iPhone, but I don’t know what it’s worth. Well, our process <a href="https://mobilemonster.com.au/how-it-works" target="_blank">works like this</a>: you make your assessment as above, then send the phone to us, free of charge. We’ll confirm its condition, make you an offer based on one of the categories above, with better prices offered for better condition. Our offers are always 5% above our competitors and, if you don’t like what you hear, we’ll send it back for free.</p>`,
        '.answer_tab.ans-faulty-found': `<p>If you have selected the condition of the handset to be Brand New, Excellent or Very Good and the device was found to have faults with its functionality or does not match the condition we will send you a revised quote.</p>
            <p>Devices with functional faults qualify for the Poor condition, so long as the device is not dead, missing parts / tampered with or been damaged by liquid.</p>`,
        '.answer_tab.ans-val-change': `Our quotes are locked in from the date you submit an order through our website for a period of 14 days. However, keep in mind that prices tend to change online regularly not just due to age but also supply and demand. It's important to submit an order and lock in your quote right away.`,
        '.answer_tab.ans-how-send': `You can post your device to our mailing address below<br>MobileMonster C/O BlankIT Ltd<br>Unit 43 Parkhall Biz Village<br>Parkhall Road<br>Stoke on Trent<br>ST3 5XA`,
        '.brand-why-choose-us': `
        <div class="why-choose-us-text"><p>Mobile Monster will beat any UK advertised price for a phone or device by £10 Seen a better offer? Contact us before placing your order with details and we will beat it by £10.</p>
            <p>Mobile Monster has over 10 years’ experience in export, second-hand phones and recycling, The company started in Australia and expanded its operations to the United Kingdom and New Zealand. Mobile Monster is not just a buy-back company, we're technology experts and we know the market. We offer amazing prices for the latest gadgets and we're extremely transparent with all our communication from every step of the sale.</p>
            <a href="https://mobilemonster.uk/why-use-us" target="_blank">Read More...</a></div>`,
        '.uk-conditon-list':`<li><strong style="color:#63388C; ">Brand New</strong> - A brand new, unactivated device that comes in its original sealed box including its accessories</li><li><strong style="color:#63388C; ">Excellent</strong> - This device is used but has been very well looked after, it basically looks as if it was brand new with no signs of any marks of wear on the device. It must be fully functional and unlocked.</li><li><strong style="color:#63388C; ">Very Good</strong> - This is also a used device but unlike the previous grade shows signs of use in the form of minor to moderate scratches to the screen or body. It must be fully functional and unlocked</li><li><strong style="color:#63388C; ">Poor</strong> - This device physically shows heavy signs of use in the form deep scratches to the screen or body. It might also have small cracks to the glass and minor issues such as buttons or speakers not in functional condition. The device however must not have any missing parts, must not be bent or liquid damaged. Device must still be unlocked.</li>`,
        '.uk-valuation-change':`Our quotes are locked in from the date you submit an order through our website for a period of 14 days. However, keep in mind that prices tend to change online regularly not just due to age but also supply and demand. Its important to submit an order and lock in your quote right away.`,
        '.uk-how-do-i-send-fone':`You can send your device in to our mailing address below:<br>MobileMonster C/O BlankIT Ltd<br>Unit 43 Parkhall Biz Village<br>Parkhall Road<br>Stoke on Trent<br>ST3 5XA<br>`,
        '.uk-money-period':`We pay within <strong>24 hours</strong> of receiving your device, given that there are no issues with your order which require us to seek approval / further information or action on your part to allow us to complete your order. Delays can occur if the device is sent to us locked to your icloud, samsung, google or other provider accounts or if there are found to be differences in the condition of your device based on what was submitted on the site.`,
        '.uk-contact-link':`Want to know more about how you can make money off your old and unwanted devices?<a href="https://help.mobilemonster.uk/hc/en-us"> Create an account</a> with us and sign up for our newsletter so you can be the first to learn about the latest offers, special trade-in deals, competitions, and more! It’s also a great way to contact us if you have any questions about selling your device or the latest price changes.`,
        '.uk-shipping-link':`Shipping`,
        '.uk-step-mailbag':`Send your device/s to our mailing address using the instructions provided when you place your order.`,
        '.ans-customer-say': `We have bought phones from thousands of customers, all of whom have been delighted with our service. You can view their feedback <a href="https://mobilemonster.com.au/customer-reviews" class="link-11">here</a> (spoiler alert, it’s all positive).`,
        '.ans-how-mm-work': `<p class="normal-text">Mobile Monster is a really easy system to use. Simply follow these steps:</p>
            <ol class="privacy-list normal-text"><li>Enter your device type on the  homepage</li>
            <li>Select condition: Brand New, Excellent, Very Good or Poor</li>
            <li>We offer you a price for your device</li>
            <li>Select your shipping method based on how you wish to send the device to us</li>
            <li>Ensure that you remove any accounts from your device and the device is unlocked to prevent delays</li>
            <li>Send us your device</li>
            <li>We review your device against the description you entered</li>
            <li>We send you money for your device(s)</li></ol>  `,
        '.ans-diff-conditions': `
            <p class="normal-text"><b>Brand New</b> - A brand new, unactivated device that comes in its original sealed box including its accessories</p>
            <p class="normal-text"><b>Excellent</b> - This device is used but has been very well looked after, it basically looks as if it was brand new with no signs of any marks of wear on the device. It must be fully functional and unlocked.</p>
            <p class="normal-text"><b>Very Good</b> - This is also a used device but unlike the previous grade shows signs of use in the form of minor to moderate scratches to the screen or body. It must be fully functional and unlocked</p>
            <p class="normal-text"><b>Poor</b> - This device physically shows heavy signs of use in the form deep scratches to the screen or body. It might also have small cracks to the glass and minor issues such as buttons or speakers not in functional condition. The device however must not have any missing parts, must not be bent or liquid damaged. Device must still be unlocked.</p>`,
        '.ans-what-hppns-faulty':`<p>If you have selected the condition of the handset to be Brand New, Excellent or Very Good and the device was found to have faults with its functionality or does not match the condition we will send you a revised quote.</p>
            <p>Devices with functional faults qualify for the Poor condition, so long as the device is not dead, missing parts / tampered with or been damaged by liquid.</p>`,
        '.ans-value-change': `Our quotes are locked in from the date you submit an order through our website for a period of 14 days. However, keep in mind that prices tend to change online regularly not just due to age but also supply and demand. Its important to submit an order and lock in your quote right away.`,
        '.ans-how-send': `<p>You can post your device to our mailing address below</p>MobileMonster C/O BlankIT Ltd<br>Unit 43 Parkhall Biz Village<br>Parkhall Road<br>Stoke on Trent<br>ST3 5XA`,
        '.how-it-works-list.ans-how-works': `<ol class="normal-text"><li>Enter your device type on the homepage</li>
            <li>Select condition: Brand New, Excellent, Very Good or Poor</li>
            <li>We offer you a price for your device</li>
            <li>Select your shipping method based on how you wish to send the device to us</li>
            <li>Ensure that you remove any accounts from your device and the device is unlocked to prevent delays</li>
            <li>Send us your device</li>
            <li>We review your device against the description you entered</li>
            <li>We send you money for your device(s)</li>
            </ol>`,
        '.page-terms-nd-conditions': `<h1 class="text-main-heading">Terms &amp; Conditions<br></h1><img src="https://cdn.prod.website-files.com/6295ec8d6adf7dabeda41909/62cffbe53a1a6110da9d9527_why-recycle.jpg" loading="lazy" alt="" class="image-89"><p class="normal-text">Thank you for participating in the Mobile Monster Cash-Back Offer.</p><p class="normal-text">By submitting your phone or device, you agree to the following Terms & Conditions outlined below.</p>
            <p class="normal-text">Terms & Conditions of www.mobilemonster.uk
            <ol class="normal-text"><li>Mobile Monster will make every effort to reset devices received to their factory default settings and erase all content. However, if the device is irreparably damaged or inaccessible, a reset may not be possible. In such cases, the customer remains solely responsible for securing and removing any personal data prior to sending the device.</li>
            <li>I confirm that I am the legal and rightful owner of the device(s) submitted for trade. I acknowledge that if any device(s) are found to be reported lost or stolen, I forfeit my right to receive payment.</li>
            <li>I affirm that the information provided regarding the condition and model of the device(s) submitted to Mobile Monster is accurate and truthful.</li>
            <li>Mobile Monster is not responsible for any loss or damage incurred during transit when using our Free Satchel. Customers seeking additional assurance are encouraged to purchase insurance through Royal Mail, which provides compensation for loss or damage up to a specified value.</li>
            <li>Mobile Monster bears no liability for items lost or damaged during transit. We strongly advise purchasing transit insurance from Royal Mail to ensure reliability and peace of mind.</li>
            <li>Risk-Free Evaluation: Upon receipt, the device will be assessed based on the condition criteria outlined on our website. Evaluations may include, but are not limited to, visual inspection and functional testing through Phonecheck Diagnostics.</li>
            <li>Any device determined to be stolen, counterfeit, blacklisted, or fraudulent will be reported to the authorities. In such cases, no payment will be made and the device(s) will not be returned.</li>
            <li>Mobile Monster reserves the right to reject any overseas devices. In such instances, I understand I may be offered a revised value, which I have the option to either accept or decline.</li>
            <li>If the device is found to have liquid or physical damage upon inspection, a revised offer may be presented. I will have the opportunity to either accept the revised offer or request the device be returned at no additional charge.</li>
            <li>I acknowledge and accept that all data stored on the device may be permanently deleted and rendered unrecoverable.</li>
            <li>Mobile Monster must receive the device within 14 days from the date of the trade-in offer. If the device is received after this period, Mobile Monster reserves the right to adjust the offer value, which I may accept or reject.</li>
            <li>All device pricing provided by Mobile Monster is inclusive of VAT.</li>
            <li>I agree to ensure that all payment information submitted is accurate. Mobile Monster does not validate payment details and accepts no responsibility for errors or losses resulting from incorrect information. To the extent permitted by law, Mobile Monster disclaims liability for any loss arising from inaccurate instructions or payment details provided by me or an authorized user.</li>
            <li>I consent to receive communications and newsletters from Mobile Monster and understand that I may unsubscribe at any time.</li>
            <li>I acknowledge that any personal information submitted to Mobile Monster in connection with the cash-back offer is governed by the Privacy Policy available at www.mobilemonster.uk, which may be amended from time to time.</li>
            <li>Any accessories or additional items sent with the device(s)—including but not limited to chargers, external covers, USB cables, microSD cards, SIM cards, and original boxes—will not be returned and may be disposed of or recycled, regardless of the final outcome of the device assessment.</li>
            <li>Mobile Monster reserves the right to decline the initial online trade-in offer if the device contains non-original or aftermarket parts or has been tampered with by unauthorized repair services. This includes devices with unofficial software modifications, such as "jailbroken" iPhones or "rooted" Android phones.</li>
            <li>If issues are identified with the device upon assessment, Mobile Monster will contact you via email and/or phone to present a revised offer. If no response is received within 14 days, payment for the revised value will be processed. The responsibility is with me (the customer) to provide accurate contact information.</li>
            <li>Devices that are iCloud locked will be held for 14 days while Mobile Monster contacts the customer to request removal of the lock. If no action is taken within this period, the device will be disposed of. The responsibility is with me (the customer) to provide accurate contact information.</li>
            <li>If a device is sent to Mobile Monster without an accompanying online "sell order," we will attempt to contact the sender using any available details provided with the mailing package (e.g., mobile number or address). IF we are unable to contact you due to missing contact information within two weeks of receipt, and no further response is received after initial contact, the device will be processed based on the current website price at that time. After this process, you waive all rights to reclaim the device.</li>
            <li>When selling a mobile phone or tablet, Mobile Monster may request proof of purchase in the form of an invoice. This must be provided either as a PDF or a photo of the original document. Failure to supply proof of purchase may result in rejection of the order. This is solely to prevent fraud by identifying you (the customer) as the owner of the device.</li>
            <li>In some cases, Mobile Monster may request identification in the form of a drivers license or, if unavailable, a valid passport. Failure to provide appropriate identification may result in the trade-in being declined.</li></ol></p>`,



    }

    Object.keys(ukTexts).forEach(key => {
        $(key).html(ukTexts[key])
    })

    let brand_description_interval = setInterval(() => {
        $('.sell-iphone-brand-description').html($('.sell-iphone-brand-description').html()?.replaceAll("\n", '')?.replace( new RegExp(`<p>When you trade in your iPhone, we’ll give you a fair and professional(.*)Post satchel for mailed submissions.</p>`,'ig'), `
            <p>When you trade in your iPhone, we’ll give you a fair and professional appraisal of its value. To do so, we ask you to rate its condition according to one of the following categories:</p>
            <ul>
                <li><b>Brand New</b> - A brand new, unactivated device that comes in its original sealed box including its accessories</li>
                <li><b>Excellent</b> - This device is used but has been very well looked after, it basically looks as if it was brand new with no signs of any marks of wear on the device. It must be fully functional and unlocked.</li>
                <li><b>Very Good</b> - This is also a used device but unlike the previous grade shows signs of use in the form of minor to moderate scratches to the screen or body. It must be fully functional and unlocked</li>
                <li><b>Poor</b> - This device physically shows heavy signs of use in the form deep scratches to the screen or body. It might also have small cracks to the glass and minor issues such as buttons or speakers not in functional condition. The device however must not have any missing parts, must not be bent or liquid damaged. Device must still be unlocked.</li>
            </ul>
            <p>We hear it all the time: I want to sell my iPhone, but I don’t know what it’s worth. Well, our process <a href="https://mobilemonster.com.au/how-it-works" target="_blank">works like this</a>: you make your assessment as above, then send the phone to us, free of charge. We’ll confirm its condition, make you an offer based on one of the categories above, with better prices offered for better condition. Our offers are always 5% above our competitors and, if you don’t like what you hear, we’ll send it back for free.</p>
        `));
        if($('.sell-iphone-brand-description')[0] || document.readyState == 'complete'){
            clearInterval(brand_description_interval);
        }
    },500)



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