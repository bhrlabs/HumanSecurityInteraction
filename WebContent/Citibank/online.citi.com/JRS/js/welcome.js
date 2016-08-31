/* - - - - - - - - - - - - - - - - - -

scripts for citi.com marketing banners

- - - - - - - - - - - - - - - - - - */

$(function(){
  
  /* - - - - - - - - - - - - - - - - - -
  banner carousel
   - - - - - - - - - - - - - - - - - - */
   $("ul.nav-banners li").on("click", function(event) {
        console.info("I've been clicked");
        var s=s_gi(s_account);
        var tabValue=$(event.target).closest('li').text();
        s.linkTrackVars="eVar38,eVar20";
        s.eVar38=s.pageName;
        s.eVar20=tabValue;
        s.tl(this,'o',s.eVar20);
      });
   function onLoad(){
     $("#banner-2, #banner-3, #banner-4").hide();
     $("#banner-1").css("background-image", "url(/JRS/images/"+imgNames[0]+")");
     $("#nav-banner-1").addClass("active");
     $("#nav-banner-1").attr("aria-pressed","true");
     $("#nav-banner-2, #nav-banner-3, #nav-banner-4").attr("aria-pressed","false");  
   }
   onLoad();
   $("#nav-banner-1").click(function(){
    $("#banner-1").show();
    $("#banner-2, #banner-3, #banner-4").hide();
    $(this).addClass("active");
    $(this).attr("aria-pressed","true");
    $("#nav-banner-2, #nav-banner-3, #nav-banner-4").removeClass("active");
    $("#nav-banner-2, #nav-banner-3, #nav-banner-4").attr("aria-pressed","false");
    $("#banner-1").focus()
   });
   
   $("#nav-banner-2").click(function(){
    $("#banner-2").css("background-image", "url(/JRS/images/"+imgNames[1]+")");
    $("#banner-2").show();
    $("#banner-1, #banner-3, #banner-4").hide();
    $(this).addClass("active");
    $(this).attr("aria-pressed","true");
    $("#nav-banner-1, #nav-banner-3, #nav-banner-4").removeClass("active");
    $("#nav-banner-1, #nav-banner-3, #nav-banner-4").attr("aria-pressed","false");
    $("#banner-2").focus()
   });
   
   $("#nav-banner-3").click(function(){
    $("#banner-3").css("background-image", "url(/JRS/images/"+imgNames[2]+")");
    $("#banner-3").show();
    $("#banner-1, #banner-2, #banner-4").hide();
    $(this).addClass("active");
    $(this).attr("aria-pressed","true");
    $("#nav-banner-1, #nav-banner-2, #nav-banner-4").removeClass("active");
    $("#nav-banner-1, #nav-banner-2, #nav-banner-4").attr("aria-pressed","false");
    $("#banner-3").focus()
   });
   
   $("#nav-banner-4").click(function(){
    $("#banner-4").css("background-image", "url(/JRS/images/"+imgNames[3]+")");
    $("#banner-4").show();
    $("#banner-1, #banner-2, #banner-3").hide();
    $(this).addClass("active");
    $(this).attr("aria-pressed","true");
    $("#nav-banner-1, #nav-banner-2, #nav-banner-3").removeClass("active");
    $("#nav-banner-1, #nav-banner-2, #nav-banner-3").attr("aria-pressed","false");
    $("#banner-4").focus()
   });
 
})
  



/* --- AD-SERVE FUNCTIONS --- */
function loadAdServe(tabNum) {
  if (typeof tabNum === 'undefined') {
  
    var tabNum= /#_tab(.*)$/;
    var matchTabNum = tabNum.exec(document.location.toString());
    
    tabNum = (matchTabNum !== null) ? +matchTabNum[1] : 1;
    tabNum = (tabNum >= 1 && tabNum <= 4) ? tabNum : 1;
  }     
  adServeFunction[tabNum]();
}

function linkTrack(linkObj) {
  if (typeof s !== 'undefined') {
    s.tl(linkObj.get(0), 'o');
  }
}

