/*
    jQuery.post('https://ecerez.webworks.istanbul/validate', {
        phone: '',
        pin: ''
    });

    jQuery.post('https://ecerez.webworks.istanbul/activate', {
        transactionId: '302960675',
        amount: '157.41',
        hash: '5868c8a510b6e876eac47d04427498754b9ef659f1bb89cda9c5d31bfd88b8f915a0c4ae5a377e5c8878314c9168c156d858dc2ae9b1937eabb2e50fc3f9dc99'
    });
*/
'use strict';
var Query = window.jQuery || window.$;
Query(function(){
    var giftToken = 'TurkcellPlatinum';
    var isNormalInteger = function(str){
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }
    var isInit = false;
    window.ecerezTurcellPlatinum = {
        init: function(){
            if(window.location.pathname == '/sepet'){
                if(!isMember){
                    return
                }
                this.DOMManipulation();
                this.DOMRender();
                if(!isInit){
                    this.EVENTListeners();
                }
            }
            if((window.location.pathname + window.location.search) == '/index.php?do=catalog/orderFinished'){
                this.activate();
            }
            isInit = true;
        },
        isTurkcellPlatinum: function(){
            return Query('[data-selector="submit-coupon-code"]').is(':disabled') && Query('[name="couponCode"]').val() == giftToken;
        },
        DOMManipulation: function(){
            if(this.isTurkcellPlatinum()){
                Query('#cart-panel-gift-card, .coupon-code-wrapper').hide();
            }
            setTimeout(function(){
                Query('._aside-right').css('visibility', 'visible');
            }, 500);
        },
        DOMRender: function(){
            // Query('._aside-left').prepend('<div style="margin: 0 0 10px;"><img src="https://i.hizliresim.com/DOqYgZ.jpg" alt="" /></div>');
            if(Query('.turkcell-platinum-title').length == 0){
                Query('#cart-panel-gift-card').before('<div class="turkcell-platinum-title">Turkcell Platinum</div>');
            }
            if(this.isTurkcellPlatinum()){
                if(Query('.turkcell-platinum-discounted').length == 0){
                    Query('.turkcell-platinum-title').append('<br /> <span class="turkcell-platinum-discounted">İndiriminiz sepetinize uygulanmıştır.</span>');
                }
            }
            if(!this.isTurkcellPlatinum()){
                if(Query('.turkcell-platinum-body').length == 0){
                    Query('.turkcell-platinum-title').after('<div class="turkcell-platinum-body">' +
                        '<div class="row">' +
                            '<div class="col-12">' +
                                '<div class="form-group">' +
                                    '<input type="text" name="turkcell_platinum_phone" class="form-control" placeholder="TELEFON NO" value="" autocomplete="off">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<input type="text" name="turkcell_platinum_pin" class="form-control" placeholder="ŞİFRE" value="" autocomplete="off">' +
                                '</div>' +
                                '<div class="form-group">' +
                                    '<button class="btn btn-block btn-secondary" data-action="turkcell-platinum-submit">' +
                                            'KULLAN' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>');
                }
            }
        },
        EVENTListeners: function(){
            var getValue = function(type){
                return Query('[name="turkcell_platinum_' + type + '"]').val();
            }
            var getCartSubTotal = function(){
                return Query.trim(jQuery('.cart-panel-amount-details').find('> div').eq(0).find('> span:last-child').text()).match(/(?!0\.00)\d{1,3}(.\d{3})*(\,\d\d)?/)[0].replace(/[*.]/g, '').replace(/[*,]/g, '.');
            }
            var submitProcesing = false;
            Query(document).on('click', '[data-action="turkcell-platinum-submit"]', function(event){
                event.preventDefault();
                if(submitProcesing){
                    return
                }
                var error = false;
                if(getValue('phone') == ''){
                    error = true;
                }
                if(getValue('pin') == ''){
                    error = true;
                }
                if(error){
                    IdeaApp.plugins.notification('Lütfen bilgilerinizi eksiksiz olarak giriniz.', 'warning');
                    return
                }
                if(getValue('phone').substring(0, 1) == '0'){
                    IdeaApp.plugins.notification('Lütfen telefon numaranızı başında "0" olmadan yazınız.', 'warning');
                    return
                }
                if(getValue('phone').length != 10){
                    IdeaApp.plugins.notification('Lütfen telefon numaranızı kontrol ediniz.', 'warning');
                    return
                }
                if(!isNormalInteger(getValue('phone')) || !isNormalInteger(getValue('pin'))){
                    IdeaApp.plugins.notification('Telefon ve Şifre alanı sadece rakamlardan oluşmaktadır.', 'warning');
                    return
                }
                IdeaApp.plugins.loadingBar.show();
                submitProcesing = true;
                Query.post('https://ecerez.webworks.istanbul/validate', {
                    phone: '' + getValue('phone') + '',
                    pin: '' + getValue('pin') + ''
                }).done(function(response){
                    if(response['PennaResponse']['returnCode'] != '1'){
                        IdeaApp.plugins.notification(response['PennaResponse']['returnMessage'], 'warning');
                        IdeaApp.plugins.loadingBar.hide();
                        submitProcesing = false;
                        return
                    }
                    sessionStorage.setItem('subtotal', getCartSubTotal());
                    sessionStorage.setItem('transactionId', response['PennaResponse']['transactionId']);
                    sessionStorage.setItem('hash', response['hash']);
                    IdeaApp.plugins.notification('Tebrikler işlem başarılı olarak kayıt altına alınmıştır. Onay Kodu: <strong>' + response['PennaResponse']['transactionId'] + '</strong>', 'confirmation');
                    Query('.turkcell-platinum-title').hide();
                    Query('.turkcell-platinum-body').hide();
                    Query('[name="couponCode"]').val(giftToken);
                    Query('[data-selector="submit-coupon-code"]').removeAttr('disabled');
                    Query('[data-selector="submit-coupon-code"]').click();
                    Query('#cart-panel-gift-card, .coupon-code-wrapper').hide();
                    IdeaApp.plugins.loadingBar.hide();
                    submitProcesing = false;
                }).fail(function(){
                    IdeaApp.plugins.notification('İşlem sırasında belirlenemeyen bir hata meydana geldi. Lütfen site yöneticisi ile iletişime geçiniz.', 'warning');
                    IdeaApp.plugins.loadingBar.hide();
                    submitProcesing = false;
                });
            });
        },
        activate: function(){
            Query.post('https://ecerez.webworks.istanbul/activate', {
                transactionId: sessionStorage.getItem('transactionId'),
                amount: parseFloat(sessionStorage.getItem('subtotal')),
                hash: sessionStorage.getItem('hash')
            }).done(function(){
                sessionStorage.removeItem('transactionId');
                sessionStorage.removeItem('subtotal');
                sessionStorage.removeItem('hash');
            })
        }
    }
    ecerezTurcellPlatinum.init();
});
