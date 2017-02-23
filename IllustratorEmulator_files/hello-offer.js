var CHLHelloOffer = {

    DEFAULT_LARGE_OFFER_IMAGE: "big-offer-default.jpg",
    DEFAULT_SMALL_OFFER_IMAGE: "small-offer-default.jpg",
    DEFAULT_OFFER_LINK: "https://creative.adobe.com/plans?store_code=us",
    BASE_IMAGE_PATH: "/shared/hello/v1_6/offers/en_ALL/",
    BASE_OFFER_LINK: "https://creative.adobe.com/plans",
    ADOBE_COM: "https://www.adobe.com",
    EDU_OFFER_URL: "/creativecloud/buy/students.html",
    SMB_OFFER_URL: "/go/smb",
    PROMO_JSON_PATH: "/shared/hello/v1_6/offers/data/promo_map.json",
    PS_PHOTOGRAPHER_SMALL_OFFER_LINK: "https://creative.adobe.com/products/download/lightroom",
    PS_PHOTOGRAPHER_LARGE_OFFER_LINK: "/creativecloud/photography.html",
    STOCK_URL: "https://stock.adobe.com",

    offerType: {
        LARGE_OFFER: "large_offer",
        SMALL_OFFER: "small_offer"
    },

    app: {
        PS: "photoshop",
        AI: "illustrator",
        MU: "muse",
        ID: "indesign",
        DW: "dreamweaver",
        PR: "premiere-pro"
    },

    userSegment: {
        BLEND: "Blend",
        PHOTOGRAPHER: "Photographer",
        DESIGNER: "Designer",
        EDU: "EDU",
        SMB: "SMB",
        DEFAULT: "Default"
    },

    // promo json data
    promo_data: "",

    // set from the offer html
    current_img_name_base: "",

    openBrowser: function (url) {
        if (typeof (parent.projectHello) !== "undefined") {
            if (typeof (parent.projectHello.openURLInDefaultBrowser) !== "undefined") {
                if (parent.document.URL.indexOf("/muse/") == -1) {
                    parent.projectHello.openURLInDefaultBrowser(url);
                }
            }
        }
    },

    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    getProduct: function () {
        if (document.URL.indexOf("/photoshop/") !== -1) return this.app.PS;
        else if (document.URL.indexOf("/muse/") !== -1) return this.app.MU;
        else if (document.URL.indexOf("/illustrator/") !== -1) return this.app.AI;
        else if (document.URL.indexOf("/indesign/") !== -1) return this.app.ID;
        else if (document.URL.indexOf("/dreamweaver/") !== -1) return this.app.DW;
        else if (document.URL.indexOf("/premiere-pro/") !== -1) return this.app.PR;
    },

    isSpecialSegment: function () {
        if (typeof (parent.personalizationProperties) !== "undefined") {
            if (typeof (parent.personalizationProperties["UserCatType"]) !== "undefined" &&
                parent.personalizationProperties["UserCatType"] !== "NONE" &&
                parent.personalizationProperties["UserCatType"].length > 0)
            {
                return true;
            }
        }
        return false;
    },

    getUserSegment: function () {
        var userSegment = this.userSegment.DEFAULT;

        if (typeof (parent.personalizationProperties) !== "undefined") {
            if (this.isSpecialSegment())
            {
                userSegment = parent.personalizationProperties["UserCatType"];
            }
            else if (typeof (parent.personalizationProperties["UserProType"]) !== "undefined"
                && parent.personalizationProperties["UserProType"].length > 0
                && CHLHelloOffer.getProduct() === CHLHelloOffer.app.PS)
            {
                userSegment = parent.personalizationProperties["UserProType"];
            }
        }

        // Edge case: set default to blend for PS
        if (userSegment === CHLHelloOffer.userSegment.DEFAULT && CHLHelloOffer.getProduct() === CHLHelloOffer.app.PS) {
            userSegment = this.userSegment.BLEND;
        }

        return userSegment;
    },

    getOfferImagePath: function () {
        var offerImgPath = this.BASE_IMAGE_PATH;
        offerImgPath += this.getProduct() + "/images/";

        if (this.isSpecialSegment() || CHLHelloOffer.getProduct() === CHLHelloOffer.app.PS) {
            offerImgPath += CHLHelloOffer.getUserSegment().toLowerCase() + "/";
        }

        return offerImgPath;
    },

    getGeo: function () {
        var geo = "us";
        if (typeof (parent.personalizationProperties) !== "undefined") {
            if (typeof (parent.personalizationProperties["countryCode"]) !== "undefined") {
                geo = parent.personalizationProperties["countryCode"];
            }
        }
        return geo;
    },

    setBackGroundColor: function () {
        if (this.isSpecialSegment()
            && (this.getUserSegment().toLowerCase() === this.userSegment.SMB.toLowerCase())
            && (CHLHelloOffer.getTestBOfferPageCss().length === 0))
        {
            $("body").css("background-color","#000000");
        }
    },

    getACOMSMBOfferLink: function (offer_url, geo) {
        var offer_link = CHLHelloOffer.ADOBE_COM;
        offer_link += offer_url;
        if (geo === "us") {
        } else if (geo === "gb") {
            offer_link += "_uk";
        } else {
            offer_link += "_" + geo;
        }
        offer_link += "?promoid=";
        return offer_link;
    },
    
    getACOMOfferLink: function (offer_url, geo) {
        var offer_link = CHLHelloOffer.ADOBE_COM;
        if (geo === "us") {
            offer_link += offer_url + "?promoid=";
        } else if (geo === "gb") {
            offer_link += "/uk" + offer_url + "?promoid=";
        } else {
            offer_link += "/" + geo + offer_url + "?promoid=";
        }

        return offer_link;
    },

    getTestBOfferPageCss: function () {
        if (typeof (parent.personalizationProperties) !== "undefined"
            && typeof (parent.personalizationProperties.ODOfferCss) !== "undefined"
            && parent.personalizationProperties.ODOfferCss.length > 0)
        {
            return parent.personalizationProperties.ODOfferCss;
        }

        return "";
    },

    getTestBSmallOfferLink: function () {
        if (typeof (parent.personalizationProperties) !== "undefined"
            && typeof (parent.personalizationProperties.ODSmallOfferLink) !== "undefined"
            && parent.personalizationProperties.ODSmallOfferLink.length > 0)
        {
            return parent.personalizationProperties.ODSmallOfferLink;
        }

        return "";
    },

    getTestBLargeOfferLink: function () {
        if (typeof (parent.personalizationProperties) !== "undefined"
            && typeof (parent.personalizationProperties.ODLargeOfferLink) !== "undefined"
            && parent.personalizationProperties.ODLargeOfferLink.length > 0)
        {
            return parent.personalizationProperties.ODLargeOfferLink;
        }

        return "";
    },

    getTestBOfferSmallImage: function () {
        if (typeof (parent.personalizationProperties) !== "undefined"
            && typeof (parent.personalizationProperties.ODSmallOffer) !== "undefined"
            && parent.personalizationProperties.ODSmallOffer.length > 0)
        {
            return parent.personalizationProperties.ODSmallOffer;
        }

        return "";
    },

    getTestBOfferLargeImage: function () {
        if (typeof (parent.personalizationProperties) !== "undefined"
            && typeof (parent.personalizationProperties.ODLargeOffer) !== "undefined"
            && parent.personalizationProperties.ODLargeOffer.length > 0)
        {
            return parent.personalizationProperties.ODLargeOffer;
        }

        return "";
    },

    loadOffer: function (geo, offer_type, product, segment) {

        segment = CHLHelloOffer.getUserSegment().toLowerCase();

        $.getJSON(this.PROMO_JSON_PATH, function (response) {
            CHLHelloOffer.promo_data = response;

            if (geo.length === 0) {
                geo = CHLHelloOffer.getParameterByName("geo").toLowerCase();
            }

            if (geo == null || geo.length === 0) geo = "us";

            // get the promo id
            var promo_object = CHLHelloOffer.promo_data.products[product][offer_type].promo_map[segment];
            var promo_id = promo_object["other"];
            if (typeof (promo_object[geo]) !== "undefined") {
                promo_id = promo_object[geo];
            }

            // get the offer link
            var offer_link = CHLHelloOffer.BASE_OFFER_LINK;
            if (CHLHelloOffer.getTestBSmallOfferLink().length > 0
                && offer_type.indexOf("small_offer") !== -1)
            {
                offer_link = CHLHelloOffer.getTestBSmallOfferLink();
            }
            else if (CHLHelloOffer.getTestBLargeOfferLink().length > 0
                && offer_type.indexOf("large_offer") !== -1)
            {
                offer_link = CHLHelloOffer.getTestBLargeOfferLink();
            }
            else {
                if (product === CHLHelloOffer.app.PR) product = "premiere";
                if (segment.toLowerCase() === CHLHelloOffer.userSegment.PHOTOGRAPHER.toLowerCase()) {
                    if (offer_type.indexOf("small_offer") !== -1) {
                        offer_link = CHLHelloOffer.PS_PHOTOGRAPHER_SMALL_OFFER_LINK + "?promoid=";
                    } else {
                        offer_link = CHLHelloOffer.getACOMOfferLink(CHLHelloOffer.PS_PHOTOGRAPHER_LARGE_OFFER_LINK, geo);
                    }
                } else if (segment.toLowerCase() === CHLHelloOffer.userSegment.SMB.toLowerCase()) {
                    offer_link = CHLHelloOffer.getACOMSMBOfferLink(CHLHelloOffer.SMB_OFFER_URL, geo);
                } else if (segment.toLowerCase() === CHLHelloOffer.userSegment.EDU.toLowerCase()) {
                    offer_link = CHLHelloOffer.getACOMOfferLink(CHLHelloOffer.EDU_OFFER_URL, geo);
                } else {
                    offer_link += "?store_code=" + geo + "&single_app=" + product + "&promoid=";
                }
                offer_link += promo_id;
            }

            // get the offer image
            var offer_image = CHLHelloOffer.getOfferImagePath() + CHLHelloOffer.current_img_name_base + geo + ".jpg";
            if (offer_type.indexOf("small_offer") !== -1) {
                if (CHLHelloOffer.getTestBOfferSmallImage().length > 0) {
                    offer_image = CHLHelloOffer.getTestBOfferSmallImage();
                } else if (typeof (promo_object[geo]) === "undefined") {
                    offer_image = CHLHelloOffer.getOfferImagePath() + CHLHelloOffer.DEFAULT_SMALL_OFFER_IMAGE;
                }
            } else {
                if (CHLHelloOffer.getTestBOfferLargeImage().length > 0) {
                    offer_image = CHLHelloOffer.getTestBOfferLargeImage();
                } else if (typeof (promo_object[geo]) === "undefined") {
                    offer_image = CHLHelloOffer.getOfferImagePath() + CHLHelloOffer.DEFAULT_LARGE_OFFER_IMAGE;
                }
            }
            
            // gse-1236
            /*if ((offer_type.indexOf("small_offer") !== -1)
                && (geo === "us" || geo === "gb" || geo === "au" || geo === "nz")
                && (product === CHLHelloOffer.app.PS || product === CHLHelloOffer.app.AI || product === CHLHelloOffer.app.ID)
                && (segment.toLowerCase() === CHLHelloOffer.userSegment.DESIGNER.toLowerCase()
                    || segment.toLowerCase() === CHLHelloOffer.userSegment.BLEND.toLowerCase()
                    || segment.toLowerCase() === CHLHelloOffer.userSegment.SMB.toLowerCase()
                    || segment.toLowerCase() === CHLHelloOffer.userSegment.DEFAULT.toLowerCase()))
            {
                var g = "/" + geo + "/";
                if (geo === "us") g="";
                else if (geo === "gb") g="/uk/";
                offer_link = CHLHelloOffer.STOCK_URL + g + "?mv=other&promoid=" + promo_id;
            }*/
            if ((geo === "us" || geo === "ca")
                && (segment.toLowerCase() === CHLHelloOffer.userSegment.EDU.toLowerCase()))
            {
                offer_link = CHLHelloOffer.BASE_OFFER_LINK 
                            + "?store_code=" + geo 
                            + "&single_app=" + product 
                            + "&plan=edu&mv=other&promoid=" + promo_id;
            }
            //

            // set offer image and link
            $("#OfferImage").attr("src", offer_image);
            $("#OfferLink").attr("href", offer_link);

        });
    }
};

$(document).ready(function () {

    // disable right click
    if (document.domain.indexOf("helpx.") !== -1) {
        document.body.oncontextmenu = function () {
            return false;
        }
    }
});

// disable drag/drop into hello window
$(window).load(function() {
    window.ondragenter = function() { event.dataTransfer.dropEffect='none'; event.stopPropagation(); event.preventDefault(); }
    window.ondragover  = function() { event.dataTransfer.dropEffect='none'; event.stopPropagation(); event.preventDefault(); }
    window.ondrop         = function() { event.dataTransfer.dropEffect='none'; event.stopPropagation(); event.preventDefault(); }
    window.ondragstart  = function() { event.dataTransfer.dropEffect='none'; event.stopPropagation(); event.preventDefault(); return false; }
    window.ondrag         = function() { event.dataTransfer.dropEffect='none'; event.stopPropagation(); event.preventDefault(); }
    window.ondragend   = function() { event.dataTransfer.dropEffect='none'; event.stopPropagation(); event.preventDefault(); }
});