jQuery(window).load(function () {
  if ( (navigator.userAgent.indexOf("Chrome") == -1) && (navigator.userAgent.indexOf("Safari") != -1)){
         try {window.localStorage.setItem('test', 1);
        } 
    catch(e) { alert("Private Browsing is currently turned on. For full site functionality, please open a new window with Private Browsing turned off.");            
               }
       }

  /*if (typeof imgNames != 'undefined' && imgNames instanceof Array && imgNames.length > 0) {
    // preload the images
    var divImgContainer = $('<div></div>').attr('id', 'bgImgPreload').css('display', 'none');
    for (var i=0; i < imgNames.length; i++) {
      appendImages(divImgContainer, i, imgNames[i]);
    }
    $('#citilmFooter').after(divImgContainer);
  }*/
});

jQuery(document).ready(function($) {

/* -- Ad Serve Initialization -- */
  if (typeof adServeFunction !== 'undefined') {
    loadAdServe();
    $('div.mkthomeTabs li a').each( function(i) {
      var tabNum = i + 1;
      $(this).click( function() {
        loadAdServe(tabNum);
        linkTrack($(this));
      });
    });
  }
  /* -- End of Ad Serve -- */
  
  function tabsHorizontalEventHandler(event,data) {
    if (data.type === "show") {
      // change the url to reflect the hash
      window.location.hash = "#_" + data.ui.tab.hash.substr(1);
    }
    switch(event.type)
    {
      case 'postconstruction':
          $('#horizontalTab').css({display:'block'});
          break;
      default:
          break;
    }
  }
  $("#horizontalTab").subscribe('/topic/horizontaltabtopic', tabsHorizontalEventHandler);


  // check if account-select is present
  if ($('#accounts-select').length) {
    $("#accounts-select").jfpwidget(new CJW.jfp.widget.Select({
        wrapperSet: "#accounts-select"
      }, {
        width: 167,
        menuWidth: 167
      }, 
      { }));
  }

  // check if apply-select is present
  if ($('#apply-select').length) {
      $("#apply-select").jfpwidget(new CJW.jfp.widget.Select({
        wrapperSet: "#apply-select"
      }, {
        width: 167,
        menuWidth: 167
      }, 
      { }));
  }
  
  if ($("#horizontalTab").length) {
    $("#horizontalTab").jfpwidget(new CJW.jfp.widget.Tabs(
    {
        wrapperSet: "#horizontalTab",
        align:"horizontal"
    }, 
    {
      disabled:false,
      remote:false,
      ajaxOptions:
      { 
        async: true
      },
      cache: true,
      collapsible: false, 
      deselectable: true,
      disabled: inactiveTabs,
      event: 'click',
      idPrefix: 'tab',
      selected: selectedTab,
      spinner: 'Retrieving Data...'
    }, 
    {
      '/topic/horizontaltabtopic':['postconstruction','select','load','show','add','remove','enable','disable','ajaxerror','ajaxsuccess']
    }));
  }

  /*ClickableArea*/
  $('.tab_content .c').click(function(event) {
  
    var url = $(this).find('a').attr('href');
        var target = url.substring(0, 2);
        event.preventDefault();
        event.stopPropagation();
        if (target == '/U') {
            window.location = $(this).find("a").attr("href");
        }
        else if (target == 'ja') {
            var toRemove = 'javascript:launchPopup(';
            var pop = url.replace(toRemove, '');
            var toRemove2 = ')';
            var popup = pop.replace(toRemove2, '');
            var n = popup.split(",");
            var pop2 = n[0];
            var m = pop2.substr(1, (pop2.length - 2));
            newwindow = window.open(m, '', 'height=650,width=575,scrollTo,resizable=1,scrollbars=1,location=0');
            if (window.focus) {
                newwindow.focus();
            }
            return false;
        }
        else
        {
            if (target == 'ww')
            {
                window.open("http://"+url, '');
            }
            else
            {
                window.open(url);
            }
        }
  });
  /*ClickableArea*/
});

/**
 * Country Locator funtionality
 */
