//document.body.innerHTML.replace

function double_digit(number)
{
	var ret = number.toString();
	if(ret.length == 1)
		return "0"+ret;
	else
		return ret;
}

function fix_part(input)
{
	var matches = input.match(/(\d+)|(am|pm)/gi)
	
	var hh,mm,ap;

	if(matches.length == 2) // DD PM
	{
		hh = Number(matches[0]);
		mm = 0;
		ap = matches[1].toLowerCase().replace(".", "");
	}
	else if(matches.length == 3)
	{
		hh = Number(matches[0]);
		mm = Number(matches[1]);
		ap = matches[2].toLowerCase().replace(".", "");
	}
	else
		return;
	
	if(hh > 12 )
		return;
	
	if(hh == 12 && ap == "am") // 12am
		hh = 0;
	
	found = true;
	
	if(ap == "pm" && hh != 12)
		hh += 12;
	
	return double_digit(hh) + ":" + double_digit(mm);
}

/*$*/(function()
{
	findAndReplaceDOMText(document, {
		find: /(\d\d?)(:\d\d)? *(a\.?m\.?|p\.?m\.?)/gi,
		replace: function(part)
		{
			console.log(part);
			return fix_part(part.text.toLowerCase().replace(".", ""));
		}
	})
})();
