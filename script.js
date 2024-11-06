// ==UserScript==
// @name        MyNova Style Improver
// @namespace   Violentmonkey Scripts
// @match       https://mynova.villanova.edu/*
// @grant       none
// @version     1.0.3
// @require https://code.jquery.com/jquery-1.7.2.min.js
// @author      -
// @description 11/6/2024, 9:32 AM
// ==/UserScript==



// Themes:
  // 0  - St. Thomas in spring
  // 1 - Blue heavy Villanova sports logo
  // 2 - V for villanova!
  // 3 - Official logo
  // 4 - Official logo, simplified (just blue and white)
Theme = 0;

BoxShadowDepth=5;


NovaBlue='rgb(0, 38, 100)';
var intervalId = window.setInterval(function(){
  setMyStyle();
}, 1000);
Expanded=false;

function setMyStyle() {
  PageBackgroundColor='';
  PageBackgroundImage='';
  PageBackgroundRepeat = '';
  PageBackgroundSize = '';
  PageBackgroundPosition = '';

  switch(Theme) {
    case 0:
      PageBackgroundColor='rgb(235,235,235)'; // Lovely light grey
      PageBackgroundImage='https://www1.villanova.edu/dam/villanova/advancement/images/loyaltysociety/St.%20Thomas%20of%20Villanova%20Church.jpg';
      PageBackgroundRepeat = 'no-repeat';
      PageBackgroundPosition='top';
      PageBackgroundSize='cover';
      break;
    case 1:
      PageBackgroundColor=NovaBlue;
      PageBackgroundImage='https://wallpapercave.com/wp/wp2177567.jpg';
      PageBackgroundRepeat = 'no-repeat';
      PageBackgroundPosition='center';
      PageBackgroundSize='contain';
      break;
    case 2:
      NovaBackground='rgb(225,225,225)'; // Lovely light grey
      PageBackgroundImage='https://wallpapercave.com/wp/wp2442351.png';
      PageBackgroundRepeat = 'no-repeat';
      PageBackgroundPosition='top';
      PageBackgroundSize='contain';
      break;
    case 3:
      NovaBackground='rgb(225,225,225)'; // Lovely light grey
      PageBackgroundImage='https://clipground.com/images/villanova-university-logo-5.png';
      PageBackgroundRepeat = 'no-repeat';
      PageBackgroundPosition='center';
      PageBackgroundSize='contain';
      break;
    case 4:
      NovaBackground=NovaBlue;
      PageBackgroundImage='https://clipground.com/images/villanova-university-logo-1.jpg';
      PageBackgroundRepeat = 'repeat-y';
      PageBackgroundPosition='center';
      PageBackgroundSize='contain';
      break;
    default:
      NovaBackground='rgb(225,225,225)'; // Lovely light grey
      PageBackgroundImage='https://www1.villanova.edu/dam/villanova/advancement/images/loyaltysociety/St.%20Thomas%20of%20Villanova%20Church.jpg';
      PageBackgroundRepeat = 'no-repeat';
      PageBackgroundPosition='top';
      PageBackgroundSize='';
  }

  // Get a nice photo on this jawn
  document.getElementsByTagName('sd-market-branding')[0].style.backgroundSize=PageBackgroundSize;
  document.getElementsByTagName('sd-market-branding')[0].style.backgroundPosition=PageBackgroundPosition;
  document.getElementsByTagName('sd-market-branding')[0].style.backgroundColor=PageBackgroundColor;
  document.getElementsByTagName('sd-market-branding')[0].style.backgroundRepeat=PageBackgroundRepeat;
  document.getElementsByTagName('sd-market-branding')[0].style.backgroundImage="url(" + PageBackgroundImage + ")";


  // Get some drop shadows and borders on the buttons
   $('sd-tile').each(function(){
      $(this).each(function() {
          $(this).attr('style',"border-radius: 10px; box-shadow: " + BoxShadowDepth + "px " + BoxShadowDepth + "px;");
      });
   });

  // Even the announcements, please
  $('.announcement').each(function() {
      $(this).attr('style',($(this).attr('style') && $(this).attr('style').indexOf('box-shadow')<0)?$(this).attr('style')+'; box-shadow: ' + BoxShadowDepth + 'px  ' + BoxShadowDepth + 'px;':$(this).attr('style'));
  })

  // Why are we using serif fonts online?!?
  $('span').each(function() {$(this).attr('style','font-family: Tahoma;');});

  // Get the headers into some nice boxes
  $('h2').each(function(){$(this).attr('style','background-color: '+NovaBlue+';color: rgb(255,255,255);padding:6px;border:1px solid #ffffff');});

  SidebarShadowString='box-shadow:' + BoxShadowDepth + 'px ' + BoxShadowDepth + 'px;';
  $('sd-sidebar').attr('style',SidebarShadowString);
  
    /* Sidebar is NOT that annoying. Let's keep it for now
  // Sidebar that can move in or out, and moves the rest of the screen's content with it
    SidebarShadowString='box-shadow:' + BoxShadowDepth + 'px ' + BoxShadowDepth + 'px;';
    SidebarLeftCollapsedString='left: -230px;';
    SidebarLeftExpandedString='left: 0px;';
    SidebarColorBlueString='background-color:'+NovaBlue+';';
    SidebarColorWhiteString='background-color:rgb(255,255,255);';
    MainLeftCollapsedString='left: -115px;';
    MainLeftExpandedString='left: 0px;';

    SidebarExpanded=SidebarShadowString+SidebarLeftExpandedString+SidebarColorWhiteString;
    SidebarCollapsed=SidebarShadowString+SidebarLeftCollapsedString+SidebarColorBlueString;

    $('sd-sidebar').attr('style',Expanded?SidebarExpanded:SidebarCollapsed);
    $('main').attr('style',Expanded?MainLeftExpandedString:MainLeftCollapsedString);
    $('sd-sidebar').click(function() {console.log('sidebar clicked');Expanded=!Expanded;$('sd-sidebar').attr('style',Expanded?SidebarExpanded:SidebarCollapsed); $('main').attr('style',Expanded?MainLeftExpandedString:MainLeftCollapsedString);console.log('sidebar done sliding');});
*/
  // Let's keep that navigation in frame
  document.getElementsByTagName('nav')[1].style.position='fixed';
}


