//document.body.innerHTML.replace
function double_digit(number)
{
	var ret = number.toString();
	if(ret.length == 1)
		return "0"+ret;
	else
		return ret;
};

function fix_source(src)
{
	var found = false;
	src = src.replace(/(\d\d?)(:\d\d)? ?(am|pm)/gi, function(input)
	{
		var matches = input.match(/(\d+)|(am|pm)/gi)
		
		var hh,mm,ap;
		
		if(matches.length == 2) // DD PM
		{
			hh = Number(matches[0]);
			mm = 0;
			ap = matches[1].toLowerCase();
		}
		else if(matches.length == 3)
		{
			hh = Number(matches[0]);
			mm = Number(matches[1]);
			ap = matches[2].toLowerCase();
		}
		else
			return;
		
		if(hh > 12 )
			return;
		
		console.log(hh);
		found = true;
		
		if(ap == "pm")
			hh = hh + 12;
		
		return double_digit(hh) + ":" + double_digit(mm);
	});
	
	return [src, found];
}

$(function()
{
	var r = fix_source(document.body.outerHTML);
	
	if(r[1])
		document.body.outerHTML = r[0];
});
