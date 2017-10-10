var membersR, membersD, membersI, stadistics, prueba, mediaX, ascendente, descendente, subtitutlo, dataSenate, dataHouse, membersS, membersH,data,dataSunlightS,sunlightS,dataSunlightH,sunlightH, membersFilter, miembros, miembrosS, miembrosH;
var birthdayS = [];
var birthdayH = [];
var partyR, partyD, partyI, estado;
var members, titulo, texto, nombreFull;
textoSenate = "First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House.";

textoHouse="The major power of the House is to pass federal legislation that affects the entire country, although its bills must also be passed by the Senate and further agreed to by the U.S. President before becoming law (unless both the House and Senate re-pass the legislation with a two-thirds majority in each chamber). The House has some exclusive powers: the power to initiate revenue bills, to impeach officials (impeached officials are subsequently tried in the Senate), and to elect the U.S. President in case there is no majority in the Electoral College.<br> Each U.S. state is represented in the House in proportion to its population as measured in the census, but every state is entitled to at least one representative.";

$(function () {

	//================ Sunlight Laps API =================
	$.getJSON('http://congress.api.sunlightfoundation.com/legislators?chamber=senate&per_page=all&apikey=837ea94f520b43a0825be5db3b44a39b.JSON', function (data){
	//       alert(4);
	    data.results.forEach(function(item){
				birthdayS[item.bioguide_id] = item.birthday;

			});
        });

	$.getJSON('http://congress.api.sunlightfoundation.com/legislators?chamber=house&per_page=all&apikey=837ea94f520b43a0825be5db3b44a39b.json', function (data){
			data.results.forEach(function(item){
				birthdayH[item.bioguide_id] = item.birthday;
			});
        });
	//=============================================================


	//========== new york time api ================================

	$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate.json", function(data){

		/*dataSenate=data;
		membersS=dataSenate.results[0].members;*/
		footer(data);
		//console.log("membersS= "+ membersS);

		miembrosS = data.results[0].members.map(function(item) {


			return {
				id: item.id,
				name: [item.first_name, item.middle_name, item.last_name].join(" "),
				state: item.state,
				party: item.party,
				partName: item.party == "R"?"Republicans":(item.party == "D"?"Democrat":"Independent"),
				seniority: item.seniority,
				votes_with_party_pct: item.votes_with_party_pct,
				missed_votes: item.missed_votes,
				missed_votes_pct: item.missed_votes_pct,
				total_votes: item.total_votes,
				url: item.url,
				birthday: birthdayS[item.id]
			}
		});
		console.log(miembrosS)

	});

	$.getJSON('https://nytimes-ubiqum.herokuapp.com/congress/113/house.json', function(data){
	//            alert(4);
	    //dataHouse=data;
	    //membersH=dataHouse.results[0].members;
	    //console.log(membersH);

	    miembrosH = data.results[0].members.map(function(item){

			return {
				id: item.id,
				name: [item.first_name, item.middle_name, item.last_name].join(" "),
				state: item.state,
				party: item.party,
				partName: item.party == "R"?"Republicans":(item.party == "D"?"Democrat":"Independent"),
				seniority: item.seniority,
				votes_with_party_pct: item.votes_with_party_pct,
				missed_votes: item.missed_votes,
				missed_votes_pct: item.missed_votes_pct,
				total_votes: item.total_votes,
				url: item.url,
				birthday: birthdayH[item.id]
			}
		});
    });

	//==============================================================   
   	     
});	


 function dataSource (source, title, texta){
    members = source;
    titulo = title;
    texto = texta;
    populaTabla();

    
}
// Función principal para imprimir las dos tablas según haga click en uno o en el otro, y cambiar el subtitulo según que tabla este mostrando.
function populaTabla(){


	partyR = document.getElementById("republican").checked;
	partyD = document.getElementById("democrats").checked;
	partyI = document.getElementById("independents").checked;
	estado = document.getElementById("state").value;

	//var salida = "";


	 membersFilter = {datos:[]};

	for(i=0; i<members.length; i++){
		
		if(memberValid(members[i])){

			membersFilter.datos.push(members[i]);
			/*salida += 
			"<tr><td>"
				+"<a href="+ members[i].url +">" + nombre(members[i]) + "</a>" +
			"</td><td>"
				+partido(members[i].party)+
			"</td><td>"
				+members[i].state+
			"</td><td>"
				+members[i].seniority+
			"</td>	<td>"
				+members[i].votes_with_party_pct+ "%"+
			"</td></tr>"*/
			}


			/*if((sunlightS[i].bioguide_id == membersS[i].id)	|| (sunlightH[i].bioguide_id == membersH[i].id)	)
				membersFilter.datos[i].push(sunlightS[i].birthday)*/

	}

    
    var tablePrueba = "{{#datos}}<tr><td>{{name}}</td><td clas='SL'>{{birthday}}</td><td>{{party}}</td><td>{{state}}</td><td class='NYT'>{{seniority}}</td><td class='NYT'>{{votes_with_party_pct}} %</td></tr>{{/datos}}";

    var tabla = Mustache.to_html(tablePrueba, membersFilter);
    $('#contenedor').html(tabla);

	//document.getElementById("contenedor").innerHTML = salida; 
	document.getElementById("subtitulo").innerHTML = titulo;
	document.getElementById("texto").innerHTML = texto; 

	/*$('#senateData').html(tabla);
            
            if ($('#NYT').is(":checked")) {
                $('.NYT').show()
            } else {
                $('.NYT').hide();
            }

            if ($('#sunlight').is(":checked")) {
                $('.SL').show()
            } else {
                $('.SL').hide();
            }
*/


}
//Función para mostrar el segundo nombre y si no tiene que no te muestre null, si no que te muestro solo el primer nombre y el apellido.
function nombre(member){
	var nombreFull = member.first_name;
	if (member.middle_name != null){
		nombreFull += " " + member.middle_name
	}
	nombreFull += " " + member.last_name;
	return nombreFull
}
 
 //Función para que en el campo de party según si el valor es R, D o I muestre republicans, Democrats o Independents respectivamente.
