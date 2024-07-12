document.addEventListener('alpine:init', function() {


    console.log("Store loading");
 
     var $pThis;
 
 
 
     Alpine.store("mm_laptops", {
 
         init: function() {
             
 
             console.log(current_page_model + 'v=3');
 
             $pThis = this;
 
             $pThis.loadDevicesData(current_page_model);
             
             console.log($pThis);
 
 
 
         }, 
 
 
         data: null,
         lifecycle : ["variants","storage", 'ram', "cpu", "gpu"],
         currentLifecycleIndex: 0,
         appliedFilters: [],
         baseData: [],
         activeIndex:null,
         selectedDeviceInfo: null,
         
         deviceOptions: null,
         avlOptions:[],
         storageOrderMap: ['128GB', '256GB', '512GB', '1TB', '2TB', '3TB', '4TB'],
 
 
 
         
 
         //  ACTION  CREATORS - METHODS
 
         loadDevicesData: function(current_model) {
 
 
             var formValues = new FormData();
 
             formValues.append('model', current_model);
 
 
             axios.post('https://mobile-monster.bubbleapps.io/version-live/api/1.1/wf/get_macbook_details', formValues)
             .then(response => {
                 
 
                 if(response.status != 200 ) {
 
                     console.log("Fetch data request failed");
 
                 }
 
                 $pThis.data = [...response.data];
 
                 // console.log($pThis.data);
 
                 $pThis.setBaseData();
 
 
             })
 
 
         },
        
        moveToPreviousStep: function() {
            
            if($pThis.currentLifecycleIndex > 0) {
                
                $pThis.currentLifecycleIndex = $pThis.currentLifecycleIndex - 1;
                var current_lifecycle_name = $pThis.getCurrentLifecycleName();
                
                $pThis.appliedFilters = $pThis.appliedFilters.filter((item, index) => {

                    return item[0] !== current_lifecycle_name;

                });


                // if getting back to the variants screen
                if($pThis.currentLifecycleIndex == 0) {
                    
                    $pThis.deviceOptions = null;
                    $pThis.selectedDeviceInfo = null;

                } else {

                    $pThis.updateDevicesOptions();

                }

            }


        },

        clearSelectedDevices: function() {


            $pThis.currentLifecycleIndex = 0;
            $pThis.selectedDeviceInfo = null;
            $pThis.appliedFilters = [];
            $pThis.deviceOptions = null;

        },
 
        handleOptionClick: function(event) {
 
             var attr_name = event.target.getAttribute('attrname');
             var attr_value = event.target.getAttribute('attrvalue');
 
             $pThis.saveFilter(attr_name,attr_value);
 
             if($pThis.currentLifecycleIndex < $pThis.lifecycle.length - 1) {
                 
                 $pThis.currentLifecycleIndex = $pThis.currentLifecycleIndex + 1;
             
             } else {   

                $pThis.currentLifecycleIndex = 5;
 
                 var webflow_slug = $pThis.deviceOptions[attr_value].items[0]['webflow-slug'];
 
                 window.location.href = "/sell-your-phone/" + webflow_slug;
 
                 return ;
 
 
                 console.log("Final Selection");
             
             }
 
             $pThis.updateDevicesOptions();
 
         },
 
         handleDeviceSelectionClick: function(event) {
 
 
 
             var topWrapper = event.target.closest('.hks-custom-wrap');
             var deviceName = topWrapper.getAttribute('devicename');
 
 
             $pThis.selectedDeviceInfo = {
                 name: deviceName, 
                 image: $pThis.baseData[deviceName].items[0]['image-of-mode'] 
             };
 
 
             $pThis.saveFilter($pThis.getCurrentLifecycleName(), deviceName);
           
             if($pThis.currentLifecycleIndex < $pThis.lifecycle.length - 1) {
                 
                 $pThis.currentLifecycleIndex = $pThis.currentLifecycleIndex + 1;
             
             } else {
 
                 console.log("Final Selection");
             
             }
 
             $pThis.updateDevicesOptions();
 
 
         },
 
 
         updateDevicesOptions: function() {
 
            $pThis.deviceOptions = $pThis.groupDataBy($pThis.getCurrentLifecycleName(), $pThis.appliedFilters); 
        
         },


         
 
         getCurrentLifecycleName: () => {
 
             return $pThis.lifecycle[$pThis.currentLifecycleIndex] || "";
 
         },
 
 
         saveFilter: function(attr,value) {
 
             $pThis.appliedFilters.push([attr,value]);
 
 
         },
 
         setBaseData: function() {
 
             $pThis.baseData = $pThis.groupDataBy('variants');
 
         },
 
 
         getDeviceNames: function() {
 
             var allDevices = Object.keys($pThis.baseData);
 
             
             for(var i = 0; i++ ; i < allDevices.length) {
                 console.log(allDevices[i]);
                 $pThis.baseData[allDevices[i]].device_name = "TEST";
             }
 
             return allDevices.filter((item, value) => {
 
                 return item.length > 0;
             
             })
 
 
         },
         
         groupDataBy: function(field, filters = []) {
             
             // filters = [...filters, ...$pThis.appliedFilters];
 
             var data = $pThis.data;
 
             if(!data) {
                 
                 return {};
 
             }
 
             if(data.count < 1) {
 
                 return {};
 
             }
 
 
             var itemMatchFilter = (key, value, item)  => {
 
                 return key in item && item[key] == value;
 
             }
 
 
 
             var outputData = {};
 
             data.forEach((item, index) => {
 
                 
                 var itemMatched = true;
 
                 for(var i = 0; i < filters.length; i++) {
 
                     var filterItem = filters[i];
 
                     if(!itemMatched) {
                         break;
                     }
 
                     itemMatched = itemMatchFilter(filterItem[0], filterItem[1], item);
 
 
                 }
 
                 if(!itemMatched) {
                     return;
                 }
 
                 // filters.forEach((filterItem, filterIndex) => {
                     
                 //     if(itemMatched) {
                 //         itemMatched = itemMatchFilter(filterItem[0], filterItem[0], item);
                 //     } else {
                         
                 //     }
 
                     
                 
                 // })
 
                 
                 if(Object.prototype.hasOwnProperty.call(outputData, item[field])) {
                     
                     outputData[item[field]].items.push(item);
 
                 } else {
 
                     var itemsArr = [];
                     itemsArr.push(item);
                     outputData[item[field]] = {items: itemsArr};
 
                 }
 
 
             })
 
 
             // console.log(filters);
 
             return outputData;
 
 
 
 
 
         }
 
 
 
 
 
 
 
     })
 
 
 
 
 
 })
 