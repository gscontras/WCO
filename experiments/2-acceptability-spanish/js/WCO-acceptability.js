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
            "Los conductores de autobuses tienen rutas espec&iacuteficas. Algunos conductores de autobuses se vieron afectados por las inundaciones, y otros no.",
          sentence:
            'Cada conductor de autob&uacutes que se vio afectado por las inundaciones eligi&oacute una ruta diferente.',
        },
      },
      {
        practice: {
          story:
            "Hay un cierto comit&eacute. Un orador motivacional fue seleccionado por ese comit&eacute, y otro no.",
          sentence:
            'El orador motivacional que fue seleccionado por el comit&eacute asisti&oacute a la ceremonia de premios.',
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
      YQA: {story: "Los auxiliares de vuelo trabajan con ciertos pilotos. Algunos auxiliares de vuelo fueron llevados alrededor del pa&iacutes por su piloto, y otros no lo fueron.", sentence: "Cada auxiliar de vuelo que su piloto vol&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      YQI: {story: "Los aviones son operados por ciertos pilotos. Algunos aviones fueron volados alrededor del pa&iacutes por su piloto, y otros no lo fueron.", sentence: "Cada avi&oacuten que su piloto vol&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      YDA: {story: "Los asistentes de vuelo trabajan con ciertos pilotos. Una auxiliar de vuelo fue volada alrededor del pa&iacutes por su piloto, y otra no lo fue.", sentence: "La auxiliar de vuelo a quien su piloto llev&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      YDI: {story: "Los aviones son operados por ciertos pilotos. Un avi&oacuten fue volado alrededor del pa&iacutes por su piloto, y otro no lo fue.", sentence: "El avi&oacuten que su piloto vol&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      NQA: {story: "Hay un piloto en particular. Algunas auxiliares de vuelo fueron voladas alrededor del pa&iacutes por ese piloto, y otras no lo fueron.", sentence: "Cada auxiliar de vuelo a quien el piloto llev&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      NQI: {story: "Hay un piloto en particular. Algunos aviones fueron volados alrededor del pa&iacutes por ese piloto, y otros no lo fueron.", sentence: "Cada avi&oacuten que el piloto vol&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      NDA: {story: "Hay un piloto en particular. Una auxiliar de vuelo fue volada alrededor del pa&iacutes por ese piloto, y otra no.", sentence: "La auxiliar de vuelo a quien el piloto llev&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"},
      NDI: {story: "Hay un piloto en particular. Un avi&oacuten fue volado alrededor del pa&iacutes por ese piloto, y otro no.", sentence: "El avi&oacuten que el piloto vol&oacute alrededor del pa&iacutes evit&oacute la turbulencia.", item: "pilot"}},
      {itemtype: "test",
      YQA: {story: "Los cantantes interpretan con ciertos pianistas. Algunos cantantes fueron escuchados durante el ensayo por su pianista, y otros no.", sentence: "Cada cantante que su pianista escuch&oacute durante el ensayo sonaba hermoso.", item: "pianist"},
      YQI: {story: "Las guitarras se emparejan con ciertos pianistas. Algunas guitarras fueron escuchadas durante el ensayo por su pianista, y otras no.", sentence: "Cada piano que su pianista escuch&oacute durante el ensayo sonaba hermoso.", item: "pianist"},
      YDA: {story: "Los cantantes interpretan con ciertos pianistas. Una cantante fue escuchada durante el ensayo por su pianista, y otra no.", sentence: "La cantante a quien su pianista escuch&oacute durante el ensayo sonaba hermosa.", item: "pianist"},
      YDI: {story: "Las guitarras se emparejan con ciertos pianistas. Una guitarra fue escuchada durante el ensayo por su pianista, y otra no.", sentence: "El piano que su pianista escuch&oacute durante el ensayo sonaba hermoso.", item: "pianist"},
      NQA: {story: "Hay un pianista en particular. Algunos cantantes fueron escuchados durante el ensayo por ese pianista, y otros no.", sentence: "Cada cantante que el pianista escuch&oacute durante el ensayo sonaba hermoso.", item: "pianist"},
      NQI: {story: "Hay un pianista en particular. Algunas guitarras fueron escuchadas durante el ensayo por ese pianista, y otras no.", sentence: "Cada piano que el pianista escuch&oacute durante el ensayo sonaba hermoso.", item: "pianist"},
      NDA: {story: "Hay un pianista en particular. Un cantante fue escuchado durante el ensayo por ese pianista, y otro no.", sentence: "La cantante que el pianista escuch&oacute durante el ensayo sonaba hermosa.", item: "pianist"},
      NDI: {story: "Hay un pianista en particular. Una guitarra fue escuchada durante el ensayo por ese pianista, y otra no.", sentence: "El piano que el pianista escuch&oacute durante el ensayo sonaba hermoso.", item: "pianist"}},
      {itemtype: "test",
      YQA: {story: "Las princesas son las hijas de ciertas reinas. Algunas princesas eran admiradas por su reina, y otras no.", sentence: "Cada princesa que su reina admiraba fue incluida en el retrato real.", item: "queen"},
      YQI: {story: "Las tiaras son llevadas por ciertas reinas. Algunas tiaras eran admiradas por su reina, y otras no.", sentence: "Cada tiara que su reina admiraba fue incluida en el retrato real.", item: "queen"},
      YDA: {story: "Las princesas son las hijas de ciertas reinas. Una princesa fue admirada por su reina, y otra no.", sentence: "La princesa a quien su reina admiraba fue incluida en el retrato real.", item: "queen"},
      YDI: {story: "Las tiaras son usadas por ciertas reinas. Una tiara fue admirada por su reina, y otra no.", sentence: "La tiara que su reina admiraba fue incluida en el retrato real.", item: "queen"},
      NQA: {story: "Hay una reina en particular. Algunas princesas fueron admiradas por esa reina, y otras no.", sentence: "Cada princesa que la reina admiraba fue incluida en el retrato real.", item: "queen"},
      NQI: {story: "Hay una reina en particular. Algunas tiaras fueron admiradas por esa reina, y otras no.", sentence: "Cada diadema que la reina admiraba fue incluida en el retrato real.", item: "queen"},
      NDA: {story: "Hay una reina en particular. Una princesa fue admirada por esa reina, y otra no.", sentence: "La princesa a quien la reina admiraba fue incluida en el retrato real.", item: "queen"},
      NDI: {story: "Hay una reina en particular. Una tiara fue admirada por esa reina, y otra no.", sentence: "La tiara que la reina admiraba estaba en el retrato real.", item: "queen"}},
      {itemtype: "test",
      YQA: {story: "Los flautistas son supervisados por ciertos directores de orquesta. Algunos flautistas fueron vistos en el escenario por su director, y otros no.", sentence: "Cada flautista que su director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      YQI: {story: "Las trompetas est&aacuten en la orquesta de ciertos directores de orquesta. Algunas trompetas fueron vistas en el escenario por su director, y otras no.", sentence: "Cada trompeta que su director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      YDA: {story: "Los flautistas son supervisados por ciertos directores de orquesta. Un flautista fue visto en el escenario por su director, y otro no.", sentence: "La flautista que su director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      YDI: {story: "Las trompetas est&aacuten en la orquesta de ciertos directores de orquesta. Una trompeta fue vista en el escenario por su director, y otra no.", sentence: "La trompeta que su director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      NQA: {story: "Hay un cierto director de orquesta. Algunos flautistas fueron vistos en el escenario por ese director, y otros no.", sentence: "Cada flautista que el director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      NQI: {story: "Hay un cierto director de orquesta. Algunas trompetas fueron vistas en el escenario por ese director, y otras no.", sentence: "Cada trompeta que el director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      NDA: {story: "Hay un cierto director de orquesta. Un flautista fue visto en el escenario por ese director, y otro no.", sentence: "La flautista que el director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"},
      NDI: {story: "Hay un cierto director de orquesta. Una trompeta fue vista en el escenario por ese director, y otra no.", sentence: "La trompeta que el director vio en el escenario necesitaba estar en el foso de la orquesta.", item: "conductor"}},
      {itemtype: "test",
      YQA: {story: "Los modelos son emparejados con ciertos artistas. Algunas modelos fueron pintados en lienzo por su artista, y otros no.", sentence: "Cada modelo que su artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      YQI: {story: "Los retratos son pintados por ciertos artistas. Algunas ruedas de alfarer&iacutea fueron pintadas en lienzo por su artista, y otras no.", sentence: "Cada retrato que su artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      YDA: {story: "Los modelos son emparejados con ciertos artistas. Un modelo fue pintado en lienzo por su artista, y otro no.", sentence: "La modelo que su artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      YDI: {story: "Los retratos son pintados por ciertos artistas. Una rueda de alfarer&iacutea fue pintada en lienzo por su artista, y otra no.", sentence: "El retrato que su artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      NQA: {story: "Hay un cierto artista. Algunos modelos fueron pintados en lienzo por ese artista, y otros no.", sentence: "Cada modelo que el artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      NQI: {story: "Hay un cierto artista. Algunas ruedas de alfarer&iacutea fueron pintadas en lienzo por ese artista, y otras no.", sentence: "Cada retrato que el artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      NDA: {story: "Hay un cierto artista. Un modelo fue pintado en lienzo por ese artista, y otro no.", sentence: "La modelo que el artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"},
      NDI: {story: "Hay un cierto artista. Una rueda de alfarer&iacutea fue pintada en lienzo por ese artista, y otra no.", sentence: "El retrato que el artista pint&oacute en lienzo luc&iacutea impresionante.", item: "artist"}},
      {itemtype: "test",
      YQA: {story: "Las mujeres polic&iacutea son emparejadas con ciertos supervisores. Algunas mujeres polic&iacutea fueron observadas por su supervisor, y otras no.", sentence: "Cada mujer polic&iacutea que su supervisor observaba en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      YQI: {story: "Las computadoras son utilizadas por ciertos supervisores. Algunas computadoras fueron observadas por su supervisor, y otras no.", sentence: "Cada computadora que su supervisor observaba en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      YDA: {story: "Las mujeres polic&iacutea son emparejadas con ciertos supervisores. Una mujer polic&iacutea fue observada por su supervisor, y otra no.", sentence: "La mujer polic&iacutea que su supervisor observ&oacute en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      YDI: {story: "Las computadoras son utilizadas por ciertos supervisores. Una computadora fue observada por su supervisor, y otra no.", sentence: "La computadora que su supervisor observ&oacute en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      NQA: {story: "Hay un supervisor en particular. Algunas mujeres polic&iacutea fueron observadas por ese supervisor, y otras no.", sentence: "Cada mujer polic&iacutea que el supervisor observ&oacute en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      NQI: {story: "Hay un supervisor en particular. Algunas computadoras fueron observadas por ese supervisor, y otras no.", sentence: "Cada computadora que el supervisor observ&oacute en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      NDA: {story: "Hay un supervisor en particular. Una mujer polic&iacutea fue observada por ese supervisor, y otra no.", sentence: "La mujer polic&iacutea que el supervisor observ&oacute en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"},
      NDI: {story: "Hay un supervisor en particular. Una computadora fue observada por ese supervisor, y otra no.", sentence: "La computadora que el supervisor observ&oacute en la comisar&iacutea estaba a la altura del trabajo.", item: "supervisor"}},
      {itemtype: "test",
      YQA: {story: "Las enfermeras trabajan para ciertos m&eacutedicos. Algunas enfermeras fueron consultadas en la cl&iacutenica por su m&eacutedico, y otras no.", sentence: "Cada enfermera a la que su m&eacutedico consult&oacute en la cl&iacutenica ofreci&oacute una perspectiva valiosa.", item: "doctor"},
      YQI: {story: "Las pruebas de laboratorio son inspeccionadas por ciertos m&eacutedicos. Algunas pruebas de laboratorio fueron consultadas en la cl&iacutenica por su m&eacutedico, y otras no.", sentence: "Cada laboratorio que su m&eacutedico consult&oacute en la cl&iacutenica ofreci&oacute informaci&oacuten valiosa.", item: "doctor"},
      YDA: {story: "Las enfermeras trabajan para ciertos m&eacutedicos. Una enfermera fue consultada en la cl&iacutenica por su m&eacutedico, y otra no.", sentence: "La enfermera a la que su m&eacutedico consult&oacute en la cl&iacutenica ofreci&oacute una perspectiva valiosa.", item: "doctor"},
      YDI: {story: "Las pruebas de laboratorio son inspeccionadas por ciertos m&eacutedicos. Una prueba de laboratorio fue consultada en la cl&iacutenica por su m&eacutedico, y otra no.", sentence: "El laboratorio que su m&eacutedico consult&oacute en la cl&iacutenica ofreci&oacute informaci&oacuten valiosa.", item: "doctor"},
      NQA: {story: "Hay un m&eacutedico en particular. Algunas enfermeras fueron consultadas en la cl&iacutenica por ese m&eacutedico, y otras no.", sentence: "Cada enfermera a la que el doctor consult&oacute en la cl&iacutenica ofreci&oacute una perspectiva valiosa.", item: "doctor"},
      NQI: {story: "Hay un m&eacutedico en particular. Algunas pruebas de laboratorio fueron consultadas en la cl&iacutenica por ese m&eacutedico, y otras no.", sentence: "Cada laboratorio que el doctor consult&oacute en la cl&iacutenica ofreci&oacute informaci&oacuten valiosa.", item: "doctor"},
      NDA: {story: "Hay un m&eacutedico en particular. Una enfermera fue consultada en la cl&iacutenica por ese m&eacutedico, y otra no.", sentence: "La enfermera a la que el doctor consult&oacute en la cl&iacutenica ofreci&oacute una perspectiva valiosa.", item: "doctor"},
      NDI: {story: "Hay un m&eacutedico en particular. Una prueba de laboratorio fue consultada en la cl&iacutenica por ese m&eacutedico, y otra no.", sentence: "El laboratorio que el doctor consult&oacute en la cl&iacutenica ofreci&oacute informaci&oacuten valiosa.", item: "doctor"}},
      {itemtype: "test",
      YQA: {story: "Los gu&iacuteas tur&iacutesticos son respaldados por ciertos agentes de viajes. Algunos gu&iacuteas tur&iacutesticos fueron respaldados por su agente de viajes, otros no lo fueron.", sentence: "Cada gu&iacutea tur&iacutestico que su agente de viajes respald&oacute en un tweet vendi&oacute todas sus entradas.", item: "travelagent"},
      YQI: {story: "Las visitas tur&iacutesiticas son ofrecidas por ciertos agentes de viajes. Algunas visitas tur&iacutesiticas fueron respaldadas por su agente de viajes, otras no lo fueron.", sentence: "Cada recorrido guiado que su agente de viajes respald&oacute en un tweet vendi&oacute todas sus entradas.", item: "travelagent"},
      YDA: {story: "Los gu&iacuteas tur&iacutesticos son respaldados por ciertos agentes de viajes. Un gu&iacutea tur&iacutestico fue respaldado por su agente de viajes, otro no lo fue.", sentence: "La gu&iacutea tur&iacutestica que su agente de viajes respald&oacute en un tweet vendi&oacute todas las entradas.", item: "travelagent"},
      YDI: {story: "Las visitas tur&iacutesiticas son ofrecidas por ciertos agentes de viajes. Una visita tur&iacutesitica fue respaldada por su agente de viajes, otra no lo fue.", sentence: "La visita guiada que su agente de viajes respald&oacute en un tweet agot&oacute todas las entradas.", item: "travelagent"},
      NQA: {story: "Hay un agente de viajes en particular. Algunos gu&iacuteas tur&iacutesticos fueron respaldados por el agente de viajes, otros no lo fueron.", sentence: "Cada gu&iacutea tur&iacutestico que el agente de viajes respald&oacute en un tweet vendi&oacute todas las entradas.", item: "travelagent"},
      NQI: {story: "Hay un agente de viajes en particular. Algunas visitas tur&iacutesticas fueron respaldadas por el agente de viajes, otras no lo fueron.", sentence: "Cada visita guiada que el agente de viajes respald&oacute en un tweet agot&oacute todas las entradas.", item: "travelagent"},
      NDA: {story: "Hay un agente de viajes en particular. Un gu&iacutea tur&iacutestico fue respaldado por el agente de viajes, otro no lo fue.", sentence: "La gu&iacutea tur&iacutestica que el agente de viajes respald&oacute en un tweet vendi&oacute todas las entradas.", item: "travelagent"},
      NDI: {story: "Hay un agente de viajes en particular. Una visita tur&iacutestica fue respaldada por el agente de viajes, otra no lo fue.", sentence: "La visita guiada que el agente de viajes respald&oacute en un tweet agot&oacute todas las entradas.", item: "travelagent"}},
      {itemtype: "test",
      YQA: {story: "Los directores trabajan con ciertos dramaturgos. Algunos directores fueron dirigidos por su dramaturgo, y otros no lo fueron.", sentence: "Cada director a quien su dramaturga se dirigi&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      YQI: {story: "Los guiones son escritos por ciertos dramaturgos. Algunos guiones fueron enfocados por su dramaturgo, y otros no lo fueron.", sentence: "Cada guion que su dramaturga se enfoc&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      YDA: {story: "Los directores trabajan con ciertos dramaturgos. Un director fue dirigido por su dramaturgo, y otros no lo fueron.", sentence: "El director a quien su dramaturga se dirigi&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      YDI: {story: "Los guiones son escritos por ciertos dramaturgos. Un gui&oacuten fue enfocado por su dramaturgo, y otros no lo fueron.", sentence: "El guion que su dramaturga se enfoc&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      NQA: {story: "Hay cierto dramaturgo. Algunos directores fueron dirigidos por el dramaturgo, y otros no.", sentence: "Cada director a quien la dramaturga se dirigi&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      NQI: {story: "Hay un dramaturgo en particular. Algunos guiones fueron enfocados por el dramaturgo, y otros no.", sentence: "Cada guion que la dramaturga se enfoc&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      NDA: {story: "Hay un dramaturgo en particular. Un director fue dirigido por su dramaturgo, y otros no lo fueron.", sentence: "El director a quien la dramaturga se dirigi&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"},
      NDI: {story: "Hay un dramaturgo en particular. Un gui&oacuten fue enfocado por su dramaturgo, y otros no lo fueron.", sentence: "El guion que la dramaturga se enfoc&oacute en la reuni&oacuten necesitaba considerable ayuda.", item: "playwright"}},
      {itemtype: "test",
      YQA: {story: "Los estudiantes tienen ciertos profesores. Algunos estudiantes fueron presentados ante la facultad por su profesor, y otros no lo fueron.", sentence: "Cada estudiante que su profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      YQI: {story: "Los manuscritos son escritos por ciertos profesores. Algunos manuscritos fueron presentados ante la facultad por su profesor, y otros no lo fueron.", sentence: "Cada manuscrito que su profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      YDA: {story: "Los estudiantes tienen ciertos profesores. Un estudiante fue presentado ante la facultad por su profesor, y otro no lo fue.", sentence: "La estudiante a quien su profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      YDI: {story: "Los manuscritos son escritos por ciertos profesores. Un manuscrito fue presentado ante la facultad por su profesor, y otro no lo fue.", sentence: "El manuscrito que su profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      NQA: {story: "Hay un cierto profesor. Algunos estudiantes fueron presentados ante la facultad por el profesor, y otros no lo fueron.", sentence: "Cada estudiante que el profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      NQI: {story: "Hay un cierto profesor. Algunos manuscritos fueron presentados ante la facultad por el profesor, y otros no lo fueron.", sentence: "Cada manuscrito que el profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      NDA: {story: "Hay un cierto profesor. Un estudiante fue presentado ante la facultad por el profesor, y otro no lo fue.", sentence: "El estudiante que el profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"},
      NDI: {story: "Hay un cierto profesor. Un manuscrito fue presentado ante la facultad por el profesor, y otro no lo fue.", sentence: "El manuscrito que el profesor present&oacute ante la facultad influenci&oacute al decano.", item: "professor"}},
      {itemtype: "test",
      YQA: {story: "Los participantes en el estudio son supervisados por ciertos cient&iacuteficos. Algunos participantes fueron evaluados en el laboratorio por su cient&iacutefico, y otros no lo fueron.", sentence: "Cada participante en el estudio a quien su cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      YQI: {story: "Las muestras de suelo son inspeccionadas por ciertos cient&iacuteficos. Algunas muestras de suelo fueron analizadas en el laboratorio por su cient&iacutefico, y otras no lo fueron.", sentence: "Cada muestra de suelo que su cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      YDA: {story: "Los participantes en el estudio son supervisados por ciertos cient&iacuteficos. Una participante en el estudio fue evaluada en el laboratorio por su cient&iacutefico, y otra no lo fue.", sentence: "El participante en el estudio a quien su cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      YDI: {story: "Las muestras de suelo son inspeccionadas por ciertos cient&iacuteficos. Una muestra de suelo fue analizada en el laboratorio por su cient&iacutefico, y otra no lo fue.", sentence: "La muestra de suelo que su cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      NQA: {story: "Hay un cient&iacutefico en particular. Algunos participantes en el estudio fueron evaluados en el laboratorio por ese cient&iacutefico, y otros no lo fueron.", sentence: "Cada participante en el estudio que el cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      NQI: {story: "Hay un cient&iacutefico en particular. Algunas muestras de suelo fueron analizadas en el laboratorio por ese cient&iacutefico, y otras no lo fueron.", sentence: "Cada muestra de suelo que el cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      NDA: {story: "Hay un cient&iacutefico en particular. Un participante en el estudio fue evaluado en el laboratorio por ese cient&iacutefico, y otro no lo fue.", sentence: "El participante en el estudio que el cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"},
      NDI: {story: "Hay un cient&iacutefico en particular. Una muestra de suelo fue analizada en el laboratorio por ese cient&iacutefico, y otra no lo fue.", sentence: "La muestra de suelo que el cient&iacutefico examin&oacute en el laboratorio mostr&oacute resultados interesantes.", item: "scientist"}},
      {itemtype: "test",
      YQA: {story: "Las encargadas del almuerzo est&aacuten emparejadas con los chefs. Algunas encargadas del almuerzo fueron recomendadas por su chef, y otras no lo fueron.", sentence: "Cada cocinera a quien su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      YQI: {story: "Los almuerzos escolares son preparados por ciertos chefs. Algunos almuerzos escolares fueron recomendados por su chef, y otros no lo fueron.", sentence: "Cada almuerzo escolar que su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      YDA: {story: "Las encargadas del almuerzo est&aacuten emparejadas con los chefs. Una encargada del almuerzo fue recomendada por su chef, y otra no lo fue.", sentence: "La cocinera a quien su chef recomendaba con entusiasmo deleitaba a los estudiantes.", item: "chef"},
      YDI: {story: "Los almuerzos escolares son preparados por ciertos chefs. Un almuerzo escolar fue recomendado por su chef, y otro no lo fue.", sentence: "El almuerzo escolar que el chef recomend&oacute con entusiasmo deleit&oacute a los estudiantes.", item: "chef"},
      NQA: {story: "Hay un chef en particular. Algunas encargadas del almuerzo fueron recomendadas por ese chef, y otras no lo fueron.", sentence: "Cada mujer de la cocina a la que el chef recomend&oacute con entusiasmo deleit&oacute a los estudiantes.", item: "chef"},
      NQI: {story: "Hay un cierto chef. Algunos almuerzos escolares fueron recomendados por ese chef, y otros no lo fueron.", sentence: "Cada almuerzo escolar que el chef recomend&oacute con entusiasmo deleit&oacute a los estudiantes.", item: "chef"},
      NDA: {story: "Hay un cierto chef. Una de las se&ntildeoras de los almuerzos fue recomendada por ese chef, y otra no lo fue.", sentence: "La se&ntildeora del almuerzo a quien el chef recomend&oacute con entusiasmo deleit&oacute a los estudiantes.", item: "chef"},
      NDI: {story: "Hay un chef en particular. Un almuerzo escolar fue recomendado por ese chef, y otro no lo fue.", sentence: "El almuerzo escolar que el chef recomend&oacute con entusiasmo deleit&oacute a los estudiantes.", item: "chef"}},
      {itemtype: "test",
      YQA: {story: "Las monjas est&aacuten emparejadas con ciertos sacerdotes. Algunas monjas fueron promovidas por su sacerdote y otras no lo fueron.", sentence: "Cada monja a quien su sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      YQI: {story: "Los sermones son impartidos por ciertos sacerdotes. Algunos sermones fueron promovidos por su sacerdote, y otros no lo fueron.", sentence: "Cada serm&oacuten que su sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      YDA: {story: "Las monjas est&aacuten emparejadas con ciertos sacerdotes. Una monja fue promovida por su sacerdote, y otra no lo fue.", sentence: "La monja a quien su sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      YDI: {story: "Los sermones son impartidos por ciertos sacerdotes. Un serm&oacuten fue promovido por su sacerdote, y otro no lo fue.", sentence: "El serm&oacuten que su sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      NQA: {story: "Hay un sacerdote en particular. Algunas monjas fueron promovidas por ese sacerdote y otras no lo fueron.", sentence: "Cada monja a quien el sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      NQI: {story: "Hay un sacerdote en particular. Algunos sermones fueron promovidos por ese sacerdote, y otros no lo fueron.", sentence: "Cada serm&oacuten que el sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      NDA: {story: "Hay un cierto sacerdote. Una monja fue promovida por ese sacerdote, y otra no lo fue.", sentence: "La monja a quien el sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"},
      NDI: {story: "Hay un sacerdote en particular. Un serm&oacuten fue promovido por ese sacerdote, y otro no lo fue.", sentence: "El serm&oacuten que el sacerdote promovi&oacute fue una inspiraci&oacuten para muchas personas.", item: "priest"}},
      {itemtype: "test",
      YQA: {story: "Las camareras trabajan con ciertos bartenders. Algunas camareras fueron felicitadas por su bartender el viernes, y otras no lo fueron.", sentence: "Cada mesera a quien su bartender felicit&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      YQI: {story: "Los c&oacutecteles son preparados por ciertos bartenders. Algunos c&oacutecteles fueron elogiados por su bartender el viernes, y otros no lo fueron.", sentence: "Cada c&oacutectel que su bartender elogi&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      YDA: {story: "Las camareras trabajan con ciertos bartenders. Una camarera fue felicitada por su bartender el viernes, y otra no lo fue.", sentence: "La camarera a quien su bartender felicit&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      YDI: {story: "Los c&oacutecteles son preparados por ciertos bartenders. Un c&oacutectel fue elogiado por su bartender el viernes, y otro no lo fue.", sentence: "El c&oacutectel que su bartender elogi&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      NQA: {story: "Hay un cierto bartender. Algunas camareras fueron felicitadas por ese bartender el viernes, y otras no lo fueron.", sentence: "Cada camarera a quien el bartender felicit&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      NQI: {story: "Hay un cierto bartender. Algunos c&oacutecteles fueron elogiados por ese bartender el viernes, y otros no lo fueron.", sentence: "Cada c&oacutectel que el bartender elogi&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      NDA: {story: "Hay un cierto bartender. Una camarera fue felicitada por ese bartender el viernes, y otra no lo fue.", sentence: "La camarera a quien el bartender felicit&oacute el viernes impresion&oacute a los clientes.", item: "bartender"},
      NDI: {story: "Hay un cierto bartender. Un c&oacutectel fue elogiado por ese bartender el viernes, y otro no lo fue.", sentence: "El c&oacutectel que el bartender elogi&oacute el viernes impresion&oacute a los clientes.", item: "bartender"}},
      {itemtype: "test",
      YQA: {story: "Las parteras est&aacuten asignadas a ciertas pacientes. Algunas parteras fueron solicitadas por su paciente, y otras no lo fueron.", sentence: "Cada partera a quien su paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      YQI: {story: "Los tratamientos se administran a ciertos pacientes. Algunos tratamientos fueron solicitados por su paciente, y otros no lo fueron.", sentence: "Cada tratamiento que su paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      YDA: {story: "Las parteras est&aacuten emparejadas con ciertas pacientes. Una partera fue solicitada por su paciente, y otra no lo fue.", sentence: "La partera que su paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      YDI: {story: "Los tratamientos se administran a ciertos pacientes. Un tratamiento fue solicitado por su paciente, y otro no lo fue.", sentence: "El tratamiento que su paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      NQA: {story: "Hay una cierta paciente. Algunas parteras fueron solicitadas por esa paciente, y otras no lo fueron.", sentence: "Cada partera que el paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      NQI: {story: "Hay una cierta paciente. Algunos tratamientos fueron solicitados por esa paciente, y otros no lo fueron.", sentence: "Cada tratamiento que el paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      NDA: {story: "Hay una cierta paciente. Una partera fue solicitada por esa paciente, y otra no lo fue.", sentence: "La partera que el paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"},
      NDI: {story: "Hay una cierta paciente. Un tratamiento fue solicitado por esa paciente, y otro no lo fue.", sentence: "El tratamiento que el paciente solicit&oacute fue &uacutetil para aliviar algo del dolor.", item: "patient"}},
      {itemtype: "test",
      YQA: {story: "Las novias ser&aacuten casadas con ciertos novios. Algunas novias fueron llevadas al altar por su novio, y otras no.", sentence: "Cada novia a quien su novio llev&oacute al altar dej&oacute impresionada a la audiencia.", item: "groom"},
      YQI: {story: "Las promesas son dadas por ciertos novios. Algunas promesas fueron llevadas al altar por su novio, y otras no.", sentence: "Cada promesa que su novio llev&oacute al altar dej&oacute impresionada a la audiencia.", item: "groom"},
      YDA: {story: "Las novias ser&aacuten casadas con ciertos novios. Una novia fue llevada al altar por su novio, y otra no.", sentence: "La novia a quien su novio llev&oacute al altar dej&oacute impresionada a la audiencia.", item: "groom"},
      YDI: {story: "Las promesas son dadas por ciertos novios. Una promesa fue llevada al altar por su novio, y otra no.", sentence: "El juramento que su novio llev&oacute al altar dej&oacute impresionada a la audiencia.", item: "groom"},
      NQA: {story: "Hay un cierto novio. Algunas novias fueron llevadas al altar por ese novio, y otras no.", sentence: "Cada novia que el novio llev&oacute al altar dej&oacute impresionada a la audiencia.", item: "groom"},
      NQI: {story: "Hay un cierto novio. Algunas promesas fueron llevados al altar por ese novio, y otras no.", sentence: "Cada juramento que el novio llev&oacute al altar dej&oacute impresionada a la audiencia.", item: "groom"},
      NDA: {story: "Hay un cierto novio. Una novia fue llevada al altar por ese novio, y otra no lo fue.", sentence: "La novia que el novio llev&oacute al altar impresion&oacute a la audiencia.", item: "groom"},
      NDI: {story: "Hay un cierto novio. Una promesa fue llevada al altar por ese novio, y otra no lo fue.", sentence: "El juramento que el novio llev&oacute al altar impresion&oacute a la audiencia.", item: "groom"}},
      {itemtype: "test",
      YQA: {story: "Las Girl Scouts est&aacuten emparejadas con ciertos l&iacutederes de tropa. Algunas Girl Scouts fueron presentadas a los padres por su l&iacuteder de tropa, y otras no.", sentence: "Cada girl scout que su l&iacuteder de tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      YQI: {story: "Los viajes de campamento son supervisados por ciertos l&iacutederes de tropa. Algunos viajes de campamento fueron presentados a los padres por su l&iacuteder de tropa, y otros no.", sentence: "Cada viaje de campamento que su l&iacuteder de tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      YDA: {story: "Las Girl Scouts est&aacuten emparejadas con ciertos l&iacutederes de tropa. Una Girl Scout fue presentada a los padres por su l&iacuteder de tropa, y otra no lo fue.", sentence: "La girl scout que su l&iacuteder de tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      YDI: {story: "Los viajes de campamento son supervisados por ciertos l&iacutederes de tropa. Un viaje de campamento fue presentado a los padres por su l&iacuteder de tropa, y otro no lo fue.", sentence: "El viaje de campamento que su l&iacuteder de tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      NQA: {story: "Hay un cierto l&iacuteder de tropa. Algunas Girl Scouts fueron presentadas a los padres por ese l&iacuteder de tropa, y otras no.", sentence: "Cada girl scout que el l&iacuteder de la tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      NQI: {story: "Hay un cierto l&iacuteder de tropa. Algunos viajes de campamento fueron presentados a los padres por ese l&iacuteder de tropa, y otros no.", sentence: "Cada viaje de campamento que el l&iacuteder de la tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      NDA: {story: "Hay un cierto l&iacuteder de tropa. Una Girl Scout fue presentada a los padres por ese l&iacuteder de tropa, y otra no.", sentence: "La girl scout que el l&iacuteder de la tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"},
      NDI: {story: "Hay un cierto l&iacuteder de tropa. Un viaje de campamento fue presentado a los padres por ese l&iacuteder de tropa, y otro no.", sentence: "El viaje de campamento que el l&iacuteder de la tropa present&oacute a los padres se volvi&oacute ampliamente popular.", item: "troopleader"}},
      {itemtype: "test",
      YQA: {story: "Las secretarias sirven a ciertos directores ejecutivos. Algunas secretarias fueron recordadas por su CEO, y otras no.", sentence: "Cada secretaria que su CEO recordaba bien impresionaba a la junta de administradores.", item: "CEO"},
      YQI: {story: "Los contratos son redactados por ciertos directores ejecutivos. Algunos contratos fueron recordados por su CEO, y otros no.", sentence: "Cada contrato que su CEO recordaba bien impresionaba a la junta de administradores..", item: "CEO"},
      YDA: {story: "Las secretarias sirven a ciertos directores ejecutivos. Una secretaria fue recordada por su CEO, y otra no.", sentence: "La secretaria que su CEO recordaba bien impresion&oacute a la junta de administradores.", item: "CEO"},
      YDI: {story: "Los contratos son redactados por ciertos directores ejecutivos. Un contrato fue recordado por su CEO, y otro no.", sentence: "El contrato que su CEO recordaba bien impresion&oacute a la junta de administradores.", item: "CEO"},
      NQA: {story: "Hay un cierto CEO. Algunas secretarias fueron recordadas por ese CEO, y otras no.", sentence: "Cada secretaria que el CEO recordaba bien impresionaba a la junta de administradores.", item: "CEO"},
      NQI: {story: "Hay un cierto CEO. Algunos contratos fueron recordados por ese CEO, y otros no.", sentence: "Cada contrato que el CEO recordaba bien impresionaba a la junta de administradores.", item: "CEO"},
      NDA: {story: "Hay un CEO en particular. Una secretaria fue recordada por ese CEO, y otra no.", sentence: "La secretaria que el CEO recordaba bien impresion&oacute a la junta de administradores.", item: "CEO"},
      NDI: {story: "Hay un CEO en particular. Un contrato fue recordado por ese CEO, y otro no.", sentence: "El contrato que el CEO recordaba bien impresion&oacute a la junta de administradores.", item: "CEO"}},
      {itemtype: "test",
      YQA: {story: "Los asistentes sirven a ciertos dentistas. Algunos asistentes fueron seleccionados por su dentista, y otros no.", sentence: "Cada asistente que su dentista seleccionaba para ayudar con el procedimiento estresaba al paciente.", item: "dentist"},
      YQI: {story: "Los dentistas utilizan ciertas herramientas. Algunas herramientas fueron seleccionadas por su dentista, y otras no.", sentence: "Cada herramienta que su dentista seleccionaba para ayudar con el procedimiento estresaba al paciente.", item: "dentist"},
      YDA: {story: "Los asistentes sirven a ciertos dentistas. Una asistente fue seleccionada por su dentista, y otra no lo fue.", sentence: "La asistente que su dentista seleccion&oacute para ayudar con el procedimiento estres&oacute al paciente.", item: "dentist"},
      YDI: {story: "Los dentistas utilizan ciertas herramientas. Una herramienta fue seleccionada por su dentista, y otra no lo fue.", sentence: "La herramienta que su dentista seleccion&oacute para ayudar con el procedimiento estres&oacute al paciente.", item: "dentist"},
      NQA: {story: "Hay un cierto dentista. Algunas asistentes fueron seleccionadas por ese dentista, y otras no.", sentence: "Cada asistente que el dentista seleccion&oacute para ayudar con el procedimiento estres&oacute al paciente.", item: "dentist"},
      NQI: {story: "Hay un cierto dentista. Algunas herramientas fueron seleccionadas por ese dentista, y otras no.", sentence: "Cada herramienta que el dentista seleccion&oacute para ayudar con el procedimiento estres&oacute al paciente.", item: "dentist"},
      NDA: {story: "Hay un dentista en particular. Una asistente fue seleccionada por ese dentista, y otra no lo fue.", sentence: "La asistente que el dentista seleccion&oacute para ayudar con el procedimiento estres&oacute al paciente.", item: "dentist"},
      NDI: {story: "Hay un cierto dentista. Una herramienta fue seleccionada por ese dentista, y otra no lo fue.", sentence: "La herramienta que el dentista seleccion&oacute para ayudar con el procedimiento estres&oacute al paciente.", item: "dentist"}},
      {itemtype: "test",
      YQA: {story: "Los influenciers est&aacuten emparejados con ciertos nutricionistas. Algunos influenciers fueron denunciados en una publicaci&oacuten de blog por su nutricionista, y otros no.", sentence: "Cada influencer que su nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento de seguidores fieles.", item: "nutritionist"},
      YQI: {story: "Los kits de comida est&aacuten emparejados con ciertos nutricionistas. Algunos kits de comida fueron denunciados en una publicaci&oacuten de blog por su nutricionista, y otros no.", sentence: "Cada kit de comida que su nutricionista denunciaba en una publicaci&oacuten de blog ganaba un seguimiento de seguidores fieles.", item: "nutritionist"},
      YDA: {story: "Los influencers est&aacuten emparejados con ciertos nutricionistas. Una influencer fue denunciada en una publicaci&oacuten de blog por su nutricionista, y otra no.", sentence: "La influencer a quien su nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento un seguimiento de seguidores fieles.", item: "nutritionist"},
      YDI: {story: "Los kits de comida est&aacuten emparejados con ciertos nutricionistas. Un kit de comida fue denunciado en una publicaci&oacuten de blog por su nutricionista, y otro no.", sentence: "El kit de comida que su nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento de seguidores fieles.", item: "nutritionist"},
      NQA: {story: "Hay un cierto nutricionista. Algunos influencers fueron denunciados en una publicaci&oacuten de blog por ese nutricionista, y otros no.", sentence: "Cada influencer que el nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento un seguimiento de seguidores fieles.", item: "nutritionist"},
      NQI: {story: "Hay un cierto nutricionista. Algunos kits de comida fueron denunciados en una publicaci&oacuten de blog por ese nutricionista, y otros no.", sentence: "Cada kit de comida que el nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento un seguimiento de seguidores fieles.", item: "nutritionist"},
      NDA: {story: "Hay un cierto nutricionista. Una influencer fue denunciada en una publicaci&oacuten de blog por ese nutricionista, y otra no.", sentence: "El influencer que el nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento de seguidores fieles.", item: "nutritionist"},
      NDI: {story: "Hay un cierto nutricionista. Un kit de comida fue denunciado en una publicaci&oacuten de blog por ese nutricionista, y otro no.", sentence: "El kit de comida que el nutricionista denunci&oacute en una publicaci&oacuten de blog gan&oacute un seguimiento de seguidores fieles.", item: "nutritionist"}},
      {itemtype: "test",
      YQA: {story: "Las bailarinas son ayudadas por ciertos core&oacutegrafos. Algunas bailarinas fueron discutidas en la fiesta por su core&oacutegrafo, y otras no.", sentence: "Cada bailarina de la que su core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      YQI: {story: "Los ballets son estudiados por ciertos core&oacutegrafos. Algunos ballets fueron discutidos en la fiesta por su core&oacutegrafo, y otros no.", sentence: "Cada ballet del que su core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      YDA: {story: "Las bailarinas son ayudadas por ciertos core&oacutegrafos. Una bailarina fue discutida en la fiesta por su core&oacutegrafo, y otra no.", sentence: "La bailarina de la que su core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      YDI: {story: "Los ballets son estudiados por ciertos core&oacutegrafos. Un ballet fue discutido en la fiesta por su core&oacutegrafo, y otro no.", sentence: "El ballet del que su core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      NQA: {story: "Hay un cierto core&oacutegrafo. Algunas bailarinas fueron discutidas en la fiesta por ese core&oacutegrafo, y otras no.", sentence: "Cada bailarina de la que el core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      NQI: {story: "Hay un cierto core&oacutegrafo. Algunos ballets fueron discutidos en la fiesta por ese core&oacutegrafo, y otros no.", sentence: "Cada ballet del que el core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      NDA: {story: "Hay un cierto core&oacutegrafo. Una bailarina fue discutida en la fiesta por ese core&oacutegrafo, y otra no.", sentence: "La bailarina de la que el core&oacutegrafo habl&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"},
      NDI: {story: "Hay un cierto core&oacutegrafo. Un ballet fue discutido en la fiesta por ese core&oacutegrafo, y otro no.", sentence: "El ballet que el core&oacutegrafo discuti&oacute en la fiesta nunca tuvo un debut.", item: "choreographer"}},
      {itemtype: "test",
      YQA: {story: "Los peluqueros est&aacuten emparejados con ciertos estilistas. Algunos peluqueros fueron felicitados entusiastamente por su estilista, y otros no.", sentence: "Cada peluquero que su estilista felicit&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      YQI: {story: "Los salones de belleza son propiedad de ciertos estilistas. Algunos salones de belleza fueron elogiados entusiastamente por su estilista, y otros no.", sentence: "Cada sal&oacuten de belleza que su estilista elogi&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      YDA: {story: "Los peluqueros est&aacuten emparejados con ciertos estilistas. Una peluquera fue felicitada entusiastamente por su estilista, y otra no.", sentence: "La peluquera a quien su estilista felicit&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      YDI: {story: "Los salones de belleza son propiedad de ciertos estilistas. Un sal&oacuten de belleza fue elogiado entusiastamente por su estilista, y otro no.", sentence: "El sal&oacuten de belleza que su estilista elogi&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      NQA: {story: "Hay un cierto estilista. Algunos peluqueros fueron felicitados entusiastamente por ese estilista, y otros no.", sentence: "Cada peluquero a quien el estilista elogi&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      NQI: {story: "Hay un cierto estilista. Algunos salones de belleza fueron elogiados entusiastamente por ese estilista, y otros no.", sentence: "Cada sal&oacuten de belleza al que el estilista elogi&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      NDA: {story: "Hay un estilista en particular. Un peluquero fue felicitado entusiastamente por ese estilista, y otro no.", sentence: "La peluquera a quien el estilista elogi&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"},
      NDI: {story: "Hay un estilista en particular. Un sal&oacuten de belleza fue elogiado entusiastamente por ese estilista, y otro no.", sentence: "El sal&oacuten de belleza al que el estilista elogi&oacute entusiastamente proporcion&oacute servicios de coloraci&oacuten de primera l&iacutenea.", item: "stylist"}},
      {itemtype: "test",
      YQA: {story: "Las actrices tienen ciertos fan&aacuteticos n&uacutemero uno. Algunas actrices fueron elogiadas en Twitter por su fan&aacutetico, y otras no.", sentence: "Cada actriz que su fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      YQI: {story: "Las actuaciones tienen ciertos fan&aacuteticos n&uacutemero uno. Algunas actuaciones fueron elogiadas en Twitter por su fan&aacutetico, y otras no.", sentence: "Cada actuaci&oacuten que su fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      YDA: {story: "Las actrices tienen ciertos fan&aacuteticos n&uacutemero uno. Una actriz fue elogiada en Twitter por su fan&aacutetico, y otra no.", sentence: "La actriz a quien su fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      YDI: {story: "Las actuaciones tienen ciertos fan&aacuteticos n&uacutemero uno. Una actuaci&oacuten fue elogiada en Twitter por su fan&aacutetico, y otra no.", sentence: "La actuaci&oacuten que su fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      NQA: {story: "Hay un cierto fan&aacutetico n&uacutemero uno. Algunas actrices fueron elogiadas en Twitter por ese fan&aacutetico, y otras no.", sentence: "Cada actriz que el fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      NQI: {story: "Hay un cierto fan&aacutetico n&uacutemero uno. Algunas actuaciones fueron elogiadas en Twitter por ese fan&aacutetico, y otras no.", sentence: "Cada actuaci&oacuten que el fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      NDA: {story: "Hay un cierto fan&aacutetico n&uacutemero uno. Una actriz fue elogiada en Twitter por ese fan&aacutetico, y otra no.", sentence: "La actriz a quien el fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"},
      NDI: {story: "Hay un cierto fan&aacutetico n&uacutemero uno. Una actuaci&oacuten fue elogiada en Twitter por ese fan&aacutetico, y otra no.", sentence: "La actuaci&oacuten que el fan&aacutetico n&uacutemero uno alab&oacute en Twitter fue nominada para un premio.", item: "fan"}},
      {itemtype: "test",
      YQA: {story: "Las gimnastas son instruidas por ciertos entrenadores. Algunas gimnastas fueron criticadas por su entrenador, y otras no.", sentence: "Cada gimnasta a quien su entrenador critic&oacute no logr&oacute clasificar para nacionales.", item: "coach"},
      YQI: {story: "Las rutinas son supervisadas por ciertos entrenadores. Algunas rutinas fueron criticadas por su entrenador, y otras no.", sentence: "Cada rutina que su entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"},
      YDA: {story: "Las gimnastas son instruidas por ciertos entrenadores. Una gimnasta fue criticada por su entrenador, y otra no.", sentence: "La gimnasta a quien su entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"},
      YDI: {story: "Las rutinas son supervisadas por ciertos entrenadores. Una rutina fue criticada por su entrenador, y otra no.", sentence: "La rutina que su entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"},
      NQA: {story: "Hay un cierto entrenador. Algunas gimnastas fueron criticadas por ese entrenador, y otras no.", sentence: "Cada gimnasta que el entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"},
      NQI: {story: "Hay un cierto entrenador. Algunas rutinas fueron criticadas por ese entrenador, y otras no.", sentence: "Cada rutina que el entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"},
      NDA: {story: "Hay un cierto entrenador. Una gimnasta fue criticada por ese entrenador, y otra no.", sentence: "La gimnasta a quien el entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"},
      NDI: {story: "Hay un cierto entrenador. Una rutina fue criticada por ese entrenador, y otra no.", sentence: "La rutina que el entrenador critic&oacute no logr&oacute calificar para nacionales.", item: "coach"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto presidente. Algunos presentadores fueron admirados por ese presidente, y otros no.", sentence: "El presentador al que el presidente admiraba fue contratado en el acto.", item: "filler1"}},
      {itemtype: "filler",
      filler: {story: "Hay una cierta manicurista. Algunas mujeres fueron atendidas por esa manicurista, y otras no.", sentence: "Cada mujer a las que la manicurista conoci&oacute en el sal&oacuten quer&iacutean u&ntildeas rojas.", item: "filler2"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto estudiante. Algunas conferencias fueron asistidas por ese estudiante, y otras no.", sentence: "Cada conferencia a las que el estudiante asisti&oacute el lunes empezaron cinco minutos antes.", item: "filler3"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto artista. Algunos cal&iacutegrafos fueron hablados por ese artista, y otros no.", sentence: "Cada cal&iacutegrafo con el que habl&oacute el artista ten&iacutean una escritura hermosa.", item: "filler4"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto asistente de escenario. A una banda no le gust&oacute ese asistente de escenario, y otra s&iacute.", sentence: "Esta es la banda que el asistente de escenario no le gustaba toc&oacute un espect&aacuteculo con entradas agotadas.", item: "filler5"}},
      {itemtype: "filler",
      filler: {story: "Hay un cierto barista. Algunos caf&eacutes fueron molidos por ese barista, y otros no.", sentence: "El caf&eacute que el barista moli&oacute demasiado fino no le gust&oacute al cliente.", item: "filler6"}}
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