function partido(party){

	if(party == "R"){
	return "Republicans";	
	} else if (party == "D"){
	return "Decomocrats";
	}	else {
	return "Independents";
	}
}

// Función para validar el partido 
function memberValid(persona){
	if(!stateValid(persona)){return false;}
	if(!partyR && !partyD && !partyI){return true;}
	if((partyR&&persona.party=="R") || (partyD&&persona.party=="D") || (partyI&&persona.party=="I")){return true;}
	return false;
}

//Función para validar el estado.
function stateValid(persona){

	return estado=="All" || estado == persona.state;
}



// Función para mostrar el pie de página en todas las páginas.
//window.addEventListener("laod", footer);
function footer(data) {
	document.getElementById("footer").innerHTML = data.copyright;	
}

/* ============= Stadistics ===============*/


//Función para definir por parametro que JSON debe leer al hacer click para coger los datos en las siguientes funciones.
function dataSource2(source,title ){
	subtitutlo = title
	cargarStadistic(source);


}

// Función para guardar en variables los datos de un JSON o otro según donde hayan hecho click e imprimirlas en la tabla.
function cargarStadistic(dataX){
membersR = dataX.filter(function(item){return item.party=="R";});

membersD = dataX.filter(function(item){return item.party=="D";});

membersI = dataX.filter(function(item){return item.party=="I";});


stadistics = {nRepublicans: membersR.length, nDemocrats:membersD.length , nIndependents:membersI.length, pct_R: 0, pct_D: 0, pct_I: 0};

stadistics.pct_R = total_pct(membersR);
stadistics.pct_D = total_pct(membersD);
stadistics.pct_I = total_pct(membersI);


imprimir();
leastEngaged(dataX);	
mostEngaged(dataX);
leastLoyal(dataX);
mostLoyal (dataX)
}


//Función para calcular la media de los porcentajes de botos según dond hayan hecho click.
function total_pct(miembrosX){

	var sumaX = 0;
	


	for (var i=0; i < miembrosX.length; i++) {
		sumaX += parseFloat(miembrosX[i].votes_with_party_pct);
	}

mediaX = (sumaX/miembrosX.length).toFixed(2);
return mediaX;
 
}

