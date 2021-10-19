var allExternalAjaxListening = function(){
    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(value){
        this.addEventListener('load', function(){
            if(route.group == 'cart' && route.name == 'index'){
                if(this['responseURL'].indexOf('e-cerez.com/sepet') != -1){
                    ecerezTurcellPlatinum.init();
                }
            }
            if(route.group == 'order' && route.name == 'step2'){
                if(this['responseURL'].indexOf('order/view-cart-summary') != -1){
                    engineShipping.addAttr();
                    if(isMember){
                        engineShipping.getShippingAddressDetails();
                    }else{
                        engineShipping.changeShippingProccesing();
                    }
                }
            }
        }, false);
        this.realSend(value);
    }
}
jQuery(function(){
    allExternalAjaxListening();
});
