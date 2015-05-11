/**
 * 
 */
require.config({
	paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
        'datatables': 'https://cdn.datatables.net/1.10.7/js/jquery.dataTables.min',
        'integration': 'https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap'
    }
});

require(
		['jquery', 'datatables', 'integration'],
		function( $, datatables ) {
			
			
	    	$(document).ready(function() {
	    		$('#example').dataTable({
	    			'ajax': './ajax/data/data.json'
	    		});
	    	})
		}
);