function imprimir (){

		var salida;

		salida = "<tr><td>Republicans</td><td>"+stadistics.nRepublicans+"</td><td>"+stadistics.pct_R+"</td></tr><tr><td>Democrats</td><td>"+stadistics.nDemocrats+"</td><td>"+stadistics.pct_D+"</td></tr><tr><td>Independents</td><td>"+stadistics.nIndependents+"</td><td>"+stadistics.pct_I+"</td></tr>"	



		document.getElementById("primeraTabla").innerHTML = salida;
		document.getElementById("primeraTabla2").innerHTML = salida;

		document.getElementById("subtituloAtt").innerHTML = subtitutlo;
		document.getElementById("subtituloPar").innerHTML= subtitutlo;
		
}

function leastEngaged (dataX) {
	var salida="";
	ascendente = dataX.sort(function(a, b){return b.missed_votes_pct - a.missed_votes_pct});

	var maximo = Math.floor(ascendente.length/10);
	
	while (maximo < ascendente.length && ascendente[maximo].missed_votes_pct == ascendente[maximo -1].missed_votes_pct ) {
			maximo ++;
	}

	for (i=0; i < maximo ; i++) {

		salida += "<tr><td>"+ascendente[i].name+"</td><td>"+ascendente[i].missed_votes+"</td><td>"+ascendente[i].missed_votes_pct+"</td</tr>"

	}
	
	document.getElementById("bottomTableAtt").innerHTML = salida;
}

function mostEngaged (dataX) {
	var salida="";
	descendente = dataX.sort(function(a, b){return a.missed_votes_pct - b.missed_votes_pct});

	var maximo = Math.floor(descendente.length/10);

	while (maximo < descendente.length && descendente[maximo].missed_votes_pct == descendente[maximo -1].missed_votes_pct ) {
			maximo ++;
	}
	for (i=0; i < maximo ; i++) {

		salida += "<tr><td>"+descendente[i].name+"</td><td>"+descendente[i].missed_votes+"</td><td>"+descendente[i].missed_votes_pct+"</td</tr>"

	}	
	document.getElementById("topTableAtt").innerHTML = salida;
}

function nPartyVotes(x){

	return (x.total_votes*(x.votes_with_party_pct/100)).toFixed(2);
}

function leastLoyal (dataX){

	var salida = "";
	ascendente = dataX.sort(function(a, b){return a.votes_with_party_pct - b.votes_with_party_pct});

	var maximo = Math.floor(ascendente.length/10);
	
	while (maximo < ascendente.length && ascendente[maximo].votes_with_party_pct == ascendente[maximo -1].votes_with_party_pct ) {
			maximo ++;
	}

	for (i=0; i < maximo ; i++){
	salida += "<tr><td>"+ascendente[i].name+"</td><td>"+nPartyVotes(ascendente[i])+"<td>"+ascendente[i].votes_with_party_pct+"</td></tr>"
	}
	document.getElementById("leastLoyal").innerHTML = salida
}

function mostLoyal (dataX){

	var salida = "";
	descendente = dataX.sort(function(a, b){return b.votes_with_party_pct - a.votes_with_party_pct});

	var maximo = Math.floor(descendente.length/10);

	while (maximo < descendente.length && descendente[maximo].votes_with_party_pct == descendente[maximo -1].votes_with_party_pct ) {
			maximo ++;
	}
	
	for (i=0; i < maximo ; i++){
	salida += "<tr><td>"+descendente[i].name+"</td><td>"+nPartyVotes(descendente[i])+"<td>"+descendente[i].votes_with_party_pct+"</td></tr>"
	}
	document.getElementById("mostLoyal").innerHTML = salida
}



$(document).ready(function() {
	$("#home").fadeIn("fast", "swing");
    $("#congress113").fadeOut("fast", "swing");
    $("#attendance").fadeOut("fast", "swing");
    $("#party_loyalty").fadeOut("fast", "swing");
    $("#analytic").fadeOut("fast", "swing");

});
//Función para ocultar todos los divs menos el home al hacer click en home en el menú
$("#homeButton").click(function(){
	$("#home").fadeIn("fast", "swing");
    $("#congress113").fadeOut("fast", "swing");
    $("#attendance").fadeOut();
    $("#party_loyalty").fadeOut();
    $("#analytic").fadeOut("fast", "swing");
 });
