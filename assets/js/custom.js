
$(document).ready(function(){
  var h = $('#header'),
  hh = $('#header-home'),
  hp = $('#header-project'),
  c = $('#connect'),
  m = $('.main'),
  live = $('.live-section'),
  h1 = $('#home-one'),
  h2 = $('#home-two'),
  projects = $.get('assets/views/projects.html', function( response, status, xhr ) {
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
  }
  projects = $(response);
  projects.prependTo(m);
  }),
  headers = $.get('assets/views/project-headers.html', function( response, status, xhr ) {
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
  }
  headers = $(response);
  headers.prependTo(hp);

  //Bind all actions needed inside of the projects page
  bindProjectPageActions();
  }),
  aDuration = 250,
  aProperties = {};

  function bindProjectPageActions(){
    // Wire up dismiss button click
    var d = headers.find('.dismiss-project');
    d.on('click', function(){
      dismissView(window.history.state);
    });
  }

  function dismissView(onload) {
    console.log(onload.onload)
    hideHeader(true);
    //Fade out Main
    m.fadeOut(aDuration, function(){
      //Hide project content
      hideSections();
      h1.addClass('live-section');
      h2.addClass('live-section');

      //Update history
      //If onLoad, do not go back!
      // console.log(window.history.state);
      if (onload.onload === false) {
        window.history.back();
      }

      //Track project click
      trackProjectClick('home');

      //Return to view
      m.removeClass('projects');
      h.removeClass('projects');
      m.scrollTop(0);
      showHeader(true);
    });
  }

  function hideSections(){
    $('.live-section').each(function(){
      if (!$(this).is('#connect')) {
        $(this).removeClass('live-section');
      }
    });
  }

  function checkWidthAndChangeProperties(obj, hide) {
    if ($('body').innerWidth() >= 980) {
      return aProperties = hide ? {left: -obj.outerWidth()} : {left: 0};
    } else {
      return aProperties = hide ? {opacity: 0} : {opacity: 1};
    }
  }

  function hideHeader(home) {
    // Hide, load and show.
    h.animate(checkWidthAndChangeProperties(h, 1), {
      duration:aDuration,
      queue: false,
      complete: function(){
        if (home) {
          h.hide();
          // hp.children().removeClass('live-section');
          hp.children().hide();
          h.css('background-size', 'auto');
          // h.css('background-color', '#131414');
          c.attr("class", "live-section 8u$ -2u 10u(small) -1u(small) 10u(xsmall) -1u(xsmall)");
        } else {
          hh.hide();
          h.show();
          h.css({
            'background-size': '0 0',
            'background-color': '#fafafa'
          });
          c.attr("class", "live-section 7u$ -4u 10u(medium) -1u(medium) 10u(small) -1u(small) 10u(xsmall) -1u(xsmall)");
        }
      }
    });
  }

  function showHeader(home){
    hp.show();
    // Hide, load and show.
    h.animate(checkWidthAndChangeProperties(h, 0), {
      duration:aDuration,
      queue: false,
      complete: function(){
        //Fade back in Main
        // if (!home) {
          m.fadeIn(aDuration)
        // }
      }
    });
  }

  function loadProject(project){
    // fix bug of retina.js
    // it will set height = 0 and width = 0 to img
    // which are in a container that is initially not
    // visible
    $img = $('img');
    $img.removeAttr('height');
    $img.removeAttr('width');

    //Hide main while switching content
    hideHeader(false);
    m.delay(150).fadeOut(aDuration, function(){
      //Hide the home content
      hideSections();

      //Show new content
      $('#' + project + '-content').addClass('live-section');
      $('#' + project + '-header').show();

      //Update history and set onload state to false to avoid the browser going back on load
      window.history.pushState({onload: false}, null, 'assets/views/' + project + '.html');
      console.log(window.history.state);

      //Track project click
      trackProjectClick(project);

      m.scrollTop(0);
      showHeader(false);
    });

    //Add projects class for any styling overrides. Remove later on dismiss.
    m.addClass('projects');
    h.addClass('projects');

    //Bind the dismiss action
    bindProjectPageActions();
  }

  function trackProjectClick(project) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Projects',
      eventAction: 'click',
      eventLabel: project
    });
  }

  //Set the stage for history
  window.history.replaceState({ onload: true }, null, '');
  console.log(window.history.state);
  // Revert to a previously saved state
  window.addEventListener('popstate', function(event) {
    console.log('popstate fired!' + event.state.onload);
    if (event.state.onload) {
      dismissView(event.state.onload);
    }
  });

  // Project click handlers
  $('#nom').on('click', function(e){
    // e.preventDefault();
    // loadProject('nom');
    trackProjectClick('nom');
  });

  $('#analytics').on('click', function(e){
    // e.preventDefault();
    // loadProject('nom');
    trackProjectClick('analytics');
  });

  // $('#nitelife').on('click', function(e){
  //   e.preventDefault();
  //   loadProject('nitelife');
  trackProjectClick('nitelife');
  // });

  $('#hsrTool').on('click', function(e){
    // e.preventDefault();
    // loadProject('hsrTool');
    trackProjectClick('hsrTool');
  });

  $('#mcrew').on('click', function(e){
    // e.preventDefault();
    // loadProject('mcrew');
    trackProjectClick('mcrew');
  });

  $('#ramps').on('click', function(e){
    // e.preventDefault();
    // loadProject('ramps');
    trackProjectClick('ramps');
  });

  $('#shutterstock').on('click', function(e){
    // e.preventDefault();
    // loadProject('shutterstock');
    trackProjectClick('shutterstock');
  });

});