(function($) {

  function customFlyoutOpen( direction, speed, data, callback ) {
    
    if ($.browser.msie && $.browser.version < 9) {
    
      return this.each( function(i) {
            
        var $this = $(this);
        var dimension = $this.data('dimension'),
          speedFade = speed/2;
        
        $( data.parentId )
          .addClass('active')
          .children('div.header')
            .animate({ 'width' : data.width + 10 }, speed, function() {
                  
              $this.css({ 'display' : 'block',
                    'visibility' : 'visible' });
              
              if ( direction == 'vertical' ) {
                $this.animate({ 'height' : dimension }, speed, function() {
                  
                  if (typeof callback == 'function') {
                    callback();
                  }
                });
              }
            });
      });
      
    
      
    }else {
    
      return this.each( function(i) {
            
        var $this = $(this);
        var dimension = $this.data('dimension'),
          speedFade = speed/2;
        
        $( data.parentId )
          .addClass('active')
          .children('div.header')
            .animate({ 'width' : data.width }, speed, function() {
              
              $this.css({ 'display' : 'block',
                    'visibility' : 'visible' });
              
              if ( direction == 'vertical' ) {
                $this.animate({ 'height' : 210 }, speed, function() {
                  
                  $(this).children().animate({opacity: 1.0}, speedFade);
                  if (typeof callback == 'function') {
                    callback();
                  }
                });
              }
            });
      });
    }
  }

  function customFlyoutClose( direction, speed, data, callback) {

    if ($.browser.msie && $.browser.version < 9) {
      
      return this.each( function(i) {
    
        var $this = $(this);
        var dimension = $this.data('dimension'),
          speedFade = speed/2;
        var container = $( data.parentId );
        
        if ( direction == 'vertical' ) {
          $this.animate({ 'height' : 0 }, speed, function(){
          
            $this.css({ 'display' : 'none',
                  'visibility' : 'hidden' });
            
            container.children('div.header').animate({ 'width' : data.width + 10 }, speed, function() {
              container.removeClass('active');
              if ( typeof data.callback == 'function') {
                data.callback();
              }
              if (typeof callback == 'function') {

                callback();
              }
            });
          });
        } 
      });
      
    } else {
    
      return this.each( function(i) {
    
        var $this = $(this);
        var dimension = $this.data('dimension'),
          speedFade = speed/2,
          runOnce = true;
        var container = $( data.parentId );
        
        $this.children().animate({opacity: 0}, speedFade, function(){
          if (runOnce) {
            runOnce = false;
            
            if ( direction == 'vertical' ) {
              $this.animate({ 'height' : 0 }, speed, function(){
              
                $this.css({ 'display' : 'none',
                      'visibility' : 'hidden' });
                
                container
                  .children('div.header')
                    .animate({ 'width' : data.width }, speed, function() {
                      container.removeClass('active');
                      if ( typeof data.callback == 'function') {
                        data.callback();
                      }
                      if (typeof callback == 'function') {
                        callback();
                      }
                    });
              });
            } 
          }
        });
      });
    }
  }

  function resetCountryFlyout() {
    $("#cfCountry").css({'display' : 'none', 'visibility' : 'hidden'});
    $("#cfLanguage").css({'display' : 'none', 'visibility' : 'hidden'});
    $("#countryFlyout").width(229);
    
    if ($.browser.msie && $.browser.version < 9) {
      $("#countryFlyout .b").width(212);
    }
      $("#countryFlyout a").removeClass("selected");
  }
  
  function addScrollBars(){
    // Add country scroll bar
    $('#cfCountryList').siblings('div').remove();
    $('#cfCountry').append('<div id="cfCountrySlider"></div>')
    var countrySlider = new CJW.jfp.widget.AutoSlider({
      wrapperSet: "#cfCountrySlider"
    }, {
      value:0,
      min: 0,
      max: 100,
      step: 5,
      orientation:'vertical',
      handle:'#cfCountrySlider',
      styleClass:'jfpw-slider',
      parent:'#cfCountryList',
      parentSize:150
    }, { });
    $("#cfCountrySlider").jfpwidget(countrySlider); 
  }
    
      $(document).ready(function($) {   
      $.fn.wrapTextWithAnchors = function(parentLi) {
        var lis = $("> ul", parentLi).remove();
        var ul = lis.appendTo($("<ul/>"));
        $(parentLi).html("<a href='#' class='more'>" + $.trim($(parentLi).text()) + "<span class='rightGrayArrow'></span></a><ul style='display: none;'>" + ul.html() + "</ul>");
      }

      $("#countryFlyout").flyout({
        openSelectors : ['#country h4 > a'],
        closeSelectors : ['#country h4 > a', '#cfCountry a.clink', '#cfLanguage a'],
        openAnimation : customFlyoutOpen,
        openData : { 
          parentId : '#country',
          width : 229
        },
        closeAnimation : customFlyoutClose,
        closeData : { 
          parentId : '#country',
          width : 209,
          callback : resetCountryFlyout
        }
      });
/* 06/10 - start */
$("#countryFlyout").flyout({
        openSelectors : ['#country strong > a'],
        closeSelectors : ['#country strong > a', '#cfCountry a.clink', '#cfLanguage a'],
        openAnimation : customFlyoutOpen,
        openData : { 
          parentId : '#country',
          width : 229
        },
        closeAnimation : customFlyoutClose,
        closeData : { 
          parentId : '#country',
          width : 209,
          callback : resetCountryFlyout
        }
      });
      
      $("#moreFlyout").flyout({
        openSelectors : ['#more strong > a'],
        closeSelectors : ['#more strong > a'],
        openAnimation : customFlyoutOpen,
        openData : { 
          parentId : '#more',
          width : 880
        },
        closeAnimation : customFlyoutClose,
        closeData : { 
          parentId : '#more',
          width : 209
        }
      });
      $("#more strong > a, #country strong > a, div.mkthomeTabs li > a").click( function(e){
        e.preventDefault();
      });
      
      /* 06/10 - End */
      $("#cfRegion").delegate("a", "click", function(e){
        var width = 459;

        e.preventDefault();
        var countryList = $("> ul", $(this).parent());
        $("#cfCountryList").html(countryList.html());
        $("#cfCountryList > li > ul").each(function(i) {
          $.fn.wrapTextWithAnchors($(this).parent());
        });
        $("a",  $(this).parent().parent()).removeClass("selected");
        $(this).addClass("selected");

        if ($.browser.msie && $.browser.version < 9) {

          $("#country > div.header").animate({ 'width' : width }, 600); 
          width -= 10;

          $("#countryFlyout").animate({ 'width' : width }, 600, function() { 
            $("#cfCountry").css({'display' : 'block', 'visibility' : 'visible'});
            addScrollBars();  
          });
          $("#countryFlyout .b").animate({ 'width' : 431 }, 600);

          $("#cfLanguage").hide();
          
        } else {
          $("#countryFlyout, #country > div.header").animate({ 'width' : width }, 600, function() {
            $("#cfCountry").css({'display' : 'block', 'visibility' : 'visible'}); 
            $("#cfLanguage").css({'display' : 'none', 'visibility' : 'hidden'});
            addScrollBars();
          });
        }
      });

      $("#cfCountry").delegate("a", "click", function(e){
        var width = 670;

        if(!($(this).hasClass('more'))) {
          return;
        }
        e.preventDefault();
        var languageList = $("> ul", $(this).parent());
        $("#cfLanguage > ul").html(languageList.html());
        $("a",  $(this).parent().parent()).removeClass("selected");
        $(this).addClass("selected");

        if ($.browser.msie && $.browser.version < 9) {
          $("#country > div.header").animate({ 'width' : width }, 600);
          width -= 10;
          $("#countryFlyout").animate({ 'width' : width }, 600, function() { 
            $("#cfLanguage").css({'display' : 'block', 'visibility' : 'visible'});
          });
          $("#countryFlyout .b").animate({ 'width' : 642 }, 600);

        } else {
          $("#countryFlyout, #country > div.header").animate({ 'width' : width }, 600, function() {
            $("#cfLanguage").css({'display' : 'block', 'visibility' : 'visible'});
          });
        }
      });

      $("#cfRegion > ul > li ul").each(function(i) {
        $(this).hide();
      });
      $("#cfRegion > ul > li").each(function(i) {
         $.fn.wrapTextWithAnchors(this);
      });
      $("#moreFlyout").flyout({
        openSelectors : ['#more h4 > a'],
        closeSelectors : ['#more h4 > a'],
        openAnimation : customFlyoutOpen,
        openData : { 
          parentId : '#more',
          width : 880
        },
        closeAnimation : customFlyoutClose,
        closeData : { 
          parentId : '#more',
          width : 209
        }
      });
      $("#more h4 > a, #country h4 > a, div.mkthomeTabs li > a").click( function(e){
        e.preventDefault();
      });
      $("#cfRegion > ul > li").each(function(i) {
         $.fn.wrapTextWithAnchors(this);
      });
      });
  })($jq);

