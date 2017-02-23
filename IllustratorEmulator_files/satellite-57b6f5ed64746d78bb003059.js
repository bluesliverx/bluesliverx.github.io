_satellite.pushAsyncScript(function(event, target, $variables){
  var tryitnow = false;

function adobeId() {
    if (typeof adobeIMS !== "undefined") {
        var signedIn = adobeIMS.isSignedInUser(),
            profile = adobeIMS.getUserProfile(),
            userId = profile && profile.userId && profile.userId.replace('@AdobeID', '');
        s_adbadobenonacdc.eVar12 = userId;
        s_adbhelpx.eVar12 = userId;
    }
}
jQuery("#draw-main").on("click", ".defaultStyle a", function() {
    adobeId();
    if (!tryitnow) {
        tryitnow = true;
        s_adbadobenonacdc.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31";
        s_adbhelpx.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31";
        s_adbhelpx.tl(true, "o", "Try these first");
        s_adbadobenonacdc.tl(true, "o", "Try these first");
    }
})


jQuery("#draw-main").on("click", "#sNHelp", function() {

    adobeId();

    _satellite._poll(function() {

        if (jQuery("#contact-chat").css("display") != "none" && jQuery("#contact-no-phone").css("display") == "none" && jQuery("#contact-forum").css("display") == "none") { s_adbhelpx.prop61 = "chat now" };
        if (jQuery("#contact-chat").css("display") == "none" && jQuery("#contact-no-phone").css("display") != "none" && jQuery("#contact-forum").css("display") == "none") { s_adbhelpx.prop61 = "phone" };
        if (jQuery("#contact-forum").css("display") != "none" && jQuery("#contact-no-phone").css("display") == "none" && jQuery("#contact-chat").css("display") == "none") { s_adbhelpx.prop61 = "forum" };
        if (jQuery("#contact-chat").css("display") != "none" && jQuery("#contact-no-phone").css("display") != "none" && jQuery("#contact-forum").css("display") == "none") { s_adbhelpx.prop61 = "chat and phone" };
        if (jQuery("#contact-forum").css("display") != "none" && jQuery("#contact-no-phone").css("display") == "none" && jQuery("#contact-chat").css("display") != "none") { s_adbhelpx.prop61 = "chat and forum" };
        if (jQuery("#contact-forum").css("display") != "none" && jQuery("#contact-no-phone").css("display") != "none" && jQuery("#contact-chat").css("display") == "none") { s_adbhelpx.prop61 = "phone and forum" };
        if (jQuery("#contact-chat").css("display") != "none" && jQuery("#contact-forum").css("display") != "none" && jQuery("#contact-no-phone").css("display") != "none") { s_adbhelpx.prop61 = "chat,phone,forum" };
        if (jQuery("#contact-chat").css("display") == "none" && jQuery("#contact-phone").css("display") != "none" && jQuery("#contact-forum").css("display") == "none") { s_adbhelpx.prop61 = "phone" };
        if (jQuery("#contact-chat").css("display") != "none" && jQuery("#contact-phone").css("display") != "none" && jQuery("#contact-forum").css("display") == "none") { s_adbhelpx.prop61 = "chat and phone" };
        if (jQuery("#contact-forum").css("display") != "none" && jQuery("#contact-phone").css("display") != "none" && jQuery("#contact-chat").css("display") == "none") { s_adbhelpx.prop61 = "phone and forum" };
        if (jQuery("#contact-chat").css("display") != "none" && jQuery("#contact-forum").css("display") != "none" && jQuery("#contact-phone").css("display") != "none") { s_adbhelpx.prop61 = "chat,phone,forum" };
        s_adbadobenonacdc.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
        s_adbhelpx.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
        if (tryitnow) {
            s_adbhelpx.tl(true, "o", "Try These First + Still Need Help");
            s_adbadobenonacdc.tl(true, "o", "Try These First + Still Need Help");
        } else {
            s_adbhelpx.tl(true, "o", "Still Need Help");
            s_adbadobenonacdc.tl(true, "o", "Still Need Help");
        }


    }, [function() {
        if (jQuery("#contactoptions-selector-container").css("display") != "none") {
            return true;
        }
    }], { timeout: 30000, interval: 500 })
})

jQuery("#draw-main").on("click", "#contact-chat", function() {
    adobeId();
    s_adbadobenonacdc.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
    s_adbhelpx.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
    if (tryitnow) {
        s_adbhelpx.tl(true, "o", "Try these first + chat");
        s_adbadobenonacdc.tl(true, "o", "Try these first + chat");
    } else {
        s_adbhelpx.tl(true, "o", "chat");
        s_adbadobenonacdc.tl(true, "o", "chat");
    }
})
jQuery("#draw-main").on("click", "#contact-phone", function() {
    adobeId();
    s_adbadobenonacdc.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
    s_adbhelpx.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
    if (tryitnow) {
        s_adbhelpx.tl(true, "o", "Try these first + phone");
        s_adbadobenonacdc.tl(true, "o", "Try these first + phone");
    } else {
        s_adbhelpx.tl(true, "o", "phone");
        s_adbadobenonacdc.tl(true, "o", "phone");
    }
})
jQuery("#draw-main").on("click", "#contact-forum", function() {
    adobeId();
    s_adbadobenonacdc.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
    s_adbhelpx.linkTrackVars = "eVar12,eVar18,eVar28,prop3,prop12,prop4,prop5,prop29,prop32,prop31,prop61";
    if (tryitnow) {
        s_adbadobenonacdc.tl(true, "o", "Try these first + forum");
        s_adbhelpx.tl(true, "o", "Try these first + forum");
    } else {
        s_adbhelpx.tl(true, "o", "forum");
        s_adbadobenonacdc.tl(true, "o", "forum");
    }
})

});
