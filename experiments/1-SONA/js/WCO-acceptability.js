function make_slides(f) {
  var slides = {};

  var conditions = _.shuffle(["YQA","YQI","YDA","YDI","NQA","NQI","NDA","NDI","YQA","YQI","YDA","YDI","NQA","NQI","NDA","NDI","YQA","YQI","YDA","YDI","NQA","NQI","NDA","NDI"])
 //var conditions = _.shuffle(["YQA","YQI","YDA","YDI","NQA","NQI","NDA","NDI"])
  var qidx = 0

  slides.i0 = slide({
    name: "i0",
    start: function () {
      exp.startT = Date.now();
    },
  });

  slides.instructions = slide({
    name: "instructions",
    button: function () {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.pretrial = slide({
    name: "pretrial",
    button: function () {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.one_slider_practice = slide({
    name: "one_slider_practice",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present: [
      {
        practice: {
          story:
            "Bus drivers have certain routes. Some bus drivers were affected by the flooding, and others were not.",
          sentence:
            '"Every bus driver who was affected by the flooding chose a different route."',
        },
      },
      {
        practice: {
          story:
            "There is a certain committee. A motivational speaker was selected by that committee, and another was not.",
          sentence:
            '"The motivational speaker who was selected by the committee attended the awards ceremony."',
        },
      },
    ],

    //this gets run only at the beginning of the block
    present_handle: function (stim) {
      //$("#p_justification").val('');
      $(".p_err").hide();
      $(".p_hidden").hide();
      $(".p_jerr").hide();
      $(".text_response").val("");
      $(".p_showButton").show();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      $("#practiceSentence").html(stim["practice"]["sentence"]);
      $("#practiceStory").html(stim["practice"]["story"]);
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value
      function p_showButton() {
        $(".p_hidden").show();
        $(".p_showButton").hide();
      }
    },

    button: function () {
      if (exp.sliderPost == null) {
        $(".p_err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
					"present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders: function () {
      utils.make_slider("#prac_single_slider", function (event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses: function () {
      exp.data_trials.push({
        trial_type: "one_slider_practice",
        response: exp.sliderPost,
        //"justification" : $("#p_justification").val(),
        //put condition here as well
      });
    },
  });

  slides.one_slider = slide({
    name: "one_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */


    
    present: _.shuffle([
      // pilotxconfig, 
      // pianistxconfig, 
      // queenxconfig, 
      // conductorxconfig, 
      // artistxconfig,
      // supervisorxconfig, 
      // doctorxconfig, 
      // travelagentxconfig,
      pilotxconfig,
      pianistxconfig,
      queenxconfig,
      conductorxconfig,
      artistxconfig,
      supervisorxconfig,
      doctorxconfig,
      travelagentxconfig,
      playwrightxconfig,
      professorxconfig,
      scientistxconfig,
      chefxconfig,
      priestxconfig,
      bartenderxconfig,
      patientxconfig,
      groomxconfig,
      troopleaderxconfig,
      CEOxconfig,
      dentistxconfig,
      nutritionistxconfig,
      choreographerxconfig,
      stylistxconfig,
      fanxconfig,
      coachxconfig,
      filler1xconfig,
      filler2xconfig,
      filler3xconfig,
      filler4xconfig,
      filler5xconfig,
      filler6xconfig
      //filler1xconfig
    ]),

    //this gets run only at the beginning of the block
    present_handle: function (stim) {
      $("#justification").val("");
      $(".err").hide();
      $(".hidden").hide();
      $(".jerr").hide();
      $(".text_response").val("");
      $(".showButton").show();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      
      //exp.context = conditions[qidx];
      //exp.number = labels[qidx];
      //exp.number = _.sample(["two"]);

      // exp.condition = conditions[qidx++];
      if (stim.itemtype == "test") {
        condition = conditions[qidx++];
      } else  {
        condition = "filler"
      }       

      exp.item = stim[condition]["item"];

      $("#testSentence").html(stim[condition]["sentence"]);
      $("#expStory").html(stim[condition]["story"]);
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value
    },

    /* 	$("#play").click(function() {
		  var myVideo = document.getElementById("expVideo"); 
			function playPause() { 
				if (myVideo.paused) 
					myVideo.play(); 
				else 
					myVideo.pause(); 
			} 
	}); */

    button: function () {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
					"present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders: function () {
      utils.make_slider("#single_slider", function (event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses: function () {
      exp.data_trials.push({
        trial_type: "one_slider",
        response: exp.sliderPost,
        //"justification" : $("#justification").val(),
        condition: condition,
        WCO: condition.split("")[0],
        determiner: condition.split("")[1],  
        animacy: condition.split("")[2],
        // context: exp.context,
        item: exp.item,
        slide_number: exp.phase,
      });
    },
  });

  slides.subj_info = slide({
    name: "subj_info",
    submit: function (e) {
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        assess: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        // selfreport: $("#selfreport").val(),
        comments: $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.thanks = slide({
    name: "thanks",
    start: function () {
      exp.data = {
        trials: exp.data_trials,
        catch_trials: exp.catch_trials,
        system: exp.system,
        condition: exp.condition,
        //"justification" : exp.justify,
        subject_information: exp.subj_data,
        time_in_minutes: (Date.now() - exp.startT) / 60000,
      };
      proliferate.submit(exp.data);
    },
  });

  return slides;
}

/// init ///
function init() {
  repeatWorker = false;
  (function () {
    var ut_id = "scopeTVJT-fixed";
    if (UTWorkerLimitReached(ut_id)) {
      $(".slide").empty();
      repeatWorker = true;
      alert(
        "You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating."
      );
    }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  //exp.condition = _.sample(["Cond 1"]); //can randomize between subject conditions here
  //exp.condition = _.sample(["Cond 1, Cond 2, Cond 3, Cond 4"]); //can randomize between subject conditions here
  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width,
  };
  //blocks of the experiment:
  exp.structure = [
    "i0",
    "instructions",
    "one_slider_practice",
    "pretrial",
    "one_slider",
    "subj_info",
    "thanks",
  ];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  //exp.nQs = 2;
  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $(".slide").hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function () {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function () {
        $("#mustaccept").show();
      });
      exp.go();
    }
  });

  exp.go(); //show first slide
}
