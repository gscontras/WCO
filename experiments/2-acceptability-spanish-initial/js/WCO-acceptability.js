function make_slides(f) {
  var slides = {};

  var conditions = _.shuffle(["yQa","yDa","nQa","nDa","yQq","yDq","nQq","nDq","yQa","yDa","nQa","nDa","yQq","yDq","nQq","nDq","yQa","yDa","nQa","nDa","yQq","yDq","nQq","nDq"])
 //var conditions = _.shuffle(["yQa","yDa","nQa","nDa","yQq","yDq","nQq","nDq"])
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
            "Los conductores de autobuses tienen rutas espec&iacute;ficas. Algunos conductores de autobuses se vieron afectados por las inundaciones, y otros no.",
          sentence:
            'Cada conductor de autob&uacute;s que se vio afectado por las inundaciones eligi&oacute; una ruta diferente.',
        },
      },
      {
        practice: {
          story:
            "Hay un cierto comit&eacute;. Un orador motivacional fue seleccionado por ese comit&eacute;, y otro no.",
          sentence:
            'El orador motivacional que fue seleccionado por el comit&eacute; asisti&oacute; a la ceremonia de premios.',
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
      {itemtype: "test",
      yQa: {story: "Las auxiliares de vuelo trabajan con ciertos pilotos. Algunas auxiliares de vuelo fueron llevadas alrededor del pa&iacute;s por su piloto, y otras no.", sentence: "Cada auxiliar de vuelo a quien su piloto vol&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      yDa: {story: "Las auxiliares de vuelo trabajan con ciertos pilotos. Una auxiliar de vuelo fue volada alrededor del pa&iacute;s por su piloto, y otra no.", sentence: "La auxiliar de vuelo a quien su piloto llev&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      nQa: {story: "Hay un piloto en particular. Algunas auxiliares de vuelo fueron voladas alrededor del pa&iacute;s por ese piloto, y otras no.", sentence: "Cada auxiliar de vuelo a quien el piloto llev&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      nDa: {story: "Hay un piloto en particular. Una auxiliar de vuelo fue volada alrededor del pa&iacute;s por ese piloto, y otra no.", sentence: "La auxiliar de vuelo a quien el piloto llev&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      yQq: {story: "Las auxiliares de vuelo trabajan con ciertos pilotos. Algunas auxiliares de vuelo fueron llevadas alrededor del pa&iacute;s por su piloto, y otras no.", sentence: "Cada auxiliar de vuelo que su piloto vol&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      yDq: {story: "Las auxiliares de vuelo trabajan con ciertos pilotos. Una auxiliar de vuelo fue volada alrededor del pa&iacute;s por su piloto, y otra no.", sentence: "La auxiliar de vuelo que su piloto llev&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      nQq: {story: "Hay un piloto en particular. Algunas auxiliares de vuelo fueron voladas alrededor del pa&iacute;s por ese piloto, y otras no.", sentence: "Cada auxiliar de vuelo que el piloto llev&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"},
      nDq: {story: "Hay un piloto en particular. Una auxiliar de vuelo fue volada alrededor del pa&iacute;s por ese piloto, y otra no.", sentence: "La auxiliar de vuelo que el piloto llev&oacute; alrededor del pa&iacute;s evit&oacute; la turbulencia.", item: "pilot"}},
      {itemtype: "test",
      yQa: {story: "Los cantantes interpretan con ciertos pianistas. Algunos cantantes fueron escuchados durante el ensayo por su pianista, y otros no.", sentence: "Cada cantante a quien su pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      yDa: {story: "Los cantantes interpretan con ciertos pianistas. Un cantante fue escuchado durante el ensayo por su pianista, y otro no.", sentence: "El cantante a quien su pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      nQa: {story: "Hay un pianista en particular. Algunos cantantes fueron escuchados durante el ensayo por ese pianista, y otros no.", sentence: "Cada cantante a quien el pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      nDa: {story: "Hay un pianista en particular. Un cantante fue escuchado durante el ensayo por ese pianista, y otro no.", sentence: "El cantante a quien el pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      yQq: {story: "Los cantantes interpretan con ciertos pianistas. Algunos cantantes fueron escuchados durante el ensayo por su pianista, y otros no.", sentence: "Cada cantante que su pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      yDq: {story: "Los cantantes interpretan con ciertos pianistas. Un cantante fue escuchado durante el ensayo por su pianista, y otro no.", sentence: "El cantante que su pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      nQq: {story: "Hay un pianista en particular. Algunos cantantes fueron escuchados durante el ensayo por ese pianista, y otros no.", sentence: "Cada cantante que el pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"},
      nDq: {story: "Hay un pianista en particular. Un cantante fue escuchado durante el ensayo por ese pianista, y otro no.", sentence: "El cantante que el pianista escuch&oacute; durante el ensayo sonaba hermoso.", item: "pianist"}},
      {itemtype: "test",
      yQa: {story: "Las princesas son las hijas de ciertas reinas. Algunas princesas eran amadas por su reina, y otras no.", sentence: "Cada princesa a quien su reina amaba fue incluida en el retrato real.", item: "queen"},
      yDa: {story: "Las princesas son las hijas de ciertas reinas. Una princesa era amada por su reina, y otra no.", sentence: "La princesa a quien su reina amaba fue incluida en el retrato real.", item: "queen"},
      nQa: {story: "Hay una reina en particular. Algunas princesas eran amadas por esa reina, y otras no.", sentence: "Cada princesa a quien la reina amaba fue incluida en el retrato real.", item: "queen"},
      nDa: {story: "Hay una reina en particular. Una princesa era amada por esa reina, y otra no.", sentence: "La princesa a quien la reina amaba fue incluida en el retrato real.", item: "queen"},
      yQq: {story: "Las princesas son las hijas de ciertas reinas. Algunas princesas eran amadas por su reina, y otras no.", sentence: "Cada princesa que su reina amaba fue incluida en el retrato real.", item: "queen"},
      yDq: {story: "Las princesas son las hijas de ciertas reinas. Una princesa era amada por su reina, y otra no.", sentence: "La princesa que su reina amaba fue incluida en el retrato real.", item: "queen"},
      nQq: {story: "Hay una reina en particular. Algunas princesas eran amadas por esa reina, y otras no.", sentence: "Cada princesa que la reina amaba fue incluida en el retrato real.", item: "queen"},
      nDq: {story: "Hay una reina en particular. Una princesa era amada por esa reina, y otra no.", sentence: "La princesa que la reina amaba fue incluida en el retrato real.", item: "queen"}},
      {itemtype: "test",
      yQa: {story: "Los flautistas son supervisados por ciertos directores de orquesta. Algunos flautistas fueron vistos en el escenario por su director, y otros no.", sentence: "Cada flautista a quien su director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      yDa: {story: "Los flautistas son supervisados por ciertos directores de orquesta. Un flautista fue visto en el escenario por su director, y otro no.", sentence: "El flautista a quien su director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      nQa: {story: "Hay un cierto director de orquesta. Algunos flautistas fueron vistos en el escenario por ese director, y otros no.", sentence: "Cada flautista a quien el director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      nDa: {story: "Hay un cierto director de orquesta. Un flautista fue visto en el escenario por ese director, y otro no.", sentence: "El flautista a quien el director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      yQq: {story: "Los flautistas son supervisados por ciertos directores de orquesta. Algunos flautistas fueron vistos en el escenario por su director, y otros no.", sentence: "Cada flautista que su director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      yDq: {story: "Los flautistas son supervisados por ciertos directores de orquesta. Un flautista fue visto en el escenario por su director, y otro no.", sentence: "El flautista que su director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      nQq: {story: "Hay un cierto director de orquesta. Algunos flautistas fueron vistos en el escenario por ese director, y otros no.", sentence: "Cada flautista que el director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"},
      nDq: {story: "Hay un cierto director de orquesta. Un flautista fue visto en el escenario por ese director, y otro no.", sentence: "El flautista que el director vio en el escenario ten&iacute;a que estar en el foso de la orquesta.", item: "conductor"}},
      {itemtype: "test",
      yQa: {story: "Las modelos son emparejadas con ciertos artistas. Algunas modelos fueron pintadas en lienzo por su artista, y otras no.", sentence: "Cada modelo a quien su artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      yDa: {story: "Las modelos son emparejadas con ciertos artistas. Una modelo fue pintada en lienzo por su artista, y otra no.", sentence: "La modelo a quien su artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      nQa: {story: "Hay un cierto artista. Algunas modelos fueron pintadas en lienzo por ese artista, y otras no.", sentence: "Cada modelo a quien el artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      nDa: {story: "Hay un cierto artista. Una modelo fue pintada en lienzo por ese artista, y otra no.", sentence: "La modelo a quien el artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      yQq: {story: "Las modelos son emparejadas con ciertos artistas. Algunas modelos fueron pintadas en lienzo por su artista, y otras no.", sentence: "Cada modelo que su artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      yDq: {story: "Las modelos son emparejadas con ciertos artistas. Una modelo fue pintada en lienzo por su artista, y otra no.", sentence: "La modelo que su artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      nQq: {story: "Hay un cierto artista. Algunas modelos fueron pintadas en lienzo por ese artista, y otras no.", sentence: "Cada modelo que el artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"},
      nDq: {story: "Hay un cierto artista. Una modelo fue pintada en lienzo por ese artista, y otra no.", sentence: "La modelo que el artista pint&oacute; en lienzo luc&iacute;a impresionante.", item: "artist"}},
      {itemtype: "test",
      yQa: {story: "Las mujeres polic&iacute;a son supervisadas por ciertos jefes de estaci&oacute;n. Algunas mujeres polic&iacute;a fueron supervisadas por su jefe, y otras no.", sentence: "Cada mujer polic&iacute;a a quien su jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      yDa: {story: "Las mujeres polic&iacute;a son supervisadas por ciertos jefes de estaci&oacute;n. Una mujer polic&iacute;a fue supervisada por su jefe, y otra no.", sentence: "La mujer polic&iacute;a a quien su jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      nQa: {story: "Hay un jefe de estaci&oacute;n en particular. Algunas mujeres polic&iacute;a fueron supervisadas por ese jefe, y otras no.", sentence: "Cada mujer polic&iacute;a a quien el jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      nDa: {story: "Hay un jefe de estaci&oacute;n en particular. Una mujer polic&iacute;a fue supervisada por ese jefe, y otra no.", sentence: "La mujer polic&iacute;a a quien el jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      yQq: {story: "Las mujeres polic&iacute;a son supervisadas por ciertos jefes de estaci&oacute;n. Algunas mujeres polic&iacute;a fueron supervisadas por su jefe, y otras no.", sentence: "Cada mujer polic&iacute;a que su jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      yDq: {story: "Las mujeres polic&iacute;a son supervisadas por ciertos jefes de estaci&oacute;n. Una mujer polic&iacute;a fue supervisada por su jefe, y otra no.", sentence: "La mujer polic&iacute;a que su jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      nQq: {story: "Hay un jefe de estaci&oacute;n en particular. Algunas mujeres polic&iacute;a fueron supervisadas por ese jefe, y otras no.", sentence: "Cada mujer polic&iacute;a que el jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"},
      nDq: {story: "Hay un jefe de estaci&oacute;n en particular. Una mujer polic&iacute;a fue supervisada por ese jefe, y otra no.", sentence: "La mujer polic&iacute;a que el jefe supervis&oacute; en la comisar&iacute;a estaba a la altura del trabajo.", item: "chief"}},
      {itemtype: "test",
      yQa: {story: "Las enfermeras trabajan para ciertos mdicos. Algunas enfermeras fueron consultadas en la cl&iacute;nica por su m&eacute;dico, y otras no.", sentence: "Cada enfermera a quien su m&eacute;dico consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      yDa: {story: "Las enfermeras trabajan para ciertos m&eacute;dicos. Una enfermera fue consultada en la cl&iacute;nica por su m&eacute;dico, y otra no.", sentence: "La enfermera a quien su m&eacute;dico consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      nQa: {story: "Hay un m&eacute;dico en particular. Algunas enfermeras fueron consultadas en la cl&iacute;nica por ese m&eacute;dico, y otras no.", sentence: "Cada enfermera a quien el doctor consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      nDa: {story: "Hay un m&eacute;dico en particular. Una enfermera fue consultada en la cl&iacute;nica por ese m&eacute;dico, y otra no.", sentence: "La enfermera a quien el doctor consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      yQq: {story: "Las enfermeras trabajan para ciertos m&eacute;dicos. Algunas enfermeras fueron consultadas en la cl&iacute;nica por su m&eacute;dico, y otras no.", sentence: "Cada enfermera que su m&eacute;dico consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      yDq: {story: "Las enfermeras trabajan para ciertos m&eacute;dicos. Una enfermera fue consultada en la cl&iacute;nica por su m&eacute;dico, y otra no.", sentence: "La enfermera que su m&eacute;dico consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      nQq: {story: "Hay un m&eacute;dico en particular. Algunas enfermeras fueron consultadas en la cl&iacute;nica por ese m&eacute;dico, y otras no.", sentence: "Cada enfermera que el doctor consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"},
      nDq: {story: "Hay un m&eacute;dico en particular. Una enfermera fue consultada en la cl&iacute;nica por ese m&eacute;dico, y otra no.", sentence: "La enfermera que el doctor consult&oacute; en la cl&iacute;nica ofreci&oacute; una perspectiva valiosa.", item: "doctor"}},
      {itemtype: "test",
      yQa: {story: "Los gu&iacute;as tur&iacute;sticos son respaldados por ciertos agentes de viajes. Algunos gu&iacute;as tur&iacute;sticos fueron respaldados por su agente de viajes, y otros no.", sentence: "Cada gu&iacute;a tur&iacute;stico a quien su agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      yDa: {story: "Los gu&iacute;as tur&iacute;sticos son respaldados por ciertos agentes de viajes. Un gu&iacute;a tur&iacute;stico fue respaldado por su agente de viajes, y otro no.", sentence: "El gu&iacute;a tur&iacute;stico a quien su agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      nQa: {story: "Hay un agente de viajes en particular. Algunos gu&iacute;as tur&iacute;sticos fueron respaldados por el agente de viajes, y otros no.", sentence: "Cada gu&iacute;a tur&iacute;stico a quien el agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      nDa: {story: "Hay un agente de viajes en particular. Un gu&iacute;a tur&iacute;stico fue respaldado por el agente de viajes, y otro no.", sentence: "El gu&iacute;a tur&iacute;stico a quien el agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      yQq: {story: "Los gu&iacute;as tur&iacute;sticos son respaldados por ciertos agentes de viajes. Algunos gu&iacute;as tur&iacute;sticos fueron respaldados por su agente de viajes, y otros no.", sentence: "Cada gu&iacute;a tur&iacute;stico que su agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      yDq: {story: "Los gu&iacute;as tur&iacute;sticos son respaldados por ciertos agentes de viajes. Un gu&iacute;a tur&iacute;stico fue respaldado por su agente de viajes, y otro no.", sentence: "El gu&iacute;a tur&iacute;stico que su agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      nQq: {story: "Hay un agente de viajes en particular. Algunos gu&iacute;as tur&iacute;sticos fueron respaldados por el agente de viajes, y otros no.", sentence: "Cada gu&iacute;a tur&iacute;stico que el agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"},
      nDq: {story: "Hay un agente de viajes en particular. Un gu&iacute;a tur&iacute;stico fue respaldado por el agente de viajes, y otro no.", sentence: "El gu&iacute;a tur&iacute;stico que el agente de viajes respald&oacute; en un tweet tuvo mucho &eacute;xito.", item: "travelagent"}},
      {itemtype: "test",
      yQa: {story: "Los directores trabajan con ciertos dramaturgos. Algunos directores fueron criticados por su dramaturgo, y otros no.", sentence: "Cada director a quien su dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      yDa: {story: "Los directores trabajan con ciertos dramaturgos. Un director fue criticado por su dramaturgo, y otro no.", sentence: "El director a quien su dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      nQa: {story: "Hay cierto dramaturgo. Algunos directores fueron criticados por el dramaturgo, y otros no.", sentence: "Cada director a quien el dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      nDa: {story: "Hay un dramaturgo en particular. Un director fue criticado por su dramaturgo, y otro no.", sentence: "El director a quien el dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      yQq: {story: "Los directores trabajan con ciertos dramaturgos. Algunos directores fueron criticados por su dramaturgo, y otros no.", sentence: "Cada director que su dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      yDq: {story: "Los directores trabajan con ciertos dramaturgos. Un director fue criticado por su dramaturgo, y otro no.", sentence: "El director que su dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      nQq: {story: "Hay cierto dramaturgo. Algunos directores fueron criticados por el dramaturgo, y otros no.", sentence: "Cada director que el dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"},
      nDq: {story: "Hay un dramaturgo en particular. Un director fue criticado por su dramaturgo, y otro no.", sentence: "El director que el dramaturgo critic&oacute; en la reuni&oacute;n necesitaba mucha ayuda.", item: "playwright"}},
      {itemtype: "test",
      yQa: {story: "Los estudiantes tienen ciertos profesores. Algunos estudiantes fueron presentados ante la facultad por su profesor, y otros no.", sentence: "Cada estudiante a quien su profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      yDa: {story: "Los estudiantes tienen ciertos profesores. Un estudiante fue presentado ante la facultad por su profesor, y otro no.", sentence: "El estudiante a quien su profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      nQa: {story: "Hay un cierto profesor. Algunos estudiantes fueron presentados ante la facultad por el profesor, y otros no.", sentence: "Cada estudiante a quien el profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      nDa: {story: "Hay un cierto profesor. Un estudiante fue presentado ante la facultad por el profesor, y otro no.", sentence: "El estudiante a quien el profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      yQq: {story: "Los estudiantes tienen ciertos profesores. Algunos estudiantes fueron presentados ante la facultad por su profesor, y otros no.", sentence: "Cada estudiante que su profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      yDq: {story: "Los estudiantes tienen ciertos profesores. Un estudiante fue presentado ante la facultad por su profesor, y otro no.", sentence: "El estudiante que su profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      nQq: {story: "Hay un cierto profesor. Algunos estudiantes fueron presentados ante la facultad por el profesor, y otros no.", sentence: "Cada estudiante que el profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"},
      nDq: {story: "Hay un cierto profesor. Un estudiante fue presentado ante la facultad por el profesor, y otro no.", sentence: "El estudiante que el profesor present&oacute; ante la facultad influenci&oacute; al decano.", item: "professor"}},
      {itemtype: "test",
      yQa: {story: "Los participantes en el estudio son supervisados por ciertos cient&iacute;ficos. Algunos participantes fueron evaluados en el laboratorio por su cient&iacute;fico, y otros no.", sentence: "Cada participante en el estudio a quien su cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      yDa: {story: "Los participantes en el estudio son supervisados por ciertos cient&iacute;ficos. Un participante en el estudio fue evaluado en el laboratorio por su cient&iacute;fico, y otro no.", sentence: "El participante en el estudio a quien su cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      nQa: {story: "Hay un cient&iacute;fico en particular. Algunos participantes en el estudio fueron evaluados en el laboratorio por ese cient&iacute;fico, y otros no.", sentence: "Cada participante en el estudio a quien el cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      nDa: {story: "Hay un cient&iacute;fico en particular. Un participante en el estudio fue evaluado en el laboratorio por ese cient&iacute;fico, y otro no.", sentence: "El participante en el estudio a quien el cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      yQq: {story: "Los participantes en el estudio son supervisados por ciertos cient&iacute;ficos. Algunos participantes fueron evaluados en el laboratorio por su cient&iacute;fico, y otros no.", sentence: "Cada participante en el estudio que su cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      yDq: {story: "Los participantes en el estudio son supervisados por ciertos cient&iacute;ficos. Un participante en el estudio fue evaluado en el laboratorio por su cient&iacute;fico, y otro no.", sentence: "El participante en el estudio que su cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      nQq: {story: "Hay un cient&iacute;fico en particular. Algunos participantes en el estudio fueron evaluados en el laboratorio por ese cient&iacute;fico, y otros no.", sentence: "Cada participante en el estudio que el cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"},
      nDq: {story: "Hay un cient&iacute;fico en particular. Un participante en el estudio fue evaluado en el laboratorio por ese cient&iacute;fico, y otro no.", sentence: "El participante en el estudio que el cient&iacute;fico examin&oacute; en el laboratorio mostr&oacute; resultados interesantes.", item: "scientist"}},
      {itemtype: "test",
      yQa: {story: "Las encargadas del almuerzo est&aacute;n emparejadas con los chefs. Algunas encargadas del almuerzo fueron recomendadas por su chef, y otras no.", sentence: "Cada encargada del almuerzo a quien su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      yDa: {story: "Las encargadas del almuerzo est&aacute;n emparejadas con los chefs. Una encargada del almuerzo fue recomendada por su chef, y otra no.", sentence: "La encargada del almuerzo a quien su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      nQa: {story: "Hay un chef en particular. Algunas encargadas del almuerzo fueron recomendadas por ese chef, y otras no.", sentence: "Cada encargada del almuerzo a quien el chef recomend&oacute; con entusiasmo deleit&oacute; a los estudiantes.", item: "chef"},
      nDa: {story: "Hay un cierto chef. Una de las encargadas del almuerzo fue recomendada por ese chef, y otra no.", sentence: "La encargada del almuerzo a quien el chef recomend&oacute; con entusiasmo deleit&oacute; a los estudiantes.", item: "chef"},
      yQq: {story: "Las encargadas del almuerzo est&aacute;n emparejadas con los chefs. Algunas encargadas del almuerzo fueron recomendadas por su chef, y otras no.", sentence: "Cada encargada del almuerzo que su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      yDq: {story: "Las encargadas del almuerzo est&aacute;n emparejadas con los chefs. Una encargada del almuerzo fue recomendada por su chef, y otra no.", sentence: "La encargada del almuerzo que su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      nQq: {story: "Hay un chef en particular. Algunas encargadas del almuerzo fueron recomendadas por ese chef, y otras no.", sentence: "Cada encargada del almuerzo que el chef recomend&oacute; con entusiasmo deleit&oacute; a los estudiantes.", item: "chef"},
      nDq: {story: "Hay un cierto chef. Una de las encargadas del almuerzo fue recomendada por ese chef, y otra no.", sentence: "La encargada del almuerzo que el chef recomend&oacute; con entusiasmo deleit&oacute; a los estudiantes.", item: "chef"}},
      {itemtype: "test",
      yQa: {story: "Las monjas est&aacute;n bajo la supervisi&oacute;n de ciertos sacerdotes. Algunas monjas fueron promovidas por su sacerdote, y otras no.", sentence: "Cada monja a quien su sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      yDa: {story: "Las monjas est&aacute;n bajo la supervisi&oacute;n de ciertos sacerdotes. Una monja fue promovida por su sacerdote, y otra no.", sentence: "La monja a quien su sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      nQa: {story: "Hay un sacerdote en particular. Algunas monjas fueron promovidas por ese sacerdote, y otras no.", sentence: "Cada monja a quien el sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      nDa: {story: "Hay un cierto sacerdote. Una monja fue promovida por ese sacerdote, y otra no.", sentence: "La monja a quien el sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      yQq: {story: "Las monjas est&aacute;n bajo la supervisi&oacute;n de ciertos sacerdotes. Algunas monjas fueron promovidas por su sacerdote, y otras no.", sentence: "Cada monja que su sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      yDq: {story: "Las monjas est&aacute;n bajo la supervisi&oacute;n de ciertos sacerdotes. Una monja fue promovida por su sacerdote, y otra no.", sentence: "La monja que su sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      nQq: {story: "Hay un sacerdote en particular. Algunas monjas fueron promovidas por ese sacerdote, y otras no.", sentence: "Cada monja que el sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"},
      nDq: {story: "Hay un cierto sacerdote. Una monja fue promovida por ese sacerdote, y otra no.", sentence: "La monja que el sacerdote promovi&oacute; fue una inspiraci&oacute;n para muchas personas.", item: "priest"}},
      {itemtype: "test",
      yQa: {story: "Las meseras trabajan con ciertos bartenders. Algunas meseras fueron felicitadas por su bartender el viernes, y otras no.", sentence: "Cada mesera a quien su bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      yDa: {story: "Las meseras trabajan con ciertos bartenders. Una mesera fue felicitada por su bartender el viernes, y otra no.", sentence: "La mesera a quien su bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      nQa: {story: "Hay un cierto bartender. Algunas meseras fueron felicitadas por ese bartender el viernes, y otras no.", sentence: "Cada mesera a quien el bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      nDa: {story: "Hay un cierto bartender. Una mesera fue felicitada por ese bartender el viernes, y otra no.", sentence: "La mesera a quien el bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      yQq: {story: "Las meseras trabajan con ciertos bartenders. Algunas meseras fueron felicitadas por su bartender el viernes, y otras no.", sentence: "Cada mesera que su bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      yDq: {story: "Las meseras trabajan con ciertos bartenders. Una mesera fue felicitada por su bartender el viernes, y otra no.", sentence: "La mesera que su bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      nQq: {story: "Hay un cierto bartender. Algunas meseras fueron felicitadas por ese bartender el viernes, y otras no.", sentence: "Cada mesera que el bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"},
      nDq: {story: "Hay un cierto bartender. Una mesera fue felicitada por ese bartender el viernes, y otra no.", sentence: "La mesera que el bartender felicit&oacute; el viernes impresion&oacute; a los clientes.", item: "bartender"}},
      {itemtype: "test",
      yQa: {story: "Las parteras est&aacute;n asignadas a ciertas pacientes. Algunas parteras fueron solicitadas por su paciente, y otras no.", sentence: "Cada partera a quien su paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      yDa: {story: "Las parteras est&aacute;n asignadas a ciertas pacientes. Una partera fue solicitada por su paciente, y otra no.", sentence: "La partera a quien su paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      nQa: {story: "Hay una cierta paciente. Algunas parteras fueron solicitadas por esa paciente, y otras no.", sentence: "Cada partera a quien la paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      nDa: {story: "Hay una cierta paciente. Una partera fue solicitada por esa paciente, y otra no.", sentence: "La partera a quien la paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      yQq: {story: "Las parteras est&aacute;n asignadas a ciertas pacientes. Algunas parteras fueron solicitadas por su paciente, y otras no.", sentence: "Cada partera que su paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      yDq: {story: "Las parteras est&aacute;n asignadas a ciertas pacientes. Una partera fue solicitada por su paciente, y otra no.", sentence: "La partera que su paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      nQq: {story: "Hay una cierta paciente. Algunas parteras fueron solicitadas por esa paciente, y otras no.", sentence: "Cada partera que la paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"},
      nDq: {story: "Hay una cierta paciente. Una partera fue solicitada por esa paciente, y otra no.", sentence: "La partera que la paciente solicit&oacute; fue &uacute;til para aliviar algo del dolor.", item: "patient"}},
      {itemtype: "test",
      yQa: {story: "Las novias est&aacute;n emocionadas de casarse con ciertos novios. Algunas novias fueron llevadas al altar por su novio, y otras no.", sentence: "Cada novia a quien su novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      yDa: {story: "Las novias est&aacute;n emocionadas de casarse con ciertos novios. Una novia fue llevada al altar por su novio, y otra no.", sentence: "La novia a quien su novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      nQa: {story: "Hay un cierto novio. Algunas novias fueron llevadas al altar por ese novio, y otras no.", sentence: "Cada novia a quien el novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      nDa: {story: "Hay un cierto novio. Una novia fue llevada al altar por ese novio, y otra no.", sentence: "La novia a quien el novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      yQq: {story: "Las novias est&aacute;n emocionadas de casarse con ciertos novios. Algunas novias fueron llevadas al altar por su novio, y otras no.", sentence: "Cada novia que su novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      yDq: {story: "Las novias est&aacute;n emocionadas de casarse con ciertos novios. Una novia fue llevada al altar por su novio, y otra no.", sentence: "La novia que su novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      nQq: {story: "Hay un cierto novio. Algunas novias fueron llevadas al altar por ese novio, y otras no.", sentence: "Cada novia que el novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"},
      nDq: {story: "Hay un cierto novio. Una novia fue llevada al altar por ese novio, y otra no.", sentence: "La novia que el novio llev&oacute; al altar dej&oacute; impresionada a la audiencia.", item: "groom"}},
      {itemtype: "test",
      yQa: {story: "Las Girl Scouts est&aacute;n bajo la supervisi&oacute;n de ciertas l&iacute;deres de tropa. Algunas Girl Scouts fueron presentadas a los padres por su l&iacute;der de tropa, y otras no.", sentence: "Cada Girl Scout a quien su l&iacute;der de tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      yDa: {story: "Las Girl Scouts est&aacute;n bajo la supervisi&oacute;n de ciertas l&iacute;deres de tropa. Una Girl Scout fue presentada a los padres por su l&iacute;der de tropa, y otra no.", sentence: "La Girl Scout a quien su l&iacute;der de tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      nQa: {story: "Hay una cierta l&iacute;der de tropa. Algunas Girl Scouts fueron presentadas a los padres por esa l&iacute;der de tropa, y otras no.", sentence: "Cada Girl Scout a quien la l&iacute;der de la tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      nDa: {story: "Hay una cierta l&iacute;der de tropa. Una Girl Scout fue presentada a los padres por esa l&iacute;der de tropa, y otra no.", sentence: "La Girl Scout a quien la l&iacute;der de la tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      yQq: {story: "Las Girl Scouts est&aacute;n bajo la supervisi&oacute;n de ciertas l&iacute;deres de tropa. Algunas Girl Scouts fueron presentadas a los padres por su l&iacute;der de tropa, y otras no.", sentence: "Cada Girl Scout que su l&iacute;der de tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      yDq: {story: "Las Girl Scouts est&aacute;n bajo la supervisi&oacute;n de ciertas l&iacute;deres de tropa. Una Girl Scout fue presentada a los padres por su l&iacute;der de tropa, y otra no.", sentence: "La Girl Scout que su l&iacute;der de tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      nQq: {story: "Hay una cierta l&iacute;der de tropa. Algunas Girl Scouts fueron presentadas a los padres por esa l&iacute;der de tropa, y otras no.", sentence: "Cada Girl Scout que la l&iacute;der de la tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"},
      nDq: {story: "Hay una cierta l&iacute;der de tropa. Una Girl Scout fue presentada a los padres por esa l&iacute;der de tropa, y otra no.", sentence: "La Girl Scout que la l&iacute;der de la tropa present&oacute; a los padres se volvi&oacute; ampliamente popular.", item: "troopleader"}},
      {itemtype: "test",
      yQa: {story: "Las secretarias son contratadas por ciertos directores ejecutivos. Algunas secretarias fueron recordadas con exactitud por su CEO, y otras no.", sentence: "Cada secretaria a quien su CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      yDa: {story: "Las secretarias son contratadas por ciertos directores ejecutivos. Una secretaria fue recordada con exactitud por su CEO, y otra no.", sentence: "La secretaria a quien su CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      nQa: {story: "Hay un cierto CEO. Algunas secretarias fueron recordadas con exactitud por ese CEO, y otras no.", sentence: "Cada secretaria a quien el CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      nDa: {story: "Hay un CEO en particular. Una secretaria fue recordada con exactitud por ese CEO, y otra no.", sentence: "La secretaria a quien el CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      yQq: {story: "Las secretarias son contratadas por ciertos directores ejecutivos. Algunas secretarias fueron recordadas con exactitud por su CEO, y otras no.", sentence: "Cada secretaria que su CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      yDq: {story: "Las secretarias son contratadas por ciertos directores ejecutivos. Una secretaria fue recordada con exactitud por su CEO, y otra no.", sentence: "La secretaria que su CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      nQq: {story: "Hay un cierto CEO. Algunas secretarias fueron recordadas con exactitud por ese CEO, y otras no.", sentence: "Cada secretaria que el CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"},
      nDq: {story: "Hay un CEO en particular. Una secretaria fue recordada con exactitud por ese CEO, y otra no.", sentence: "La secretaria que el CEO recordaba bien impresion&oacute; a la junta de administradores.", item: "CEO"}},
      {itemtype: "test",
      yQa: {story: "Las asistentes trabajan con ciertos dentistas. Algunas asistentes fueron seleccionadas por su dentista, y otras no.", sentence: "Cada asistente a quien su dentista seleccion&oacute; para ayudar con el procedimiento estresaba al paciente.", item: "dentist"},
      yDa: {story: "Las asistentes trabajan con ciertos dentistas. Una asistente fue seleccionada por su dentista, y otra no.", sentence: "La asistente a quien su dentista seleccion&oacute; para ayudar con el procedimiento estres&oacute; al paciente.", item: "dentist"},
      nQa: {story: "Hay un cierto dentista. Algunas asistentes fueron seleccionadas por ese dentista, y otras no.", sentence: "Cada asistente a quien el dentista seleccion&oacute; para ayudar con el procedimiento estres&oacute; al paciente.", item: "dentist"},
      nDa: {story: "Hay un dentista en particular. Una asistente fue seleccionada por ese dentista, y otra no.", sentence: "La asistente a quien el dentista seleccion&oacute; para ayudar con el procedimiento estres&oacute; al paciente.", item: "dentist"},
      yQq: {story: "Las asistentes trabajan con ciertos dentistas. Algunas asistentes fueron seleccionadas por su dentista, y otras no.", sentence: "Cada asistente que su dentista seleccion&oacute; para ayudar con el procedimiento estresaba al paciente.", item: "dentist"},
      yDq: {story: "Las asistentes trabajan con ciertos dentistas. Una asistente fue seleccionada por su dentista, y otra no.", sentence: "La asistente que su dentista seleccion&oacute; para ayudar con el procedimiento estres&oacute; al paciente.", item: "dentist"},
      nQq: {story: "Hay un cierto dentista. Algunas asistentes fueron seleccionadas por ese dentista, y otras no.", sentence: "Cada asistente que el dentista seleccion&oacute; para ayudar con el procedimiento estres&oacute; al paciente.", item: "dentist"},
      nDq: {story: "Hay un dentista en particular. Una asistente fue seleccionada por ese dentista, y otra no.", sentence: "La asistente que el dentista seleccion&oacute; para ayudar con el procedimiento estres&oacute; al paciente.", item: "dentist"}},
      {itemtype: "test",
      yQa: {story: "Los influencers son promovidos por ciertos nutricionistas. Algunos influencers fueron denunciados en una publicaci&oacute;n de blog por su nutricionista, y otros no.", sentence: "Cada influencer a quien su nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      yDa: {story: "Los influencers son promovidos por ciertos nutricionistas. Un influencer fue denunciado en una publicaci&oacute;n de blog por su nutricionista, y otro no.", sentence: "El influencer a quien su nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      nQa: {story: "Hay un cierto nutricionista. Algunos influencers fueron denunciados en una publicaci&oacute;n de blog por ese nutricionista, y otros no.", sentence: "Cada influencer a quien el nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      nDa: {story: "Hay un cierto nutricionista. Un influencer fue denunciado en una publicaci&oacute;n de blog por ese nutricionista, y otro no.", sentence: "El influencer a quien el nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      yQq: {story: "Los influencers son promovidos por ciertos nutricionistas. Algunos influencers fueron denunciados en una publicaci&oacute;n de blog por su nutricionista, y otros no.", sentence: "Cada influencer que su nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      yDq: {story: "Los influencers son promovidos por ciertos nutricionistas. Un influencer fue denunciado en una publicaci&oacute;n de blog por su nutricionista, y otro no.", sentence: "El influencer que su nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      nQq: {story: "Hay un cierto nutricionista. Algunos influencers fueron denunciados en una publicaci&oacute;n de blog por ese nutricionista, y otros no.", sentence: "Cada influencer que el nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"},
      nDq: {story: "Hay un cierto nutricionista. Un influencer fue denunciado en una publicaci&oacute;n de blog por ese nutricionista, y otro no.", sentence: "El influencer que el nutricionista denunci&oacute; en una publicaci&oacute;n de blog gan&oacute; un grupo de seguidores fieles.", item: "nutritionist"}},
      {itemtype: "test",
      yQa: {story: "Las bailarinas son asesoradas por ciertos core&oacute;grafos. Algunas bailarinas fueron mencionadas en la fiesta por su core&oacute;grafo, y otras no.", sentence: "Cada bailarina a quien su core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      yDa: {story: "Las bailarinas son asesoradas por ciertos core&oacute;grafos. Una bailarina fue mencionada en la fiesta por su core&oacute;grafo, y otra no.", sentence: "La bailarina a quien su core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      nQa: {story: "Hay un cierto core&oacute;grafo. Algunas bailarinas fueron mencionadas en la fiesta por ese core&oacute;grafo, y otras no.", sentence: "Cada bailarina a quien el core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      nDa: {story: "Hay un cierto core&oacute;grafo. Una bailarina fue mencionada en la fiesta por ese core&oacute;grafo, y otra no.", sentence: "La bailarina a quien el core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      yQq: {story: "Las bailarinas son asesoradas por ciertos core&oacute;grafos. Algunas bailarinas fueron mencionadas en la fiesta por su core&oacute;grafo, y otras no.", sentence: "Cada bailarina que su core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      yDq: {story: "Las bailarinas son asesoradas por ciertos core&oacute;grafos. Una bailarina fue mencionada en la fiesta por su core&oacute;grafo, y otra no.", sentence: "La bailarina que su core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      nQq: {story: "Hay un cierto core&oacute;grafo. Algunas bailarinas fueron mencionadas en la fiesta por ese core&oacute;grafo, y otras no.", sentence: "Cada bailarina que el core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"},
      nDq: {story: "Hay un cierto core&oacute;grafo. Una bailarina fue mencionada en la fiesta por ese core&oacute;grafo, y otra no.", sentence: "La bailarina que el core&oacute;grafo mencion&oacute; en la fiesta nunca tuvo un debut.", item: "choreographer"}},
      {itemtype: "test",
      yQa: {story: "Los peluqueros est&aacute;n emparejados con ciertos estilistas. Algunos peluqueros fueron felicitados con entusiasmo por su estilista, y otros no.", sentence: "Cada peluquero a quien su estilista felicit&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      yDa: {story: "Los peluqueros est&aacute;n emparejados con ciertos estilistas. Un peluquero fue felicitado con entusiasmo por su estilista, y otro no.", sentence: "El peluquero a quien su estilista felicit&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      nQa: {story: "Hay un cierto estilista. Algunos peluqueros fueron felicitados con entusiasmo por ese estilista, y otros no.", sentence: "Cada peluquero a quien el estilista elogi&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      nDa: {story: "Hay un estilista en particular. Un peluquero fue felicitado con entusiasmo por ese estilista, y otro no.", sentence: "El peluquero a quien el estilista elogi&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      yQq: {story: "Los peluqueros est&aacute;n emparejados con ciertos estilistas. Algunos peluqueros fueron felicitados con entusiasmo por su estilista, y otros no.", sentence: "Cada peluquero que su estilista felicit&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      yDq: {story: "Los peluqueros est&aacute;n emparejados con ciertos estilistas. Un peluquero fue felicitado con entusiasmo por su estilista, y otro no.", sentence: "El peluquero que su estilista felicit&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      nQq: {story: "Hay un cierto estilista. Algunos peluqueros fueron felicitados con entusiasmo por ese estilista, y otros no.", sentence: "Cada peluquero que el estilista elogi&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"},
      nDq: {story: "Hay un estilista en particular. Un peluquero fue felicitado con entusiasmo por ese estilista, y otro no.", sentence: "El peluquero que el estilista elogi&oacute; con entusiasmo proporcion&oacute; servicios de coloraci&oacute;n de primera l&iacute;nea.", item: "stylist"}},
      {itemtype: "test",
      yQa: {story: "Las actrices tienen ciertos fan&aacute;ticos n&uacute;mero uno. Algunas actrices fueron alabadas en Twitter por su fan&aacute;tico, y otras no.", sentence: "Cada actriz a quien su fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      yDa: {story: "Las actrices tienen ciertos fan&aacute;ticos n&uacute;mero uno. Una actriz fue alabada en Twitter por su fan&aacute;tico, y otra no.", sentence: "La actriz a quien su fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      nQa: {story: "Hay un cierto fan&aacute;tico n&uacute;mero uno. Algunas actrices fueron alabadas en Twitter por ese fan&aacute;tico, y otras no.", sentence: "Cada actriz a quien el fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      nDa: {story: "Hay un cierto fan&aacute;tico n&uacute;mero uno. Una actriz fue alabada en Twitter por ese fan&aacute;tico, y otra no.", sentence: "La actriz a quien el fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      yQq: {story: "Las actrices tienen ciertos fan&aacute;ticos n&uacute;mero uno. Algunas actrices fueron alabadas en Twitter por su fan&aacute;tico, y otras no.", sentence: "Cada actriz que su fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      yDq: {story: "Las actrices tienen ciertos fan&aacute;ticos n&uacute;mero uno. Una actriz fue alabada en Twitter por su fan&aacute;tico, y otra no.", sentence: "La actriz que su fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      nQq: {story: "Hay un cierto fan&aacute;tico n&uacute;mero uno. Algunas actrices fueron alabadas en Twitter por ese fan&aacute;tico, y otras no.", sentence: "Cada actriz que el fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"},
      nDq: {story: "Hay un cierto fan&aacute;tico n&uacute;mero uno. Una actriz fue alabada en Twitter por ese fan&aacute;tico, y otra no.", sentence: "La actriz que el fan&aacute;tico n&uacute;mero uno alab&oacute; en Twitter fue nominada para un premio.", item: "fan"}},
      {itemtype: "test",
      yQa: {story: "Las gimnastas son instruidas por ciertos entrenadores. Algunas gimnastas fueron criticadas por su entrenador, y otras no.", sentence: "Cada gimnasta a quien su entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      yDa: {story: "Las gimnastas son instruidas por ciertos entrenadores. Una gimnasta fue criticada por su entrenador, y otra no.", sentence: "La gimnasta a quien su entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      nQa: {story: "Hay un cierto entrenador. Algunas gimnastas fueron criticadas por ese entrenador, y otras no.", sentence: "Cada gimnasta a quien el entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      nDa: {story: "Hay un cierto entrenador. Una gimnasta fue criticada por ese entrenador, y otra no.", sentence: "La gimnasta a quien el entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      yQq: {story: "Las gimnastas son instruidas por ciertos entrenadores. Algunas gimnastas fueron criticadas por su entrenador, y otras no.", sentence: "Cada gimnasta que su entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      yDq: {story: "Las gimnastas son instruidas por ciertos entrenadores. Una gimnasta fue criticada por su entrenador, y otra no.", sentence: "La gimnasta que su entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      nQq: {story: "Hay un cierto entrenador. Algunas gimnastas fueron criticadas por ese entrenador, y otras no.", sentence: "Cada gimnasta que el entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"},
      nDq: {story: "Hay un cierto entrenador. Una gimnasta fue criticada por ese entrenador, y otra no.", sentence: "La gimnasta que el entrenador critic&oacute; no logr&oacute; clasificar al torneo nacional.", item: "coach"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto director de empresa. Algunos candidatos fueron elogiados por ese director, y otros no.", sentence: "El candidato a quien el director elogi&oacute; fue contratado en el acto.", item: "filler1"}},
      {itemtype: "filler",
      filler: {story: "Hay una cierta manicurista. Algunas mujeres fueron atendidas por esa manicurista, y otras no.", sentence: "Cada mujer que la manicurista conoci&oacute; en el sal&oacute;n quer&iacute;a uñas rojas.", item: "filler2"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto estudiante. Algunas conferencias fueron escuchadas por ese estudiante, y otras no.", sentence: "Cada conferencia que el estudiante escuch&oacute; el lunes empez&oacute; cinco minutos tarde.", item: "filler3"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto artista. Algunos cal&iacute;grafos fueron elogiados por ese artista, y otros no.", sentence: "Cada cal&iacute;grafo quien a elogi&oacute; el artista ten&iacute;an una escritura hermosa.", item: "filler4"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto asistente de escenario. A una banda no le gust&oacute; ese asistente de escenario, y a otra s&iacute;.", sentence: "Esta es la banda que el asistente de escenario no le gustaba toc&oacute; un espect&aacute;culo con entradas agotadas.", item: "filler5"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto barista. Algunos caf&eacute;s fueron molidos por ese barista, y otros no.", sentence: "El caf&eacute; que el barista moli&oacute; demasiado fino no pag&oacute; al cliente.", item: "filler6"}}
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
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        assess : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        describe : $("#describe").val(),
        school : $("#school").val(),
        classes : $("#classes").val(),
        college : $("#college").val(),
        lived : $("#lived").val(),
        years : $("#years").val(),
        family : $("#family").val(),
        level : $("#level").val()
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
