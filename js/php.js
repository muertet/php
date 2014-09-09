var php =
{
	editor:'',
	init:function()
	{
		//recover last written code
		var oldCode = localStorage.getItem('code');
		if (oldCode != null) {
			$('#code').val(oldCode);
		}
		
		//hotkey bindings
		document.addEventListener("keydown", function(e) {
		  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
		    e.preventDefault();
			 php.execute();
		  }
		}, false);
		
		$('#execute-button').on('click', function () {
			php.execute();
		});
		
		php.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
	        lineNumbers: true,
			matchBrackets: true,
	        mode: "text/x-php",
	        indentUnit: 4,
	        indentWithTabs: true,
	        enterMode: "keep",
	 	    tabMode: "shift",
			theme:'monokai',
	      });
	},
	execute:function()
	{
		php.editor.save();
		
		var code = $('#code').val();
		if (code == null || code == '') {
			return false;
		}
		localStorage.setItem('code', code);
		
		$.post('', {code:code}, function(data) {
			$('#result').html(data);
		});
	}	
};