//Función para ocultar todos los divs menos el congress113 al hacer click en congress113 en el menú
$("#congressSenate, #congressHouse").click(function(){
	$("#home").fadeOut("fast", "swing");
    $("#congress113").fadeIn("fast", "swing");
    $("#attendance").fadeOut("fast", "swing");
    $("#party_loyalty").fadeOut("fast", "swing");
    $("#analytic").fadeOut("fast", "swing");
 });
//Función para ocultar todos los divs menos el attendance al hacer click en attendance en el menú
$("#attendanceSenate, #attendanceHouse").click(function(){
	$("#home").fadeOut("fast", "swing");
    $("#congress113").fadeOut("fast", "swing");
    $("#attendance").fadeIn("fast", "swing");
    $("#party_loyalty").fadeOut("fast", "swing");
    $("#analytic").fadeOut("fast", "swing");
 });
//Función para ocultar todos los divs menos el party loyalty al hacer click en party loyalty en el menú
$("#partySenate, #partyHouse").click(function(){
	$("#home").fadeOut("fast", "swing");
    $("#congress113").fadeOut("fast", "swing");
    $("#attendance").fadeOut("fast", "swing");
    $("#party_loyalty").fadeIn("fast", "swing");
    $("#analytic").fadeOut("fast", "swing");
 });


$("#analyticSenate, #analyticHouse").click(function(){
	$("#home").fadeOut("fast", "swing");
    $("#congress113").fadeOut("fast", "swing");
    $("#attendance").fadeOut("fast", "swing");
    $("#party_loyalty").fadeOut("fast", "swing");
    $("#analytic").fadeIn("fast", "swing");
 });

// =============OnClicks Congress =====================
$("#congressSenate").click(function(){

	dataSource(miembrosS, 'Senate Members', textoSenate);

});

$("#congressHouse").click(function(){
	
	dataSource(miembrosH, 'House Members', textoHouse);
});

// ========================================================

//==================OnClicks Attendance ===================

$("#attendanceSenate").click(function(){
	
	dataSource2(miembrosS,'Senate at a glance');
});

$("#attendanceHouse").click(function(){
	
	dataSource2(miembrosH,'House at a glance');
});

//=========================================================

//================ OnClicks Party Loyalty =================

$("#partySenate").click(function(){
	
	dataSource2(miembrosS,'Senate at a glance');
});

$("#partyHouse").click(function(){
	
	dataSource2(miembrosH,'House at a glance');
});

//=========================================================

//================ OnClicks Analytics maps =================

$("#analyticSenate").click(function(){
	
	creaMap(miembrosS);
});

$("#analyticHouse").click(function(){
	
	creaMap(miembrosH);
});

//=========================================================



//=================== Script para el mapa ====================

function creaMap(data) {


     //console.log(data);
     //var states={FL:{nR:0,nD:0,nI:0}} 
     var Ob_states = {};
     //     console.log(Ob_states.length);
     //     console.log(states["NY"]);
     //     
     //  var ArrayMap = AmCharts.maps.usaLow.svg.g.path[1];
     //  var senateMap = data;
     for (i = 0; i < data.length; i++) {
         if (Ob_states["US-" + data[i].state] == undefined) {
             Ob_states["US-" + data[i].state] = {
                 "nR": 0,
                 "nD": 0,
                 "nI": 0,
                 "color": ""
             }
         }
         if (data[i].party == "R") {
             Ob_states["US-" + data[i].state].nR++;
         } else if (data[i].party == "D") {
             Ob_states["US-" + data[i].state].nD++;
         } else if (data[i].party == "I") {
             Ob_states["US-" + data[i].state].nI++;
         }
     }
     for (var key in Ob_states) {
         //         console.log(Ob_states[key].nR);
         if (Ob_states[key].nR > Ob_states[key].nD) {
             Ob_states[key].color = "red";
         } else if (Ob_states[key].nD > Ob_states[key].nR) {
             Ob_states[key].color = "blue";
         } else {
             Ob_states[key].color = "yellow";
         }
     }
     //console.log(Ob_states);
     //    states[data[i].state] 
     console.log("holaaa",mapas);
     for (i = 0; i < mapas.dataProvider.areas.length; i++) {

   
         mapas.dataProvider.areas[i]["color"] = Ob_states[mapas.dataProvider.areas[i].id].color;
     }
     var map = AmCharts.makeChart( "chartdiv",mapas);

 }





