
/*
* Title                   : Thumbnail Scroller (jQuery Plugin)
* Version                 : 1.6
* File                    : jquery.dop.ThumbnailScroller.js
* File Version            : 1.6
* Created / Last Modified : 05 May 2013
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Thumbnail Scroller jQuery Plugin.
*/

(function($){
    $.fn.DOPThumbnailScroller = function(options){
        var Data = {'ID': '0',
                    'SettingsDataType': 'JSON',
                    'SettingsFilePath': 'dopts/json/settings.json',
                    'ContentDataType': 'JSON',
                    'ContentFilePath':'dopts/json/content.json',
                    'Reinitialize': false},                
        
        Container = this,
        ID = '0',
        
        Width = 900,
        Height = 128,     
        BgColor = 'ffffff',
        BgAlpha = 100,
        BgBorderSize = 1,
        BgBorderColor = 'e0e0e0',
        ThumbnailsOrder = 'normal',
        ResponsiveEnabled = 'true',
        UltraResponsiveEnabled = 'false',
        
        ThumbnailsPosition = 'horizontal',
        ThumbnailsBgColor = 'ffffff',
        ThumbnailsBgAlpha = 0,
        ThumbnailsBorderSize = 0,
        ThumbnailsBorderColor = 'e0e0e0',
        ThumbnailsSpacing = 10,
        ThumbnailsMarginTop = 10,
        ThumbnailsMarginRight = 0,
        ThumbnailsMarginBottom = 10,
        ThumbnailsMarginLeft = 0,
        ThumbnailsPaddingTop = 0,
        ThumbnailsPaddingRight = 0,
        ThumbnailsPaddingBottom = 0,
        ThumbnailsPaddingLeft = 0,
        ThumbnailsInfo = 'label',        
        
        ThumbnailsNavigationEasing = 'linear',
        ThumbnailsNavigationLoop = 'false',
                
        ThumbnailsNavigationMouseEnabled = 'false',
        
        ThumbnailsNavigationScrollEnabled = 'false',
        ThumbnailsScrollPosition = 'bottom/right',
        ThumbnailsScrollSize = 5,
        ThumbnailsScrollScrubColor = '808080',
        ThumbnailsScrollBarColor = 'e0e0e0',                     
        
        ThumbnailsNavigationArrowsEnabled = 'true',
        ThumbnailsNavigationArrowsNoItemsSlide = 1,
        ThumbnailsNavigationArrowsSpeed = 600,
        ThumbnailsNavigationPrev = 'dopts/assets/gui/images/ThumbnailsPrev.png',
        ThumbnailsNavigationPrevHover = 'dopts/assets/gui/images/ThumbnailsPrevHover.png',
        ThumbnailsNavigationPrevDisabled = 'dopts/assets/gui/images/ThumbnailsPrevDisabled.png',
        ThumbnailsNavigationNext = 'dopts/assets/gui/images/ThumbnailsNext.png',
        ThumbnailsNavigationNextHover = 'dopts/assets/gui/images/ThumbnailsNextHover.png',
        ThumbnailsNavigationNextDisabled = 'dopts/assets/gui/images/ThumbnailsNextDisabled.png',
        
        ThumbnailLoader = 'dopts/assets/gui/images/ThumbnailLoader.gif',
        ThumbnailWidth = 100,
        ThumbnailHeight = 100,
        ThumbnailAlpha = 100,
        ThumbnailAlphaHover = 100,
        ThumbnailBgColor = 'f1f1f1',
        ThumbnailBgColorHover = 'f1f1f1',
        ThumbnailBorderSize = 1,
        ThumbnailBorderColor = 'd0d0d0',
        ThumbnailBorderColorHover = '303030',
        ThumbnailPaddingTop = 2,
        ThumbnailPaddingRight = 2,
        ThumbnailPaddingBottom = 2,
        ThumbnailPaddingLeft = 2, 
                
        LightboxEnabled = 'true',
        LightboxDisplayTime = 600,
        LightboxWindowColor = 'ffffff',
        LightboxWindowAlpha = 80,
        LightboxLoader = 'dopts/assets/gui/images/LightboxLoader.gif',
        LightboxBgColor = 'ffffff',
        LightboxBgAlpha = 100,
        LightboxBorderSize = 1,
        LightboxBorderColor = 'e0e0e0',   
        LightboxCaptionTextColor = '999999',
        LightboxMarginTop = 30,
        LightboxMarginRight = 30,
        LightboxMarginBottom = 30,
        LightboxMarginLeft = 30,
        LightboxPaddingTop = 10,
        LightboxPaddingRight = 10,
        LightboxPaddingBottom = 10,
        LightboxPaddingLeft = 10,
        
        LightboxNavigationPrev = 'dopts/assets/gui/images/LightboxPrev.png',
        LightboxNavigationPrevHover = 'dopts/assets/gui/images/LightboxPrevHover.png',
        LightboxNavigationNext = 'dopts/assets/gui/images/LightboxNext.png',
        LightboxNavigationNextHover = 'dopts/assets/gui/images/LightboxNextHover.png',
        LightboxNavigationClose = 'dopts/assets/gui/images/LightboxClose.png',
        LightboxNavigationCloseHover = 'dopts/assets/gui/images/LightboxCloseHover.png',
        LightboxNavigationInfoBgColor = 'ffffff',
        LightboxNavigationInfoTextColor = 'c0c0c0',
        LightboxNavigationDisplayTime = 600,
        LightboxNavigationTouchDeviceSwipeEnabled = 'true',
        
        SocialShareEnabled = 'false',
        SocialShareLightbox = 'dopts/assets/gui/images/SocialShareLightbox.png',
        
        TooltipBgColor = 'ffffff',
        TooltipStrokeColor = '000000',
        TooltipTextColor = '000000',
                                    
        LabelPosition = 'bottom',
        LabelAlwaysVisible = 'false',
        LabelUnderHeight = 50,
        LabelBgColor = '000000',
        LabelBgAlpha = 80,
        LabelTextColor = 'ffffff',    
        
        SlideshowEnabled = 'false',
        SlideshowTime = 5000,
        SlideshowLoop = 'false',
                
        Images = new Array(),
        Thumbs = new Array(),
        ThumbsLoaded = new Array(),
        Title = new Array(),
        Caption = new Array(),
        Media = new Array(),
        LightboxMedia = new Array(),
        Link = new Array(),
        Target = new Array(),
        noThumbs = 0,
        totalNoThumbs = 0,
        
        startScrollerID = 0,
        startWith = 0,
        
        initialWidth = Width,
        initialHeight = Height,
        initialThumbnailWidth = ThumbnailWidth,
        initialThumbnailHeight = ThumbnailHeight,
        
        currentX = 0,
        currentY = 0,
        movePrev = false,
        moveNext = false,
        
        arrowsClicked = false,
        
        lightboxCurrentImage  = 0,
        lightboxImageWidth = 0,
        lightboxImageHeight = 0,
        lightboxImageLoaded = false,

        SlideshowID,
        SlideshowStatus = 'pause',
        SlideshowLastImage = false,
        
        socialShareInterval,

        methods = {
                    init:function(){// Init Plugin.
                        return this.each(function(){
                            if (options){
                                $.extend(Data, options);
                            }
                            
                            if (!$(Container).hasClass('dopts-initialized') || Data['Reinitialize']){
                                $(Container).addClass('dopts-initialized');
                             
                                if (Data['ID'] != '0'){
                                    ID = Data['ID'];
                                }
                                else{
                                    ID = prototypes.randomString(16);
                                }

                                if (Data['SettingsDataType'] == 'XML'){
                                    methods.parseXMLSettings();
                                }
                                else if (Data['SettingsDataType'] == 'JSON'){
                                    methods.parseJSONSettings();                                
                                }
                                else{
                                    methods.parseHTMLSettings();
                                }
                                $(window).bind('resize.DOPThumbnailScroller', methods.initRP);
                                $(window).bind('scroll.DOPThumbnailScroller', methods.initRPScroll);
                            }
                        });
                    },
                    parseJSONSettings:function(){// Parse Settings.     
                        $.getJSON(prototypes.acaoBuster(Data['SettingsFilePath']), {}, function(data){ 
                            Width = parseInt(data['Width']);
                            Height = parseInt(data['Height']);
                            BgColor = data['BgColor'] || 'ffffff';
                            BgAlpha = parseInt(data['BgAlpha']);
                            BgBorderSize = parseInt(data['BgBorderSize']);
                            BgBorderColor = data['BgBorderColor'] || 'e0e0e0';
                            ThumbnailsOrder = data['ThumbnailsOrder'] || 'random';
                            ResponsiveEnabled = data['ResponsiveEnabled'] || 'true';
                            UltraResponsiveEnabled = data['UltraResponsiveEnabled'] || 'true';

                            ThumbnailsPosition = data['ThumbnailsPosition'] || 'horizontal';
                            ThumbnailsBgColor = data['ThumbnailsBgColor'] || 'ffffff';
                            ThumbnailsBgAlpha = parseInt(data['ThumbnailsBgAlpha']);
                            ThumbnailsBorderSize = parseInt(data['ThumbnailsBorderSize']);
                            ThumbnailsBorderColor = data['ThumbnailsBorderColor'] || 'e0e0e0';
                            ThumbnailsSpacing = parseInt(data['ThumbnailsSpacing']);
                            ThumbnailsMarginTop = parseInt(data['ThumbnailsMarginTop']);
                            ThumbnailsMarginRight = parseInt(data['ThumbnailsMarginRight']);
                            ThumbnailsMarginBottom = parseInt(data['ThumbnailsMarginBottom']);
                            ThumbnailsMarginLeft = parseInt(data['ThumbnailsMarginLeft']);
                            ThumbnailsPaddingTop = parseInt(data['ThumbnailsPaddingTop']);
                            ThumbnailsPaddingRight = parseInt(data['ThumbnailsPaddingRight']);
                            ThumbnailsPaddingBottom = parseInt(data['ThumbnailsPaddingBottom']);
                            ThumbnailsPaddingLeft = parseInt(data['ThumbnailsPaddingLeft']);
                            ThumbnailsInfo = data['ThumbnailsInfo'] || 'label';

                            ThumbnailsNavigationEasing = data['ThumbnailsNavigationEasing'] || 'linear';
                            ThumbnailsNavigationLoop = data['ThumbnailsNavigationLoop'] || 'false';

                            ThumbnailsNavigationMouseEnabled = data['ThumbnailsNavigationMouseEnabled'] || 'false';
                            ThumbnailsNavigationMouseSpeed = parseInt(data['ThumbnailsNavigationMouseSpeed']);

                            ThumbnailsNavigationScrollEnabled = data['ThumbnailsNavigationScrollEnabled'] || 'false';
                            ThumbnailsScrollPosition = data['ThumbnailsScrollPosition'] || 'bottom/right';
                            ThumbnailsScrollSize = parseInt(data['ThumbnailsScrollSize']);
                            ThumbnailsScrollScrubColor = data['ThumbnailsScrollScrubColor'] || '808080';
                            ThumbnailsScrollBarColor = data['ThumbnailsScrollBarColor'] || 'e0e0e0';                   

                            ThumbnailsNavigationArrowsEnabled = data['ThumbnailsNavigationArrowsEnabled'] || 'true';
                            ThumbnailsNavigationArrowsNoItemsSlide = parseInt(data['ThumbnailsNavigationArrowsNoItemsSlide']);
                            ThumbnailsNavigationArrowsSpeed = parseInt(data['ThumbnailsNavigationArrowsSpeed']);
                            ThumbnailsNavigationPrev = data['ThumbnailsNavigationPrev'] || 'dopts/assets/gui/images/ThumbnailsPrev.png';
                            ThumbnailsNavigationPrevHover = data['ThumbnailsNavigationPrevHover'] || 'dopts/assets/gui/images/ThumbnailsPrevHover.png';
                            ThumbnailsNavigationPrevDisabled = data['ThumbnailsNavigationPrevDisabled'] || 'dopts/assets/gui/images/ThumbnailsPrevDisabled.png';
                            ThumbnailsNavigationNext = data['ThumbnailsNavigationNext'] || 'dopts/assets/gui/images/ThumbnailsNext.png';
                            ThumbnailsNavigationNextHover = data['ThumbnailsNavigationNextHover'] || 'dopts/assets/gui/images/ThumbnailsNextHover.png';
                            ThumbnailsNavigationNextDisabled = data['ThumbnailsNavigationNextDisabled'] || 'dopts/assets/gui/images/ThumbnailsNextDisabled.png';

                            ThumbnailLoader = data['ThumbnailLoader'] || 'dopts/assets/gui/images/ThumbnailLoader.gif';
                            ThumbnailWidth = parseInt(data['ThumbnailWidth']);
                            ThumbnailHeight = parseInt(data['ThumbnailHeight']);
                            ThumbnailAlpha = parseInt(data['ThumbnailAlpha']);
                            ThumbnailAlphaHover = parseInt(data['ThumbnailAlphaHover']);
                            ThumbnailBgColor = data['ThumbnailBgColor'] || 'f1f1f1';
                            ThumbnailBgColorHover = data['ThumbnailBgColorHover'] || 'f1f1f1';
                            ThumbnailBorderSize = parseInt(data['ThumbnailBorderSize']);
                            ThumbnailBorderColor = data['ThumbnailBorderColor'] || 'd0d0d0';
                            ThumbnailBorderColorHover = data['ThumbnailBorderColorHover'] || '303030';
                            ThumbnailPaddingTop = parseInt(data['ThumbnailPaddingTop']);
                            ThumbnailPaddingRight = parseInt(data['ThumbnailPaddingRight']);
                            ThumbnailPaddingBottom = parseInt(data['ThumbnailPaddingBottom']);
                            ThumbnailPaddingLeft = parseInt(data['ThumbnailPaddingLeft']);

                            LightboxEnabled = data['LightboxEnabled'] || 'true';
                            LightboxDisplayTime = parseInt(data['LightboxDisplayTime']);
                            LightboxWindowColor = data['LightboxWindowColor'] || 'ffffff';
                            LightboxWindowAlpha = parseInt(data['LightboxWindowAlpha']);
                            LightboxLoader = data['LightboxLoader'] || 'dopts/assets/gui/images/LightboxLoader.gif';
                            LightboxBgColor = data['LightboxBgColor'] || 'ffffff';
                            LightboxBgAlpha = parseInt(data['LightboxBgAlpha']);
                            LightboxBorderSize = parseInt(data['LightboxBorderSize']);
                            LightboxBorderColor = data['LightboxBorderColor'] || 'e0e0e0';
                            LightboxCaptionTextColor = data['LightboxCaptionTextColor'] || '999999';
                            LightboxMarginTop = parseInt(data['LightboxMarginTop']);
                            LightboxMarginRight = parseInt(data['LightboxMarginRight']);
                            LightboxMarginBottom = parseInt(data['LightboxMarginBottom']);
                            LightboxMarginLeft = parseInt(data['LightboxMarginLeft']);
                            LightboxPaddingTop = parseInt(data['LightboxPaddingTop']);
                            LightboxPaddingRight = parseInt(data['LightboxPaddingRight']);
                            LightboxPaddingBottom = parseInt(data['LightboxPaddingBottom']);
                            LightboxPaddingLeft = parseInt(data['LightboxPaddingLeft']);

                            LightboxNavigationPrev = data['LightboxNavigationPrev'] || 'dopts/assets/gui/images/LightboxPrev.png';
                            LightboxNavigationPrevHover = data['LightboxNavigationPrevHover'] || 'dopts/assets/gui/images/LightboxPrevHover.png';
                            LightboxNavigationNext = data['LightboxNavigationNext'] || 'dopts/assets/gui/images/LightboxNext.png';
                            LightboxNavigationNextHover = data['LightboxNavigationNextHover'] || 'dopts/assets/gui/images/LightboxNextHover.png';
                            LightboxNavigationClose = data['LightboxNavigationClose'] || 'dopts/assets/gui/images/LightboxClose.png';
                            LightboxNavigationCloseHover = data['LightboxNavigationCloseHover'] || 'dopts/assets/gui/images/LightboxCloseHover.png';
                            LightboxNavigationInfoBgColor = data['LightboxNavigationInfoBgColor'] || 'ffffff';
                            LightboxNavigationInfoTextColor = data['LightboxNavigationInfoTextColor'] || 'c0c0c0';
                            LightboxNavigationDisplayTime = parseInt(data['LightboxNavigationDisplayTime']);
                            LightboxNavigationTouchDeviceSwipeEnabled = data['LightboxNavigationTouchDeviceSwipeEnabled'] || 'true';
                            
                            SocialShareEnabled = data['SocialShareEnabled'] || 'false';
                            SocialShareLightbox = data['SocialShareLightbox'] || 'dopts/assets/gui/images/SocialShareLightbox.png';

                            TooltipBgColor = data['TooltipBgColor'] || 'ffffff';
                            TooltipStrokeColor = data['TooltipStrokeColor'] || '000000';
                            TooltipTextColor = data['TooltipTextColor'] || '000000';

                            LabelPosition = data['LabelPosition'] || 'bottom';
                            LabelAlwaysVisible = data['LabelAlwaysVisible'] || 'false';
                            LabelUnderHeight = parseInt(data['LabelUnderHeight']);
                            LabelBgColor = data['LabelBgColor'] || '000000';
                            LabelBgAlpha = parseInt(data['LabelBgAlpha']);
                            LabelTextColor = data['LabelTextColor'] || 'ffffff';

                            SlideshowEnabled = data['SlideshowEnabled'] || 'false';
                            SlideshowTime = parseInt(data['SlideshowTime']);
                            SlideshowLoop = data['SlideshowLoop'] || 'false';
                                                        
                            if (Data['ContentDataType'] == 'XML'){
                                methods.parseXMLContent();
                            }
                            else if (Data['ContentDataType'] == 'JSON'){
                                methods.parseJSONContent();                                
                            }
                            else{
                                methods.parseHTMLContent();
                            }
                        });
                    },
                    parseXMLSettings:function(){// Parse the Settings XML.
                        $.ajax({type:"GET", url:prototypes.acaoBuster(Data['SettingsFilePath']), dataType:"xml", success:function(xml){
                            var $xml = $(xml);
                                
                            Width = parseInt($xml.find('Width').text());
                            Height = parseInt($xml.find('Height').text());
                            BgColor = $xml.find('BgColor').text() || 'ffffff';
                            BgAlpha = parseInt($xml.find('BgAlpha').text());
                            BgBorderSize = parseInt($xml.find('BgBorderSize').text());
                            BgBorderColor = $xml.find('BgBorderColor').text() || 'e0e0e0';
                            ThumbnailsOrder = $xml.find('ThumbnailsOrder').text() || 'random';
                            ResponsiveEnabled = $xml.find('ResponsiveEnabled').text() || 'true';
                            UltraResponsiveEnabled = $xml.find('UltraResponsiveEnabled').text() || 'true';

                            ThumbnailsPosition = $xml.find('ThumbnailsPosition').text() || 'horizontal';
                            ThumbnailsBgColor = $xml.find('ThumbnailsBgColor').text() || 'ffffff';
                            ThumbnailsBgAlpha = parseInt($xml.find('ThumbnailsBgAlpha').text());
                            ThumbnailsBorderSize = parseInt($xml.find('ThumbnailsBorderSize').text());
                            ThumbnailsBorderColor = $xml.find('ThumbnailsBorderColor').text() || 'e0e0e0';
                            ThumbnailsSpacing = parseInt($xml.find('ThumbnailsSpacing').text());
                            ThumbnailsMarginTop = parseInt($xml.find('ThumbnailsMarginTop').text());
                            ThumbnailsMarginRight = parseInt($xml.find('ThumbnailsMarginRight').text());
                            ThumbnailsMarginBottom = parseInt($xml.find('ThumbnailsMarginBottom').text());
                            ThumbnailsMarginLeft = parseInt($xml.find('ThumbnailsMarginLeft').text());
                            ThumbnailsPaddingTop = parseInt($xml.find('ThumbnailsPaddingTop').text());
                            ThumbnailsPaddingRight = parseInt($xml.find('ThumbnailsPaddingRight').text());
                            ThumbnailsPaddingBottom = parseInt($xml.find('ThumbnailsPaddingBottom').text());
                            ThumbnailsPaddingLeft = parseInt($xml.find('ThumbnailsPaddingLeft').text());
                            ThumbnailsInfo = $xml.find('ThumbnailsInfo').text() || 'label';

                            ThumbnailsNavigationEasing = $xml.find('ThumbnailsNavigationEasing').text() || 'linear';
                            ThumbnailsNavigationLoop = $xml.find('ThumbnailsNavigationLoop').text() || 'false';

                            ThumbnailsNavigationMouseEnabled = $xml.find('ThumbnailsNavigationMouseEnabled').text() || 'false';
                            ThumbnailsNavigationMouseSpeed = parseInt($xml.find('ThumbnailsNavigationMouseSpeed').text());

                            ThumbnailsNavigationScrollEnabled = $xml.find('ThumbnailsNavigationScrollEnabled').text() || 'false';
                            ThumbnailsScrollPosition = $xml.find('ThumbnailsScrollPosition').text() || 'bottom/right';
                            ThumbnailsScrollSize = parseInt($xml.find('ThumbnailsScrollSize').text());
                            ThumbnailsScrollScrubColor = $xml.find('ThumbnailsScrollScrubColor').text() || '808080'
                            ThumbnailsScrollBarColor = $xml.find('ThumbnailsScrollBarColor').text() || 'e0e0e0';                    

                            ThumbnailsNavigationArrowsEnabled = $xml.find('ThumbnailsNavigationArrowsEnabled').text() || 'true';
                            ThumbnailsNavigationArrowsNoItemsSlide = parseInt($xml.find('ThumbnailsNavigationArrowsNoItemsSlide').text());
                            ThumbnailsNavigationArrowsSpeed = parseInt($xml.find('ThumbnailsNavigationArrowsSpeed').text());
                            ThumbnailsNavigationPrev = $xml.find('ThumbnailsNavigationPrev').text() || 'dopts/assets/gui/images/ThumbnailsPrev.png';
                            ThumbnailsNavigationPrevHover = $xml.find('ThumbnailsNavigationPrevHover').text() || 'dopts/assets/gui/images/ThumbnailsPrevHover.png';
                            ThumbnailsNavigationPrevDisabled = $xml.find('ThumbnailsNavigationPrevDisabled').text() || 'dopts/assets/gui/images/ThumbnailsPrevDisabled.png';
                            ThumbnailsNavigationNext = $xml.find('ThumbnailsNavigationNext').text() || 'dopts/assets/gui/images/ThumbnailsNext.png';
                            ThumbnailsNavigationNextHover = $xml.find('ThumbnailsNavigationNextHover').text() || 'dopts/assets/gui/images/ThumbnailsNextHover.png';
                            ThumbnailsNavigationNextDisabled = $xml.find('ThumbnailsNavigationNextDisabled').text() || 'dopts/assets/gui/images/ThumbnailsNextDisabled.png';

                            ThumbnailLoader = $xml.find('ThumbnailLoader').text() || 'dopts/assets/gui/images/ThumbnailLoader.gif';
                            ThumbnailWidth = parseInt($xml.find('ThumbnailWidth').text());
                            ThumbnailHeight = parseInt($xml.find('ThumbnailHeight').text());
                            ThumbnailAlpha = parseInt($xml.find('ThumbnailAlpha').text());
                            ThumbnailAlphaHover = parseInt($xml.find('ThumbnailAlphaHover').text());
                            ThumbnailBgColor = $xml.find('ThumbnailBgColor').text() || 'f1f1f1';
                            ThumbnailBgColorHover = $xml.find('ThumbnailBgColorHover').text() || 'f1f1f1';
                            ThumbnailBorderSize = parseInt($xml.find('ThumbnailBorderSize').text());
                            ThumbnailBorderColor = $xml.find('ThumbnailBorderColor').text() || 'd0d0d0';
                            ThumbnailBorderColorHover = $xml.find('ThumbnailBorderColorHover').text() || '303030';
                            ThumbnailPaddingTop = parseInt($xml.find('ThumbnailPaddingTop').text());
                            ThumbnailPaddingRight = parseInt($xml.find('ThumbnailPaddingRight').text());
                            ThumbnailPaddingBottom = parseInt($xml.find('ThumbnailPaddingBottom').text());
                            ThumbnailPaddingLeft = parseInt($xml.find('ThumbnailPaddingLeft').text());

                            LightboxEnabled = $xml.find('LightboxEnabled').text() || 'true';
                            LightboxDisplayTime = parseInt($xml.find('LightboxDisplayTime').text());
                            LightboxWindowColor = $xml.find('LightboxWindowColor').text() || 'ffffff';
                            LightboxWindowAlpha = parseInt($xml.find('LightboxWindowAlpha').text());
                            LightboxLoader = $xml.find('LightboxLoader').text() || 'dopts/assets/gui/images/LightboxLoader.gif';
                            LightboxBgColor = $xml.find('LightboxBgColor').text() || 'ffffff';
                            LightboxBgAlpha = parseInt($xml.find('LightboxBgAlpha').text());
                            LightboxBorderSize = parseInt($xml.find('LightboxBorderSize').text());
                            LightboxBorderColor = $xml.find('LightboxBorderColor').text() || 'e0e0e0';
                            LightboxCaptionTextColor = $xml.find('LightboxCaptionTextColor').text() || '999999';
                            LightboxMarginTop = parseInt($xml.find('LightboxMarginTop').text());
                            LightboxMarginRight = parseInt($xml.find('LightboxMarginRight').text());
                            LightboxMarginBottom = parseInt($xml.find('LightboxMarginBottom').text());
                            LightboxMarginLeft = parseInt($xml.find('LightboxMarginLeft').text());
                            LightboxPaddingTop = parseInt($xml.find('LightboxPaddingTop').text());
                            LightboxPaddingRight = parseInt($xml.find('LightboxPaddingRight').text());
                            LightboxPaddingBottom = parseInt($xml.find('LightboxPaddingBottom').text());
                            LightboxPaddingLeft = parseInt($xml.find('LightboxPaddingLeft').text());

                            LightboxNavigationPrev = $xml.find('LightboxNavigationPrev').text() || 'dopts/assets/gui/images/LightboxPrev.png';
                            LightboxNavigationPrevHover = $xml.find('LightboxNavigationPrevHover').text() || 'dopts/assets/gui/images/LightboxPrevHover.png';
                            LightboxNavigationNext = $xml.find('LightboxNavigationNext').text() || 'dopts/assets/gui/images/LightboxNext.png';
                            LightboxNavigationNextHover = $xml.find('LightboxNavigationNextHover').text() || 'dopts/assets/gui/images/LightboxNextHover.png';
                            LightboxNavigationClose = $xml.find('LightboxNavigationClose').text() || 'dopts/assets/gui/images/LightboxClose.png';
                            LightboxNavigationCloseHover = $xml.find('LightboxNavigationCloseHover').text() || 'dopts/assets/gui/images/LightboxCloseHover.png';
                            LightboxNavigationInfoBgColor = $xml.find('LightboxNavigationInfoBgColor').text() || 'ffffff';
                            LightboxNavigationInfoTextColor = $xml.find('LightboxNavigationInfoTextColor').text() || 'c0c0c0';
                            LightboxNavigationDisplayTime = parseInt($xml.find('LightboxNavigationDisplayTime').text());
                            LightboxNavigationTouchDeviceSwipeEnabled = $xml.find('LightboxNavigationTouchDeviceSwipeEnabled').text() || 'true';
                            
                            SocialShareEnabled = $xml.find('SocialShareEnabled').text() || 'false';
                            SocialShareLightbox = $xml.find('SocialShareLightbox').text() || 'dopts/assets/gui/images/SocialShareLightbox.png';

                            TooltipBgColor = $xml.find('TooltipBgColor').text() || 'ffffff';
                            TooltipStrokeColor = $xml.find('TooltipStrokeColor').text() || '000000';
                            TooltipTextColor =  $xml.find('TooltipTextColor').text() ||'000000';

                            LabelPosition = $xml.find('LabelPosition').text() || 'bottom';
                            LabelAlwaysVisible = $xml.find('LabelAlwaysVisible').text() || 'false';
                            LabelUnderHeight = parseInt($xml.find('LabelUnderHeight').text());
                            LabelBgColor = $xml.find('LabelBgColor').text() || '000000';
                            LabelBgAlpha = parseInt($xml.find('LabelBgAlpha').text());
                            LabelTextColor = $xml.find('LabelTextColor').text() || 'ffffff';   

                            SlideshowEnabled = $xml.find('SlideshowEnabled').text() || 'false';
                            SlideshowTime = parseInt($xml.find('SlideshowTime').text());
                            SlideshowLoop = $xml.find('SlideshowLoop').text() || 'false';
                                             
                            if (Data['ContentDataType'] == 'XML'){
                                methods.parseXMLContent();
                            }
                            else if (Data['ContentDataType'] == 'JSON'){
                                methods.parseJSONContent();                                
                            }
                            else{
                                methods.parseHTMLContent();
                            }
                        }});
                    },  
                    parseHTMLSettings:function(){// Parse Settings.     
                        Width = parseInt($('.Settings li.Width', Container).html());
                        Height = parseInt($('.Settings li.Height', Container).html());
                        BgColor = $('.Settings li.BgColor', Container).html() || 'ffffff';
                        BgAlpha = parseInt($('.Settings li.BgAlpha', Container).html());
                        BgBorderSize = parseInt($('.Settings li.BgBorderSize', Container).html());
                        BgBorderColor = $('.Settings li.BgBorderColor', Container).html() || 'e0e0e0';
                        ThumbnailsOrder = $('.Settings li.ThumbnailsOrder', Container).html() || 'random';
                        ResponsiveEnabled = $('.Settings li.ResponsiveEnabled', Container).html() || 'true';
                        UltraResponsiveEnabled = $('.Settings li.UltraResponsiveEnabled', Container).html() || 'true';

                        ThumbnailsPosition = $('.Settings li.ThumbnailsPosition', Container).html() || 'horizontal';
                        ThumbnailsBgColor = $('.Settings li.ThumbnailsBgColor', Container).html() || 'ffffff';
                        ThumbnailsBgAlpha = parseInt($('.Settings li.ThumbnailsBgAlpha', Container).html());
                        ThumbnailsBorderSize = parseInt($('.Settings li.ThumbnailsBorderSize', Container).html());
                        ThumbnailsBorderColor = $('.Settings li.ThumbnailsBorderColor', Container).html() || 'e0e0e0';
                        ThumbnailsSpacing = parseInt($('.Settings li.ThumbnailsSpacing', Container).html());
                        ThumbnailsMarginTop = parseInt($('.Settings li.ThumbnailsMarginTop', Container).html());
                        ThumbnailsMarginRight = parseInt($('.Settings li.ThumbnailsMarginRight', Container).html());
                        ThumbnailsMarginBottom = parseInt($('.Settings li.ThumbnailsMarginBottom', Container).html());
                        ThumbnailsMarginLeft = parseInt($('.Settings li.ThumbnailsMarginLeft', Container).html());
                        ThumbnailsPaddingTop = parseInt($('.Settings li.ThumbnailsPaddingTop', Container).html());
                        ThumbnailsPaddingRight = parseInt($('.Settings li.ThumbnailsPaddingRight', Container).html());
                        ThumbnailsPaddingBottom = parseInt($('.Settings li.ThumbnailsPaddingBottom', Container).html());
                        ThumbnailsPaddingLeft = parseInt($('.Settings li.ThumbnailsPaddingLeft', Container).html());
                        ThumbnailsInfo = $('.Settings li.ThumbnailsInfo', Container).html() || 'label';

                        ThumbnailsNavigationEasing = $('.Settings li.ThumbnailsNavigationEasing', Container).html() || 'linear';
                        ThumbnailsNavigationLoop = $('.Settings li.ThumbnailsNavigationLoop', Container).html() || 'false';

                        ThumbnailsNavigationMouseEnabled = $('.Settings li.ThumbnailsNavigationMouseEnabled', Container).html() || 'false';
                        ThumbnailsNavigationMouseSpeed = parseInt($('.Settings li.ThumbnailsNavigationMouseSpeed', Container).html());

                        ThumbnailsNavigationScrollEnabled = $('.Settings li.ThumbnailsNavigationScrollEnabled', Container).html() || 'false';
                        ThumbnailsScrollPosition = $('.Settings li.ThumbnailsScrollPosition', Container).html() || 'bottom/right';
                        ThumbnailsScrollSize = parseInt($('.Settings li.ThumbnailsScrollSize', Container).html());
                        ThumbnailsScrollScrubColor = $('.Settings li.ThumbnailsScrollScrubColor', Container).html() || '808080';
                        ThumbnailsScrollBarColor = $('.Settings li.ThumbnailsScrollBarColor', Container).html() || 'e0e0e0';                   

                        ThumbnailsNavigationArrowsEnabled = $('.Settings li.ThumbnailsNavigationArrowsEnabled', Container).html() || 'true';
                        ThumbnailsNavigationArrowsNoItemsSlide = parseInt($('.Settings li.ThumbnailsNavigationArrowsNoItemsSlide', Container).html());
                        ThumbnailsNavigationArrowsSpeed = parseInt($('.Settings li.ThumbnailsNavigationArrowsSpeed', Container).html());
                        ThumbnailsNavigationPrev = $('.Settings li.ThumbnailsNavigationPrev', Container).html() || 'dopts/assets/gui/images/ThumbnailsPrev.png';
                        ThumbnailsNavigationPrevHover = $('.Settings li.ThumbnailsNavigationPrevHover', Container).html() || 'dopts/assets/gui/images/ThumbnailsPrevHover.png';
                        ThumbnailsNavigationPrevDisabled = $('.Settings li.ThumbnailsNavigationPrevDisabled', Container).html() || 'dopts/assets/gui/images/ThumbnailsPrevDisabled.png';
                        ThumbnailsNavigationNext = $('.Settings li.ThumbnailsNavigationNext', Container).html() || 'dopts/assets/gui/images/ThumbnailsNext.png';
                        ThumbnailsNavigationNextHover = $('.Settings li.ThumbnailsNavigationNextHover', Container).html() || 'dopts/assets/gui/images/ThumbnailsNextHover.png';
                        ThumbnailsNavigationNextDisabled = $('.Settings li.ThumbnailsNavigationNextDisabled', Container).html() || 'dopts/assets/gui/images/ThumbnailsNextDisabled.png';

                        ThumbnailLoader = $('.Settings li.ThumbnailLoader', Container).html() || 'dopts/assets/gui/images/ThumbnailLoader.gif';
                        ThumbnailWidth = parseInt($('.Settings li.ThumbnailWidth', Container).html());
                        ThumbnailHeight = parseInt($('.Settings li.ThumbnailHeight', Container).html());
                        ThumbnailAlpha = parseInt($('.Settings li.ThumbnailAlpha', Container).html());
                        ThumbnailAlphaHover = parseInt($('.Settings li.ThumbnailAlphaHover', Container).html());
                        ThumbnailBgColor = $('.Settings li.ThumbnailBgColor', Container).html() || 'f1f1f1';
                        ThumbnailBgColorHover = $('.Settings li.ThumbnailBgColorHover', Container).html() || 'f1f1f1';
                        ThumbnailBorderSize = parseInt($('.Settings li.ThumbnailBorderSize', Container).html());
                        ThumbnailBorderColor = $('.Settings li.ThumbnailBorderColor', Container).html() || 'd0d0d0';
                        ThumbnailBorderColorHover = $('.Settings li.ThumbnailBorderColorHover', Container).html() || '303030';
                        ThumbnailPaddingTop = parseInt($('.Settings li.ThumbnailPaddingTop', Container).html());
                        ThumbnailPaddingRight = parseInt($('.Settings li.ThumbnailPaddingRight', Container).html());
                        ThumbnailPaddingBottom = parseInt($('.Settings li.ThumbnailPaddingBottom', Container).html());
                        ThumbnailPaddingLeft = parseInt($('.Settings li.ThumbnailPaddingLeft', Container).html());

                        LightboxEnabled = $('.Settings li.LightboxEnabled', Container).html() || 'true';
                        LightboxDisplayTime = parseInt($('.Settings li.LightboxDisplayTime', Container).html());
                        LightboxWindowColor = $('.Settings li.LightboxWindowColor', Container).html() || 'ffffff';
                        LightboxWindowAlpha = parseInt($('.Settings li.LightboxWindowAlpha', Container).html());
                        LightboxLoader = $('.Settings li.LightboxLoader', Container).html() || 'dopts/assets/gui/images/LightboxLoader.gif';
                        LightboxBgColor = $('.Settings li.LightboxBgColor', Container).html() || 'ffffff';
                        LightboxBgAlpha = parseInt($('.Settings li.LightboxBgAlpha', Container).html());
                        LightboxBorderSize = parseInt($('.Settings li.LightboxBorderSize', Container).html());
                        LightboxBorderColor = $('.Settings li.LightboxBorderColor', Container).html() || 'e0e0e0';
                        LightboxCaptionTextColor = $('.Settings li.LightboxCaptionTextColor', Container).html() || '999999';
                        LightboxMarginTop = parseInt($('.Settings li.LightboxMarginTop', Container).html());
                        LightboxMarginRight = parseInt($('.Settings li.LightboxMarginRight', Container).html());
                        LightboxMarginBottom = parseInt($('.Settings li.LightboxMarginBottom', Container).html());
                        LightboxMarginLeft = parseInt($('.Settings li.LightboxMarginLeft', Container).html());
                        LightboxPaddingTop = parseInt($('.Settings li.LightboxPaddingTop', Container).html());
                        LightboxPaddingRight = parseInt($('.Settings li.LightboxPaddingRight', Container).html());
                        LightboxPaddingBottom = parseInt($('.Settings li.LightboxPaddingBottom', Container).html());
                        LightboxPaddingLeft = parseInt($('.Settings li.LightboxPaddingLeft', Container).html());

                        LightboxNavigationPrev = $('.Settings li.LightboxNavigationPrev', Container).html() || 'dopts/assets/gui/images/LightboxPrev.png';
                        LightboxNavigationPrevHover = $('.Settings li.LightboxNavigationPrevHover', Container).html() || 'dopts/assets/gui/images/LightboxPrevHover.png';
                        LightboxNavigationNext = $('.Settings li.LightboxNavigationNext', Container).html() || 'dopts/assets/gui/images/LightboxNext.png';
                        LightboxNavigationNextHover = $('.Settings li.LightboxNavigationNextHover', Container).html() || 'dopts/assets/gui/images/LightboxNextHover.png';
                        LightboxNavigationClose = $('.Settings li.LightboxNavigationClose', Container).html() || 'dopts/assets/gui/images/LightboxClose.png';
                        LightboxNavigationCloseHover = $('.Settings li.LightboxNavigationCloseHover', Container).html() || 'dopts/assets/gui/images/LightboxCloseHover.png';
                        LightboxNavigationInfoBgColor = $('.Settings li.LightboxNavigationInfoBgColor', Container).html() || 'ffffff';
                        LightboxNavigationInfoTextColor = $('.Settings li.LightboxNavigationInfoTextColor', Container).html() || 'c0c0c0';
                        LightboxNavigationDisplayTime = parseInt($('.Settings li.LightboxNavigationDisplayTime', Container).html());
                        LightboxNavigationTouchDeviceSwipeEnabled = $('.Settings li.LightboxNavigationTouchDeviceSwipeEnabled', Container).html() || 'true';
                            
                        SocialShareEnabled = $('.Settings li.SocialShareEnabled', Container).html() || 'false';
                        SocialShareLightbox = $('.Settings li.SocialShareLightbox', Container).html() || 'dopts/assets/gui/images/SocialShareLightbox.png';

                        TooltipBgColor = $('.Settings li.TooltipBgColor', Container).html() || 'ffffff';
                        TooltipStrokeColor = $('.Settings li.TooltipStrokeColor', Container).html() || '000000';
                        TooltipTextColor = $('.Settings li.TooltipTextColor', Container).html() || '000000';

                        LabelPosition = $('.Settings li.LabelPosition', Container).html() || 'bottom';
                        LabelAlwaysVisible = $('.Settings li.LabelAlwaysVisible', Container).html() || 'false';
                        LabelUnderHeight = parseInt($('.Settings li.LabelUnderHeight', Container).html());
                        LabelBgColor = $('.Settings li.LabelBgColor', Container).html() || '000000';
                        LabelBgAlpha = parseInt($('.Settings li.LabelBgAlpha', Container).html());
                        LabelTextColor = $('.Settings li.LabelTextColor', Container).html() || 'ffffff';

                        SlideshowEnabled = $('.Settings li.SlideshowEnabled', Container).html() || 'false';
                        SlideshowTime = parseInt($('.Settings li.SlideshowTime', Container).html());
                        SlideshowLoop = $('.Settings li.SlideshowLoop', Container).html() || 'false';

                        if (Data['ContentDataType'] == 'XML'){
                            methods.parseXMLContent();
                        }
                        else if (Data['ContentDataType'] == 'JSON'){
                            methods.parseJSONContent();                                
                        }
                        else{
                            methods.parseHTMLContent();
                        }
                    },
                    parseJSONContent:function(){// Parse Content.
                        $.getJSON(prototypes.acaoBuster(Data['ContentFilePath']), {}, function(data){
                            $.each(data, function(index){
                                $.each(data[index], function(key){
                                    switch (key){
                                        case 'Image':
                                            Images.push(prototypes.acaoBuster(data[index][key]));break;
                                        case 'Thumb':
                                            Thumbs.push(prototypes.acaoBuster(data[index][key]));break;
                                        case 'Title':
                                            Title.push(data[index][key]);break;
                                        case 'Caption':
                                            Caption.push(data[index][key]);break;
                                        case 'Media':
                                            Media.push(data[index][key]);break;
                                        case 'LightboxMedia':
                                            LightboxMedia.push(data[index][key]);break;
                                        case 'Link':
                                            Link.push(data[index][key]);break;
                                        case 'Target':
                                            Target.push(data[index][key]);break;
                                    }
                                });
                            });
                            
                            noThumbs = Thumbs.length;                                   
                            initialWidth = Width;
                            initialHeight = Height;
                            initialThumbnailWidth = ThumbnailWidth;
                            initialThumbnailHeight = ThumbnailHeight;

                            if (ThumbnailsOrder == 'random'){
                                methods.randomizeThumbnails();
                            }                               

                            if (ThumbnailsNavigationLoop == 'true'){  
                                totalNoThumbs = noThumbs+(noThumbs*methods.initLoop(1));  
                            }
                            else{
                                totalNoThumbs = noThumbs;
                            }

                            if (ResponsiveEnabled == 'true'){  
                                methods.rpResponsive();   
                            }

                            methods.initScroller();
                        });
                    },
                    parseXMLContent:function(){// Parse the Content XML. 
                        $.ajax({type:"GET", url:prototypes.acaoBuster(Data['ContentFilePath']), dataType:"xml", success:function(xml){  
                            $(xml).find('Image').each(function(){
                                Images.push(prototypes.acaoBuster($(this).text()));
                            });
                            $(xml).find('Thumb').each(function(){
                                Thumbs.push(prototypes.acaoBuster($(this).text()));
                            });   
                            $(xml).find('Title').each(function(){
                                Title.push($(this).text());
                            }); 
                            $(xml).find('Caption').each(function(){
                                Caption.push($(this).text());
                            });       
                            $(xml).find('Media').each(function(){
                                Media.push($(this).text());
                            });   
                            $(xml).find('LightboxMedia').each(function(){
                                LightboxMedia.push($(this).text());
                            }); 
                            $(xml).find('Link').each(function(){
                                Link.push($(this).text());
                            });
                            $(xml).find('Target').each(function(){
                                Target.push($(this).text());
                            });
                            
                            noThumbs = Thumbs.length;                                     
                            initialWidth = Width;
                            initialHeight = Height;
                            initialThumbnailWidth = ThumbnailWidth;
                            initialThumbnailHeight = ThumbnailHeight;

                            if (ThumbnailsOrder == 'random'){
                                methods.randomizeThumbnails();
                            }                               

                            if (ThumbnailsNavigationLoop == 'true'){ 
                                totalNoThumbs = noThumbs+(noThumbs*methods.initLoop(1));   
                            }
                            else{
                                totalNoThumbs = noThumbs;
                            }

                            if (ResponsiveEnabled == 'true'){  
                                methods.rpResponsive();   
                            }

                            methods.initScroller();
                        }});
                    },  
                    parseHTMLContent:function(){// Parse Content.
                        $('.Content li', Container).each(function(){
                            Images.push(prototypes.acaoBuster($('.Image', this).attr('src')));
                            Thumbs.push(prototypes.acaoBuster($('.Thumb', this).attr('src')));
                            Title.push($('.Title', this).html());
                            Caption.push($('.Caption', this).html());
                            Media.push($('.Media', this).html());
                            LightboxMedia.push($('.LightboxMedia', this).html());
                            Link.push($('.Link', this).html());
                            Target.push($('.Target', this).html());
                        });
                            
                        noThumbs = Thumbs.length;                                        
                        initialWidth = Width;
                        initialHeight = Height;
                        initialThumbnailWidth = ThumbnailWidth;
                        initialThumbnailHeight = ThumbnailHeight;

                        if (ThumbnailsOrder == 'random'){
                            methods.randomizeThumbnails();
                        }                               

                        if (ThumbnailsNavigationLoop == 'true'){ 
                            totalNoThumbs = noThumbs+(noThumbs*methods.initLoop(1));    
                        }
                        else{
                            totalNoThumbs = noThumbs;
                        }

                        if (ResponsiveEnabled == 'true'){  
                            methods.rpResponsive();   
                        }

                        methods.initScroller();
                    },    
                    
                    randomizeThumbnails:function(){
                        var indexes = new Array(), i,
                        auxImages = new Array(),
                        auxThumbs = new Array(),
                        auxTitle = new Array(),
                        auxCaption = new Array(),
                        auxMedia = new Array(),
                        auxLightboxMedia = new Array(),
                        auxLink = new Array(),
                        auxTarget = new Array();
                        
                        for (i=0; i<noThumbs; i++){
                            indexes[i] = i;
                            auxImages[i] = Images[i];
                            auxThumbs[i] = Thumbs[i];
                            auxTitle[i] = Title[i];
                            auxCaption[i] = Caption[i];
                            auxMedia[i] = Media[i];
                            auxLightboxMedia[i] = LightboxMedia[i];
                            auxLink[i] = Link[i];
                            auxTarget[i] = Target[i];
                        }
                        
                        indexes =  prototypes.randomize(indexes);
                        
                        for (i=0; i<noThumbs; i++){
                            Images[i] = auxImages[indexes[i]];
                            Thumbs[i] = auxThumbs[indexes[i]];
                            Title[i] = auxTitle[indexes[i]];
                            Caption[i] = auxCaption[indexes[i]];
                            Media[i] = auxMedia[indexes[i]];
                            LightboxMedia[i] = auxLightboxMedia[indexes[i]];
                            Link[i] = auxLink[indexes[i]];
                            Target[i] = auxTarget[indexes[i]];
                        }
                    },
                    initScroller:function(){// Init the Scroller
                        var HTML = new Array(),
                        LightboxHTML = new Array();

                        HTML.push('<div class="DOP_ThumbnailScroller_Container">');

                        HTML.push('   <div class="DOP_ThumbnailScroller_Background"></div>');

                        HTML.push('   <div class="DOP_ThumbnailScroller_ThumbnailsContainer">');
                        HTML.push('       <div class="DOP_ThumbnailScroller_ThumbnailsBg"></div>');
                        if (ThumbnailsNavigationScrollEnabled == 'true'){
                            HTML.push('       <div class="DOP_ThumbnailScroller_ThumbnailsScroll">');
                            HTML.push('           <div class="DOP_ThumbnailScroller_ThumbnailsScrollScrub"></div>');
                            HTML.push('       </div>');   
                        }
                        HTML.push('       <div class="DOP_ThumbnailScroller_ThumbnailsWrapper">');
                        HTML.push('           <div class="DOP_ThumbnailScroller_Thumbnails"></div>');
                        HTML.push('       </div>');   
                        HTML.push('   </div>');                  
                        if (ThumbnailsNavigationArrowsEnabled == 'true'){                            
                            HTML.push('  <div class="DOP_ThumbnailScroller_ThumbnailsNavigationPrev">');
                            HTML.push('      <img src="'+ThumbnailsNavigationPrev+'" class="normal" alt="" />');
                            HTML.push('      <img src="'+ThumbnailsNavigationPrevHover+'" class="hover" alt="" />');  
                            HTML.push('      <img src="'+ThumbnailsNavigationPrevDisabled+'" class="disabled" alt="" />');  
                            HTML.push('  </div>');
                            HTML.push('  <div class="DOP_ThumbnailScroller_ThumbnailsNavigationNext">');
                            HTML.push('      <img src="'+ThumbnailsNavigationNext+'" class="normal" alt="" />');
                            HTML.push('      <img src="'+ThumbnailsNavigationNextHover+'" class="hover" alt="" />');  
                            HTML.push('      <img src="'+ThumbnailsNavigationNextDisabled+'" class="disabled" alt="" />');  
                            HTML.push('  </div>');
                        }
                        
                        if (LightboxEnabled == 'true'){
                            LightboxHTML.push('   <div class="DOP_ThumbnailScroller_LightboxWrapper" id="DOP_ThumbnailScroller_LightboxWrapper_'+ID+'">');
                            LightboxHTML.push('       <div class="DOP_ThumbnailScroller_LightboxWindow"></div>');
                            LightboxHTML.push('       <div class="DOP_ThumbnailScroller_LightboxLoader"><img src="'+LightboxLoader+'" alt="" /></div>');
                            LightboxHTML.push('       <div class="DOP_ThumbnailScroller_LightboxContainer">');
                            LightboxHTML.push('           <div class="DOP_ThumbnailScroller_LightboxBg"></div>');
                            LightboxHTML.push('           <div class="DOP_ThumbnailScroller_Lightbox"></div>');
                            LightboxHTML.push('           <div class="DOP_ThumbnailScroller_LightboxCaption"></div>');
                            LightboxHTML.push('           <div class="DOP_ThumbnailScroller_LightboxNavigation">');
                            LightboxHTML.push('               <div class="DOP_ThumbnailScroller_LightboxNavigation_PrevBtn">');
                            LightboxHTML.push('                   <img src="'+LightboxNavigationPrev+'" class="normal" alt="" />');
                            LightboxHTML.push('                   <img src="'+LightboxNavigationPrevHover+'" class="hover" alt="" />');   
                            LightboxHTML.push('               </div>');   
                            LightboxHTML.push('               <div class="DOP_ThumbnailScroller_LightboxNavigation_NextBtn">');
                            LightboxHTML.push('                   <img src="'+LightboxNavigationNext+'" class="normal" alt="" />');
                            LightboxHTML.push('                   <img src="'+LightboxNavigationNextHover+'" class="hover" alt="" />');   
                            LightboxHTML.push('               </div>');   
                            LightboxHTML.push('               <div class="DOP_ThumbnailScroller_LightboxNavigation_CloseBtn">');
                            LightboxHTML.push('                   <img src="'+LightboxNavigationClose+'" class="normal" alt="" />');
                            LightboxHTML.push('                   <img src="'+LightboxNavigationCloseHover+'" class="hover" alt="" />');   
                            LightboxHTML.push('               </div>');  
                            
                            if (SocialShareEnabled == 'true'){
                                LightboxHTML.push('                    <div class="DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn"></div>');
                            } 
                            LightboxHTML.push('               <div class="DOP_ThumbnailScroller_LightboxNavigation_Info">');
                            LightboxHTML.push('                   <span class="current"></span> / '+noThumbs);
                            LightboxHTML.push('               </div>');                                   
                            LightboxHTML.push('           </div>');
                            LightboxHTML.push('       </div>');
                            LightboxHTML.push('   </div>');
                        }
                        
                        if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                            HTML.push('   <div class="DOP_ThumbnailScroller_Tooltip"></div>');
                        }

                        HTML.push('</div>');

                        Container.html(HTML.join(''));
                        
                        if (LightboxEnabled == 'true'){
                            $('body').append(LightboxHTML.join(''));
                        }
                        
                        methods.initSettings();
                    },
                    initSettings:function(){// Init Settings
                        methods.initContainer();
                        methods.initBackground();
                        
                        if (noThumbs > 0){
                            methods.initThumbnails();
                            
                            if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                                methods.initTooltip();
                            }
                            if (LightboxEnabled == 'true'){
                                methods.initLightbox();
                        
                                if (SocialShareEnabled == 'true'){
                                    methods.initSocialShare();
                                }
                            }
                            if (SlideshowEnabled == 'true'){
                                methods.initSlideshow();
                            }
                        }
                        else{
                            $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css('display', 'none');
                        }
                    },
                    initRP:function(){// Init Resize & Positioning
                        if (ResponsiveEnabled == 'true'){   
                            methods.rpResponsive();                                
                            methods.rpContainer();
                            methods.rpBackground();
                            
                            if (UltraResponsiveEnabled == 'true'){
                                methods.rpUltraResponsiveThumbnails();
                            }
                            else{
                                methods.rpThumbnails();
                            }

                            if (LightboxEnabled == 'true'){
                                if (lightboxCurrentImage != 0){
                                    if (LightboxMedia[lightboxCurrentImage-1] == ''){
                                        methods.rpLightboxImage();
                                    }
                                    else{
                                        methods.rpLightboxMedia();
                                    }
                                }
                            }
                        }
                    },
                    initRPScroll:function(){
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css({'margin-top': ($(window).height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height())/2+$(window).scrollTop(),
                                                                                                                         'margin-left': ($(window).width()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width())/2+$(window).scrollLeft()});    
                    },
                    rpResponsive:function(){   
                        var hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            if ($(Container).width() < initialWidth){
                                Width = $(Container).width();
                                
                                if (UltraResponsiveEnabled == 'true'){
                                    ThumbnailWidth = Math.round(initialThumbnailWidth*Width/initialWidth);
                                    ThumbnailHeight = ThumbnailWidth*initialThumbnailHeight/initialThumbnailWidth;
                                    Height = initialHeight-(initialThumbnailHeight-ThumbnailHeight);
                                }
                            }
                            else{
                                Width = initialWidth;
                                
                                if (UltraResponsiveEnabled == 'true'){
                                    Height = initialHeight;
                                    ThumbnailWidth = initialThumbnailWidth;
                                    ThumbnailHeight = initialThumbnailHeight;
                                }
                            }
                        }
                        else{
                            if ($(Container).height() < initialHeight && $(Container).height() != 0){
                                Height = $(Container).height();    
                                
                                if (UltraResponsiveEnabled == 'true'){
                                    ThumbnailHeight = Math.round(initialThumbnailHeight*Height/initialHeight);
                                    ThumbnailWidth = ThumbnailHeight*initialThumbnailWidth/initialThumbnailHeight;
                                    Width = initialWidth-(initialThumbnailWidth-ThumbnailWidth);
                                }                            
                            }
                            else{
                                Height = initialHeight;
                                
                                if (UltraResponsiveEnabled == 'true'){
                                    Width = initialWidth;
                                    ThumbnailHeight = initialThumbnailHeight;
                                    ThumbnailWidth = initialThumbnailWidth;
                                }
                            }                            
                        }
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    initLoop:function(level){
                        var thumbnailWidth = ThumbnailWidth+2*ThumbnailBorderSize+ThumbnailPaddingRight+ThumbnailPaddingLeft,
                        thumbnailHeight = ThumbnailHeight+2*ThumbnailBorderSize+ThumbnailPaddingTop+ThumbnailPaddingBottom,
                        i;
                        
                        for (i=0; i<noThumbs; i++){
                            Images.push(Images[i]);
                            Thumbs.push(Thumbs[i]);
                            Title.push(Title[i]);
                            Caption.push(Caption[i]);
                            Media.push(Media[i]);
                            LightboxMedia.push(LightboxMedia[i]);
                            Link.push(Link[i]);
                            Target.push(Target[i]);
                        }  
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            if (noThumbs*level*(thumbnailWidth+ThumbnailsSpacing) < 2*(initialWidth+thumbnailWidth+ThumbnailsSpacing)){
                                return methods.initLoop(level+1)+1;
                            }
                            else{
                                return 1;
                            }
                        }
                        else{
                            if (noThumbs*level*(thumbnailHeight+ThumbnailsSpacing) < 2*(initialHeight+thumbnailHeight+ThumbnailsSpacing)){
                                return methods.initLoop(level+1)+1;
                            }
                            else{
                                return 1;
                            }                          
                        }
                    },

                    initContainer:function(){// Init Scroller Container
                        $('.DOP_ThumbnailScroller_Container', Container).css('display', 'block');
                        methods.rpContainer();
                    },
                    rpContainer:function(){// Resize & Position the Container
                        $('.DOP_ThumbnailScroller_Container', Container).width(Width);
                        $('.DOP_ThumbnailScroller_Container', Container).height(Height);
                    },

                    initBackground:function(){// Init Background
                        $('.DOP_ThumbnailScroller_Background', Container).css({'background-color': '#'+BgColor,
                                                                               'opacity': BgAlpha/100,
                                                                               'border-width': BgBorderSize,
                                                                               'border-color': '#'+BgBorderColor});
                        methods.rpBackground();
                    },
                    rpBackground:function(){// Resize & Position Background
                        $('.DOP_ThumbnailScroller_Background', Container).width(Width-2*BgBorderSize);
                        $('.DOP_ThumbnailScroller_Background', Container).height(Height-2*BgBorderSize);
                    },
                    
                    initThumbnails:function(){// Init Thumbnails
                        $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css('background-color', '#'+ThumbnailsBgColor);
                        $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css('opacity', ThumbnailsBgAlpha/100);
                        $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css('border-color', '#'+ThumbnailsBorderColor);
                        $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css('border-width', ThumbnailsBorderSize);

                        methods.rpThumbnails();
                             
                        if (prototypes.isTouchDevice()){
                            if (!prototypes.isAndroid() || !prototypes.isChromeMobileBrowser()){
                                methods.touchNavigation($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_Thumbnails', Container));
                            }
                        }
                             
                        if (ThumbnailsNavigationMouseEnabled == 'true'){
                            methods.moveThumbnails();
                        }
                        
                        if (ThumbnailsNavigationScrollEnabled == 'true' && ThumbnailsNavigationLoop == 'false'){
                            methods.initThumbnailsScroll();
                            methods.setThumbnailsScroll();
                        }
                        
                        if (ThumbnailsNavigationArrowsEnabled == 'true'){
                            methods.initThumbnailsArrows();
                            methods.setThumbnailsArrows();
                        }
                                                
                        if (Media[0] != ''){
                            methods.loadThumbMedia(1);
                        }
                        else{
                            methods.loadThumb(1);
                        }
                    },
                    loadThumb:function(no){// Load Thumbnail No
                        methods.initThumb(no);
                        var img = new Image();
                        
                        $(img).load(function(){
                            $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).html(this);
                            $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no+' img').attr('alt', Title[no-1]);
                            methods.loadCompleteThumb(no);
                            
                            if (no < totalNoThumbs){
                                if (Media[no] != ''){
                                    methods.loadThumbMedia(no+1);
                                }
                                else{
                                    methods.loadThumb(no+1);
                                }
                            }
                        }).attr('src', Thumbs[no-1]);
                    },
                    loadThumbMedia:function(no){// Load Thumbnail No
                        methods.initThumb(no);
                        $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).html(Media[no-1]);
                        
                        var iframeSRC =  $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().attr('src');
                        
                        if (iframeSRC != null){
                            if (iframeSRC.indexOf('?') != -1){
                                $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().attr('src', iframeSRC+'&wmode=transparent');                                
                            }
                            else{
                                $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().attr('src', iframeSRC+'?wmode=transparent');
                            }
                        }
                        
                        methods.loadCompleteThumb(no);
                            
                        if (no < totalNoThumbs){
                            if (Media[no] != ''){
                                methods.loadThumbMedia(no+1);
                            }
                            else{
                                methods.loadThumb(no+1);
                            }
                        }                        
                    },
                    initThumb:function(no){// Init Thumbnail
                        var ThumbHTML = new Array(),
                        thumbnailWidth = ThumbnailWidth+2*ThumbnailBorderSize+ThumbnailPaddingRight+ThumbnailPaddingLeft,
                        thumbnailWidthNB = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft,
                        thumbnailHeightNB = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+(LabelPosition == 'under' ? LabelUnderHeight:0);
                        
                        ThumbHTML.push('<div class="DOP_ThumbnailScroller_ThumbContainer" id="DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+'">');
                        ThumbHTML.push('   <div class="DOP_ThumbnailScroller_Thumb" id="DOP_ThumbnailScroller_Thumb_'+ID+'_'+no+'"></div>');
                        
                        if (ThumbnailsInfo == 'label' && (Title[no-1] != '' || LabelPosition == 'under')){
                            ThumbHTML.push('   <div class="label">');
                            ThumbHTML.push('       <div class="bg"></div>');
                            ThumbHTML.push('       <div class="text">'+Title[no-1]+'</div>');
                            ThumbHTML.push('   </div>');
                        }
                        ThumbHTML.push('</div>');
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            if (no == 1){
                                $('.DOP_ThumbnailScroller_Thumbnails', Container).width($('.DOP_ThumbnailScroller_Thumbnails', Container).width()+thumbnailWidth);
                            }
                            else{
                                $('.DOP_ThumbnailScroller_Thumbnails', Container).width($('.DOP_ThumbnailScroller_Thumbnails', Container).width()+thumbnailWidth+ThumbnailsSpacing);
                            }
                        }

                        $('.DOP_ThumbnailScroller_Thumbnails', Container).append(ThumbHTML.join(""));

                        $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no).css({'background-color': '#'+ThumbnailBgColor,
                                                                                   'border-color': '#'+ThumbnailBorderColor,
                                                                                   'border-width': ThumbnailBorderSize,
                                                                                   'height': thumbnailHeightNB,
                                                                                   'opacity': ThumbnailAlpha/100,
                                                                                   'width': thumbnailWidthNB});
                        $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no, Container).css({'margin-top': ThumbnailPaddingTop,
                                                                                     'margin-left': ThumbnailPaddingLeft,
                                                                                     'margin-bottom': ThumbnailPaddingBottom,
                                                                                     'margin-right': ThumbnailPaddingRight});
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no, Container).css('float', 'left');
                        }

                        if (no != '1'){
                            if (ThumbnailsPosition == 'horizontal'){
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no, Container).css('margin-left', ThumbnailsSpacing);
                            }
                            else{
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no, Container).css('margin-top', ThumbnailsSpacing);
                            }
                        }

                        $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no, Container).addClass('DOP_ThumbnailScroller_ThumbLoader');
                        $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+'.DOP_ThumbnailScroller_ThumbLoader', Container).css('background-image', 'url('+ThumbnailLoader+')');

                        if (ThumbnailsPosition == 'horizontal'){
                            if ($('.DOP_ThumbnailScroller_Thumbnails', Container).width() <= $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                prototypes.hCenterItem($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_Thumbnails', Container), $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width());
                            }
                            else if (parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) >= 0){
                                $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', 0);
                            }
                        }
                        else{
                            if ($('.DOP_ThumbnailScroller_Thumbnails', Container).height() <= $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                prototypes.vCenterItem($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_Thumbnails', Container), $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height());
                            }
                            else if (parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) >= 0){
                                $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', 0);
                            }
                        }
                        
                        ThumbsLoaded[no] = false;
                    },
                    loadCompleteThumb:function(no){// Thumbnail Load complete event
                        var hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        ThumbsLoaded[no] = true;
                        
                        $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+'.DOP_ThumbnailScroller_ThumbLoader').css('background-image', 'none');
                        $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no).removeClass('DOP_ThumbnailScroller_ThumbLoader');

                        if (Media[no-1] == ''){
                            prototypes.resizeItem2($('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no), $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children(), ThumbnailWidth, ThumbnailHeight, $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().width(), $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().height(), 'center');
                        }
                        
                        $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().css('opacity', 0);
                        $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().stop(true, true).animate({'opacity':'1'}, 600);
                        
                        methods.rpThumbnails();
                        
                        if (ThumbnailsInfo == 'label' && (Title[no-1] != '' || LabelPosition == 'under')){
                            if (LabelPosition == 'bottom' || LabelPosition == 'under'){
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css({'bottom': 0,
                                                                                                     'margin-left': ThumbnailPaddingLeft,
                                                                                                     'margin-bottom': ThumbnailPaddingBottom});
                            }
                            else{
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css({'margin-left': ThumbnailPaddingLeft,
                                                                                                     'margin-top': ThumbnailPaddingTop,
                                                                                                     'top': 0});
                            }
                            
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css({'display': 'block',
                                                                                                 'width': ThumbnailWidth});
                            if (LabelPosition == 'under'){
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').height(LabelUnderHeight);
                            }                                                                                             
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .bg').css({'background-color': '#'+LabelBgColor,
                                                                                                     'height': LabelPosition == 'under' ? LabelUnderHeight:$('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').height()+parseFloat($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').css('padding-top'))+parseFloat($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').css('padding-bottom')),
                                                                                                     'opacity': LabelBgAlpha/100,
                                                                                                     'width': ThumbnailWidth});
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').css('color', '#'+LabelTextColor);
                        
                            if (LabelAlwaysVisible == 'true' && ThumbnailsInfo == 'label' && (Title[no-1] != '' || LabelPosition == 'under')){
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css('display', 'block');    
                            }
                            else{
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css('display', 'none');
                            }
                        }
                        
                        if (!prototypes.isTouchDevice()){
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no, Container).hover(function(){
                                $(this).stop(true, true).animate({'opacity':ThumbnailAlphaHover/100}, 300);
                                $(this).css('background-color', '#'+ThumbnailBgColorHover);
                                $(this).css('border-color', '#'+ThumbnailBorderColorHover);

                                if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                                    methods.showTooltip(no-1);
                                }

                                if (LabelAlwaysVisible == 'false' && ThumbnailsInfo == 'label' && Title[no-1] != ''){
                                    $('.label', this).stop(true, true).fadeIn(600);
                                }
                            },
                            function(){
                                $(this).stop(true, true).animate({'opacity': ThumbnailAlpha/100}, 300);
                                $(this).css('background-color', '#'+ThumbnailBgColor);
                                $(this).css('border-color', '#'+ThumbnailBorderColor);

                                if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                                    $('.DOP_ThumbnailScroller_Tooltip', Container).css('display', 'none');
                                }

                                if (LabelAlwaysVisible == 'false' && ThumbnailsInfo == 'label' && Title[no-1] != ''){
                                    $('.label', this).stop(true, true).fadeOut(600);
                                }
                            });
                        }
                        
                        if (Link[no-1] == 'none'){
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no).css('cursor', 'default');
                        }
                        else{
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no).click(function(){
                                if (Link[no-1] != ''){
                                    prototypes.openLink(Link[no-1], Target[no-1]);
                                }
                                else{
                                    if (LightboxEnabled ==  'true'){
                                        methods.showLightbox(no);
                                    }
                                }
                            });
                        }
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    rpThumbnails:function(){// Resize & Position the Thumbnails
                        var hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'height': 2*ThumbnailsBorderSize+ThumbnailHeight+(2*ThumbnailBorderSize)+ThumbnailPaddingTop+ThumbnailPaddingBottom+ThumbnailsPaddingTop+ThumbnailsPaddingBottom+(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0)+(LabelPosition == 'under' ? LabelUnderHeight:0),
                                                                                            'margin-top': ThumbnailsMarginTop+BgBorderSize,
                                                                                            'margin-right': ThumbnailsMarginRight,
                                                                                            'margin-bottom': ThumbnailsMarginBottom+BgBorderSize,
                                                                                            'margin-left': ThumbnailsMarginLeft,
                                                                                            'width': $('.DOP_ThumbnailScroller_Container', Container).width()-ThumbnailsMarginRight-ThumbnailsMarginLeft});
                            
                            if (ThumbnailsNavigationArrowsEnabled == 'true'){
                                $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'margin-left': $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).width()+ThumbnailsMarginLeft, 
                                                                                                'width': $('.DOP_ThumbnailScroller_Container', Container).width()-ThumbnailsMarginRight-ThumbnailsMarginLeft-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).width()});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css({'display': 'block',
                                                                                                     'margin-left': 0,
                                                                                                     'margin-top': (Height-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).height())/2});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css({'display': 'block',
                                                                                                     'margin-left': Width-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).width(),
                                                                                                     'margin-top': (Height-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).height())/2});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'none');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'none');
                            }
                            
                            $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css({'background-color': '#'+ThumbnailsBgColor,
                                                                                     'border-color': ThumbnailsBorderColor,
                                                                                     'border-size': ThumbnailsBorderSize,
                                                                                     'height': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).height()-2*ThumbnailsBorderSize,
                                                                                     'opacity': '#'+ThumbnailsBgAlpha,
                                                                                     'width': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).width()-2*ThumbnailsBorderSize});
                            $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).css({'height': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).height()-ThumbnailsPaddingTop-ThumbnailsPaddingBottom-(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0),
                                                                                          'margin-top': ThumbnailsPaddingTop+ThumbnailsBorderSize,
                                                                                          'margin-right': ThumbnailsPaddingRight,
                                                                                          'margin-bottom': ThumbnailsPaddingBottom+ThumbnailsBorderSize,
                                                                                          'margin-left': ThumbnailsPaddingLeft,
                                                                                          'width': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).width()-ThumbnailsPaddingRight-ThumbnailsPaddingLeft});

                            if ($('.DOP_ThumbnailScroller_Thumbnails', Container).width() <= $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                prototypes.hCenterItem($('.DOP_ThumbnailScroller_ThumbnailsContainer', Container), $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).width());
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'none');                                    
                                }
                            }
                            else{   
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'block');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'block');
                             
                                if (parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) >= 0){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', 0);
                                }
                                
                                if ($('.DOP_ThumbnailScroller_Thumbnails', Container).width()+parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()-$('.DOP_ThumbnailScroller_Thumbnails', Container).width());
                                }
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'block');                                    
                                }
                            }
                        }
                        else if (ThumbnailsPosition == 'vertical'){    
                            $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'height': $('.DOP_ThumbnailScroller_Container', Container).height()-ThumbnailsMarginTop-ThumbnailsMarginBottom,
                                                                                            'margin-top': ThumbnailsMarginTop,
                                                                                            'margin-right': ThumbnailsMarginRight+BgBorderSize,
                                                                                            'margin-bottom': ThumbnailsMarginBottom,
                                                                                            'margin-left': ThumbnailsMarginLeft+BgBorderSize,
                                                                                            'width': 2*ThumbnailsBorderSize+ThumbnailWidth+(2*ThumbnailBorderSize)+ThumbnailPaddingRight+ThumbnailPaddingLeft+ThumbnailsPaddingRight+ThumbnailsPaddingLeft+(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0)});
                                
                            if (ThumbnailsNavigationArrowsEnabled == 'true'){
                                $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'margin-top': $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev').height()+ThumbnailsMarginTop, 
                                                                                                'height': $('.DOP_ThumbnailScroller_Container', Container).height()-ThumbnailsMarginTop-ThumbnailsMarginBottom-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev').height()-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext').height()});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css({'display': 'block',
                                                                                                     'margin-left': (Width-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev').width())/2,
                                                                                                     'margin-top': 0});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css({'display': 'block',
                                                                                                     'margin-left': (Width-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext').width())/2,
                                                                                                     'margin-top': Height-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext').height()});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'none');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'none');
                            }
                            
                            $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css({'background-color': '#'+ThumbnailsBgColor,
                                                                                     'border-color': ThumbnailsBorderColor,
                                                                                     'border-size': ThumbnailsBorderSize,
                                                                                     'height': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).height()-2*ThumbnailsBorderSize,
                                                                                     'opacity': '#'+ThumbnailsBgAlpha,
                                                                                     'width': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).width()-2*ThumbnailsBorderSize});
                            $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).css({'height': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).height()-ThumbnailsPaddingTop-ThumbnailsPaddingBottom,
                                                                                          'margin-top': ThumbnailsPaddingTop,
                                                                                          'margin-right': ThumbnailsPaddingRight+ThumbnailsBorderSize,
                                                                                          'margin-bottom': ThumbnailsPaddingBottom,
                                                                                          'margin-left': ThumbnailsPaddingLeft+ThumbnailsBorderSize,
                                                                                          'width': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).width()-ThumbnailsPaddingRight-ThumbnailsPaddingLeft-(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0)});

                            if ($('.DOP_ThumbnailScroller_Thumbnails', Container).height() <= $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                prototypes.vCenterItem($('.DOP_ThumbnailScroller_ThumbnailsContainer', Container), $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).height());
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'none');                                    
                                }
                            }
                            else{   
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'block');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'block');
                             
                                if (parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) >= 0){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', 0);
                                }        
                                
                                if ($('.DOP_ThumbnailScroller_Thumbnails', Container).height()+parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()-$('.DOP_ThumbnailScroller_Thumbnails', Container).height());
                                }
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'block');                                    
                                }
                            }
                        }
                        
                        
                        if (ThumbnailsNavigationArrowsEnabled == 'true' && ($('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).width() < 2 || $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).width() < 2)){
                            setTimeout(function(){
                                methods.rpThumbnails();
                            }, 100);
                        }
                        
                        if (ThumbnailsNavigationScrollEnabled == 'true'){
                            methods.rpThumbnailsScroll();
                        }
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    rpUltraResponsiveThumbnails:function(){// Resize & Position the Thumbnails
                        var hiddenBustedItems = prototypes.doHideBuster($(Container)), no,
                        thumbnailWidth = ThumbnailWidth+2*ThumbnailBorderSize+ThumbnailPaddingRight+ThumbnailPaddingLeft,
                        thumbnailWidthNB = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft,
                        thumbnailHeightNB = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+(LabelPosition == 'under' ? LabelUnderHeight:0);
                        
                        $('.DOP_ThumbnailScroller_Thumbnails', Container).width(0);
                        $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', 0);
                        
                        for (no=1; no<=noThumbs; no++){
                            if (ThumbnailsPosition == 'horizontal' && ThumbsLoaded[no]){
                                if (no == 1){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).width($('.DOP_ThumbnailScroller_Thumbnails', Container).width()+thumbnailWidth);
                                }
                                else{
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).width($('.DOP_ThumbnailScroller_Thumbnails', Container).width()+thumbnailWidth+ThumbnailsSpacing);
                                }
                            }
                        
                            $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no).css({'height': thumbnailHeightNB,
                                                                                       'width': thumbnailWidthNB});
                                                                               
                            if (Media[no-1] == ''){
                                prototypes.resizeItem2($('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no, Container), $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children(), ThumbnailWidth, ThumbnailHeight, $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().width(), $('#DOP_ThumbnailScroller_Thumb_'+ID+'_'+no).children().height(), 'center');
                            }
                        }
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'height': 2*ThumbnailsBorderSize+ThumbnailHeight+(2*ThumbnailBorderSize)+ThumbnailPaddingTop+ThumbnailPaddingBottom+ThumbnailsPaddingTop+ThumbnailsPaddingBottom+(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0)+(LabelPosition == 'under' ? LabelUnderHeight:0),
                                                                                            'width': $('.DOP_ThumbnailScroller_Container', Container).width()-ThumbnailsMarginRight-ThumbnailsMarginLeft});
                            
                            if (ThumbnailsNavigationArrowsEnabled == 'true'){
                                $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'margin-left': $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).width()+ThumbnailsMarginLeft, 
                                                                                                'width': $('.DOP_ThumbnailScroller_Container', Container).width()-ThumbnailsMarginRight-ThumbnailsMarginLeft-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).width()});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css({'display': 'block',
                                                                                                     'margin-left': 0,
                                                                                                     'margin-top': (Height-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).height())/2});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css({'display': 'block',
                                                                                                     'margin-left': Width-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).width(),
                                                                                                     'margin-top': (Height-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).height())/2});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'none');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'none');
                            }
                            
                            $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css({'height': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).height()-2*ThumbnailsBorderSize,
                                                                                     'width': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).width()-2*ThumbnailsBorderSize});
                            $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).css({'height': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).height()-ThumbnailsPaddingTop-ThumbnailsPaddingBottom-(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0),
                                                                                          'width': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).width()-ThumbnailsPaddingRight-ThumbnailsPaddingLeft});

                            if ($('.DOP_ThumbnailScroller_Thumbnails', Container).width() <= $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                prototypes.hCenterItem($('.DOP_ThumbnailScroller_ThumbnailsContainer', Container), $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).width());
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'none');                                    
                                }
                            }
                            else{   
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'block');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'block');
                             
                                if (parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) >= 0){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', 0);
                                }
                                
                                if ($('.DOP_ThumbnailScroller_Thumbnails', Container).width()+parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()-$('.DOP_ThumbnailScroller_Thumbnails', Container).width());
                                }
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'block');                                    
                                }
                            }
                        }
                        else if (ThumbnailsPosition == 'vertical'){    
                            $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'height': $('.DOP_ThumbnailScroller_Container', Container).height()-ThumbnailsMarginTop-ThumbnailsMarginBottom,
                                                                                            'width': 2*ThumbnailsBorderSize+ThumbnailWidth+(2*ThumbnailBorderSize)+ThumbnailPaddingRight+ThumbnailPaddingLeft+ThumbnailsPaddingRight+ThumbnailsPaddingLeft+(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0)});
                                
                            if (ThumbnailsNavigationArrowsEnabled == 'true'){
                                $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).css({'margin-top': $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev').height()+ThumbnailsMarginTop, 
                                                                                                'height': $('.DOP_ThumbnailScroller_Container', Container).height()-ThumbnailsMarginTop-ThumbnailsMarginBottom-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev').height()-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext').height()});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css({'display': 'block',
                                                                                                     'margin-left': (Width-$('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev').width())/2,
                                                                                                     'margin-top': 0});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css({'display': 'block',
                                                                                                     'margin-left': (Width-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext').width())/2,
                                                                                                     'margin-top': Height-$('.DOP_ThumbnailScroller_ThumbnailsNavigationNext').height()});
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'none');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'none');
                            }
                            
                            $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).css({'height': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).height()-2*ThumbnailsBorderSize,
                                                                                     'width': $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).width()-2*ThumbnailsBorderSize});
                            $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).css({'height': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).height()-ThumbnailsPaddingTop-ThumbnailsPaddingBottom,
                                                                                          'width': $('.DOP_ThumbnailScroller_ThumbnailsBg', Container).width()-ThumbnailsPaddingRight-ThumbnailsPaddingLeft-(ThumbnailsNavigationScrollEnabled == 'true' ? ThumbnailsSpacing+ThumbnailsScrollSize:0)});

                            if ($('.DOP_ThumbnailScroller_Thumbnails', Container).height() <= $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                prototypes.vCenterItem($('.DOP_ThumbnailScroller_ThumbnailsContainer', Container), $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container), $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).height());
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'none');                                    
                                }
                            }
                            else{   
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).css('display', 'block');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).css('display', 'block');
                             
                                if (parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) >= 0){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', 0);
                                }        
                                
                                if ($('.DOP_ThumbnailScroller_Thumbnails', Container).height()+parseInt($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()-$('.DOP_ThumbnailScroller_Thumbnails', Container).height());
                                }
                                
                                if (ThumbnailsNavigationScrollEnabled == 'true'){
                                    $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('display', 'block');                                    
                                }
                            }
                        }
                        
                        
                        if (ThumbnailsNavigationArrowsEnabled == 'true' && ($('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).width() < 2 || $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).width() < 2)){
                            setTimeout(function(){
                                methods.rpThumbnails();
                            }, 100);
                        }
                        
                        if (ThumbnailsNavigationScrollEnabled == 'true'){
                            methods.rpThumbnailsScroll();
                        }
                        
                        for (no=1; no<=noThumbs; no++){
                            if (ThumbnailsInfo == 'label' && (Title[no-1] != '' || LabelPosition == 'under')){
                                if (LabelPosition == 'bottom' || LabelPosition == 'under'){
                                    $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css({'bottom': 0,
                                                                                                         'margin-left': ThumbnailPaddingLeft,
                                                                                                         'margin-bottom': ThumbnailPaddingBottom});
                                }
                                else{
                                    $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css({'margin-left': ThumbnailPaddingLeft,
                                                                                                         'margin-top': ThumbnailPaddingTop,
                                                                                                         'top': 0});
                                }

                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css({'display': 'block',
                                                                                                     'width': ThumbnailWidth});
                                if (LabelPosition == 'under'){
                                    $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').height(LabelUnderHeight);
                                }                                                                                             
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .bg').css({'height': LabelPosition == 'under' ? LabelUnderHeight:$('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').height()+parseFloat($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').css('padding-top'))+parseFloat($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').css('padding-bottom')),
                                                                                                         'width': ThumbnailWidth});
                                $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label .text').css('color', '#'+LabelTextColor);

                                if (LabelAlwaysVisible == 'true' && ThumbnailsInfo == 'label' && (Title[no-1] != '' || LabelPosition == 'under')){
                                    $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css('display', 'block');    
                                }
                                else{
                                    $('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+no+' .label').css('display', 'none');
                                }
                            }
                        }
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    moveThumbnails:function(){// Move Thumbnails
                        if (!prototypes.isTouchDevice()){                                
                            $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).mousemove(function(e){
                                clearInterval(SlideshowID);
                                                                                                    
                                if ((ThumbnailsPosition == 'horizontal') && $('.DOP_ThumbnailScroller_Thumbnails', Container).width() > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                    currentX = e.clientX-$(this).offset().left+parseInt($(this).css('margin-left'))+$(document).scrollLeft();
                                    
                                    if (currentX < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()/3){
                                        movePrev = true;
                                        moveNext = false;
                                        methods.moveThumbnailsPrev();
                                    }
                                    else if (currentX > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()/3*2+parseInt($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).css('margin-left'))){
                                        movePrev = false;
                                        moveNext = true;
                                        methods.moveThumbnailsNext();                                        
                                    }
                                    else{
                                        movePrev = false;
                                        moveNext = false;                                        
                                    }
                                }

                                if ((ThumbnailsPosition == 'vertical') && $('.DOP_ThumbnailScroller_Thumbnails', Container).height() > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                    currentY = e.clientY-$(this).offset().top+parseInt($(this).css('margin-top'))+$(document).scrollTop();
                                    
                                    if (currentY < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()/3){
                                        movePrev = true;
                                        moveNext = false;
                                        methods.moveThumbnailsPrev();
                                    }
                                    else if (currentY > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()/3*2+parseInt($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).css('margin-top'))){
                                        movePrev = false;
                                        moveNext = true;
                                        methods.moveThumbnailsNext();                                        
                                    }
                                    else{
                                        movePrev = false;
                                        moveNext = false;                                        
                                    }
                                    
                                }
                            });
                            
                            $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).hover(function(){
                                thumbnailsHover = true;       
                            },function(){
                                thumbnailsHover = false;
                                movePrev = false;
                                moveNext = false;
                            });
                        }
                    },
                    initThumbnailsScroll:function(){     
                        var thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize,
                        thumbnailHeight = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+2*ThumbnailBorderSize+(LabelPosition == 'under' ? LabelUnderHeight:0),
                        moveTo, previousScrubPosition =0;
                        
                        $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('background-color', '#'+ThumbnailsScrollBarColor);
                        $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('background-color', '#'+ThumbnailsScrollScrubColor);
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).height(ThumbnailsScrollSize);
                            $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).height(ThumbnailsScrollSize); 
                                                                                    
                            if (ThumbnailsScrollPosition == 'bottom/right'){
                                $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('bottom', 0);                                
                            }
                        }
                        else{     
                            $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).width(ThumbnailsScrollSize);
                            $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).width(ThumbnailsScrollSize); 
                            
                            if (ThumbnailsScrollPosition == 'bottom/right'){
                                $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).css('right', 0);                                
                            }                     
                        }
                                                   
                        $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).draggable({axis: ThumbnailsPosition == 'horizontal' ? 'x':'y',
                                                                                                containment: $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container),
                                                                                                drag: function(event, ui){
                                                                                                    clearInterval(SlideshowID);
                                                                                                    if (ThumbnailsPosition == 'horizontal'){
                                                                                                        previousScrubPosition = parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'));
                                                                                                        $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', (-1)*$('.DOP_ThumbnailScroller_Thumbnails', Container).width()*parseFloat($('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('left'))/$('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).width());
                                                                                                    }
                                                                                                    else{
                                                                                                        previousScrubPosition = parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'));
                                                                                                        $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', (-1)*$('.DOP_ThumbnailScroller_Thumbnails', Container).height()*parseFloat($('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('top'))/$('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).height());
                                                                                                    }
                                                                                                },
                                                                                                stop: function(event, ui){
                                                                                                    if (ThumbnailsPosition == 'horizontal'){
                                                                                                        if (parseFloat($('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('left')) > 0){
                                                                                                            if (previousScrubPosition < parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))){
                                                                                                                moveTo = parseInt(parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))/(thumbnailWidth+ThumbnailsSpacing))*(thumbnailWidth+ThumbnailsSpacing);
                                                                                                            }
                                                                                                            else{
                                                                                                                moveTo = (parseInt(parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))/(thumbnailWidth+ThumbnailsSpacing))-1)*(thumbnailWidth+ThumbnailsSpacing);                                                                                                            
                                                                                                            }   
                                                                                                                                                                                                                        
                                                                                                            if (moveTo < (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width())){
                                                                                                                if (SlideshowEnabled == 'true'){
                                                                                                                    SlideshowLastImage = true;                                                                                                                
                                                                                                                }
                                                                                                                moveTo = (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width());
                                                                                                            }
                                                                                                            else{                                            
                                                                                                                if (SlideshowEnabled == 'true'){
                                                                                                                    SlideshowLastImage = false;                                                                                                                
                                                                                                                }
                                                                                                            }
                                                                                                            if (moveTo > 0){
                                                                                                                moveTo = 0;
                                                                                                            }

                                                                                                            arrowsClicked = true;

                                                                                                            $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-left': moveTo}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                                                                                                arrowsClicked = false;
                                                                                                                methods.slideshow();
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                    else{  
                                                                                                        if (parseFloat($('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('top')) > 0){
                                                                                                            if (previousScrubPosition < parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))){
                                                                                                                moveTo = parseInt(parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))/(thumbnailHeight+ThumbnailsSpacing))*(thumbnailHeight+ThumbnailsSpacing);
                                                                                                            }
                                                                                                            else{
                                                                                                                moveTo = (parseInt(parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))/(thumbnailHeight+ThumbnailsSpacing))-1)*(thumbnailHeight+ThumbnailsSpacing);                                                                                                            
                                                                                                            }   
                                                                                                            
                                                                                                            if (moveTo < (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height())){                                                                                                                
                                                                                                                if (SlideshowEnabled == 'true'){
                                                                                                                    SlideshowLastImage = true;                                                                                                                
                                                                                                                }
                                                                                                                moveTo = (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height());
                                                                                                            }
                                                                                                            else{                                            
                                                                                                                if (SlideshowEnabled == 'true'){
                                                                                                                    SlideshowLastImage = false;                                                                                                                
                                                                                                                }
                                                                                                            }
                                                                                                            if (moveTo > 0){
                                                                                                                moveTo = 0;
                                                                                                            }

                                                                                                            arrowsClicked = true;

                                                                                                            $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-top': moveTo}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                                                                                                arrowsClicked = false;
                                                                                                                methods.slideshow();
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                }});   
                    },
                    setThumbnailsScroll:function(){                         
                        var position;
                        
                        if (ThumbnailsPosition == 'horizontal'){     
                            position = (-1)*$('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).width()*parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))/$('.DOP_ThumbnailScroller_Thumbnails', Container).width();
                            
                            if (position != Infinity){
                                $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('left', position);
                            }
                            else{
                                $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('left', 0);
                            }
                        }
                        else{
                            position = (-1)*$('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).height()*parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))/$('.DOP_ThumbnailScroller_Thumbnails', Container).height();
                            
                            if (position != Infinity){
                                $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('top', position);
                            }
                            else{
                                $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).css('top', 0);
                            }
                        }
                        
                        setTimeout(function(){
                            methods.setThumbnailsScroll();
                        }, 50);
                    },
                    rpThumbnailsScroll:function(){
                        if (ThumbnailsPosition == 'horizontal'){
                            $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).width($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width());
                            $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).width($('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).width()*$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()/$('.DOP_ThumbnailScroller_Thumbnails', Container).width());
                        }
                        else{
                            $('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).height($('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height());
                            $('.DOP_ThumbnailScroller_ThumbnailsScrollScrub', Container).height($('.DOP_ThumbnailScroller_ThumbnailsScroll', Container).height()*$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()/$('.DOP_ThumbnailScroller_Thumbnails', Container).height());
                        }
                    },
                    initThumbnailsArrows:function(){                        
                        $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).click(function(){
                            methods.moveThumbnailsPrev();
                        });

                        $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).click(function(){
                            methods.moveThumbnailsNext();
                        });
                        
                        if (!prototypes.isTouchDevice()){      
                            $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).hover(function(){
                                if (!$(this).hasClass('disabled')){
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .normal', Container).css('display', 'none');
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .hover', Container).css('display', 'block');
                                }
                            }, function(){
                                if (!$(this).hasClass('disabled')){
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .normal', Container).css('display', 'block');
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .hover', Container).css('display', 'none');
                                }
                            });  
                            
                            $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).hover(function(){
                                if (!$(this).hasClass('disabled')){
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .normal', Container).css('display', 'none');
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .hover', Container).css('display', 'block');
                                }
                            }, function(){
                                if (!$(this).hasClass('disabled')){
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .normal', Container).css('display', 'block');
                                    $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .hover', Container).css('display', 'none');
                                }
                            });
                        }
                    },
                    setThumbnailsArrows:function(){     
                        if (ThumbnailsPosition == 'horizontal'){                                
                            if (parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) >= 0){
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).addClass('disabled');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .normal', Container).removeAttr('style');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .hover', Container).removeAttr('style');
                            }
                            else{
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).removeClass('disabled');
                            }
                            
                            if (parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left')) <= (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width())){
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).addClass('disabled');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .normal', Container).removeAttr('style');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .hover', Container).removeAttr('style');
                            }
                            else{
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).removeClass('disabled');
                            }                            
                        }
                        else if (ThumbnailsPosition == 'vertical'){
                            if (parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) >= 0){
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).addClass('disabled');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .normal', Container).removeAttr('style');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev .hover', Container).removeAttr('style');
                            }
                            else{
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationPrev', Container).removeClass('disabled');
                            }
                            
                            if (parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top')) <= (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height())){
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).addClass('disabled');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .normal', Container).removeAttr('style');
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext .hover', Container).removeAttr('style');
                            }
                            else{
                                $('.DOP_ThumbnailScroller_ThumbnailsNavigationNext', Container).removeClass('disabled');
                            }                        
                        }
                        
                        setTimeout(function(){
                            methods.setThumbnailsArrows();
                        }, 50);
                    },
                    positionThumbnails:function(){// Position thumbnails to be displayed when hidden.
                        var thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize,
                        thumbnailHeight = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+2*ThumbnailBorderSize;
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            if ($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+lightboxCurrentImage , Container).position().left < (-1)*(parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))+ThumbnailsSpacing)){
                                methods.moveThumbnailsPrev();
                            }
                            else if ($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+lightboxCurrentImage , Container).position().left+thumbnailWidth > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()+(-1)*parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))){
                                methods.moveThumbnailsNext();
                            }
                        }
                        else{
                            if ($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+lightboxCurrentImage , Container).position().top < (-1)*(parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))+ThumbnailsSpacing)){
                                methods.moveThumbnailsPrev();
                            }
                            else if ($('#DOP_ThumbnailScroller_ThumbContainer_'+ID+'_'+lightboxCurrentImage , Container).position().top+thumbnailHeight > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()+(-1)*parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))){
                                methods.moveThumbnailsNext();
                            }                            
                        }
                    },
                    moveThumbnailsPrev:function(){      
                        var thumbnailWidth, thumbnailHeight, thumbnailsPosition;

                        if (!arrowsClicked){
                            clearInterval(SlideshowID);
                            arrowsClicked = true;
                            
                            if (ThumbnailsPosition == 'horizontal'){
                                thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize;
                                thumbnailsPosition =  parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))+ThumbnailsNavigationArrowsNoItemsSlide*(thumbnailWidth+ThumbnailsSpacing);

                                if (thumbnailsPosition <= (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width())){
                                    if (SlideshowEnabled == 'true'){
                                        SlideshowLastImage = true;                                                                                                                
                                    }
                                    thumbnailsPosition = (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width());
                                }
                                else{
                                    SlideshowLastImage = false;
                                }
                                
                                if (thumbnailsPosition > 0){
                                    thumbnailsPosition = 0;
                                }

                                $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-left': thumbnailsPosition}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                    arrowsClicked = false;
                                    
                                    if (movePrev){
                                        methods.moveThumbnailsPrev();
                                    }
                                    else{
                                        if (SlideshowStatus == 'play'){
                                            if (SlideshowLastImage){
                                                if (SlideshowLoop == 'true'){
                                                    SlideshowID = setInterval(methods.lastSlideshow, SlideshowTime);
                                                }
                                            }
                                            else{
                                                SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);                                        
                                            }                                       
                                        }
                                    }
                                });
                            }
                            else{
                                thumbnailHeight = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+2*ThumbnailBorderSize+(LabelPosition == 'under' ? LabelUnderHeight:0);
                                thumbnailsPosition =  parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))+ThumbnailsNavigationArrowsNoItemsSlide*(thumbnailHeight+ThumbnailsSpacing);

                                if (thumbnailsPosition <= (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height())){
                                    if (SlideshowEnabled == 'true'){
                                        SlideshowLastImage = true;                                                                                                                
                                    }
                                    thumbnailsPosition = (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height());
                                }
                                else{
                                    SlideshowLastImage = false;
                                }
                                
                                if (thumbnailsPosition > 0){
                                    thumbnailsPosition = 0;
                                }

                                $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-top': thumbnailsPosition}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                    arrowsClicked = false;
                                    
                                    if (movePrev){
                                        methods.moveThumbnailsPrev();
                                    }
                                    else{
                                        if (SlideshowStatus == 'play'){
                                            if (SlideshowLastImage){
                                                if (SlideshowLoop == 'true'){
                                                    SlideshowID = setInterval(methods.lastSlideshow, SlideshowTime);
                                                }
                                            }
                                            else{
                                                SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);                                        
                                            }                                       
                                        }
                                    }
                                });                      
                            }
                        }
                    },
                    moveThumbnailsNext:function(){
                        var thumbnailWidth, thumbnailHeight, thumbnailsPosition;
                        
                        if (!arrowsClicked && 
                            (($('.DOP_ThumbnailScroller_Thumbnails', Container).width() > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width() && ThumbnailsPosition == 'horizontal') || 
                            ($('.DOP_ThumbnailScroller_Thumbnails', Container).height() > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height() && ThumbnailsPosition == 'vertical'))){
                            clearInterval(SlideshowID);
                            arrowsClicked = true;

                            if (ThumbnailsPosition == 'horizontal'){
                                thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize;
                                thumbnailsPosition = parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))-ThumbnailsNavigationArrowsNoItemsSlide*(thumbnailWidth+ThumbnailsSpacing);

                                if (thumbnailsPosition <= (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width())){
                                    if (SlideshowEnabled == 'true' && ThumbnailsNavigationLoop == 'false'){
                                        SlideshowLastImage = true;                                                                                                                
                                    }
                                    thumbnailsPosition = (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).width()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width());
                                }
                                else{
                                    SlideshowLastImage = false;
                                }
                                
                                if (thumbnailsPosition > 0){
                                    thumbnailsPosition = 0;
                                }

                                $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-left': thumbnailsPosition}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                    arrowsClicked = false;
                                                                        
                                    if (ThumbnailsNavigationLoop == 'true'){   
                                        if (thumbnailsPosition <= (-1)*(noThumbs+1)*(thumbnailWidth+ThumbnailsSpacing)){
                                            $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left', (-1)*(thumbnailWidth+ThumbnailsSpacing-(noThumbs+1)*(thumbnailWidth+ThumbnailsSpacing)-parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-left'))));
                                        }
                                    }
                                    
                                    if (moveNext){
                                        if (currentX < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()/2){
                                            movePrev = true;
                                            moveNext = false;
                                            methods.moveThumbnailsPrev();
                                        }
                                        else{
                                            movePrev = false;
                                            moveNext = true;
                                            methods.moveThumbnailsNext();                                            
                                        }
                                    }
                                    else{
                                        methods.slideshow();
                                    }
                                });
                            }
                            else{
                                thumbnailHeight = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+2*ThumbnailBorderSize+(LabelPosition == 'under' ? LabelUnderHeight:0);
                                thumbnailsPosition = parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))-ThumbnailsNavigationArrowsNoItemsSlide*(thumbnailHeight+ThumbnailsSpacing);

                                if (thumbnailsPosition <= (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height())){
                                    if (SlideshowEnabled == 'true' && ThumbnailsNavigationLoop == 'false'){
                                        SlideshowLastImage = true;                                                                                                                
                                    }
                                    thumbnailsPosition = (-1)*($('.DOP_ThumbnailScroller_Thumbnails', Container).height()-$('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height());
                                }
                                else{
                                    SlideshowLastImage = false;
                                }
                                
                                if (thumbnailsPosition > 0){
                                    thumbnailsPosition = 0;
                                }

                                $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-top': thumbnailsPosition}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                    arrowsClicked = false;
                                                                        
                                    if (ThumbnailsNavigationLoop == 'true'){   
                                        if (thumbnailsPosition <= (-1)*(noThumbs+1)*(thumbnailHeight+ThumbnailsSpacing)){
                                            $('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top', (-1)*(thumbnailHeight+ThumbnailsSpacing-(noThumbs+1)*(thumbnailHeight+ThumbnailsSpacing)-parseFloat($('.DOP_ThumbnailScroller_Thumbnails', Container).css('margin-top'))));
                                        }
                                    }
                                    
                                    if (moveNext){
                                        if (currentY < $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()/2){
                                            movePrev = true;
                                            moveNext = false;
                                            methods.moveThumbnailsPrev();
                                        }
                                        else{
                                            movePrev = false;
                                            moveNext = true;
                                            methods.moveThumbnailsNext();                                            
                                        }
                                    }
                                    else{
                                        methods.slideshow();
                                    }
                                });
                            }
                        }
                        else if (SlideshowEnabled == 'true'){
                            clearInterval(SlideshowID);
                            SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);                            
                        }
                    },
                    
                    initLightbox:function(){// Init Lightbox
                        startScrollerID = prototypes.$_GET('dop_thumbnail_scroller_id') != undefined ? prototypes.$_GET('dop_thumbnail_scroller_id'):0;
                        startWith = prototypes.$_GET('dop_thumbnail_scroller_share') != undefined && startScrollerID == ID ? parseInt(prototypes.$_GET('dop_thumbnail_scroller_share')):0;
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxWindow').css({'background-color': '#'+LightboxWindowColor,
                                                                                                                      'opacity': LightboxWindowAlpha/100});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css({'border-color': '#'+LightboxBorderColor,
                                                                                                                         'border-width': LightboxBorderSize});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').css({'background-color': '#'+LightboxBgColor,
                                                                                                                  'opacity': LightboxBgAlpha/100});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').css({'color': '#'+LightboxCaptionTextColor,
                                                                                                                       'margin-top': LightboxPaddingBottom,
                                                                                                                       'margin-right': LightboxPaddingRight,
                                                                                                                       'margin-bottom': LightboxPaddingBottom,
                                                                                                                       'margin-left': LightboxPaddingLeft});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css({'background-color': '#'+LightboxNavigationInfoBgColor,
                                                                                                                               'color': '#'+LightboxNavigationInfoTextColor});                                  

                        if (!prototypes.isTouchDevice()){                                                                                                               
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').hover(function(){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation').stop(true, true).animate({'opacity': 1}, LightboxNavigationDisplayTime);
                            }, function(){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation').stop(true, true).animate({'opacity': 0}, LightboxNavigationDisplayTime);
                            });
                        
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').hover(function(){
                                $('.normal', this).css('display', 'none');
                                $('.hover', this).css('display', 'block');
                            }, function(){
                                $('.normal', this).css('display', 'block');
                                $('.hover', this).css('display', 'none');                            
                            });
                        
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').hover(function(){
                                $('.normal', this).css('display', 'none');
                                $('.hover', this).css('display', 'block');
                            }, function(){
                                $('.normal', this).css('display', 'block');
                                $('.hover', this).css('display', 'none');                            
                            });
                        
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn').hover(function(){
                                $('.normal', this).css('display', 'none');
                                $('.hover', this).css('display', 'block');
                            }, function(){
                                $('.normal', this).css('display', 'block');
                                $('.hover', this).css('display', 'none');                            
                            });
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation').css('opacity', 1);
                            
                            if (LightboxNavigationTouchDeviceSwipeEnabled == 'true'){
                                methods.lightboxNavigationSwipe();
                            }
                        }
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').click(function(){
                            methods.previousLightbox();
                        });
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').click(function(){
                            methods.nextLightbox();
                        });
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn').click(function(){
                           methods.hideLightbox();                           
                        });
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxWindow').click(function(){
                           methods.hideLightbox();                           
                        });
                        
                        $(document).keydown(function(e){
                            if (lightboxImageLoaded){
                                switch (e.keyCode){
                                    case 27:
                                        methods.hideLightbox();
                                        break;
                                    case 37:
                                        methods.previousLightbox();
                                        break;
                                    case 39:
                                        methods.nextLightbox();
                                        break;                                    
                                }
                            }
                        });
                        
                        if (startScrollerID == ID){
                            var href = window.location.href,
                            variables = 'dop_thumbnail_scroller_id='+startScrollerID+'&dop_thumbnail_scroller_share='+startWith;

                            if (href.indexOf('?'+variables) != -1){
                                variables = '?'+variables;
                            }
                            else{
                                variables = '&'+variables;
                            }
                                
                            window.location = '#DOPThumbnailScroller'+ID;
                            
                            try{
                                window.history.pushState({'html':'', 'pageTitle':document.title}, '', href.split(variables)[0]);
                            }catch(e){
                                //console.log(e);
                            }
                        }
                        
                        if (startWith != 0){
                            methods.showLightbox(startWith);
                            startWith = 0;
                        }
                    },
                    showLightbox:function(no){// Show Lightbox
                        methods.rpLightbox();
                        
                        if (SlideshowEnabled == 'true'){
                            clearInterval(SlideshowID);
                            SlideshowStatus = 'pause';
                        }
                        
                        if (prototypes.isTouchDevice()){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).css('display', 'block');  
                            
                            if (LightboxMedia[no-1] != ''){
                                methods.loadLightboxMedia(no);      
                            }
                            else{
                                methods.loadLightboxImage(no);
                            }
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).fadeIn(LightboxDisplayTime, function(){  
                                if (LightboxMedia[no-1] != ''){
                                    methods.loadLightboxMedia(no);      
                                }
                                else{
                                    methods.loadLightboxImage(no);
                                }
                            }); 
                        }
                    },
                    hideLightbox:function(){// Hide Lightbox
                        if (lightboxImageLoaded){
                            if (prototypes.isTouchDevice()){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).css('display', 'none');
                                lightboxCurrentImage = 0;
                                lightboxImageLoaded = false;
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('opacity', 0);
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').html('');

                                if (SlideshowEnabled == 'true'){
                                    SlideshowStatus = 'play';

                                    if (SlideshowLastImage){
                                        if (SlideshowLoop == 'true'){
                                            SlideshowID = setInterval(methods.lastSlideshow, SlideshowTime);
                                        }
                                    }
                                    else{
                                        SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);                                        
                                    }                                       
                                }
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).fadeOut(LightboxDisplayTime, function(){
                                    lightboxCurrentImage = 0;
                                    lightboxImageLoaded = false;
                                    $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('opacity', 0);
                                    $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').html('');

                                    if (SlideshowEnabled == 'true'){
                                        SlideshowStatus = 'play';

                                        if (SlideshowLastImage){
                                            if (SlideshowLoop == 'true'){
                                                SlideshowID = setInterval(methods.lastSlideshow, SlideshowTime);
                                            }
                                        }
                                        else{
                                            SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);                                        
                                        }                                       
                                    }
                                });
                            }
                        }
                    },
                    loadLightboxImage:function(no){// Load Lightbox Image
                        var img = new Image();   
                        lightboxImageLoaded = false;                     
                            
                        lightboxCurrentImage = no;
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info .current').html(no);
                        
                        if (no == 1){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css('display', 'none');
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css('display', 'block');
                        }
                        
                        if (no == noThumbs){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css('display', 'none');
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css('display', 'block');
                        }
                        
                        $(img).load(function(){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css('display', 'none');
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').html(this);
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox img').attr('alt', Title[no-1]);
                            
                            if (SocialShareEnabled == 'true'){
                                methods.showSocialShare();
                            }
                            lightboxImageWidth = $(this).width();
                            lightboxImageHeight = $(this).height();
                            lightboxImageLoaded = true;
                            
                            if (Caption[no-1] != ''){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').html(Caption[no-1]);
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').css('display', 'block');                                
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').html('');
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').css('display', 'none');                                
                            }
                            
                            methods.rpLightboxImage();
                            
                            if (prototypes.isTouchDevice()){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('opacity', 1);
                                methods.positionThumbnails();
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').stop(true, true).animate({'opacity': 1}, LightboxDisplayTime, function(){
                                    methods.positionThumbnails();
                                });
                            }
                        }).attr('src', Images[no-1]);
                    },
                    loadLightboxMedia:function(no){// Load Lightbox Media                                
                        lightboxCurrentImage = no;
                        lightboxImageLoaded = false;
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info .current').html(no);
                        
                        if (no == 1){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css('display', 'none');
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css('display', 'block');
                        }
                        
                        if (no == noThumbs){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css('display', 'none');
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css('display', 'block');
                        }
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css('display', 'none');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').html(LightboxMedia[no-1]);
                        
                        var iframeSRC =  $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().attr('src');

                        if (iframeSRC != null){
                            if (iframeSRC.indexOf('?') != -1){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().attr('src', iframeSRC+'&wmode=transparent');                                
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().attr('src', iframeSRC+'?wmode=transparent');
                            }
                        }
                        
                        if ($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().prop("tagName").toUpperCase() == 'IFRAME'){
                            lightboxImageWidth = parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().attr('width'));
                            lightboxImageHeight = parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().attr('height'));
                        }
                        else{
                            lightboxImageWidth = 0;
                            lightboxImageHeight = 0;
                        }

                        lightboxImageLoaded = true;
                        
                        if (SocialShareEnabled == 'true'){
                            methods.showSocialShare();
                        }
                        
                        if (Caption[no-1] != ''){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').html(Caption[no-1]);
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').css('display', 'block');                                
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').html('');
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').css('display', 'none');                                
                        }
                        
                        methods.rpLightboxMedia();
                        
                        if (prototypes.isTouchDevice()){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('opacity', 1);
                            methods.positionThumbnails();
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').stop(true, true).animate({'opacity': 1}, LightboxDisplayTime, function(){
                                methods.positionThumbnails();
                            });
                        }
                    },
                    previousLightbox:function(){
                        if (lightboxCurrentImage > 1){
                            if (prototypes.isTouchDevice()){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('opacity', 0);
                                
                                if (LightboxMedia[lightboxCurrentImage-2] != ''){
                                    methods.loadLightboxMedia(lightboxCurrentImage-1);
                                }
                                else{
                                    methods.loadLightboxImage(lightboxCurrentImage-1);
                                }
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').stop(true, true).animate({'opacity': 0}, LightboxDisplayTime, function(){
                                    if (LightboxMedia[lightboxCurrentImage-2] != ''){
                                        methods.loadLightboxMedia(lightboxCurrentImage-1);
                                    }
                                    else{
                                        methods.loadLightboxImage(lightboxCurrentImage-1);
                                    }
                                });  
                            }
                        }
                    },
                    nextLightbox:function(){
                        if (lightboxCurrentImage < noThumbs){
                            if (prototypes.isTouchDevice()){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('opacity', 0);

                                if (LightboxMedia[lightboxCurrentImage] != ''){
                                    methods.loadLightboxMedia(lightboxCurrentImage+1);
                                }
                                else{
                                    methods.loadLightboxImage(lightboxCurrentImage+1);
                                }
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').stop(true, true).animate({'opacity': 0}, LightboxDisplayTime, function(){
                                    if (LightboxMedia[lightboxCurrentImage] != ''){
                                        methods.loadLightboxMedia(lightboxCurrentImage+1);
                                    }
                                    else{
                                        methods.loadLightboxImage(lightboxCurrentImage+1);
                                    }
                                }); 
                            }     
                        }
                    },
                    rpLightbox:function(){
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).css('display', 'none');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).width($(document).width()-1);
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).height($(document).height()-1);
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxWindow').width($(document).width()-1);
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxWindow').height($(document).height()-1);
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css({'top': ($(window).height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').height())/2,
                                                                                                                     'left': ($(window).width()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').width())/2});
                        if (lightboxCurrentImage == 0){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID).css('display', 'none');                         
                        }
                        
                        if (lightboxCurrentImage == 0 || lightboxImageLoaded){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxLoader').css('display', 'none');
                        }
                    },
                    rpLightboxImage:function(){// Resize & Position Lightbox Image
                        var maxWidth = $(window).width()-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginRight)-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginLeft)-LightboxPaddingRight-LightboxPaddingLeft-2*LightboxBorderSize, 
                        maxHeight = $(window).height()-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginTop)-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginBottom)-LightboxPaddingTop-LightboxPaddingBottom-2*LightboxBorderSize,
                        currW, currH;
                        
                        methods.rpLightbox();
                        
                        if (lightboxImageLoaded){  
                            if (lightboxImageWidth <= maxWidth && lightboxImageHeight <= maxHeight){
                                currW = lightboxImageWidth;
                                currH = lightboxImageHeight;
                            }
                            else{
                                currH = maxHeight;
                                currW = (lightboxImageWidth*maxHeight)/lightboxImageHeight;

                                if (currW > maxWidth){
                                    currW = maxWidth;
                                    currH = (lightboxImageHeight*maxWidth)/lightboxImageWidth;
                                }
                            }

                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox img').width(currW);
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox img').height(currH);
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox img').css({'margin-top': LightboxPaddingTop,
                                                                                                                        'margin-left': LightboxPaddingLeft});
                            
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                            
                            if (Caption[lightboxCurrentImage-1] != ''){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height(currH+LightboxPaddingTop+2*LightboxPaddingBottom+$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').height());
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height(currH+LightboxPaddingTop+LightboxPaddingBottom);
                            }
                            
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                                                        
                            if (Caption[lightboxCurrentImage-1] != ''){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').height(currH+LightboxPaddingTop+2*LightboxPaddingBottom+$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').height());
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').height(currH+LightboxPaddingTop+LightboxPaddingBottom);
                            }
                            
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css({'margin-top': ($(window).height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height())/2+$(window).scrollTop()-LightboxBorderSize,
                                                                                                                             'margin-left': ($(window).width()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width())/2+$(window).scrollLeft()-LightboxBorderSize});
                            methods.rpLightboxNavigation();
                        }
                    },
                    rpLightboxMedia:function(){// Resize & Position Lightbox Media   
                        var maxWidth = $(window).width()-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginRight)-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginLeft)-LightboxPaddingRight-LightboxPaddingLeft-2*LightboxBorderSize,
                        maxHeight = $(window).height()-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginTop)-($(window).width() <= 640 && prototypes.isTouchDevice() ? 1:LightboxMarginBottom)-LightboxPaddingTop-LightboxPaddingBottom-2*LightboxBorderSize,
                        currW, currH;
                        
                        methods.rpLightbox();
                        
                        if (lightboxImageWidth <= maxWidth && lightboxImageHeight <= maxHeight){
                            currW = lightboxImageWidth;
                            currH = lightboxImageHeight;
                            
                            if (lightboxImageWidth == 0 && lightboxImageHeight == 0){
                                currW = $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().width(),
                                currH = $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().height();
                            }
                        }
                        else{
                            currH = maxHeight;
                            currW = (lightboxImageWidth*maxHeight)/lightboxImageHeight;

                            if (currW > maxWidth){
                                currW = maxWidth;
                                currH = (lightboxImageHeight*maxWidth)/lightboxImageWidth;
                            }
                        }
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().width(currW);
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().height(currH);
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').children().css({'margin-top': LightboxPaddingTop,
                                                                                                                           'margin-left': LightboxPaddingLeft});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_Lightbox').css({'height': currH,
                                                                                                                'width': currW});

                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                        
                        if (Caption[lightboxCurrentImage-1] != ''){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height(currH+LightboxPaddingTop+2*LightboxPaddingBottom+$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').height());
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height(currH+LightboxPaddingTop+LightboxPaddingBottom);
                        }
                            
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                        
                        if (Caption[lightboxCurrentImage-1] != ''){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').height(currH+LightboxPaddingTop+2*LightboxPaddingBottom+$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').height());
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxBg').height(currH+LightboxPaddingTop+LightboxPaddingBottom);
                        }
                        
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css({'margin-top': ($(window).height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height())/2+$(window).scrollTop()-LightboxBorderSize,
                                                                                                                         'margin-left': ($(window).width()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width())/2+$(window).scrollLeft()-LightboxBorderSize});                                                                                                                                                                                                                                              
                        methods.rpLightboxNavigation();
                    },
                    rpLightboxNavigation:function(){// Resize & Position Lightbox Navigation
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css('display', 'block');
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css({'height': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn img:first-child').height(),
                                                                                                                                  'margin-top': ($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').height())/2,
                                                                                                                                  'margin-left': -20});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css({'height': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn img:first-child').height(),
                                                                                                                                  'margin-top': ($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').height())/2,
                                                                                                                                  'margin-left': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width()-LightboxPaddingRight-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').width()+LightboxPaddingRight+20});
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn').css({'height': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn img:first-child').height(),
                                                                                                                                   'margin-top': -20,
                                                                                                                                   'margin-left': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width()-LightboxPaddingRight-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn').width()});                            
                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn').css({'height': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn img:first-child').height(),
                                                                                                                                         'margin-top': -20,
                                                                                                                                         'margin-left': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width()-LightboxPaddingRight-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn').width()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_CloseBtn').width()-10});                            
                        if (Caption[lightboxCurrentImage-1] != ''){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css({'margin-top': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height()-2*LightboxPaddingBottom-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').height()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxCaption').height(),
                                                                                                                                   'margin-left': ($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width()-($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').width()-parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css('padding-left'))-parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css('padding-right'))))/2});                                                
                        }
                        else{
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css({'margin-top': $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').height()-LightboxPaddingBottom-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').height(),
                                                                                                                                   'margin-left': ($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width()-$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').width()-parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css('padding-left'))-parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_Info').css('padding-right')))/2});                                                
                        }
                        
                        if (lightboxCurrentImage == 1){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_PrevBtn').css('display', 'none');
                        }
                        
                        if (lightboxCurrentImage == noThumbs){
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_NextBtn').css('display', 'none');
                        }
                    },
                    lightboxNavigationSwipe:function(){
                        var prev, curr, touch, initial, positionX;

                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').bind('touchstart', function(e){
                            touch = e.originalEvent.touches[0];
                            prev = touch.clientX;
                            initial = parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left')); 
                        });

                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').bind('touchmove', function(e){
                            e.preventDefault();
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation').css('opacity', 0);

                            touch = e.originalEvent.touches[0],
                            curr = touch.clientX,
                            positionX = curr>prev ? parseInt($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left'))+(curr-prev):parseInt($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left'))-(prev-curr);

                            prev = curr;
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left', positionX);
                        });

                        $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').bind('touchend', function(e){
                            if (!prototypes.isChromeMobileBrowser()){
                                e.preventDefault();
                            }
                            
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation').css('opacity', 1);
                                
                            if (parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left')) < 0 && lightboxCurrentImage < noThumbs){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css({'margin-left': initial, 'opacity': 0});
                                methods.nextLightbox();
                            }
                            else if (parseFloat($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left'))+$('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').width() > $(window).width() && lightboxCurrentImage > 1){
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css({'margin-left': initial, 'opacity': 0});
                                methods.previousLightbox();
                            }
                            else{
                                $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxContainer').css('margin-left', initial);
                            }
                        });
                    },
                                        
                    initSocialShare:function(){
                        var HTML = new Array();
                        
                        if ($('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn').html() == ''){
                            HTML.push('       <div class="addthis_toolbox addthis_default_style">');
                            HTML.push('            <a class="addthis_button" addthis:url="" addthis:title="">');
                            HTML.push('                <img src="'+SocialShareLightbox+'" alt="" />');
                            HTML.push('            </a>');
                            HTML.push('       </div>');
                        
                            $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn').html(HTML.join(''));
                        }
                    },
                    showSocialShare:function(){
                        var URL = window.location.href+(window.location.href.indexOf('?') != -1 ? '&':'?')+'dop_thumbnail_scroller_id='+ID+'&dop_thumbnail_scroller_share='+lightboxCurrentImage;
                        
                        if (window.addthis == undefined){
                            $.getScript( 'http://s7.addthis.com/js/250/addthis_widget.js' , function(){
                                if (window.addthis){ 
                                    window.addthis.ost = 0; 
                                    window.addthis.init();

                                    setTimeout(function(){
                                        window.addthis.update('share', 'url', URL);
                                        window.addthis.update('share', 'title', Title[lightboxCurrentImage-1]);
                                    }, 100);

                                    $('#at15s').css('top', parseFloat($('#at15s').css('top'))-$(window).scrollTop());
                                } 
                            }); 
                        }
                        else{
                            setTimeout(function(){
                                window.addthis.update('share', 'url', URL);
                                window.addthis.update('share', 'title', Title[lightboxCurrentImage-1]);
                            }, 100);
                        }
                        
                        clearInterval(socialShareInterval);
                        socialShareInterval = setInterval(methods.rpSocialShare, 100);
                    },
                    rpSocialShare:function(){
                        $('#at15s').css('top', $('#DOP_ThumbnailScroller_LightboxWrapper_'+ID+' .DOP_ThumbnailScroller_LightboxNavigation_SocialShareBtn').offset().top);
                    }, 
                    
                    initTooltip:function(){// Init Tooltip                        
                        $('.DOP_ThumbnailScroller_ThumbnailsContainer', Container).mousemove(function(e){
                            var mousePositionX = e.clientX-$(this).offset().left+parseInt($(this).css('margin-left'))+$(document).scrollLeft();
                            var mousePositionY = e.clientY-$(this).offset().top+parseInt($(this).css('margin-top'))+$(document).scrollTop();

                            $('.DOP_ThumbnailScroller_Tooltip', Container).css('margin-left', mousePositionX-10);
                            $('.DOP_ThumbnailScroller_Tooltip', Container).css('margin-top', mousePositionY-$('.DOP_ThumbnailScroller_Tooltip', Container).height()-15);
                        });
                    },
                    showTooltip:function(no){// Resize, Position & Display the Tooltip
                        var HTML = new Array();
                        
                        HTML.push(Title[no]);
                        HTML.push('<div class="DOP_ThumbnailScroller_Tooltip_ArrowBorder"></div>');
                        HTML.push('<div class="DOP_ThumbnailScroller_Tooltip_Arrow"></div>');
                        $('.DOP_ThumbnailScroller_Tooltip', Container).html(HTML.join(""));

                        if (TooltipBgColor != 'css'){
                            $('.DOP_ThumbnailScroller_Tooltip', Container).css('background-color', '#'+TooltipBgColor);
                            $('.DOP_ThumbnailScroller_Tooltip_Arrow', Container).css('border-top-color', '#'+TooltipBgColor);
                        }
                        if (TooltipStrokeColor != 'css'){
                            $('.DOP_ThumbnailScroller_Tooltip', Container).css('border-color', '#'+TooltipStrokeColor);
                            $('.DOP_ThumbnailScroller_Tooltip_ArrowBorder', Container).css('border-top-color', '#'+TooltipStrokeColor);
                        }
                        if (TooltipTextColor != 'css'){
                            $('.DOP_ThumbnailScroller_Tooltip', Container).css('color', '#'+TooltipTextColor);
                        }
                        if (Title[no] != '' || prototypes.isTouchDevice()){
                            $('.DOP_ThumbnailScroller_Tooltip', Container).css('display', 'block');
                        }
                    },
                    
                    initSlideshow:function(){
                        SlideshowStatus = 'play';                        
                        SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);
                    },
                    slideshow:function(){                                    
                        if (SlideshowStatus == 'play'){
                            if (SlideshowLastImage){
                                if (SlideshowLoop == 'true'){
                                    SlideshowID = setInterval(methods.lastSlideshow, SlideshowTime);
                                }
                            }
                            else{
                                SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);                                        
                            }                                       
                        }                        
                    },
                    lastSlideshow:function(){
                        arrowsClicked = true;
                        SlideshowLastImage = false;
                        clearInterval(SlideshowID);
                        
                        if (ThumbnailsPosition == 'horizontal'){
                            $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-left': 0}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                arrowsClicked = false;
                                SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);
                            });
                        }
                        else{
                            $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, false).animate({'margin-top': 0}, ThumbnailsNavigationArrowsSpeed, ThumbnailsNavigationEasing, function(){
                                arrowsClicked = false;
                                SlideshowID = setInterval(methods.moveThumbnailsNext, SlideshowTime);
                            });
                        }                        
                    },
                    
                    touchNavigation:function(parent, child){// One finger Navigation for touchscreen devices
                        var prevX, prevY, currX, currY, lastX, lastY, touch, moveTo, thumbnailsPositionX, thumbnailsPositionY,
                        thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize,
                        thumbnailHeight = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+2*ThumbnailBorderSize;
                            
                        parent.bind('touchstart', function(e){
                            touch = e.originalEvent.touches[0];
                            prevX = touch.clientX;
                            prevY = touch.clientY;
                        });
                            
                        parent.bind('touchmove', function(e){
                            touch = e.originalEvent.touches[0];
                            currX = touch.clientX;
                            currY = touch.clientY;
                            thumbnailsPositionX = currX>prevX ? parseInt(child.css('margin-left'))+(currX-prevX):parseInt(child.css('margin-left'))-(prevX-currX);
                            thumbnailsPositionY = currY>prevY ? parseInt(child.css('margin-top'))+(currY-prevY):parseInt(child.css('margin-top'))-(prevY-currY);

                            if (thumbnailsPositionX < (-1)*(child.width()-parent.width())){
                                thumbnailsPositionX = (-1)*(child.width()-parent.width());
                            }
                            else if (thumbnailsPositionX > 0){
                                thumbnailsPositionX = 0;
                            }
                            else{                                    
                                e.preventDefault();
                            }

                            if (thumbnailsPositionY < (-1)*(child.height()-parent.height())){
                                thumbnailsPositionY = (-1)*(child.height()-parent.height());
                            }
                            else if (thumbnailsPositionY > 0){
                                thumbnailsPositionY = 0;
                            }
                            else{                                    
                                e.preventDefault();
                            }
                            
                            lastX = prevX;
                            lastY = prevY;
                            prevX = currX;
                            prevY = currY;

                            if (parent.width() < child.width()){
                                child.css('margin-left', thumbnailsPositionX);
                            }

                            if (parent.height() < child.height()){
                                child.css('margin-top', thumbnailsPositionY);
                            }
                        });
                            
                        parent.bind('touchend', function(e){
                            if (!prototypes.isChromeMobileBrowser()){
                                e.preventDefault();
                            }

                            if (thumbnailsPositionX%(ThumbnailWidth+ThumbnailsSpacing) != 0){                                    
                                if ((ThumbnailsPosition == 'horizontal') && $('.DOP_ThumbnailScroller_Thumbnails', Container).width() > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).width()){
                                    if (lastX < touch.clientX){
                                        moveTo = parseInt(thumbnailsPositionX/(thumbnailWidth+ThumbnailsSpacing))*(thumbnailWidth+ThumbnailsSpacing);
                                    }
                                    else{
                                        moveTo = (parseInt(thumbnailsPositionX/(thumbnailWidth+ThumbnailsSpacing))-1)*(thumbnailWidth+ThumbnailsSpacing);
                                    }
                                    arrowsClicked = true;

                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, true).animate({'margin-left': moveTo}, ThumbnailsNavigationArrowsSpeed, function(){
                                        arrowsClicked = false;
                                    });
                                }
                            }

                            if (thumbnailsPositionY%(ThumbnailHeight+ThumbnailsSpacing) != 0){   
                                if ((ThumbnailsPosition == 'vertical') && $('.DOP_ThumbnailScroller_Thumbnails', Container).height() > $('.DOP_ThumbnailScroller_ThumbnailsWrapper', Container).height()){
                                    if (lastY < touch.clientY){
                                        moveTo = parseInt(thumbnailsPositionY/(thumbnailHeight+ThumbnailsSpacing))*(thumbnailHeight+ThumbnailsSpacing);
                                    }
                                    else{
                                        moveTo = (parseInt(thumbnailsPositionY/(thumbnailHeight+ThumbnailsSpacing))-1)*(thumbnailHeight+ThumbnailsSpacing);
                                    }
                                    arrowsClicked = true;

                                    $('.DOP_ThumbnailScroller_Thumbnails', Container).stop(true, true).animate({'margin-top': moveTo}, ThumbnailsNavigationArrowsSpeed, function(){
                                        arrowsClicked = false;
                                    });
                                }      
                            }
                        });
                    }
                  },        
                  
        prototypes = {
                        resizeItem:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item is 100% visible)
                            var currW = 0, currH = 0;

                            if (dw <= cw && dh <= ch){
                                currW = dw;
                                currH = dh;
                            }
                            else{
                                currH = ch;
                                currW = (dw*ch)/dh;

                                if (currW > cw){
                                    currW = cw;
                                    currH = (dh*cw)/dw;
                                }
                            }

                            child.width(currW);
                            child.height(currH);
                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },
                        resizeItem2:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item covers all the container)
                            var currW = 0, currH = 0;

                            currH = ch;
                            currW = (dw*ch)/dh;

                            if (currW < cw){
                                currW = cw;
                                currH = (dh*cw)/dw;
                            }

                            child.width(currW);
                            child.height(currH);

                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },

                        topItem:function(parent, child, ch){// Position item on Top
                            parent.height(ch);
                            child.css('margin-top', 0);
                        },
                        bottomItem:function(parent, child, ch){// Position item on Bottom
                            parent.height(ch);
                            child.css('margin-top', ch-child.height());
                        },
                        leftItem:function(parent, child, cw){// Position item on Left
                            parent.width(cw);
                            child.css('margin-left', 0);
                        },
                        rightItem:function(parent, child, cw){// Position item on Right
                            parent.width(cw);
                            child.css('margin-left', parent.width()-child.width());
                        },
                        hCenterItem:function(parent, child, cw){// Position item on Horizontal Center
                            parent.width(cw);
                            child.css('margin-left', (cw-child.width())/2);
                        },
                        vCenterItem:function(parent, child, ch){// Position item on Vertical Center
                            parent.height(ch);
                            child.css('margin-top', (ch-child.height())/2);
                        },
                        centerItem:function(parent, child, cw, ch){// Position item on Center
                            prototypes.hCenterItem(parent, child, cw);
                            prototypes.vCenterItem(parent, child, ch);
                        },
                        tlItem:function(parent, child, cw, ch){// Position item on Top-Left
                            prototypes.topItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        tcItem:function(parent, child, cw, ch){// Position item on Top-Center
                            prototypes.topItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        trItem:function(parent, child, cw, ch){// Position item on Top-Right
                            prototypes.topItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        mlItem:function(parent, child, cw, ch){// Position item on Middle-Left
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        mrItem:function(parent, child, cw, ch){// Position item on Middle-Right
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        blItem:function(parent, child, cw, ch){// Position item on Bottom-Left
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        bcItem:function(parent, child, cw, ch){// Position item on Bottom-Center
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        brItem:function(parent, child, cw, ch){// Position item on Bottom-Right
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        
                        touchNavigation:function(parent, child){// One finger navigation for touchscreen devices
                            var prevX, prevY, currX, currY, touch, childX, childY;
                            
                            parent.bind('touchstart', function(e){
                                touch = e.originalEvent.touches[0];
                                prevX = touch.clientX;
                                prevY = touch.clientY;
                            });

                            parent.bind('touchmove', function(e){                                
                                touch = e.originalEvent.touches[0];
                                currX = touch.clientX;
                                currY = touch.clientY;
                                childX = currX>prevX ? parseInt(child.css('margin-left'))+(currX-prevX):parseInt(child.css('margin-left'))-(prevX-currX);
                                childY = currY>prevY ? parseInt(child.css('margin-top'))+(currY-prevY):parseInt(child.css('margin-top'))-(prevY-currY);

                                if (childX < (-1)*(child.width()-parent.width())){
                                    childX = (-1)*(child.width()-parent.width());
                                }
                                else if (childX > 0){
                                    childX = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                if (childY < (-1)*(child.height()-parent.height())){
                                    childY = (-1)*(child.height()-parent.height());
                                }
                                else if (childY > 0){
                                    childY = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                prevX = currX;
                                prevY = currY;

                                if (parent.width() < child.width()){
                                    child.css('margin-left', childX);
                                }
                                
                                if (parent.height() < child.height()){
                                    child.css('margin-top', childY);
                                }
                            });

                            parent.bind('touchend', function(e){
                                if (!prototypes.isChromeMobileBrowser()){
                                    e.preventDefault();
                                }
                            });
                        },

			rgb2hex:function(rgb){// Convert RGB color to HEX
                            var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                            return (isNaN(rgb[1]) ? '00':hexDigits[(rgb[1]-rgb[1]%16)/16]+hexDigits[rgb[1]%16])+
                                   (isNaN(rgb[2]) ? '00':hexDigits[(rgb[2]-rgb[2]%16)/16]+hexDigits[rgb[2]%16])+
                                   (isNaN(rgb[3]) ? '00':hexDigits[(rgb[3]-rgb[3]%16)/16]+hexDigits[rgb[3]%16]);
			},

                        dateDiference:function(date1, date2){// Diference between 2 dates
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return parseInt(diff/(one_day))+1;
                        },
                        noDays:function(date1, date2){// Returns no of days between 2 days
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return Math.round(diff/(one_day))+1;
                        },
                        timeLongItem:function(item){// Return day/month with 0 in front if smaller then 10
                            if (item < 10){
                                return '0'+item;
                            }
                            else{
                                return item;
                            }
                        },
                        timeToAMPM:function(item){// Returns time in AM/PM format
                            var hour = parseInt(item.split(':')[0], 10),
                            minutes = item.split(':')[1],
                            result = '';
                            
                            if (hour == 0){
                                result = '12';
                            }
                            else if (hour > 12){
                                result = prototypes.timeLongItem(hour-12);
                            }
                            else{
                                result = prototypes.timeLongItem(hour);
                            }
                            
                            result += ':'+minutes+' '+(hour < 12 ? 'AM':'PM');
                            
                            return result;
                        },

                        stripslashes:function(str){// Remove slashes from string
                            return (str + '').replace(/\\(.?)/g, function (s, n1) {
                                switch (n1){
                                    case '\\':
                                        return '\\';
                                    case '0':
                                        return '\u0000';
                                    case '':
                                        return '';
                                    default:
                                        return n1;
                                }
                            });
                        },
                        
                        randomize:function(theArray){// Randomize the items of an array
                            theArray.sort(function(){
                                return 0.5-Math.random();
                            });
                            return theArray;
                        },
                        randomString:function(string_length){// Create a string with random elements
                            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
                            random_string = '';

                            for (var i=0; i<string_length; i++){
                                var rnum = Math.floor(Math.random()*chars.length);
                                random_string += chars.substring(rnum,rnum+1);
                            }
                            return random_string;
                        },

                        isIE8Browser:function(){// Detect the browser IE8
                            var isIE8 = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie 8') != -1){
                                isIE8 = true;
                            }
                            return isIE8;
                        },
                        isIEBrowser:function(){// Detect the browser IE
                            var isIE = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie') != -1){
                                isIE = true;
                            }
                            return isIE;
                        },
                        isChromeMobileBrowser:function(){// Detect the browser Mobile Chrome
                            var isChromeMobile = false,
                            agent = navigator.userAgent.toLowerCase();
                            
                            if ((agent.indexOf('chrome') != -1 || agent.indexOf('crios') != -1) && prototypes.isTouchDevice()){
                                isChromeMobile = true;
                            }
                            return isChromeMobile;
                        },
                        isAndroid:function(){// Detect the browser Mobile Chrome
                            var isAndroid = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('android') != -1){
                                isAndroid = true;
                            }
                            return isAndroid;
                        },
                        isTouchDevice:function(){// Detect touchscreen devices
                            var os = navigator.platform;
                            
                            if (os.toLowerCase().indexOf('win') != -1){
                                return window.navigator.msMaxTouchPoints;
                            }
                            else {
                                return 'ontouchstart' in document;
                            }
                        },

                        openLink:function(url, target){// Open a link
                            switch (target.toLowerCase()){
                                case '_blank':
                                    window.open(url);
                                    break;
                                case '_top':
                                    top.location.href = url;
                                    break;
                                case '_parent':
                                    parent.location.href = url;
                                    break;
                                default:    
                                    window.location = url;
                            }
                        },

                        validateCharacters:function(str, allowedCharacters){// Verify if a string contains allowed characters
                            var characters = str.split(''), i;

                            for (i=0; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) == -1){
                                    return false;
                                }
                            }
                            return true;
                        },
                        cleanInput:function(input, allowedCharacters, firstNotAllowed, min){// Remove characters that aren't allowed from a string
                            var characters = $(input).val().split(''),
                            returnStr = '', i, startIndex = 0;

                            if (characters.length > 1 && characters[0] == firstNotAllowed){
                                startIndex = 1;
                            }
                            
                            for (i=startIndex; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) != -1){
                                    returnStr += characters[i];
                                }
                            }
                                
                            if (min > returnStr){
                                returnStr = min;
                            }
                            
                            $(input).val(returnStr);
                        },
                        validEmail:function(email){// Validate email
                            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            
                            if (filter.test(email)){
                                return true;
                            }
                            return false;
                        },
                        
                        $_GET:function(variable){// Parse $_GET variables
                            var url = window.location.href.split('?')[1],
                            variables = url != undefined ? url.split('&'):[],
                            i; 
                            
                            for (i=0; i<variables.length; i++){
                                if (variables[i].indexOf(variable) != -1){
                                    return variables[i].split('=')[1];
                                    break;
                                }
                            }
                            
                            return undefined;
                        },
                        acaoBuster:function(dataURL){// Access-Control-Allow-Origin buster
                            var topURL = window.location.href,
                            pathPiece1 = '', pathPiece2 = '';
                            
                            if (dataURL.indexOf('https') != -1 || dataURL.indexOf('http') != -1){
                                if (topURL.indexOf('http://www.') != -1){
                                    pathPiece1 = 'http://www.';
                                }
                                else if (topURL.indexOf('http://') != -1){
                                    pathPiece1 = 'http://';
                                }
                                else if (topURL.indexOf('https://www.') != -1){
                                    pathPiece1 = 'https://www.';
                                }
                                else if (topURL.indexOf('https://') != -1){
                                    pathPiece1 = 'https://';
                                }
                                    
                                if (dataURL.indexOf('http://www.') != -1){
                                    pathPiece2 = dataURL.split('http://www.')[1];
                                }
                                else if (dataURL.indexOf('http://') != -1){
                                    pathPiece2 = dataURL.split('http://')[1];
                                }
                                else if (dataURL.indexOf('https://www.') != -1){
                                    pathPiece2 = dataURL.split('https://www.')[1];
                                }
                                else if (dataURL.indexOf('https://') != -1){
                                    pathPiece2 = dataURL.split('https://')[1];
                                }
                                
                                return pathPiece1+pathPiece2;
                            }
                            else{
                                return dataURL;
                            }
                        },
                        
                        doHideBuster:function(item){// Make all parents & current item visible
                            var parent = item.parent(),
                            items = new Array();
                                
                            if (item.prop('tagName') != undefined && item.prop('tagName').toLowerCase() != 'body'){
                                items = prototypes.doHideBuster(parent);
                            }
                            
                            if (item.css('display') == 'none'){
                                item.css('display', 'block');
                                items.push(item);
                            }
                            
                            return items;
                        },
                        undoHideBuster:function(items){// Hide items in the array
                            var i;
                            
                            for (i=0; i<items.length; i++){
                                items[i].css('display', 'none');
                            }
                        },
                       
                        setCookie:function(c_name, value, expiredays){// Set cookie (name, value, expire in no days)
                            var exdate = new Date();
                            exdate.setDate(exdate.getDate()+expiredays);

                            document.cookie = c_name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+";javahere=yes;path=/";
                        },
                        readCookie:function(name){// Read cookie (name) 
                            var nameEQ = name+"=",
                            ca = document.cookie.split(";");

                            for (var i=0; i<ca.length; i++){
                                var c = ca[i];

                                while (c.charAt(0)==" "){
                                    c = c.substring(1,c.length);            
                                } 

                                if (c.indexOf(nameEQ) == 0){
                                    return unescape(c.substring(nameEQ.length, c.length));
                                } 
                            }
                            return null;
                        },
                        deleteCookie:function(c_name, path, domain){// Delete cookie (name, path, domain)
                            if (readCookie(c_name)){
                                document.cookie = c_name+"="+((path) ? ";path="+path:"")+((domain) ? ";domain="+domain:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
                            }
                        }
                    };

        return methods.init.apply(this);
    }
})(jQuery);