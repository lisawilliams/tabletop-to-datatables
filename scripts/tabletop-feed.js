// I originally wrote a tutorial based on Chris Keller's Tabletop To Datatables code. 
// Sherry Skalko of Chicago Reporter wanted to use this spreadsheet to do something similar
// with Chicago redevelopment data. 

// I changed the column references, and the reference to the spreadsheet.  
// But the code doesn't seem to "see" Sherry's spreadsheet. 
// I note that the format of the Google Spreadsheet URL has changed since I wrote the tutorial.  
// Maybe that's it?  See the comments just under initializeTabletopObject.  

// here's what it says in the Javascript console when I try to load it: 
// Failed to load resource: the server responded with a status of 400 (Bad Request) 
// https://spreadsheets.google.com/feeds/list/1-UKbUSvcFNngguhoEx3Ce9bagJwmzMT…es?alt=json-in-script&sq=&callback=Tabletop.callbacks.tt140087529338629201


var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){

    initializeTabletopObject('1-UKbUSvcFNngguhoEx3Ce9bagJwmzMTgZ6EaMdffwgY');
    
    

    // Old key: 0ApLwuu1HQNO7dHJVY1dsdWZlT2lNRjZ4eXluY1BWdHc
    
	// New spreadsheet url:
    // https://docs.google.com/spreadsheets/d/1-UKbUSvcFNngguhoEx3Ce9bagJwmzMTgZ6EaMdffwgY/pubhtml
    //
    // This looks like the key to me, but it doesn't have key=?  anymore.  Google Spreadsheets has changed?
    // 1-UKbUSvcFNngguhoEx3Ce9bagJwmzMTgZ6EaMdffwgY

});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */
    var tableColumns =   [
    
    // Old columns:
		//{'mDataProp': 'policedepartment', 'sTitle': 'Police Department', 'sClass': 'center'},
		//{'mDataProp': 'ftper1000', 'sTitle': 'Full Time Police Per 1,000 Residents', 'sClass': 'center'},
		//{'mDataProp': 'population', 'sTitle': 'Population', 'sClass': 'center'}
		
		// New columns: 
		
		{'mDataProp':'address','sTitle':'Address','sClass':'center'},
		{'mDataProp': 'moneyrecouped', 'sTitle': 'Profit', 'sClass': 'center'},
		
		
		
		
	];
	
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict('#demo').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered table-striped" id="data-table-container"></table>');

    var oTable = jqueryNoConflict('#data-table-container').dataTable({
		'sPaginationType': 'bootstrap',
		'iDisplayLength': 25,
        'aaData': dataSource,
        'aoColumns': createTableColumns(),
        'oLanguage': {
            'sLengthMenu': '_MENU_ records per page'
        }
    });
};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort['string-case-asc']  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort['string-case-desc'] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};