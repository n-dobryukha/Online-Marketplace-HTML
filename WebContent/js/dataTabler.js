/**
 * 
 */
require.config({
	paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
        'datatables': 'https://cdn.datatables.net/1.10.7/js/jquery.dataTables',
        'integration': 'https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap'
    },
    shim: {
    	'datatables': ['jquery']
    }
});

require(
		['jquery', 'datatables', 'integration'],
		function( $, datatables, integration ) {
		    $(document).ready(function() {
				$('#dataTable tfoot th').each(
						function() {
							var title = $('#dataTable tfoot th').eq(
									$(this).index()).text();
							if (title !== "")
								$(this).html(
										'<input type="text" class="input-xs col-xs-12" placeholder="'
												+ title + '" />');
						});

				var table = $('#dataTable').DataTable({
					'dom': 'lt<"row"<"col-sm-5"i><"col-sm-7 input-group-sm"p>>',
					'searching' : true,
					'ajax' : './ajax/data/data.json',
					'columnDefs': [
						{'targets':0, 'data' : 'uid'},
						{'targets':1, 'data' : 'title'},
						{'targets':2, 'data' : 'description'},
						{'targets':3, 'data' : 'seller.name' },
						{'targets':4, 'data' : 'startPrice'},
						{'targets':5, 'data' : 'bidInc'},
						{'targets':6, 'data' : 'bestOffer'},
						{'targets':7, 'data' : 'bidder.name'},
						{'targets':8, 'data' : { _: 'stopDate.display', 'sort': 'stopDate.timestamp' } },
						{
							'targets': 9,
							'data': 'action',
							'render': function(data, type, row) {
								switch (data) {
								case 'bid':
									return "<div class='input-group input-group-xs'><div class='input-group-addon'>$</div><input type='text' class='form-control' placeholder='" + ((row.bestOffer === "") ? row.startPrice : (parseFloat(row.bestOffer) + parseFloat(row.bidInc)).toFixed(2)) + "'><span class='input-group-btn'><button class='btn btn-default' type='button'>Bid</button></span></div>";
									break;
								case 'buy':
									return "<div class='btn-group btn-group-justified'><div class='btn-group' role='group'><button class='btn btn-default btn-xs' type='button'>Buy</button></div></div>"
								default:
									return "";
								}								
							}
						}]
				});

				table.columns().every(function() {
					var that = this;

					$('input', this.footer()).on('keyup change', function() {
						that.search(this.value).draw();
					});
				});
			})
		}
);