var searchTerm = ""
var numRecordsSelect = ""
var startYear = ""
var endYear = ""
var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=7ae404a1d4314eeb99346ce943877b88:0:74623931&q="+searchTerm+"&begin_date="+startYear+"0101&end_date="+endYear+"0101"

$('#runSearch').click(function(){
	event.preventDefault();
	searchTerm = document.getElementById("searchTerm").value;
	console.log(searchTerm);
	numRecordsSelect = document.getElementById("numRecordsSelect").value;
	console.log(numRecordsSelect);
	startYear = document.getElementById("startYear").value;
	if(startYear.length<4 || startYear.length>4){
		startYear=1900;
	}
	console.log(startYear);
	endYear = document.getElementById("endYear").value;
	if(endYear.length<4 || startYear.length>4){
		endYear=2017;
	}
	console.log(endYear);
	queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q="+searchTerm+"&begin_date="+startYear+"0101&end_date="+endYear+"0101"
	console.log(queryUrl);
	$('#wellSection').empty();
	ajaxRequest();
})


$("#clearForm").click(function(event){
	event.preventDefault();
	$('.bs-example-form')[0].reset();
});

var ajaxRequest = function(){
	$.ajax({
		url: queryUrl,
	    method: "GET"
    }).done(function(response) {
    	searchTermN = searchTerm.replace(/\s/g, '').toLowerCase();
    	console.log(response);
    	console.log(searchTermN);
    	if(response.response.docs.length < 1){
    		$('#wellSection').append('<div>No Results. Please Check Your Inputs</div>')
    	}
    	else {
	    	for(i=0; i<numRecordsSelect; i++){
	    		var i1 = i+1;
	    	$('#wellSection').append('<div class="well" id="articleWell-1"><h3><span class="label label-primary">'+i1+'</span><strong>'+response.response.docs[i].headline.main+'</h5><h5>Section: '+response.response.docs[i].section_name+'</h5><a target="_blank" href="'+response.response.docs[i].web_url+'">'+response.response.docs[i].web_url+'</a></div>');
	    		if(searchTermN=='trump' || searchTermN=='donaldtrump' || searchTermN=='trumpdonald'){
	    			$('.animateThis').addClass('animated infinite rotate360');
	    		}
	    	}
    	}
	});
}