// Automatically sign in
var loginAction = window.setTimeout(function(){
  logMeIn();
}, 1000);

function logMeIn() {
  /*
  console.log('Checking if auto-login is necessary');
  signInButtonsFound=0;
  */
  console.log('Total number of espd-message objects: ');
  console.log($('espd-message').length);
  $('espd-message').each(function() {
            $(this).click();
      /*
      console.log('Is this key profile.signIn: ' + $(this).attr('key'));
      if ($(this).attr('key')=='profile.signIn') {
          console.log('Yes');
          signInButtonsFound++;
          console.log('I have found ' + signInButtonsFound + ' of them.');
          if (signInButtonsFound==2) {
            console.log('So I will click this one.');
            $(this).click()
          };
      } else {
          console.log('Moving on...');
      }
      */
  });
}


/*


// Create select element
var selectElement = document.createElement("select");
selectElement.id = "mySelect"; // Set an ID for the select element

// Array of options
var options = ["Theme: St Thomas in Spring", "Theme: Blue", "Theme: V for Villanova!", "Theme: Official Logo", "Theme: Official Logo (simple colors)"];
// Loop to create and append options to the select element
for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = options[i];
    selectElement.appendChild(option);
}
// Inject the select element into the body of the web page
document.body.appendChild(selectElement);
selectElement.style.position='absolute';
selectElement.style.top='0px';
selectElement.style.zIndex='1000';
selectElement.style.right='0px';
selectElement.onchange=function() {Theme=this.value;setMyStyle();}

*/
