function MakePayment(name, email, price, invoice, callback) {
	  var handler = PaystackPop.setup({
	  key: 'pk_test_027b0ed8bbf544d8b7b53e3a3e11576bef57b313',
	  email: email,
	  amount: price,
	  ref: invoice,
	  metadata: {
	  	custom_fields: [
	  		{
	  			display_name: "Name", 
	  			variable_name: "Full Name",
	  			value: name
	  		}
	  	]
	  },
	  callback: function(response) {
	  	 return callback(response);
	  },
	  onClose: function(){
		  alert('Window closed abruptly');
	  }
	});
	handler.openIframe();
}
