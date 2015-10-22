
$(document).ready(function(){
  var h = $('#header'),
  hh = $('#header-home'),
  hp = $('#header-project'),
  f = $('#footer'),
  m = $('#main'),
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
    dismissView();
  }

  function dismissView() {
    var d = headers.find('.dismiss-project');
    d.on('click', function(){
      hideHeader(true);
      //Fade out Main
      m.fadeOut(aDuration, function(){
        //Hide project content
        hideSections();
        h1.addClass('live-section');
        h2.addClass('live-section');
        //Return to view
        m.removeClass('projects');
        h.removeClass('projects');
        m.scrollTop(0);
        showHeader(true);
      })
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
          // hp.children().removeClass('live-section');
          hp.children().hide();
          h.css('background-size', 'auto');
          h.css('background-color', '#131414');
        } else {
          hh.hide();
          h.css({
            'background-size': '0 0',
            'background-color': '#fafafa'
          });
        }
      }
    });

    f.animate(checkWidthAndChangeProperties(f, 1), {
      duration:aDuration,
      queue: false,
      complete: function(){
        home ? f.show() : f.hide();
      }
    });
  }

  function showHeader(home){
    home ? hh.show() : hp.show();
    home ? f.show() : f.hide();
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

    f.animate(checkWidthAndChangeProperties(f, 0), {
      duration:aDuration,
      queue: false,
      complete: function(){
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

      $('#' + project + '-content').addClass('live-section');
      $('#' + project + '-header').show();

      // switch (project) {
      //   case 'nom':
      //   console.log($('#' + project + '-content'));
      //   $('#' + project + '-content').addClass('live-section');
      //   $('#' + project + '-header').show();
      //     break;
      //   case 'nitelife':
      //     console.log($('#' + project + '-content'));
      //     $('#' + project + '-content').addClass('live-section');
      //     $('#' + project + '-header').show();
      //     break;
      //   default:
      //     console.log('go home!');
      // }

      //Add projects class for any styling overrides. Remove later on disiss.
      m.addClass('projects');
      h.addClass('projects');
      m.scrollTop(0);
      showHeader(false);
    });
  }

  function trackProjectClick(project) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Projects',
      eventAction: 'click',
      eventLabel: project
    });
  }

  // Project click handlers
  $('#nom').on('click', function(){
    trackProjectClick('nom');
    loadProject('nom');
  });

  $('#nitelife').on('click', function(){
    trackProjectClick('nitelife');
    loadProject('nitelife');
  });

  $('#hsrTool').on('click', function(){
    trackProjectClick('hsrtool');
    loadProject('hsrTool');
  });

  $('#mcrew').on('click', function(){
    trackProjectClick('mcrew');
    loadProject('mcrew');
  });

  $('#ramps').on('click', function(){
    trackProjectClick('ramps');
    loadProject('ramps');
  });

});