var mapas ={
  "type": "map",
  "theme": "light",
  "colorSteps": 3,

  "dataProvider": {
    "map": "usaLow",
    "areas": [ {
      "id": "US-AL",
      "value": 4447100
    }, {
      "id": "US-AK",
      "value": 626932
    }, {
      "id": "US-AZ",
      "value": 5130632
    }, {
      "id": "US-AR",
      "value": 2673400
    }, {
      "id": "US-CA",
      "value": 33871648
    }, {
      "id": "US-CO",
      "value": 4301261
    }, {
      "id": "US-CT",
      "value": 3405565
    }, {
      "id": "US-DE",
      "value": 783600
    }, {
      "id": "US-FL",
      "value": 15982378
    }, {
      "id": "US-GA",
      "value": 8186453
    }, {
      "id": "US-HI",
      "value": 1211537
    }, {
      "id": "US-ID",
      "value": 1293953
    }, {
      "id": "US-IL",
      "value": 12419293
    }, {
      "id": "US-IN",
      "value": 6080485
    }, {
      "id": "US-IA",
      "value": 2926324
    }, {
      "id": "US-KS",
      "value": 2688418
    }, {
      "id": "US-KY",
      "value": 4041769
    }, {
      "id": "US-LA",
      "value": 4468976
    }, {
      "id": "US-ME",
      "value": 1274923
    }, {
      "id": "US-MD",
      "value": 5296486
    }, {
      "id": "US-MA",
      "value": 6349097
    }, {
      "id": "US-MI",
      "value": 9938444
    }, {
      "id": "US-MN",
      "value": 4919479
    }, {
      "id": "US-MS",
      "value": 2844658
    }, {
      "id": "US-MO",
      "value": 5595211
    }, {
      "id": "US-MT",
      "value": 902195
    }, {
      "id": "US-NE",
      "value": 1711263
    }, {
      "id": "US-NV",
      "value": 1998257
    }, {
      "id": "US-NH",
      "value": 1235786
    }, {
      "id": "US-NJ",
      "value": 8414350
    }, {
      "id": "US-NM",
      "value": 1819046
    }, {
      "id": "US-NY",
      "value": 18976457
    }, {
      "id": "US-NC",
      "value": 8049313
    }, {
      "id": "US-ND",
      "value": 642200
    }, {
      "id": "US-OH",
      "value": 11353140
    }, {
      "id": "US-OK",
      "value": 3450654
    }, {
      "id": "US-OR",
      "value": 3421399
    }, {
      "id": "US-PA",
      "value": 12281054
    }, {
      "id": "US-RI",
      "value": 1048319
    }, {
      "id": "US-SC",
      "value": 4012012
    }, {
      "id": "US-SD",
      "value": 754844
    }, {
      "id": "US-TN",
      "value": 5689283
    }, {
      "id": "US-TX",
      "value": 20851820
    }, {
      "id": "US-UT",
      "value": 2233169
    }, {
      "id": "US-VT",
      "value": 608827
    }, {
      "id": "US-VA",
      "value": 7078515
    }, {
      "id": "US-WA",
      "value": 5894121
    }, {
      "id": "US-WV",
      "value": 1808344
    }, {
      "id": "US-WI",
      "value": 5363675
    }, {
      "id": "US-WY",
      "value": 493782
    } ]
  },

  "areasSettings": {
    "autoZoom": true
  },

  "valueLegend": {
    "right": 10,
    "minValue": "little",
    "maxValue": "a lot!"
  },

  "export": {
    "enabled": true
  }

};


//====================== Fin del mapa ========================







