

document.addEventListener('alpine:init', function() {


   

    var $pThis;



    Alpine.store("mm_laptops", {

        init: function() {
            

            console.log(current_page_model + 'v=3');

            $pThis = this;

            $pThis.loadDevicesData(current_page_model);
            
            console.log($pThis);



        }, 


        data: null,
        lifecycle : ["storage", 'ram', "cpu", "gpu"],
        currentLifecycleIndex: 0,
        appliedFilters: [],
        baseData: [],
        activeIndex:null,


        avlOptions:[],




        

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


        handleOptionClick: function(event) {

            var attr_type = event.target.getAttribute('attrtype');

            var attr_value = event.target.getAttribute('attrvalue');

            var currentIndex = event.target.getAttribute('parentindex');


            if($pThis.activeIndex != currentIndex) {
                $pThis.currentLifecycleIndex = 0;
                $pThis.appliedFilters = [];
                // return ;
            }

            $pThis.activeIndex = currentIndex;

            
            $pThis.saveFilter(attr_type,attr_value);
            

            if($pThis.currentLifecycleIndex < $pThis.lifecycle.length - 1  ) {
                
                $pThis.currentLifecycleIndex = $pThis.currentLifecycleIndex + 1 

            } else {

                var selectedDevice = $pThis.groupDataBy('gpu',$pThis.appliedFilters)[attr_value].items[0];
                
                alert("Sending to device page");
                // console.log(selectedDevice);
                window.location = 'http://mobile-monster.webflow.io/sell-your-phone/' + selectedDevice['webflow-slug'];
                

            }


            // console.log($pThis.currentLifecycleIndex);
            // console.log($pThis.currentLifecycleIndex )




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

            return allDevices.filter((item, index) => {

                return item.length > 0;

            });

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
