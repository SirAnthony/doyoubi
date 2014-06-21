
var chars = {
  'א': '',
  'ב': 'v',
  'ב': 'b',
  'ג': 'g',
  'ג׳': 'j',
  'ד': 'd',
  'ד׳': 'dh',
  'ה': 'h',
  'ו': 'v',
  'ז': 'z',
  'ז׳': 'zh',
  'ח': 'h',
  'ט': 't',
  'י': 'y',
  'כ': 'k',
  'ך': 'kh',
  'ל': 'l',
  'מ': 'm',
  'ם': 'm',
  'נ': 'n',
  'ן': 'n',
  'ס': 's',
  'ע': '\'',
  'פ': 'f',
  'ף': 'f',
  'צ': 'ts',
  'ץ': 'ts',
  'ץ׳': 'tsh',
  'ק': 'k',
  'ר': 'r',
  'ש': 's',
  'ת': 't'
}

var chars_en = {
  'a': '',
  'b': 'ב',
  'c': 'ק',
  'd': 'ד',
  'e': '',
  'f': 'פ',
  'g': 'ג',
  'h': 'ה',
  'i': '',
  'j': 'ג׳',
  'k': 'ק',
  'l': 'ל',
  'm': 'ם',
  'n': 'ן',
  'o': '',
  'p': 'פּ',
  'q': 'ק',
  'qu': 'קְו',
  'r': 'ר',
  's': 'ס',
  't': 'ט',
  'u': '',
  'v': 'ו',
  'w': 'ב',
  'x': 'קְס',
  'y': 'י',
  'z': 'ז',
  'ts': 'ץ',
  'ng': 'נג',
  'ch': 'צ׳',
  'sh': 'ש',
}

function reverse(alphabet) {
    var chars = {}
    for (var chr in alphabet)
        chars[alphabet[chr]] = chr
    return chars
}

var langs = {
  'iw': chars_en,
  'en': chars,
}


function translit(text, lang) {
    if (!(lang in langs))
        lang = 'iw'
    var alphabet = langs[lang]
    var output = ''
    for (var i = 0; i < text.length; ++i){
        var chr = text[i]
        output += chr in alphabet ? alphabet[chr] : chr
    }
    return output
}

module.exports = {
	transliterate: function(request, response) {
		var text = request.param('text')
        var lang = request.param('lang')
		return {
			original: text,
			text: translit(text, lang)
		}
	}
}
