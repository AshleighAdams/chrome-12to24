
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
	var matches = input.match(/[0-9]+|am|pm/gi)
	
	var hh,mm,ss,ap;
	
	if(matches == null)
		return input;
	
	if(matches.length == 2) // DD PM
	{
		hh = Number(matches[0]);
		mm = 0;
		ss = 0;
		ap = matches[1].toLowerCase().replace(".", "");
	}
	else if(matches.length == 3)
	{
		hh = Number(matches[0]);
		mm = Number(matches[1]);
		ss = 0;
		ap = matches[2].toLowerCase().replace(".", "");
	}
	else if(matches.length == 4)
	{
		hh = Number(matches[0]);
		mm = Number(matches[1]);
		ss = Number(matches[2]);
		ap = matches[3].toLowerCase().replace(".", "");
	}
	else
		return input;
	
	if(hh > 12 )
		return input;
	
	if(hh == 12 && ap == "am") // 12am
		hh = 0;
	
	found = true;
	
	if(ap == "pm" && hh != 12)
		hh += 12;
	
	if(matches.length < 4)
		return double_digit(hh) + ":" + double_digit(mm);
	else
		return double_digit(hh) + ":" + double_digit(mm) + ":" + double_digit(ss);
}

(function()
{
	var count = 0;
	
	findAndReplaceDOMText(document, {
		find: /(^|[^a-z0-9])(\d+)(:\d+){0,2} ?(a\.?m\.?|p\.?m\.?)($|[^a-z0-9])/gi,
		replace: function(part)
		{
			if(part.index != 1) // 0 = pre, 1 = center, 2 = post
				return part.text;
			
			var text = part.text;
			
			text = text
				.toLowerCase()
				.replace(".", "");
			
			count += 1;
			return fix_part(text);
		}
	});
	
	if(count != 0)
		console.log("replaced " + count + " 12h times with 24h times");
})();

