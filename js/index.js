var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        aliniciarlaapp();
        checkConnection();//CHECA SI HAY CONECCION DE INTERNET  
        $("#buscar").autocomplete({
                          source:'http://napplex.com/app/getautocomplete.php',
                          multiple: true,
                          minLength:1
        });  
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var pushNotification = window.plugins.pushNotification;
         if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"","ecb":"app.onNotificationGCM"});
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,   {"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
        
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id); 
        var listeningElement = parentElement.querySelector('.listening'); 
        var receivedElement = parentElement.querySelector('.received'); 

        listeningElement.setAttribute('style', 'display:none;'); 
        receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        //alert('Callback Success! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    },
     // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        console.log("event badge " + event.badge);
        console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM:function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    //alert('registration id = '+e.regid);
                    //alert('registration id = '+e.regid);
                    //document.getElementById('Regframe').src = 'http://napplex.com/app/formreg.php?regId=' + e.regid; 

                    var js = "micuenta('"+ e.regid +"', '0');";
                    document.getElementById("registro_sorteos").setAttribute("onclick", js);
                    
                    var linkvm7 = 'http://napplex.com/app/formreg.php?regId=' + e.regid + '&uuid=' + device.uuid;
                    $("#formreg_i").load(linkvm7);
                }
                break;

            case 'message':
                var valores = JSON.stringify(e);
                if (e.foreground) {
                            //alert('FOREGROUND MSG:' + JSON.stringify(e));
                                if( valores.length > 0 ) {  
                                  //alert(e.message);  
                                    
                                  //document.getElementById("verahobutton").onclick = "verahopop0('" + e.payload.idboton + "');";
                                  
//                                  nuevo_regfn0(e.payload.idreg, e.message);   
                                  if(e.payload.accion == 'nuevo_reg'){   
                                                document.getElementById("avisopopentrante").style.display = "block"; 
                                                //nuevo_regfn0(e.payload.idreg, e.message); 
                                                var js = "verahopop0('"+ e.payload.idboton +"');";
                                                document.getElementById("verahobutton").setAttribute("onclick", js);

                                                document.getElementById("popentrante_tit").innerHTML = e.message;
                                                console.log(e.message);    
                                            };
                                  if(e.payload.accion == 'nuevo_promo'){  
                                                document.getElementById("avisopopentrante_promo").style.display = "block";  
                                                //nuevo_regfn0(e.payload.idreg, e.message);  
                                                var js = "verahopop0_promo('"+ e.payload.idboton +"');";
                                                document.getElementById("verahobutton2").setAttribute("onclick", js);

                                                document.getElementById("popentrante_tit2").innerHTML = e.message;
                                                console.log(e.message);   
                                            };
                                  if(e.payload.accion == 'nuevo_evento'){  
                                                document.getElementById("avisopopentrante_evento").style.display = "block";  
                                                //nuevo_regfn0(e.payload.idreg, e.message);  
                                                var js = "verahopop0_evento('"+ e.payload.idboton +"');";
                                                document.getElementById("verahobutton3").setAttribute("onclick", js);

                                                document.getElementById("popentrante_tit3").innerHTML = e.message;
                                                console.log(e.message);   
                                            };
                                    if(e.payload.accion == 'micuenta'){  micuenta(e.regid, e.payload.idboton);  };
                                    if(e.payload.accion == 'actualiza'){  window.open("market://details?id=com.velocreative.pocketphone");  };
                                }  
                            //return OnPushNotificationInForeground(e.message, e.payload.Additional); 
                } else if (e.coldstart == true) {                                        
                                var notification = e.message;
                                // This is the entire object, just take the wanted propertey
                                console.log(notification);                    
                                //alert('COLDSTART MSG:' + e.message + ' - accion: ' + e.payload.accion);
                                var idbotonin = e.payload.idboton;
                                if(e.payload.accion == 'nuevo_reg'){   nuevo_regfn(idbotonin);   };
                                if(e.payload.accion == 'nuevo_promo'){  verahopop_promo(idbotonin);  };
                                if(e.payload.accion == 'nuevo_evento'){  verahopop0_evento(idbotonin);  };
                                if(e.payload.accion == 'micuenta'){  micuenta(e.regid, idbotonin);  };
                                if(e.payload.accion == 'actualiza'){  window.open("market://details?id=com.velocreative.pocketphone");  };
                } else {
                                var notification = e.message;
                                // This is the entire object, just take the wanted propertey
                                console.log(notification);
                                //alert('BACKGROUND:' + e.message + ' - accion: ' + e.payload.accion);
                                var idbotonin = e.payload.idboton;
                                if(e.payload.accion == 'nuevo_reg'){   nuevo_regfn(idbotonin);   };
                                if(e.payload.accion == 'nuevo_promo'){  verahopop_promo(idbotonin);  };
                                if(e.payload.accion == 'nuevo_evento'){  verahopop0_evento(idbotonin);  };
                                if(e.payload.accion == 'micuenta'){  micuenta(e.regid, idbotonin);  };
                                if(e.payload.accion == 'actualiza'){  window.open("market://details?id=com.velocreative.pocketphone");  };
                    //return OnPushNotificationInBackground(e.message, e.payload.price);
                }
                /////////////////////////////////////////////////////////777777                 
                break;

            case 'error':
                alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }

};