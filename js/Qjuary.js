/ *!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Включает Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation и другие участники
 * Выпущено по лицензии MIT
 * https://jquery.org/license
 *
 * Дата: 2019-05-01T21: 04Z
 * /
(функция (глобальная, заводская) {

	«использовать строгое»;

	if (typeof module === "object" && typeof module.exports === "object") {

		// Для CommonJS и CommonJS-подобных сред, где правильное `окно`
		// присутствует, выполнить фабрику и получить jQuery.
		// Для сред, в которых нет `окна` с` документом`
		// (например, Node.js), выставить фабрику как module.exports.
		// Это подчеркивает необходимость создания настоящего `окна`.
		// например, var jQuery = require ("jquery") (window);
		// Смотрите билет # 14549 для получения дополнительной информации.
		module.exports = global.document?
			фабрика (глобальная, правда):
			function (w) {
				if (! w.document) {
					выбросить новую ошибку («jQuery требует окно с документом»);
				}
				возврат фабрики (w);
			};
	} еще {
		фабрика (глобальная);
	}

// Передаем это, если окно еще не определено
}) (typeof window! == "undefined"? window: this, function (window, noGlobal) {

// Edge <= 12–13+, Firefox <= 18–45+, IE 10–11, Safari 5.1–9+, iOS 6–9.1
// генерируем исключения, когда не строгий код (например, ASP.NET 4.5) обращается к строгому режиму
// arguments.callee.caller (trac-13335). Но с jQuery 3.0 (2016) строгий режим должен быть распространенным
// достаточно, чтобы все такие попытки были защищены в блоке try.
«использовать строгое»;

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call (Object);

var support = {};

var isFunction = function isFunction (obj) {

      // Поддержка: Chrome <= 57, Firefox <= 52
      // В некоторых браузерах typeof возвращает «функцию» для элементов HTML <object>
      // (т.е. `typeof document.createElement (" object ") ===" function "`).
      // Мы не хотим классифицировать * любой * узел DOM как функцию.
      вернуть typeof obj === "function" && typeof obj.nodeType! == "number";
  };


var isWindow = function isWindow (obj) {
		return obj! = null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		тип: правда,
		источник: правда,
		одноразовый номер: правда,
		noModule: правда
	};

	функция DOMEval (код, узел, документ) {
		doc = doc || документ;

		var i, val,
			script = doc.createElement ("script");

		script.text = code;
		if (узел) {
			для (я в preservedScriptAttributes) {

				// Поддержка: Firefox 64+, Edge 18+
				// Некоторые браузеры не поддерживают свойство nonce в скриптах.
				// С другой стороны, просто использование `getAttribute` недостаточно
				// атрибут nonce сбрасывается в пустую строку всякий раз, когда
				// становится подключенным к контексту просмотра.
				// см. Https://github.com/whatwg/html/issues/2369
				// См. Https://html.spec.whatwg.org/#nonce-attributes.
				// Проверка `node.getAttribute` была добавлена ​​ради
				// `jQuery.globalEval`, чтобы он мог имитировать не содержащий узел
				// через объект.
				val = узел [i] || node.getAttribute && node.getAttribute (i);
				if (val) {
					script.setAttribute (i, val);
				}
			}
		}
		doc.head.appendChild (script) .parentNode.removeChild (script);
	}


function toType (obj) {
	if (obj == null) {
		вернуть obj + "";
	}

	// Поддержка: только Android <= 2.3 (функция RegExp)
	вернуть typeof obj === "объект" || typeof obj === "функция"?
		class2type [toString.call (obj)] || «объект»:
		typeof obj;
}
/ * глобальный символ * /
// Определение этого глобального в .eslintrc.json создаст опасность использования глобального
// неохраняемый в другом месте, кажется безопаснее определять глобальный только для этого модуля



вар
	версия = "3.4.1",

	// Определяем локальную копию jQuery
	jQuery = функция (селектор, контекст) {

		// Объект jQuery на самом деле просто «улучшенный» конструктор init
		// Нужна инициализация, если вызывается jQuery (просто разрешить выдачу ошибки, если она не включена)
		вернуть новый jQuery.fn.init (селектор, контекст);
	},

	// Поддержка: только Android <= 4.0
	// Убедитесь, что мы обрезаем спецификации и NBSP
	rtrim = / ^ [\ s \ uFEFF \ xA0] + | [\ s \ uFEFF \ xA0] + $ / g;

jQuery.fn = jQuery.prototype = {

	// Текущая версия jQuery используется
	JQuery: версия,

	конструктор: jQuery,

	// Длина по умолчанию для объекта jQuery равна 0
	длина: 0,

	toArray: function () {
		возврат slice.call (это);
	},

	// Получить N-й элемент в наборе соответствующих элементов ИЛИ
	// Получить весь подобранный элемент как чистый массив
	get: function (num) {

		// Возвращаем все элементы в чистом массиве
		if (num == null) {
			возврат slice.call (это);
		}

		// Возвращаем только один элемент из набора
		вернуть число <0? this [num + this.length]: this [num];
	},

	// Взять массив элементов и поместить его в стек
	// (возвращая новый подобранный набор элементов)
	pushStack: function (elems) {

		// Создаем новый набор элементов jQuery
		var ret = jQuery.merge (this.constructor (), elems);

		// Добавить старый объект в стек (в качестве ссылки)
		ret.prevObject = this;

		// Возвращаем вновь сформированный набор элементов
		вернуться в отставку;
	},

	// Выполнить обратный вызов для каждого элемента в соответствующем наборе.
	each: function (callback) {
		return jQuery.each (this, callback);
	},

	map: function (callback) {
		вернуть this.pushStack (jQuery.map (this, function (elem, i) {
			возврат callback.call (elem, i, elem);
		}));
	},

	slice: function () {
		вернуть this.pushStack (slice.apply (this, arguments));
	},

	первый: функция () {
		вернуть this.eq (0);
	},

	last: function () {
		вернуть this.eq (-1);
	},

	eq: function (i) {
		var len = this.length,
			j = + i + (i <0? len: 0);
		вернуть this.pushStack (j> = 0 && j <len? [this [j]]: []);
	},

	end: function () {
		вернуть this.prevObject || this.constructor ();
	},

	// Только для внутреннего использования.
	// Ведет себя как метод Array, а не как метод jQuery.
	двутолчковый,
	сортировать: arr.sort,
	сращивание: arr.splice
};

jQuery.extend = jQuery.fn.extend = function () {
	параметры var, name, src, copy, copyIsArray, clone,
		target = arguments [0] || {},
		я = 1,
		длина = arguments.length,
		глубокий = ложный;

	// Обработка ситуации глубокого копирования
	if (typeof target === "boolean") {
		глубокий = цель;

		// Пропустить логическое значение и цель
		target = arguments [i] || {};
		я ++;
	}

	// Обрабатывать случай, когда целью является строка или что-то (возможно в глубокой копии)
	if (typeof target! == "object" &&! isFunction (target)) {
		target = {};
	}

	// Расширяем сам jQuery, если передан только один аргумент
	если (я === длина) {
		цель = это;
		я--;
	}

	for (; i <длина; i ++) {

		// Имеем дело только с ненулевыми / неопределенными значениями
		if ((options = arguments [i])! = null) {

			// Расширяем базовый объект
			для (имя в опциях) {
				копия = параметры [имя];

				// Предотвращаем загрязнение Object.prototype
				// Предотвратить бесконечный цикл
				if (name === "__proto__" || target === copy) {
					Продолжить;
				}

				// повторяем, если мы объединяем простые объекты или массивы
				if (deep && copy && (jQuery.isPlainObject (copy) ||
					(copyIsArray = Array.isArray (copy)))) {
					src = target [name];

					// Гарантируем правильный тип для исходного значения
					if (copyIsArray &&! Array.isArray (src)) {
						клон = [];
					} else if (! copyIsArray &&! jQuery.isPlainObject (src)) {
						клон = {};
					} еще {
						клон = источник;
					}
					copyIsArray = false;

					// Никогда не перемещайте оригинальные объекты, клонируйте их
					target [name] = jQuery.extend (глубокий, клонировать, копировать);

				// Не вводите неопределенные значения
				} else if (copy! == undefined) {
					цель [имя] = копия;
				}
			}
		}
	}

	// Возвращаем измененный объект
	вернуть цель;
};

jQuery.extend ({

	// Уникальный для каждой копии jQuery на странице
	раскрыть: "jQuery" + (версия + Math.random ()) .replace (/ \ D / g, ""),

	// Предположим, что jQuery готов без модуля готовности
	isReady: правда,

	error: function (msg) {
		выдать новую ошибку (msg);
	},

	noop: function () {},

	isPlainObject: function (obj) {
		вар прото, ктор;

		// Обнаружение явных негативов
		// Используем toString вместо jQuery.type для перехвата объектов хоста
		if (! obj || toString.call (obj)! == "[объект объекта]") {
			вернуть ложь;
		}

		proto = getProto (obj);

		// Объекты без прототипа (например, `Object.create (null)`) являются простыми
		if (! proto) {
			вернуть истину;
		}

		// Объекты с прототипом просты, если они были созданы глобальной функцией Object
		Ctor = hasOwn.call (proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && fnToString.call (Ctor) === ObjectFunctionString;
	},

	isEmptyObject: function (obj) {
		имя вар;

		for (имя в obj) {
			вернуть ложь;
		}
		вернуть истину;
	},

	// Оценивает скрипт в глобальном контексте
	globalEval: функция (код, опции) {
		DOMEval (код, {nonce: options && options.nonce});
	},

	each: function (obj, callback) {
		длина переменной, я = 0;

		if (isArrayLike (obj)) {
			длина = длина объекта;
			for (; i <длина; i ++) {
				if (callback.call (obj [i], i, obj [i]) === false) {
					перерыв;
				}
			}
		} еще {
			для (я в obj) {
				if (callback.call (obj [i], i, obj [i]) === false) {
					перерыв;
				}
			}
		}

		вернуть объект;
	},

	// Поддержка: только Android <= 4.0
	trim: function (text) {
		возвращаемый текст == ноль?
			"":
			(текст + "") .replace (rtrim, "");
	},

	// результаты только для внутреннего использования
	makeArray: function (arr, results) {
		var ret = результаты || [];

		if (arr! = null) {
			if (isArrayLike (Object (arr))) {
				jQuery.merge (ret,
					typeof arr === "строка"?
					[обр]: обр
				);
			} еще {
				push.call (ret, arr);
			}
		}

		вернуться в отставку;
	},

	inArray: function (elem, arr, i) {
		return arr == ноль? -1: indexOf.call (обр, элем, я);
	},

	// Поддержка: только Android <= 4.0, только PhantomJS 1
	// push.apply (_, arraylike) создает древний WebKit
	merge: function (first, second) {
		var len = + second.length,
			j = 0,
			я = первая длина;

		для (; j <len; j ++) {
			first [i ++] = second [j];
		}

		first.length = i;

		вернись первым;
	},

	grep: function (elems, callback, invert) {
		var callbackInverse,
			спички = [],
			я = 0,
			длина = elems.length,
			callbackExpect =! invert;

		// Проходим массив, сохраняя только элементы
		// которые передают функцию валидатора
		for (; i <длина; i ++) {
			callbackInverse =! callback (elems [i], i);
			if (callbackInverse! == callbackExpect) {
				match.push (elems [i]);
			}
		}

		возвращать спички;
	},

	// arg предназначен только для внутреннего использования
	map: function (elems, callback, arg) {
		длина переменной, значение,
			я = 0,
			ret = [];

		// Проходим массив, переводим каждый из элементов в их новые значения
		if (isArrayLike (elems)) {
			длина = elems.length;
			for (; i <длина; i ++) {
				значение = обратный вызов (elems [i], i, arg);

				if (значение! = ноль) {
					ret.push (значение);
				}
			}

		// Проходим все ключи на объекте,
		} еще {
			для (я в элементах) {
				значение = обратный вызов (elems [i], i, arg);

				if (значение! = ноль) {
					ret.push (значение);
				}
			}
		}

		// Свести все вложенные массивы
		вернуть concat.apply ([], ret);
	},

	// Глобальный счетчик GUID для объектов
	Guid: 1,

	// jQuery.support не используется в Core, но другие проекты прикрепляют свои
	// свойства к нему, поэтому он должен существовать.
	поддержка: поддержка
});

if (typeof Symbol === "function") {
	jQuery.fn [Symbol.iterator] = arr [Symbol.iterator];
}

// Заполняем карту class2type
jQuery.each («Булево число Строка функции Массив Дата Символ RegExp Объект Ошибка» .split (""),
функция (я, имя) {
	class2type ["[object" + name + "]"] = name.toLowerCase ();
});

function isArrayLike (obj) {

	// Поддержка: только настоящая iOS 8.2 (не воспроизводится в симуляторе)
	// проверка `in` используется для предотвращения ошибки JIT (gh-2145)
	// hasOwn здесь не используется из-за ложных негативов
	// относительно длины Nodelist в IE
	var length = !! obj && "length" в obj && obj.length,
		type = toType (obj);

	if (isFunction (obj) || isWindow (obj)) {
		вернуть ложь;
	}

	возвращаемый тип === "массив" || длина === 0 ||
		typeof length === "число" && длина> 0 && (длина - 1) в объекте;
}
var Sizzle =
/ *!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation и другие участники
 * Выпущено по лицензии MIT
 * https://js.foundation/
 *
 * Дата: 2019-04-08
 * /
(функция (окно) {

я
	служба поддержки,
	Expr,
	GetText,
	isXML,
	разметить,
	компиляции,
	Выбрать,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Местные документы
	setDocument,
	документ,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	Матчи,
	содержит,

	// Специфичные для экземпляра данные
	expando = "sizzle" + 1 * new Date (),
	предпочитаемый документ = window.document,
	dirruns = 0,
	сделано = 0,
	classCache = createCache (),
	tokenCache = createCache (),
	compilerCache = createCache (),
	nonnativeSelectorCache = createCache (),
	sortOrder = function (a, b) {
		if (a === b) {
			hasDuplicate = true;
		}
		вернуть 0;
	},

	// Методы экземпляра
	hasOwn = ({}). hasOwnProperty,
	обр = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Использовать урезанный indexOf, так как он быстрее, чем собственный
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = функция (список, элемент) {
		var i = 0,
			len = list.length;
		for (; i <len; i ++) {
			if (list [i] === elem) {
				вернуть я;
			}
		}
		возврат -1;
	},

	booleans = "проверено | выбрано | асинхронно | автофокус | автозапуск | элементы управления | отложить | отключено | отключено | скрыто | ismap | цикл | несколько | открыть | только для чтения | требуется | требуется»,

	// Регулярные выражения

	// http://www.w3.org/TR/css3-selectors/#whitespace
	пробел = "[\\ x20 \\ t \\ r \\ n \\ f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?: \\\\. | [\\ w-] | [^ \ 0 - \\ xa0]) +",

	// Селекторы атрибутов: http://www.w3.org/TR/selectors/#attribute-selectors
	attribute = "\\ [" + пробел + "* (" + идентификатор + ") (?:" + пробел +
		// Оператор (захват 2)
		"* ([* ^ $ |! ~]? =)" + пробел +
		// «Значения атрибута должны быть идентификаторами CSS [capture 5] или strings [capture 3 или capture 4]»
		«* (?: '((?:. \\\\ | [^ \\\\']) *) '| \ "((?:. \\\\ | [^ \\\\\"] ) *) \ "| (" + идентификатор + ")) |)" + пробел +
		"* \\]",

	pseudos = ":(" + идентификатор + ") (?: \\ ((" +
		// Чтобы уменьшить количество селекторов, нуждающихся в токенизации в preFilter, предпочитаем аргументы:
		// 1. цитируется (захват 3; захват 4 или захват 5)
		«( '((?:. \\\\ | [^ \\\\']) *) '| \ "((?:. \\\\ | [^ \\\\\"]) *) \ ") |" +
		// 2. просто (захват 6)
		"((?: \\\\. | [^ \\\\ () [\\]] |" + attribute + ") *) |" +
		// 3. все остальное (захват 2)
		". *" +
		") \\) |)",

	// Ведущие и неэкранированные конечные пробелы, захватывая некоторые непробельные символы, предшествующие последним
	rwhitespace = новый RegExp (пробел + "+", "g"),
	rtrim = новый RegExp ("^" + пробел + "+ | ((?: ^ | [^ \\\\]) (?: \\\\.) *)" + пробел + "+ $", "g "),

	rcomma = новый RegExp ("^" + пробел + "*," + пробел + "*"),
	rcombinators = new RegExp ("^" + пробел + "* ([> + ~] |" + пробел + ")" + пробел + "*"),
	rdescend = новый RegExp (пробел + "|>"),

	rpseudo = новый RegExp (псевдо),
	ridentifier = new RegExp ("^" + идентификатор + "$"),

	matchExpr = {
		"ID": новый RegExp ("^ # (" + идентификатор + ")"),
		"КЛАСС": новый RegExp ("^ \\. (" + Идентификатор + ")"),
		"TAG": новый RegExp ("^ (" + идентификатор + "| [*])"),
		«ATTR»: новый RegExp («^» + атрибуты),
		"PSEUDO": новый RegExp ("^" + псевдо),
		«РЕБЕНОК»: новый RegExp (только «^ :( | первый | последний | последний | nth | nth-last) - (потомок | типа) (?: \\ (" + пробел +
			"* (четное | нечетное | (([+ -] |) (\\ d *) n |)" + пробел + "* (?: ([+ -] |)" + пробел +
			"* (\\ d +) |))" + пробел + "* \\) |)", "i"),
		"bool": new RegExp ("^ (?:" + booleans + ") $", "i"),
		// Для использования в библиотеках, реализующих .is ()
		// Мы используем это для соответствия POS в `select`
		"needsContext": новый RegExp ("^" + пробел + "* [> + ~] |: (четный | нечетный | eq | gt | lt | nth | первый | последний) (?: \\ (" +
			пробел + "* ((?: - \\ d)? \\ d *)" + пробел + "* \\) |) (? = [^ -] | $)", "i")
	},

	rhtml = / HTML $ / i,
	rinputs = / ^ (?: input | select | textarea | button) $ / i,
	rheader = / ^ h \ d $ / i,

	родной = / ^ [^ {] + \ {\ s * \ [native \ w /,

	// Легко разбираемые / извлекаемые селекторы ID или TAG или CLASS
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = / [+ ~] /,

	// CSS убегает
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp ("\\\\ ([\\ da-f] {1,6}" + пробел + "? | (" + пробел + ") |.)", "ig"),
	funescape = function (_, сбежал, escapedWhitespace) {
		var high = "0x" + экранированный - 0x10000;
		// NaN означает не кодовую точку
		// Поддержка: Firefox <24
		// Обходной путь ошибочной числовой интерпретации + "0x"
		возвращайся высоко! == высоко || escapeWhitespace?
			сбежал:
			высокий <0?
				// код BMP
				String.fromCharCode (высокий + 0x10000):
				// Код дополнительной точки (суррогатная пара)
				String.fromCharCode (высокий >> 10 | 0xD800, высокий & 0x3FF | 0xDC00);
	},

	// CSS строка / идентификатор сериализации
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = / ([\ 0- \ x1f \ x7f] | ^ -? \ d) | ^ - $ | [^ \ 0- \ x1f \ x7f- \ uFFFF \ w -] / g,
	fcssescape = function (ch, asCodePoint) {
		if (asCodePoint) {

			// U + 0000 NULL становится U + FFFD ЗАМЕНА ХАРАКТЕР
			if (ch === "\ 0") {
				return "\ uFFFD";
			}

			// Управляющие символы и (в зависимости от позиции) числа экранируются как кодовые точки
			return ch.slice (0, -1) + "\\" + ch.charCodeAt (ch.length - 1) .toString (16) + "";
		}

		// Другие потенциально специальные символы ASCII получаются с обратной косой чертой
		возврат "\\" + ch;
	},

	// Используется для фреймов
	// Смотрите setDocument ()
	// Удаление оболочки функции вызывает «Отказано в доступе»
	// ошибка в IE
	unloadHandler = function () {
		setDocument ();
	},

	inDisabledFieldset = addCombinator (
		function (elem) {
			return elem.disabled === true && elem.nodeName.toLowerCase () === "fieldset";
		},
		{dir: "parentNode", следующий: "legend"}
	);

// Оптимизация для push.apply (_, NodeList)
пытаться {
	push.apply (
		(arr = slice.call (extendedDoc.childNodes)),
		preferredDoc.childNodes
	);
	// Поддержка: Android <4.0
	// Обнаружение молча сбоя push.apply
	arr [предпочитаемыйDoc.childNodes.length] .nodeType;
} catch (e) {
	push = {применить: длина файла?

		// Использовать срез, если это возможно
		function (target, els) {
			push_native.apply (target, slice.call (els));
		}:

		// Поддержка: IE <9
		// В противном случае добавляем напрямую
		function (target, els) {
			var j = target.length,
				я = 0;
			// Не могу доверять NodeList.length
			while ((target [j ++] = els [i ++])) {}
			target.length = j - 1;
		}
	};
}

функция Sizzle (селектор, контекст, результаты, семя) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType по умолчанию равен 9, так как контекст по умолчанию соответствует документу
		nodeType = context? context.nodeType: 9;

	результаты = результаты || [];

	// Возвращаем рано из вызовов с неверным селектором или контекстом
	if (typeof селектор! == "строка" ||! селектор ||
		nodeType! == 1 && nodeType! == 9 && nodeType! == 11) {

		возвращать результаты;
	}

	// Попытка сократить операции поиска (в отличие от фильтров) в документах HTML
	if (! seed) {

		if ((context? context.ownerDocument || context: предпочитаемый документ)! == документ) {
			setDocument (context);
		}
		контекст = контекст || документ;

		if (documentIsHTML) {

			// Если селектор достаточно прост, попробуйте использовать метод DOM "get * By *"
			// (исключая контекст DocumentFragment, где методы не существуют)
			if (nodeType! == 11 && (match = rquickExpr.exec (селектор))) {

				// Селектор идентификатора
				if ((m = match [1])) {

					// Контекст документа
					if (nodeType === 9) {
						if ((elem = context.getElementById (m))) {

							// Поддержка: IE, Opera, Webkit
							// TODO: определить версии
							// getElementById может сопоставлять элементы по имени вместо ID
							if (elem.id === m) {
								results.push (elem);
								возвращать результаты;
							}
						} еще {
							возвращать результаты;
						}

					// Элемент контекста
					} еще {

						// Поддержка: IE, Opera, Webkit
						// TODO: определить версии
						// getElementById может сопоставлять элементы по имени вместо ID
						if (newContext && (elem = newContext.getElementById (m)) &&
							содержит (context, elem) &&
							elem.id === m) {

							results.push (elem);
							возвращать результаты;
						}
					}

				// Селектор типа
				} else if (match [2]) {
					push.apply (результаты, context.getElementsByTagName (селектор));
					возвращать результаты;

				// Выбор класса
				} else if ((m = match [3]) && support.getElementsByClassName &&
					context.getElementsByClassName) {

					push.apply (результаты, context.getElementsByClassName (m));
					возвращать результаты;
				}
			}

			// Воспользуемся функцией querySelectorAll
			if (support.qsa &&
				! nonnativeSelectorCache [selector + ""] &&
				(! rbuggyQSA ||! rbuggyQSA.test (селектор)) &&

				// Поддержка: только IE 8
				// Исключить элементы объекта
				(nodeType! == 1 || context.nodeName.toLowerCase ()! == "object")) {

				newSelector = селектор;
				newContext = context;

				// qSA рассматривает элементы вне корня области видимости при оценке дочернего элемента или
				// потомки комбинаторов, а это не то, что мы хотим.
				// В таких случаях мы обходим поведение, добавляя префикс к каждому селектору в
				// список с селектором идентификатора, ссылающимся на контекст контекста.
				// Спасибо Эндрю Дюпону за эту технику.
				if (nodeType === 1 && rdescend.test (селектор)) {

					// Захватим идентификатор контекста, устанавливая его первым при необходимости
					if ((nid = context.getAttribute ("id"))) {
						nid = nid.replace (rcssescape, fcssescape);
					} еще {
						context.setAttribute ("id", (nid = expando));
					}

					// Префикс каждого селектора в списке
					groups = tokenize (селектор);
					я = groups.length;
					в то время как я-- ) {
						groups [i] = "#" + nid + "" + toSelector (groups [i]);
					}
					newSelector = groups.join (",");

					// Расширяем контекст для родственных селекторов
					newContext = rsibling.test (селектор) && testContext (context.parentNode) ||
						контекст;
				}

				пытаться {
					push.apply (результаты,
						newContext.querySelectorAll (newSelector)
					);
					возвращать результаты;
				} catch (qsaError) {
					nonnativeSelectorCache (selector, true);
				} в конце концов {
					if (nid === expando) {
						context.removeAttribute ("id");
					}
				}
			}
		}
	}

	// Все другие
	return select (selector.replace (rtrim, "$ 1"), контекст, результаты, начальное число);
}

/ **
 * Создайте кэши ключ-значение ограниченного размера
 * @returns {function (string, object)} Возвращает данные объекта после их сохранения в себе с
 * имя свойства (строка с суффиксом) и (если кеш больше, чем Expr.cacheLength)
 * удаление самой старой записи
 * /
function createCache () {
	var keys = [];

	кэш функции (ключ, значение) {
		// Используем (key + ""), чтобы избежать столкновения со свойствами собственного прототипа (см. Выпуск № 157)
		if (keys.push (key + "")> Expr.cacheLength) {
			// Сохраняем только самые последние записи
			удалить кеш [keys.shift ()];
		}
		возврат (кеш [ключ + ""] = значение);
	}
	возврат кеша;
}

/ **
 * Отметьте функцию для специального использования Sizzle
 * @param {Function} fn Функция для отметки
 * /
function markFunction (fn) {
	fn [expando] = правда;
	возврат фн;
}

/ **
 * Поддержка тестирования с использованием элемента
 * @param {Function} fn Пропустил созданный элемент и возвращает логический результат
 * /
function assert (fn) {
	var el = document.createElement ("fieldset");

	пытаться {
		возврат !! fn (el);
	} catch (e) {
		вернуть ложь;
	} в конце концов {
		// Удалить из родителя по умолчанию
		if (el.parentNode) {
			el.parentNode.removeChild (el);
		}
		// освобождаем память в IE
		el = ноль;
	}
}

/ **
 * Добавляет один и тот же обработчик для всех указанных атрибутов
 * @param {String} attrs Список атрибутов, разделенных конвейером
 * @param {Function} handler Метод, который будет применен
 * /
function addHandle (attrs, handler) {
	var arr = attrs.split ("|"),
		я = длина волны;

	в то время как я-- ) {
		Expr.attrHandle [arr [i]] = обработчик;
	}
}

/ **
 * Проверяет порядок документов двух братьев и сестер
 * @param {Элемент} a
 * @param {Элемент} b
 * @returns {Number} Возвращает меньше 0, если a предшествует b, больше 0, если a следует b
 * /
function siblingCheck (a, b) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Использование IE sourceIndex, если доступно на обоих узлах
	if (diff) {
		вернуть diff;
	}

	// Проверяем, следует ли b
	if (cur) {
		while ((cur = cur.nextSibling)) {
			if (cur === b) {
				возврат -1;
			}
		}
	}

	вернуть? 1: -1;
}

/ **
 * Возвращает функцию для использования в псевдо для типов ввода
 * @param {String} тип
 * /
функция createInputPseudo (type) {
	функция возврата (элемент) {
		var name = elem.nodeName.toLowerCase ();
		возвращаемое имя === "input" && elem.type === type;
	};
}

/ **
 * Возвращает функцию для использования в псевдо для кнопок
 * @param {String} тип
 * /
function createButtonPseudo (type) {
	функция возврата (элемент) {
		var name = elem.nodeName.toLowerCase ();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/ **
 * Возвращает функцию для использования в псевдо для: enabled /: disabled
 * @param {Boolean} отключен true для: отключен; false для: включено
 * /
функция createDisabledPseudo (отключена) {

	// Известно: отключено ложных срабатываний: fieldset [disabled]> легенда: nth-of-type (n + 2): can-disable
	функция возврата (элемент) {

		// Только определенные элементы могут соответствовать: enabled или: disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ("форма" в элементе) {

			// Проверяем унаследованную инвалидность на соответствующих не отключенных элементах:
			// * перечислил связанные с формой элементы в отключенном наборе полей
			// https://html.spec.whatwg.org/multipage/forms.html#category-listed
			// https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * элементы option в отключенной optgroup
			// https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// Все такие элементы имеют свойство "form".
			if (elem.parentNode && elem.disabled === false) {

				// Элементы опций относятся к родительской optgroup, если она есть
				if ("label" в элементе) {
					if ("label" в elem.parentNode) {
						return elem.parentNode.disabled === отключено;
					} еще {
						возвращение elem.disabled === отключено;
					}
				}

				// Поддержка: IE 6 - 11
				// Используйте свойство ярлыка isDisabled для проверки отключенных предков fieldset
				return elem.isDisabled === отключено ||

					// Там, где нет isDisabled, проверяем вручную
					/ * jshint -W018 * /
					elem.isDisabled! ==! отключен &&
						inDisabledFieldset (elem) === отключено;
			}

			возвращение elem.disabled === отключено;

		// Попробуем вычеркнуть элементы, которые нельзя отключить, прежде чем доверять свойству disabled.
		// Некоторые жертвы попадают в нашу сеть (ярлык, легенда, меню, трек), но это не должно
		// даже существует на них, не говоря уже о логическом значении.
		} else if ("label" в элементе) {
			возвращение elem.disabled === отключено;
		}

		// Остальные элементы не являются ни: enabled, ни: disabled
		вернуть ложь;
	};
}

/ **
 * Возвращает функцию для использования в псевдо для позиционеров
 * @param {Function} fn
 * /
function createPositionalPseudo (fn) {
	return markFunction (function (аргумент) {
		аргумент = + аргумент;
		return markFunction (function (seed, match) {
			вар j,
				matchIndexes = fn ([], seed.length, аргумент),
				я = matchIndexes.length;

			// Соответствие элементов, найденных по указанным индексам
			в то время как я-- ) {
				if (seed [(j = matchIndexes [i])]) {
					seed [j] =! (соответствует [j] = seed [j]);
				}
			}
		});
	});
}

/ **
 * Проверяет узел на достоверность как контекст Sizzle
 * @param {Element | Object =} контекст
 * @returns {Element | Object | Boolean} Входной узел, если он приемлем, в противном случае ложное значение
 * /
function testContext (context) {
	вернуть контекст && typeof context.getElementsByTagName! == "undefined" && context;
}

// Предоставить поддержку vars для удобства
support = Sizzle.support = {};

/ **
 * Обнаруживает узлы XML
 * @param {Element | Object} elem Элемент или документ
 * @returns {Boolean} Истинно, если elem - это не HTML-узел XML
 * /
isXML = Sizzle.isXML = function (elem) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem) .documentElement;

	// Поддержка: IE <= 8
	// Предполагаем HTML, когда documentElement еще не существует, например, внутри загрузки iframes
	// https://bugs.jquery.com/ticket/4833
	return! rhtml.test (пространство имен || docElem && docElem.nodeName || "HTML");
};

/ **
 * Устанавливает связанные с документом переменные один раз на основе текущего документа
 * @param {Element | Object} [doc] Элемент или объект документа, используемый для установки документа
 * @returns {Object} Возвращает текущий документ
 * /
setDocument = Sizzle.setDocument = function (node) {
	var hasCompare, subWindow,
		документ = узел? node.ownerDocument || узел: предпочитаемый документ;

	// Возвращаем рано, если документ недействителен или уже выбран
	if (doc === document || doc.nodeType! == 9 ||! doc.documentElement) {
		возвратный документ;
	}

	// Обновляем глобальные переменные
	документ = документ;
	docElem = document.documentElement;
	documentIsHTML =! isXML (document);

	// Поддержка: IE 9-11, Edge
	// Доступ к документам iframe после выгрузки выдает ошибки «Отказано в доступе» (jQuery # 13936)
	if (предпочитаемый документ! == документ &&
		(subWindow = document.defaultView) && subWindow.top! == subWindow) {

		// Поддержка: IE 11, Edge
		if (subWindow.addEventListener) {
			subWindow.addEventListener ("unload", unloadHandler, false);

		// Поддержка: только IE 9 - 10
		} else if (subWindow.attachEvent) {
			subWindow.attachEvent ("onunload", unloadHandler);
		}
	}

	/ * Атрибуты
	-------------------------------------------------- -------------------- * /

	// Поддержка: IE <8
	// Убедитесь, что getAttribute действительно возвращает атрибуты, а не свойства
	// (за исключением логических значений IE8)
	support.attributes = assert (function (el) {
		el.className = "i";
		return! el.getAttribute ("className");
	});

	/ * getElement (s) By *
	-------------------------------------------------- -------------------- * /

	// Проверяем, возвращает ли getElementsByTagName ("*") только элементы
	support.getElementsByTagName = assert (function (el) {
		el.appendChild (document.createComment (""));
		return! el.getElementsByTagName ("*"). length;
	});

	// Поддержка: IE <9
	support.getElementsByClassName = rnative.test (document.getElementsByClassName);

	// Поддержка: IE <10
	// Проверяем, возвращает ли getElementById элементы по имени
	// неработающие методы getElementById не выбирают программно заданные имена,
	// поэтому используем обходной тест getElementsByName
	support.getById = assert (function (el) {
		docElem.appendChild (el) .id = expando;
		return! document.getElementsByName || ! document.getElementsByName (expando) .length;
	});

	// ID фильтр и поиск
	if (support.getById) {
		Expr.filter ["ID"] = function (id) {
			var attrId = id.replace (runescape, funescape);
			функция возврата (элемент) {
				return elem.getAttribute ("id") === attrId;
			};
		};
		Expr.find ["ID"] = функция (идентификатор, контекст) {
			if (typeof context.getElementById! == "undefined" && documentIsHTML) {
				var elem = context.getElementById (id);
				вернуть элемент? [элемент]: [];
			}
		};
	} еще {
		Expr.filter ["ID"] = function (id) {
			var attrId = id.replace (runescape, funescape);
			функция возврата (элемент) {
				var node = typeof elem.getAttributeNode! == "undefined" &&
					elem.getAttributeNode ( "ID");
				возвратный узел && node.value === attrId;
			};
		};

		// Поддержка: только IE 6 - 7
		// getElementById не надежен как ярлык поиска
		Expr.find ["ID"] = функция (идентификатор, контекст) {
			if (typeof context.getElementById! == "undefined" && documentIsHTML) {
				var node, i, elems,
					elem = context.getElementById (id);

				if (elem) {

					// Проверка атрибута id
					node = elem.getAttributeNode ("id");
					if (node ​​&& node.value === id) {
						возврат [элемент];
					}

					// Откат на getElementsByName
					elems = context.getElementsByName (id);
					я = 0;
					while ((elem = elems [i ++])) {
						node = elem.getAttributeNode ("id");
						if (node ​​&& node.value === id) {
							возврат [элемент];
						}
					}
				}

				вернуть [];
			}
		};
	}

	// Тег
	Expr.find ["TAG"] = support.getElementsByTagName?
		функция (тег, контекст) {
			if (typeof context.getElementsByTagName! == "undefined") {
				return context.getElementsByTagName (tag);

			// Узлы DocumentFragment не имеют gEBTN
			} else if (support.qsa) {
				return context.querySelectorAll (tag);
			}
		}:

		функция (тег, контекст) {
			вар элем,
				tmp = [],
				я = 0,
				// По счастливой случайности (сломанный) gEBTN появляется и на узлах DocumentFragment
				results = context.getElementsByTagName (tag);

			// Отфильтруем возможные комментарии
			if (tag === "*") {
				while ((elem = results [i ++])) {
					if (elem.nodeType === 1) {
						tmp.push (elem);
					}
				}

				возврат тмп;
			}
			возвращать результаты;
		};

	// Учебный класс
	Expr.find ["CLASS"] = support.getElementsByClassName && function (className, context) {
		if (typeof context.getElementsByClassName! == "undefined" && documentIsHTML) {
			return context.getElementsByClassName (className);
		}
	};

	/ * QSA / matchSelector
	-------------------------------------------------- -------------------- * /

	// QSA и поддержка matchSelector

	// matchSelector (: active) сообщает об ошибке, когда true (IE9 / Opera 11.5)
	rbuggyMatches = [];

	// qSa (: focus) сообщает false когда true (Chrome 21)
	// Мы допускаем это из-за ошибки в IE8 / 9, которая выдает ошибку
	// всякий раз, когда к документу обращаются к iframe
	// Итак, мы разрешаем: focus все время проходить через QSA, чтобы избежать ошибки IE
	// см. Https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ((support.qsa = rnative.test (document.querySelectorAll))) {
		// Создание регулярного выражения QSA
		// Стратегия Regex принята от Диего Перини
		assert (function (el) {
			// Специально выбрана пустая строка
			// Это для проверки IE не явно
			// установка логического атрибута содержимого,
			// поскольку его присутствия должно быть достаточно
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild (el) .innerHTML = "<a id='" + expando + "'> </a>" +
				"<select id = '" + expando + "- \ r \\' msallowcapture = ''>" +
				"<option selected = ''> </ option> </ select>";

			// Поддержка: IE8, Opera 11-12.16
			// Ничто не должно быть выбрано, когда пустые строки следуют за ^ = или $ = или * =
			// Атрибут test должен быть неизвестен в Opera, но "безопасен" для WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if (el.querySelectorAll ("[msallowcapture ^ = '']"). length) {
				rbuggyQSA.push ("[* ^ $] =" + пробел + "* (?: '' | \" \ ")");
			}

			// Поддержка: IE8
			// Булевы атрибуты и значение не обрабатываются правильно
			if (! el.querySelectorAll ("[selected]"). length) {
				rbuggyQSA.push ("\\ [" + пробел + "* (?: value |" + booleans + ")");
			}

			// Поддержка: Chrome <29, Android <4.4, Safari <7.0+, iOS <7.0+, PhantomJS <1.9.8+
			if (! el.querySelectorAll ("[id ~ =" + expando + "-]") .length) {
				rbuggyQSA.push ( "~ =");
			}

			// Webkit / Opera -: флажок должен возвращать выбранные элементы опции
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 выдает ошибку здесь и не увидит последующие тесты
			if (! el.querySelectorAll (": флажок"). длина) {
				rbuggyQSA.push ( ": проверено");
			}

			// Поддержка: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// Селектор внутри страницы `id # sibling-combinator selector` завершается неудачно
			if (! el.querySelectorAll ("a #" + expando + "+ *") .length) {
				rbuggyQSA.push ( "# + [+ ~]..");
			}
		});

		assert (function (el) {
			el.innerHTML = "<a href='' disabled='disabled'> </a>" +
				"<select disabled = 'disabled'> <option /> </ select>";

			// Поддержка: родные приложения для Windows 8
			// Атрибуты типа и имени ограничены при назначении .innerHTML
			var input = document.createElement ("input");
			input.setAttribute ("type", "hidden");
			el.appendChild (input) .setAttribute ("name", "D");

			// Поддержка: IE8
			// Обеспечить чувствительность к регистру атрибута имени
			if (el.querySelectorAll ("[name = d]"). length) {
				rbuggyQSA.push ("имя" + пробел + "* [* ^ $ |! ~]? =");
			}

			// FF 3.5 -: enabled /: отключены и скрытые элементы (скрытые элементы по-прежнему включены)
			// IE8 выдает ошибку здесь и не увидит последующие тесты
			if (el.querySelectorAll (": enabled"). length! == 2) {
				rbuggyQSA.push (": включено", ": отключено");
			}

			// Поддержка: IE9-11 +
			// IE: отключенный селектор не выбирает потомков отключенных полей
			docElem.appendChild (el) .disabled = true;
			if (el.querySelectorAll (": disabled"). length! == 2) {
				rbuggyQSA.push (": включено", ": отключено");
			}

			// Опера 10-11 не выбрасывает ложные псевдосмешки после запятой
			el.querySelectorAll ( "* ,: х");
			rbuggyQSA.push ( "*:".);
		});
	}

	if ((support.matchesSelector = rnative.test ((match = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector)))) {

		assert (function (el) {
			// Проверяем, можно ли делать matchSelector
			// на отключенном узле (IE 9)
			support.disconnectedMatch = match.call (el, "*");

			// Это должно завершиться с исключением
			// Gecko не выдает ошибку, возвращает false
			match.call (el, "[s! = '']: x");
			rbuggyMatches.push ("! =", псевдо);
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp (rbuggyQSA.join ("|"));
	rbuggyMatches = rbuggyMatches.length && new RegExp (rbuggyMatches.join ("|"));

	/* Содержит
	-------------------------------------------------- -------------------- * /
	hasCompare = rnative.test (docElem.compareDocumentPosition);

	// Элемент содержит другой
	// Целенаправленно самоисключительно
	// Как и в случае, элемент не содержит себя
	содержит = hasCompare || rnative.test (docElem.contains)?
		функция (а, б) {
			var adown = a.nodeType === 9? a.documentElement: a,
				bup = b && b.parentNode;
			вернуть === bup || !! (bup && bup.nodeType === 1 && (
				adown.contains?
					adown.contains (bup):
					a.compareDocumentPosition && a.compareDocumentPosition (bup) & 16
			));
		}:
		функция (а, б) {
			если (б) {
				while ((b = b.parentNode)) {
					if (b === a) {
						вернуть истину;
					}
				}
			}
			вернуть ложь;
		};

	/ * Сортировка
	-------------------------------------------------- -------------------- * /

	// Порядок сортировки документов
	sortOrder = hasCompare?
	функция (а, б) {

		// Флаг для удаления дубликатов
		if (a === b) {
			hasDuplicate = true;
			вернуть 0;
		}

		// Сортировка по наличию метода, если только один вход имеет CompareDocumentPosition
		var Compare =! a.compareDocumentPosition -! b.compareDocumentPosition;
		если (сравнить) {
			вернуть сравнить;
		}

		// Расчет позиции, если оба ввода принадлежат одному и тому же документу
		сравнить = (a.ownerDocument || a) === (b.ownerDocument || b)?
			a.compareDocumentPosition (b):

			// В противном случае мы знаем, что они отключены
			1;

		// Отключенные узлы
		если (сравнить & 1 ||
			(! support.sortDetached && b.compareDocumentPosition (a) === сравнить)) {

			// Выберите первый элемент, который связан с нашим предпочтительным документом
			if (a === document || a.ownerDocument === половинный_документ && содержит (предпочитаемый_док, а)) {
				возврат -1;
			}
			if (b === document || b.ownerDocument === половинный_документ && содержит (предпочитаемый_док, b)) {
				возврат 1;
			}

			// Поддерживать оригинальный заказ
			вернуть sortInput?
				(indexOf (sortInput, a) - indexOf (sortInput, b)):
				0;
		}

		вернуться сравнить & 4? -1: 1;
	}:
	функция (а, б) {
		// Выходим раньше, если узлы идентичны
		if (a === b) {
			hasDuplicate = true;
			вернуть 0;
		}

		вар кур,
			я = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [a],
			bp = [b];

		// Без родительских узлов либо документы, либо отключены
		if (! aup ||! bup) {
			вернуть документ ===? -1:
				б === документ? 1:
				а? -1:
				бэп? 1:
				sortInput?
				(indexOf (sortInput, a) - indexOf (sortInput, b)):
				0;

		// Если узлы являются братьями и сестрами, мы можем сделать быструю проверку
		} else if (aup === bup) {
			вернуть siblingCheck (a, b);
		}

		// В противном случае нам нужны полные списки их предков для сравнения
		cur = a;
		while ((cur = cur.parentNode)) {
			ap.unshift (cur);
		}
		cur = b;
		while ((cur = cur.parentNode)) {
			bp.unshift (cur);
		}

		// Идем по дереву в поисках расхождений
		while (ap [i] === bp [i]) {
			я ++;
		}

		вернуть я?
			// Выполнить проверку родного брата, если у узлов есть общий предок
			siblingCheck (ap [i], bp [i]):

			// В противном случае узлы в нашем документе сортируются первыми
			ap [i] === предпочитаемый документ? -1:
			bp [i] === предпочитаемый документ? 1:
			0;
	};

	возвратный документ;
};

Sizzle.matches = function (expr, elements) {
	вернуть Sizzle (expr, null, null, elements);
};

Sizzle.matchesSelector = function (elem, expr) {
	// Устанавливаем переменные документа при необходимости
	if ((elem.ownerDocument || elem)! == документ) {
		setDocument (elem);
	}

	if (support.matchesSelector && documentIsHTML &&
		! nonnativeSelectorCache [expr + ""] &&
		(! rbuggyMatches ||! rbuggyMatches.test (expr)) &&
		(! rbuggyQSA ||! rbuggyQSA.test (expr))) {

		пытаться {
			var ret = match.call (elem, expr);

			// MatchSelector IE 9 возвращает false на отключенных узлах
			if (ret || support.disconnectedMatch ||
					// Также считается, что отключенные узлы находятся в документе
					// фрагмент в IE 9
					elem.document && elem.document.nodeType! == 11) {
				вернуться в отставку;
			}
		} catch (e) {
			nonnativeSelectorCache (expr, true);
		}
	}

	вернуть Sizzle (expr, document, null, [elem]) .length> 0;
};

Sizzle.contains = function (context, elem) {
	// Устанавливаем переменные документа при необходимости
	if ((context.ownerDocument || context)! == документ) {
		setDocument (context);
	}
	return содержит (context, elem);
};

Sizzle.attr = функция (элемент, имя) {
	// Устанавливаем переменные документа при необходимости
	if ((elem.ownerDocument || elem)! == документ) {
		setDocument (elem);
	}

	var fn = Expr.attrHandle [name.toLowerCase ()],
		// Не обманывайте себя свойствами Object.prototype (jQuery # 13807)
		val = fn && hasOwn.call (Expr.attrHandle, name.toLowerCase ())?
			fn (элемент, имя,! documentIsHTML):
			не определено;

	вернуть val! == undefined?
		val:
		support.attributes || ! documentIsHTML?
			elem.getAttribute (name):
			(val = elem.getAttributeNode (name)) && val.specified?
				val.value:
				ноль;
};

Sizzle.escape = function (sel) {
	return (sel + "") .replace (rcssescape, fcssescape);
};

Sizzle.error = function (msg) {
	throw new Error ("Синтаксическая ошибка, нераспознанное выражение:" + msg);
};

/ **
 * Сортировка документов и удаление дубликатов
 * @param {ArrayLike} результаты
 * /
Sizzle.uniqueSort = function (results) {
	вар элем,
		дубликаты = [],
		j = 0,
		я = 0;

	// Если мы * не знаем *, мы можем обнаружить дубликаты, предположить их наличие
	hasDuplicate =! support.detectDuplicates;
	sortInput =! support.sortStable && results.slice (0);
	results.sort (sortOrder);

	if (hasDuplicate) {
		while ((elem = results [i ++])) {
			if (elem === results [i]) {
				j = duplicates.push (i);
			}
		}
		while (j--) {
			results.splice (дубликаты [j], 1);
		}
	}

	// Очистить ввод после сортировки для освобождения объектов
	// см. Https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	возвращать результаты;
};

/ **
 * Утилита для извлечения текстового значения из массива DOM-узлов.
 * @param {Array | Element} элемент
 * /
getText = Sizzle.getText = function (elem) {
	Var узел,
		ret = "",
		я = 0,
		nodeType = elem.nodeType;

	if (! nodeType) {
		// Если нет nodeType, ожидается, что это будет массив
		while ((node ​​= elem [i ++])) {
			// Не пересекаем узлы комментариев
			ret + = getText (узел);
		}
	} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
		// Используем textContent для элементов
		// удалено использование innerText для согласованности новых строк (jQuery # 11153)
		if (typeof elem.textContent === "string") {
			return elem.textContent;
		} еще {
			// Пройдите через его детей
			for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				ret + = getText (elem);
			}
		}
	} else if (nodeType === 3 || nodeType === 4) {
		return elem.nodeValue;
	}
	// Не включать комментарии или узлы инструкций по обработке

	вернуться в отставку;
};

Expr = Sizzle.selectors = {

	// Может настраиваться пользователем
	длительность кэша: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	находить: {},

	родственник: {
		">": {dir: "parentNode", first: true},
		"": {dir: "parentNode"},
		"+": {dir: "previousSibling", first: true},
		"~": {dir: "previousSibling"}
	},

	preFilter: {
		"ATTR": функция (соответствие) {
			match [1] = match [1] .replace (runescape, funescape);

			// Переместить данное значение в match [3], в кавычках или без кавычек
			match [3] = (match [3] || match [4] || match [5] || "") .replace (runescape, funescape);

			if (match [2] === "~ =") {
				match [3] = "" + match [3] + "";
			}

			возвращение match.slice (0, 4);
		},

		"РЕБЕНОК": функция (соответствие) {
			/ * совпадения с matchExpr ["CHILD"]
				1 тип (только | nth | ...)
				2 что (ребенок | от типа)
				3 аргумента (четное | нечетное | \ d * | \ d * n ([+ -] \ d +)? | ...)
				4 xn-компонента аргумента xn + y ([+ -]? \ D * n |)
				5 признак xn-компонента
				6 х xn-компонент
				7 знак y-компонента
				8 лет у-компонента
			* /
			match [1] = match [1] .toLowerCase ();

			if (match [1] .slice (0, 3) === "nth") {
				// nth- * требует аргумента
				if (! match [3]) {
					Sizzle.error (match [0]);
				}

				// числовые параметры x и y для Expr.filter.CHILD
				// помните, что false / true приведен соответственно к 0/1
				match [4] = + (match [4]? match [5] + (match [6] || 1): 2 * (match [3] === "even" || match [3] === " странный" ) );
				match [5] = + ((match [7] + match [8]) || match [3] === "odd");

			// другие типы запрещают аргументы
			} else if (match [3]) {
				Sizzle.error (match [0]);
			}

			ответный матч;
		},

		"PSEUDO": function (match) {
			избыток вар,
				unquoted =! match [6] && match [2];

			if (matchExpr ["CHILD"]. test (match [0])) {
				вернуть ноль;
			}

			// Принимать кавычки как есть
			if (match [3]) {
				match [2] = match [4] || матч [5] || "";

			// Убираем лишние символы из аргументов без кавычек
			} else if (без кавычек && rpseudo.test (без кавычек) &&
				// Получаем лишнее из токенизации (рекурсивно)
				(избыток = tokenize (без кавычек, правда)) &&
				// переход к следующей закрывающей скобке
				(избыток = unquoted.indexOf (")", unquoted.length - избыток) - unquoted.length)) {

				// избыток отрицательный показатель
				match [0] = match [0] .slice (0, превышение);
				match [2] = unquoted.slice (0, превышение);
			}

			// Возвращаем только те снимки, которые нужны методу псевдофильтра (тип и аргумент)
			возвращение match.slice (0, 3);
		}
	},

	фильтр: {

		"TAG": функция (nodeNameSelector) {
			var nodeName = nodeNameSelector.replace (runescape, funescape) .toLowerCase ();
			return nodeNameSelector === "*"?
				function () {return true; }:
				function (elem) {
					return elem.nodeName && elem.nodeName.toLowerCase () === nodeName;
				};
		},

		"КЛАСС": функция (className) {
			var pattern = classCache [className + ""];

			возврат картины ||
				(pattern = new RegExp ("(^ |" + пробел + ")" + className + "(" + пробел + "| $)")) &&
				classCache (className, function (elem) {
					return pattern.test (typeof elem.className === "string" && elem.className || typeof elem.getAttribute! == "undefined" && elem.getAttribute ("class") || "");
				});
		},

		«ATTR»: функция (имя, оператор, проверка) {
			функция возврата (элемент) {
				var result = Sizzle.attr (элемент, имя);

				if (result == null) {
					оператор возврата === "! =";
				}
				if (! operator) {
					вернуть истину;
				}

				результат + = "";

				оператор возврата === "="? результат === проверить:
					оператор === "! ="? результат! == проверить:
					оператор === "^ ="? check && result.indexOf (check) === 0:
					оператор === "* ="? check && result.indexOf (check)> -1:
					оператор === "$ ="? check && result.slice (-check.length) === check:
					оператор === "~ ="? ("" + result.replace (rwhitespace, "") + "") .indexOf (check)> -1:
					оператор === "| ="? результат === проверить || result.slice (0, check.length + 1) === check + "-":
					ложный;
			};
		},

		"РЕБЕНОК": функция (тип, что, аргумент, первый, последний) {
			var simple = type.slice (0, 3)! == "nth",
				forward = type.slice (-4)! == "last",
				ofType = what === "of-type";

			вернуть сначала === 1 && last === 0?

				// Ярлык для: nth - * (n)
				function (elem) {
					return !! elem.parentNode;
				}:

				function (elem, context, xml) {
					кеш var, uniqueCache, outerCache, node, nodeIndex, start,
						dir = просто! == вперед? "nextSibling": "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase (),
						useCache =! xml &&! ofType,
						diff = false;

					if (parent) {

						//: (first | last | only) - (child | of-type)
						если (просто) {
							while (dir) {
								узел = элемент;
								while ((node ​​= node [dir])) {
									if (ofType?
										node.nodeName.toLowerCase () === name:
										node.nodeType === 1) {

										вернуть ложь;
									}
								}
								// Обратное направление для: only- * (если мы еще этого не сделали)
								start = dir = type === "only" &&! start && "nextSibling";
							}
							вернуть истину;
						}

						начало = [вперед? parent.firstChild: parent.lastChild];

						// non-xml: nth-child (...) хранит данные кэша в `parent`
						if (forward && useCache) {

							// Поиск `elem` из ранее кэшированного индекса

							// ... в gzip-стиле
							узел = родительский;
							externalCache = узел [раскрыть] || (узел [раскрыть] = {});

							// Поддержка: только IE <9
							// Защита от клонированных прав собственности (jQuery gh-1709)
							uniqueCache = outerCache [node.uniqueID] ||
								(outerCache [node.uniqueID] = {});

							cache = uniqueCache [тип] || [];
							nodeIndex = cache [0] === dirruns && cache [1];
							diff = nodeIndex && cache [2];
							node = nodeIndex && parent.childNodes [nodeIndex];

							while ((node ​​= ++ nodeIndex && node && node [dir] ||

								// Откат к поиску `elem` с самого начала
								(diff = nodeIndex = 0) || start.pop ())) {

								// Когда найдено, кешируем индексы на `parent` и разбиваем
								if (node.nodeType === 1 && ++ diff && node === elem) {
									uniqueCache [type] = [dirruns, nodeIndex, diff];
									перерыв;
								}
							}

						} еще {
							// Использовать ранее кэшированный индекс элемента, если он доступен
							if (useCache) {
								// ... в gzip-стиле
								узел = элемент;
								externalCache = узел [раскрыть] || (узел [раскрыть] = {});

								// Поддержка: только IE <9
								// Защита от клонированных прав собственности (jQuery gh-1709)
								uniqueCache = outerCache [node.uniqueID] ||
									(outerCache [node.uniqueID] = {});

								cache = uniqueCache [тип] || [];
								nodeIndex = cache [0] === dirruns && cache [1];
								diff = nodeIndex;
							}

							// xml: nth-child (...)
							// или: nth-last-child (...) или: nth (-last)? - типа (...)
							if (diff === false) {
								// Используйте тот же цикл, что и выше, чтобы искать `elem` с самого начала
								while ((node ​​= ++ nodeIndex && node && node [dir] ||
									(diff = nodeIndex = 0) || start.pop ())) {

									if ((ofType?
										node.nodeName.toLowerCase () === name:
										node.nodeType === 1) &&
										++ diff) {

										// Кэшируем индекс каждого обнаруженного элемента
										if (useCache) {
											externalCache = узел [раскрыть] || (узел [раскрыть] = {});

											// Поддержка: только IE <9
											// Защита от клонированных прав собственности (jQuery gh-1709)
											uniqueCache = outerCache [node.uniqueID] ||
												(outerCache [node.uniqueID] = {});

											uniqueCache [type] = [dirruns, diff];
										}

										if (node ​​=== elem) {
											перерыв;
										}
									}
								}
							}
						}

						// Включаем смещение, затем проверяем размер цикла
						diff - = последний;
						вернуть diff === сначала || (diff% first === 0 && diff / first> = 0);
					}
				};
		},

		"PSEUDO": функция (псевдо, аргумент) {
			// имена псевдоклассов нечувствительны к регистру
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Расставляем приоритеты с учетом регистра, если пользовательские псевдо добавляются заглавными буквами
			// Помните, что setFilters наследуется от псевдо
			вар аргс,
				fn = Expr.pseudos [псевдо] || Expr.setFilters [pseudo.toLowerCase ()] ||
					Sizzle.error ("неподдерживаемое псевдо:" + псевдо);

			// Пользователь может использовать createPseudo, чтобы указать, что
			// нужны аргументы для создания функции фильтра
			// так же, как Sizzle
			if (fn [expando]) {
				вернуть fn (аргумент);
			}

			// Но поддерживаем поддержку старых подписей
			if (fn.length> 1) {
				args = [псевдо, псевдо, "", аргумент];
				вернуть Expr.setFilters.hasOwnProperty (pseudo.toLowerCase ())?
					markFunction (function (seed, match) {
						var idx,
							matched = fn (семя, аргумент),
							я = длина соответствует;
						в то время как я-- ) {
							idx = indexOf (seed, matched [i]);
							seed [idx] =! (соответствует [idx] = соответствует [i]);
						}
					}):
					function (elem) {
						вернуть fn (elem, 0, args);
					};
			}

			возврат фн;
		}
	},

	псевдо: {
		// Потенциально сложные псевдо
		«not»: markFunction (function (selector) {
			// Обрезка селектора, переданного для компиляции
			// чтобы избежать обработки ведущих и конечных
			// пробелы как комбинаторы
			var input = [],
				результаты = [],
				matcher = compile (selector.replace (rtrim, "$ 1"));

			вернуть совпадение [раскрыть]?
				markFunction (function (seed, matchs, context, xml) {
					вар элем,
						unmatched = matcher (seed, null, xml, []),
						я = длина семян;

					// Сопоставить элементы, не сопоставленные с `matcher`
					в то время как я-- ) {
						if ((elem = unmatched [i])) {
							seed [i] =! (соответствует [i] = elem);
						}
					}
				}):
				function (elem, context, xml) {
					вход [0] = элемент;
					matcher (input, null, xml, results);
					// Не держите элемент (выпуск № 299)
					input [0] = null;
					return! results.pop ();
				};
		}),

		"has": markFunction (function (selector) {
			функция возврата (элемент) {
				вернуть Sizzle (селектор, элемент). длина> 0;
			};
		}),

		«содержит»: markFunction (function (text) {
			text = text.replace (runescape, funescape);
			функция возврата (элемент) {
				return (elem.textContent || getText (elem)) .indexOf (text)> -1;
			};
		}),

		// "Представлен ли элемент селектором: lang ()
		// основан исключительно на языковом значении элемента
		// равны идентификатору C,
		// или начиная с идентификатора C, за которым сразу следует «-».
		// Сопоставление C со значением языка элемента выполняется без учета регистра.
		// Идентификатор C не обязательно должен быть допустимым именем языка. "
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction (function (lang) {
			// значение lang должно быть допустимым идентификатором
			if (! ridentifier.test (lang || "")) {
				Sizzle.error ("неподдерживаемый lang:" + lang);
			}
			lang = lang.replace (runescape, funescape) .toLowerCase ();
			функция возврата (элемент) {
				var elemLang;
				делать {
					если ((elemLang = documentIsHTML?
						elem.lang:
						elem.getAttribute ("xml: lang") || elem.getAttribute ("lang"))) {

						elemLang = elemLang.toLowerCase ();
						вернуть elemLang === lang || elemLang.indexOf (lang + "-") === 0;
					}
				} while ((elem = elem.parentNode) && elem.nodeType === 1);
				вернуть ложь;
			};
		}),

		// Разнообразный
		"target": function (elem) {
			var hash = window.location && window.location.hash;
			вернуть хэш && hash.slice (1) === elem.id;
		},

		"корень": функция (элемент) {
			return elem === docElem;
		},

		"focus": function (elem) {
			return elem === document.activeElement && (! document.hasFocus || document.hasFocus ()) && !! (elem.type || elem.href || ~ elem.tabIndex);
		},

		// логические свойства
		"enabled": createDisabledPseudo (false),
		«отключен»: createDisabledPseudo (true),

		"флажок": функция (элемент) {
			// В CSS3: флажок должен возвращать как проверенные, так и выбранные элементы
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase ();
			return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected);
		},

		"selected": функция (элемент) {
			// Доступ к этому свойству делает выбранным по умолчанию
			// параметры в Safari работают правильно
			if (elem.parentNode) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Содержание
		"empty": функция (элемент) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			//: пусто отменяется элементом (1) или узлами контента (текст: 3; cdata: 4; объект ref: 5),
			// но не другими (комментарий: 8; инструкция обработки: 7; и т. д.)
			// nodeType <6 работает, потому что атрибуты (2) не отображаются как дочерние
			for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				if (elem.nodeType <6) {
					вернуть ложь;
				}
			}
			вернуть истину;
		},

		"parent": function (elem) {
			return! Expr.pseudos ["empty"] (элемент);
		},

		// Элемент / типы ввода
		"header": function (elem) {
			return rheader.test (elem.nodeName);
		},

		"вход": функция (элемент) {
			вернуть rinputs.test (elem.nodeName);
		},

		"кнопка": функция (элемент) {
			var name = elem.nodeName.toLowerCase ();
			вернуть имя === "input" && elem.type === "button" || имя === "кнопка";
		},

		"текст": функция (элемент) {
			var attr;
			return elem.nodeName.toLowerCase () === "input" &&
				elem.type === "text" &&

				// Поддержка: IE <8
				// Новые значения атрибута HTML5 (например, «поиск») появляются с elem.type === «текст»
				((attr = elem.getAttribute ("type")) == null || attr.toLowerCase () === "text");
		},

		// Позиция в коллекции
		"first": createPositionalPseudo (function () {
			возврат [0];
		}),

		"last": createPositionalPseudo (function (matchIndexes, length) {
			возврат [длина - 1];
		}),

		«eq»: createPositionalPseudo (function (matchIndexes, length, аргумент) {
			вернуть [аргумент <0? аргумент + длина: аргумент];
		}),

		"even": createPositionalPseudo (function (matchIndexes, length) {
			var i = 0;
			for (; i <длина; i + = 2) {
				matchIndexes.push (i);
			}
			вернуть matchIndexes;
		}),

		"odd": createPositionalPseudo (function (matchIndexes, length) {
			var i = 1;
			for (; i <длина; i + = 2) {
				matchIndexes.push (i);
			}
			вернуть matchIndexes;
		}),

		"lt": createPositionalPseudo (function (matchIndexes, length, аргумент) {
			var i = аргумент <0?
				аргумент + длина:
				аргумент> длина?
					длина:
					аргумент;
			для (; --i> = 0;) {
				matchIndexes.push (i);
			}
			вернуть matchIndexes;
		}),

		"gt": createPositionalPseudo (function (matchIndexes, length, аргумент) {
			var i = аргумент <0? аргумент + длина: аргумент;
			для (; ++ i <длина;) {
				matchIndexes.push (i);
			}
			вернуть matchIndexes;
		})
	}
};

Expr.pseudos ["nth"] = Expr.pseudos ["eq"];

// Добавить кнопку / тип ввода псевдо
for (я в {radio: true, флажок: true, файл: true, пароль: true, изображение: true}) {
	Expr.pseudos [i] = createInputPseudo (i);
}
for (я в {submit: true, reset: true}) {
	Expr.pseudos [i] = createButtonPseudo (i);
}

// Простой API для создания новых setFilters
function setFilters () {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters ();

tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	соответствие, соответствие, токены, тип,
		soFar, группы, префильтры,
		cached = tokenCache [selector + ""];

	if (кэшированный) {
		вернуть parseOnly? 0: cached.slice (0);
	}

	soFar = селектор;
	groups = [];
	preFilters = Expr.preFilter;

	while (soFar) {

		// Запятая и первый запуск
		if (! matched || (match = rcomma.exec (soFar))) {
			if (match) {
				// Не используйте концевые запятые как действительные
				soFar = soFar.slice (match [0] .length) || до сих пор;
			}
			groups.push ((токены = []));
		}

		совпало = ложь;

		// Комбинаторы
		if ((match = rcombinators.exec (soFar))) {
			matched = match.shift ();
			tokens.push ({
				значение: соответствует,
				// Отбрасываем потомки комбинаторов в пространство
				тип: match [0] .replace (rtrim, "")
			});
			soFar = soFar.slice (matched.length);
		}

		// Фильтры
		для (введите Expr.filter) {
			if ((match = matchExpr [тип] .exec (soFar)) && (! preFilters [тип] ||
				(match = preFilters [type] (match)))) {
				matched = match.shift ();
				tokens.push ({
					значение: соответствует,
					тип: тип,
					совпадения: совпадение
				});
				soFar = soFar.slice (matched.length);
			}
		}

		если (! соответствует) {
			перерыв;
		}
	}

	// Возвращаем длину недопустимого превышения
	// если мы просто разбираем
	// Иначе выкидываем ошибку или возвращаем токены
	вернуть parseOnly?
		soFar.length:
		до сих пор ?
			Sizzle.error (селектор):
			// Кешируем токены
			tokenCache (селектор, группы) .slice (0);
};

function toSelector (tokens) {
	var i = 0,
		len = длина токена,
		селектор = "";
	for (; i <len; i ++) {
		селектор + = токены [i] .value;
	}
	возвратный селектор;
}

function addCombinator (matcher, combinator, base) {
	var dir = combinator.dir,
		skip = combinator.next,
		ключ = пропустить || реж,
		checkNonElements = base && key === "parentNode",
		doneName = done ++;

	вернуть комбинатор.первый?
		// Проверка по ближайшему предку / предыдущему элементу
		function (elem, context, xml) {
			while ((elem = elem [dir])) {
				if (elem.nodeType === 1 || checkNonElements) {
					возвращаемое совпадение (elem, context, xml);
				}
			}
			вернуть ложь;
		}:

		// Проверка по всем предкам / предшествующим элементам
		function (elem, context, xml) {
			var oldCache, uniqueCache, outerCache,
				newCache = [dirruns, doneName];

			// Мы не можем устанавливать произвольные данные на узлах XML, поэтому они не получают выгоды от кэширования комбинатора
			if (xml) {
				while ((elem = elem [dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						if (matcher (elem, context, xml)) {
							вернуть истину;
						}
					}
				}
			} еще {
				while ((elem = elem [dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						externalCache = elem [expando] || (elem [expando] = {});

						// Поддержка: только IE <9
						// Защита от клонированных прав собственности (jQuery gh-1709)
						uniqueCache = outerCache [elem.uniqueID] || (outerCache [elem.uniqueID] = {});

						if (skip && skip === elem.nodeName.toLowerCase ()) {
							elem = elem [dir] || эль;
						} else if ((oldCache = uniqueCache [key]) &&
							oldCache [0] === dirruns && oldCache [1] === doneName) {

							// Назначаем newCache, чтобы результаты возвращались к предыдущим элементам
							return (newCache [2] = oldCache [2]);
						} еще {
							// Повторно используем newcache, чтобы результаты возвращались к предыдущим элементам
							uniqueCache [ключ] = newCache;

							// Соответствие означает, что мы закончили; неудача означает, что мы должны продолжать проверять
							if ((newCache [2] = matcher (elem, context, xml))) {
								вернуть истину;
							}
						}
					}
				}
			}
			вернуть ложь;
		};
}

function elementMatcher (matchers) {
	вернуть matchers.length> 1?
		function (elem, context, xml) {
			var i = matchers.length;
			в то время как я-- ) {
				if (! matchers [i] (elem, context, xml)) {
					вернуть ложь;
				}
			}
			вернуть истину;
		}:
		matchers [0];
}

function multipContexts (селектор, контексты, результаты) {
	var i = 0,
		len = contexts.length;
	for (; i <len; i ++) {
		Sizzle (селектор, контексты [i], результаты);
	}
	возвращать результаты;
}

функция конденсировать (не соответствует, карта, фильтр, контекст, xml) {
	вар элем,
		newUnmatched = [],
		я = 0,
		len = unmatched.length,
		mapped = map! = null;

	for (; i <len; i ++) {
		if ((elem = unmatched [i])) {
			if (! filter || filter (elem, context, xml)) {
				newUnmatched.push (elem);
				если (отображается) {
					map.push (i);
				}
			}
		}
	}

	вернуть newUnmatched;
}

function setMatcher (preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	if (postFilter &&! postFilter [expando]) {
		postFilter = setMatcher (postFilter);
	}
	if (postFinder &&! postFinder [expando]) {
		postFinder = setMatcher (postFinder, postSelector);
	}
	return markFunction (function (seed, results, context, xml) {
		var temp, я, элемент,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Получить начальные элементы из семени или контекста
			elems = семя || множественные константы (селектор || "*", context.nodeType? [context]: context, []),

			// Предварительный фильтр для получения входных данных, сохраняющих карту для синхронизации начальных результатов
			matcherIn = preFilter && (селектор ||! селектор)?
				конденсировать (elems, preMap, preFilter, context, xml):
				elems,

			matcherOut = matcher?
				// Если у нас есть postFinder, или отфильтрованное начальное число, или не отобранное postFilter, или уже существующие результаты,
				postFinder || (seed? preFilter: preexisting || postFilter)?

					// ... необходима промежуточная обработка
					[]:

					// ... иначе использовать результаты напрямую
					Результаты :
				matcherIn;

		// Находим первичные совпадения
		if (matcher) {
			matcher (matcherIn, matcherOut, context, xml);
		}

		// Применить postFilter
		if (postFilter) {
			t emp = конденсировать (matcherOut, postMap);
			postFilter (temp, [], context, xml);

			// Отстранить несоответствующие элементы, переместив их обратно в matcherIn
			я = температура. длина;
			в то время как я-- ) {
				if ((elem = temp [i])) {
					matcherOut [postMap [i]] =! (matcherIn [postMap [i]] = elem);
				}
			}
		}

		if (seed) {
			if (postFinder || preFilter) {
				if (postFinder) {
					// Получаем последний matcherOut, сжимая это промежуточное звено в контексты postFinder
					temp = [];
					я = matcherOut.length;
					в то время как я-- ) {
						if ((elem = matcherOut [i])) {
							// Восстанавливаем matcherIn, так как elem еще не финальный матч
							temp.push ((matcherIn [i] = elem));
						}
					}
					postFinder (null, (matcherOut = []), temp, xml);
				}

				// Перемещаем соответствующие элементы из начального числа в результаты, чтобы синхронизировать их
				я = matcherOut.length;
				в то время как я-- ) {
					if ((elem = matcherOut [i]) &&
						(temp = postFinder? indexOf (seed, elem): preMap [i])> -1) {

						seed [temp] =! (results [temp] = elem);
					}
				}
			}

		// Добавить элементы к результатам через postFinder, если определено
		} еще {
			matcherOut = конденсат (
				matcherOut === результаты?
					matcherOut.splice (существующий ранее, matcherOut.length):
					matcherOut
			);
			if (postFinder) {
				postFinder (null, results, matcherOut, xml);
			} еще {
				push.apply (результаты, matcherOut);
			}
		}
	});
}

function matcherFromTokens (tokens) {
	var checkContext, matcher, j,
		len = длина токена,
		leadRelative = Expr.relative [tokens [0] .type],
		implicitRelative = ведущаяRelative || Expr.relative [""],
		я = ведущий родственник? 1: 0,

		// Основополагающий механизм сопоставления обеспечивает доступность элементов из контекста верхнего уровня
		matchContext = addCombinator (function (elem) {
			return elem === checkContext;
		}, implicitRelative, true),
		matchAnyContext = addCombinator (function (elem) {
			return indexOf (checkContext, elem)> -1;
		}, implicitRelative, true),
		matchers = [function (elem, context, xml) {
			var ret = (! leadRelative && (xml || context! == outermostContext)) || (
				(checkContext = context) .nodeType?
					matchContext (elem, context, xml):
					matchAnyContext (elem, context, xml));
			// Избегаем зависания на элементе (выпуск № 299)
			checkContext = null;
			вернуться в отставку;
		}];

	for (; i <len; i ++) {
		if ((matcher = Expr.relative [tokens [i] .type])) {
			matchers = [addCombinator (elementMatcher (matchers), matcher)];
		} еще {
			matcher = Expr.filter [tokens [i] .type] .apply (null, tokens [i] .matches);

			// Возвращаем специальное значение, увидев позиционное совпадение
			if (matcher [expando]) {
				// Найти следующий относительный оператор (если есть) для правильной обработки
				j = ++ i;
				для (; j <len; j ++) {
					if (Expr.relative [tokens [j] .type]) {
						перерыв;
					}
				}
				возврат setMatcher (
					i> 1 && elementMatcher (matchers),
					i> 1 && toSelector (
						// Если предыдущий токен был наследующим комбинатором, вставляем неявный any-элемент `*`
						tokens.slice (0, i - 1) .concat ({значение: токены [i - 2] .type === ""? "*": ""})
					) .replace (rtrim, "1 $"),
					согласовани,
					i <j && matcherFromTokens (tokens.slice (i, j)),
					j <len && matcherFromTokens ((tokens = tokens.slice (j))),
					j <len && toSelector (токены)
				);
			}
			matchers.push (matcher);
		}
	}

	return elementMatcher (matchers);
}

function matcherFromGroupMatchers (elementMatchers, setMatchers) {
	var bySet = setMatchers.length> 0,
		byElement = elementMatchers.length> 0,
		superMatcher = function (seed, context, xml, results, external) {
			var elem, j, matcher,
				matchedCount = 0,
				я = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// У нас всегда должны быть либо начальные элементы, либо внешний контекст
				elems = семя || byElement && Expr.find ["TAG"] ("*", крайний),
				// Используем целочисленные значения dirruns, если это самое внешнее совпадение
				dirrunsUnique = (dirruns + = contextBackup == null? 1: Math.random () || 0.1),
				len = elems.length;

			if (самый внешний) {
				outermostContext = context === документ || контекст || внешний;
			}

			// Добавить элементы, передающие elementMatchers непосредственно к результатам
			// Поддержка: IE <9, Safari
			// Допустим свойства NodeList (IE: "length"; Safari: <number>), соответствующие элементы по id
			for (; i! == len && (elem = elems [i])! = null; i ++) {
				if (byElement && elem) {
					j = 0;
					if (! context && elem.ownerDocument! == документ) {
						setDocument (elem);
						xml =! documentIsHTML;
					}
					while ((matcher = elementMatchers [j ++])) {
						if (matcher (elem, context || document, xml)) {
							results.push (elem);
							перерыв;
						}
					}
					if (самый внешний) {
						dirruns = dirrunsUnique;
					}
				}

				// Отслеживать несоответствующие элементы для установленных фильтров
				if (bySet) {
					// Они пройдут все возможные совпадения
					if ((elem =! matcher && elem)) {
						matchedCount--;
					}

					// Удлиняем массив для каждого элемента, совпал или нет
					if (seed) {
						unmatched.push (элемент);
					}
				}
			}

			// `i` теперь подсчитывает количество посещенных выше элементов и добавляет его в` matchedCount`
			// делает последний неотрицательным.
			matchedCount + = i;

			// Применяем набор фильтров к несогласованным элементам
			// ПРИМЕЧАНИЕ: это можно пропустить, если нет несопоставленных элементов (т. Е. `MatchedCount`
			// равно `i`), если только мы не посетили _any_ элементы в вышеуказанном цикле, потому что у нас есть
			// нет элементов соответствия и нет семян.
			// Увеличение первоначальной строки "0" `i` позволяет` i` оставаться строкой только в этом
			// регистр, который приведет к «00» `matchedCount`, который отличается от` i`, но также
			// численно ноль.
			if (bySet && i! == matchedCount) {
				j = 0;
				while ((matcher = setMatchers [j ++])) {
					matcher (unmatched, setMatched, context, xml);
				}

				if (seed) {
					// Реинтеграция совпадений элементов для устранения необходимости сортировки
					if (matchedCount> 0) {
						в то время как я-- ) {
							if (! (unmatched [i] || setMatched [i])) {
								setMatched [i] = pop.call (результаты);
							}
						}
					}

					// Сбрасываем значения индексного заполнителя, чтобы получить только фактические соответствия
					setMatched = конденсат (setMatched);
				}

				// Добавить совпадения к результатам
				push.apply (результаты, setMatched);

				// совпадения множества без косточек после нескольких успешных совпадений предусматривают сортировку
				if (external &&! seed && setMatched.length> 0 &&
					(matchedCount + setMatchers.length)> 1) {

					Sizzle.uniqueSort (результаты);
				}
			}

			// Переопределяем манипулирование глобалами вложенными сопоставителями
			if (самый внешний) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			возвращение не имеет себе равных;
		};

	вернуть bySet?
		markFunction (superMatcher):
		superMatcher;
}

compile = Sizzle.compile = функция (селектор, совпадение / * Только для внутреннего использования * /) {
	я
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache [selector + ""];

	if (! cached) {
		// Генерируем функцию из рекурсивных функций, которую можно использовать для проверки каждого элемента
		if (! match) {
			match = tokenize (селектор);
		}
		я = длина матча;
		в то время как я-- ) {
			cached = matcherFromTokens (match [i]);
			if (cached [expando]) {
				setMatchers.push (кэшируется);
			} еще {
				elementMatchers.push (кэшированный);
			}
		}

		// Кешируем скомпилированную функцию
		cached = compilerCache (selector, matcherFromGroupMatchers (elementMatchers, setMatchers));

		// Сохранить селектор и токенизацию
		cached.selector = селектор;
	}
	возврат кешируется;
};

/ **
 * Функция выбора низкого уровня, которая работает с скомпилированным Sizzle
 * функции выбора
 * @param {String | Function} селектор Селектор или предварительно скомпилированный
 * функция выбора, созданная с помощью Sizzle.compile
 * @param {Element} context
 * @param {Array} [результаты]
 * @param {Array} [seed] Набор элементов для сопоставления
 * /
select = Sizzle.select = function (селектор, контекст, результаты, начальное число) {
	var i, tokens, token, type, find,
		скомпилировано = typeof селектор === "функция" && селектор,
		match =! seed && tokenize ((selector = compiled.selector || selector));

	результаты = результаты || [];

	// Попытка свести к минимуму операции, если в списке только один селектор и нет начального числа
	// (последний из которых гарантирует нам контекст)
	if (match.length === 1) {

		// Уменьшаем контекст, если главный составной селектор является идентификатором
		жетоны = совпадение [0] = совпадение [0] .slice (0);
		if (tokens.length> 2 && (token = tokens [0]). type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative [tokens [1] .type]) {

			context = (Expr.find ["ID"] (token.matches [0] .replace (runescape, funescape), context) || []) [0];
			if (! context) {
				возвращать результаты;

			// Предварительно скомпилированные сопоставители по-прежнему проверяют происхождение, так что повышайте уровень
			} else if (скомпилировано) {
				context = context.parentNode;
			}

			selector = selector.slice (tokens.shift (). value.length);
		}

		// Извлечение начального набора для сопоставления справа налево
		i = matchExpr ["needsContext"]. test (селектор)? 0: длина токена;
		в то время как я-- ) {
			токен = токены [i];

			// Прервать, если мы нажмем комбинатор
			if (Expr.relative [(type = token.type)]) {
				перерыв;
			}
			if ((find = Expr.find [type])) {
				// Поиск, расширение контекста для ведущих братских комбинаторов
				если ((семя = найти (
					token.matches [0] .replace (runescape, funescape),
					rsibling.test (tokens [0] .type) && testContext (context.parentNode) || контекст
				))) {

					// Если семя пусто или токенов не осталось, мы можем вернуться рано
					tokens.splice (i, 1);
					selector = seed.length && toSelector (tokens);
					if (! selector) {
						push.apply (результаты, семена);
						возвращать результаты;
					}

					перерыв;
				}
			}
		}
	}

	// Компилируем и выполняем функцию фильтрации, если она не предоставлена
	// Предоставляем `match`, чтобы избежать повторной компоновки, если мы изменили селектор выше
	(скомпилировано || compile (селектор, совпадение)) (
		семена,
		контекст,
		! DocumentIsHTML,
		Результаты,
		! контекст || rsibling.test (селектор) && testContext (context.parentNode) || контекст
	);
	возвращать результаты;
};

// Одноразовые назначения

// Сортировка стабильности
support.sortStable = expando.split (""). sort (sortOrder) .join ("") === expando;

// Поддержка: Chrome 14-35 +
// Всегда предполагаем дубликаты, если они не переданы в функцию сравнения
support.detectDuplicates = !! hasDuplicate;

// Инициализация с документом по умолчанию
setDocument ();

// Поддержка: Webkit <537.32 - Safari 6.0.3 / Chrome 25 (исправлено в Chrome 27)
// Отдельные узлы смешанно следуют * друг за другом *
support.sortDetached = assert (function (el) {
	// Должен вернуть 1, но возвращает 4 (следующий)
	return el.compareDocumentPosition (document.createElement ("fieldset")) & 1;
});

// Поддержка: IE <8
// Запретить атрибут / свойство "интерполяция"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if (! assert (function (el) {
	el.innerHTML = "<a href='#'> </a>";
	return el.firstChild.getAttribute ("href") === "#";
})) {
	addHandle («type | href | height | width», функция (elem, name, isXML) {
		if (! isXML) {
			return elem.getAttribute (name, name.toLowerCase () === "type"? 1: 2);
		}
	});
}

// Поддержка: IE <9
// Используем defaultValue вместо getAttribute ("value")
if (! support.attributes ||! assert (function (el) {
	el.innerHTML = "<input />";
	el.firstChild.setAttribute ("value", "");
	return el.firstChild.getAttribute ("value") === "";
})) {
	addHandle ("значение", функция (элемент, имя, isXML) {
		if (! isXML && elem.nodeName.toLowerCase () === "input") {
			return elem.defaultValue;
		}
	});
}

// Поддержка: IE <9
// Используем getAttributeNode для получения логических значений, когда getAttribute лежит
if (! assert (function (el) {
	return el.getAttribute ("disabled") == null;
})) {
	addHandle (логическое значение, функция (elem, name, isXML) {
		вар вал;
		if (! isXML) {
			вернуть элемент [имя] === правда? name.toLowerCase ():
					(val = elem.getAttributeNode (name)) && val.specified?
					val.value:
				ноль;
		}
	});
}

вернуть шипение;

})( окно );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// устарел
jQuery.expr [":"] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function (elem, dir, пока) {
	var matched = [],
		усекать = до! == не определено;

	while ((elem = elem [dir]) && elem.nodeType! == 9) {
		if (elem.nodeType === 1) {
			if (усечь && jQuery (elem) .is (до)) {
				перерыв;
			}
			matched.push (элемент);
		}
	}
	возвращение совпало;
};


var siblings = function (n, elem) {
	var matched = [];

	for (; n; n = n.nextSibling) {
		if (n.nodeType === 1 && n! == elem) {
			matched.push (n);
		}
	}

	возвращение совпало;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName (elem, name) {

  return elem.nodeName && elem.nodeName.toLowerCase () === name.toLowerCase ();

};
var rsingleTag = (/ ^ <([az] [^ \ / \ 0>: \ x20 \ t \ r \ n \ f] *) [\ x20 \ t \ r \ n \ f] * \ /?> ( ?: <\ / \ 1> |) $ / i);



// Реализуем идентичные функции для фильтра, а не
функция winnow (элементы, квалификатор, а не) {
	if (isFunction (квалификатор)) {
		return jQuery.grep (elements, function (elem, i) {
			return !! qualifier.call (elem, i, elem)! == нет;
		});
	}

	// один элемент
	if (qualifier.nodeType) {
		return jQuery.grep (elements, function (elem) {
			return (elem === квалификатор)! == нет;
		});
	}

	// Массивоподобные элементы (jQuery, arguments, Array)
	if (квалификатор typeof! == "строка") {
		return jQuery.grep (elements, function (elem) {
			return (indexOf.call (квалификатор, элемент)> -1)! == нет;
		});
	}

	// Фильтруется напрямую как для простых, так и для сложных селекторов
	return jQuery.filter (квалификатор, элементы, не);
}

jQuery.filter = function (expr, elems, not) {
	var elem = elems [0];

	если не ) {
		expr = ": not (" + expr + ")";
	}

	if (elems.length === 1 && elem.nodeType === 1) {
		вернуть jQuery.find.matchesSelector (elem, expr)? [элемент]: [];
	}

	return jQuery.find.matches (expr, jQuery.grep (elems, function (elem) {
		return elem.nodeType === 1;
	}));
};

jQuery.fn.extend ({
	найти: функция (селектор) {
		вари я, рет,
			len = this.length,
			Я = это;

		if (селектор typeof! == "строка") {
			вернуть this.pushStack (jQuery (селектор) .filter (function () {
				для (i = 0; i <len; i ++) {
					if (jQuery.contains (self [i], this)) {
						вернуть истину;
					}
				}
			}));
		}

		ret = this.pushStack ([]);

		для (i = 0; i <len; i ++) {
			jQuery.find (селектор, self [i], ret);
		}

		вернуть len> 1? jQuery.uniqueSort (ret): ret;
	},
	фильтр: функция (селектор) {
		вернуть this.pushStack (winnow (this, селектор || [], false));
	},
	не: функция (селектор) {
		вернуть this.pushStack (winnow (this, селектор || [], true));
	},
	is: function (селектор) {
		вернись!
			этот,

			// Если это позиционный / относительный селектор, проверяем членство в возвращаемом множестве
			// поэтому $ ("p: first"). is ("p: last") не вернет true для документа с двумя "p".
			селектор типа === "строка" && rneedsContext.test (селектор)?
				JQuery (селектор):
				селектор || [],
			ложный
		) .Length;
	}
});


// Инициализируем объект jQuery


// Центральная ссылка на корень jQuery (документ)
var rootjQuery,

	// Простой способ проверить строки HTML
	// Расставляем приоритеты #id над <tag>, чтобы избежать XSS через location.hash (# 9521)
	// Строгое распознавание HTML (# 11290: должно начинаться с <)
	// Сокращаем простой случай #id для скорости
	rquickExpr = / ^ (?: \ s * (<[\ w \ W] +>) [^>] * | # ([\ w -] +)) $ /,

	init = jQuery.fn.init = function (селектор, контекст, корень) {
		var match, elem;

		// HANDLE: $ (""), $ (null), $ (undefined), $ (false)
		if (! selector) {
			верни это;
		}

		// Метод init () принимает альтернативный rootjQuery
		// поэтому миграция может поддерживать jQuery.sub (gh-2101)
		корень = корень || rootjQuery;

		// Обработка строк HTML
		if (typeof selector === "string") {
			if (селектор [0] === "<" &&
				селектор [selector.length - 1] === ">" &&
				selector.length> = 3) {

				// Предположим, что строки, начинающиеся и заканчивающиеся на <>, являются HTML и пропускают проверку регулярных выражений
				match = [ноль, селектор, ноль];

			} еще {
				match = rquickExpr.exec (селектор);
			}

			// Соответствие HTML или убедитесь, что контекст не указан для #id
			if (match && (match [1] ||! context)) {

				// РУЧКА: $ (html) -> $ (массив)
				if (match [1]) {
					контекст = контекстный экземпляр jQuery? контекст [0]: контекст;

					// Возможность запуска скриптов верна для бэк-компата
					// Преднамеренно разрешить выдачу ошибки, если parseHTML отсутствует
					jQuery.merge (this, jQuery.parseHTML (
						матч [1],
						context && context.nodeType? context.ownerDocument || контекст: документ,
						правда
					));

					// РУЧКА: $ (html, реквизит)
					if (rsingleTag.test (match [1]) && jQuery.isPlainObject (context)) {
						for (соответствует контексту) {

							// Свойства контекста вызываются как методы, если это возможно
							if (isFunction (this [match])) {
								this [match] (context [match]);

							// ... и в противном случае устанавливается как атрибут
							} еще {
								this.attr (match, context [match]);
							}
						}
					}

					верни это;

				// РУЧКА: $ (# id)
				} еще {
					elem = document.getElementById (match [2]);

					if (elem) {

						// Вставить элемент непосредственно в объект jQuery
						это [0] = элемент;
						this.length = 1;
					}
					верни это;
				}

			// РУЧКА: $ (expr, $ (...))
			} else if (! context || context.jquery) {
				return (context || root) .find (селектор);

			// HANDLE: $ (expr, context)
			// (что эквивалентно: $ (context) .find (expr)
			} еще {
				вернуть this.constructor (context) .find (selector);
			}

		// HANDLE: $ (DOMElement)
		} else if (selector.nodeType) {
			этот [0] = селектор;
			this.length = 1;
			верни это;

		// РУЧКА: $ (функция)
		// Ярлык для документа готов
		} else if (isFunction (selector)) {
			вернуть root.ready! == undefined?
				root.ready (селектор):

				// Выполнить сразу, если готово нет
				селектор (jQuery);
		}

		return jQuery.makeArray (селектор, это);
	};

// Даем функции init прототип jQuery для последующей реализации
init.prototype = jQuery.fn;

// Инициализируем центральную ссылку
rootjQuery = jQuery (документ);


var rparentsprev = / ^ (?: родители | пред (?: до | все)) /,

	// Методы, гарантирующие получение уникального набора при запуске с уникального набора
	гарантированно уникальный = {
		дети: правда,
		содержание: правда,
		следующий: правда,
		пред .: правда
	};

jQuery.fn.extend ({
	имеет: функцию (цель) {
		var target = jQuery (target, this),
			l = target.length;

		вернуть this.filter (function () {
			var i = 0;
			for (; i <l; i ++) {
				if (jQuery.contains (this, target [i])) {
					вернуть истину;
				}
			}
		});
	},

	ближайший: функция (селекторы, контекст) {
		вар кур,
			я = 0,
			l = эта длина
			совпало = [],
			target = typeof селекторы! == "строка" && jQuery (селекторы);

		// Позиционные селекторы никогда не совпадают, так как нет контекста _selection_
		if (! rneedsContext.test (селекторы)) {
			for (; i <l; i ++) {
				for (cur = this [i]; cur && cur! == context; cur = cur.parentNode) {

					// Всегда пропускаем фрагменты документа
					if (cur.nodeType <11 && (target?
						target.index (cur)> -1:

						// Не передавайте неэлементы в Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector (cur, selectors))) {

						matched.push (cur);
						перерыв;
					}
				}
			}
		}

		вернуть this.pushStack (matched.length> 1? jQuery.uniqueSort (matched): matched);
	},

	// Определяем положение элемента в наборе
	index: function (elem) {

		// Нет аргумента, возвращаем индекс в родительском
		if (! elem) {
			возврат (это [0] && это [0] .parentNode)? this.first (). prevAll (). length: -1;
		}

		// Индекс в селекторе
		if (typeof elem === "string") {
			return indexOf.call (jQuery (elem), this [0]);
		}

		// Находим позицию нужного элемента
		вернуть indexOf.call (это,

			// Если он получает объект jQuery, используется первый элемент
			elem.jquery? Элем [0]: Элем
		);
	},

	добавить: функция (селектор, контекст) {
		вернуть this.pushStack (
			jQuery.uniqueSort (
				jQuery.merge (this.get (), jQuery (селектор, контекст))
			)
		);
	},

	addBack: функция (селектор) {
		вернуть this.add (селектор == ноль?
			this.prevObject: this.prevObject.filter (селектор)
		);
	}
});

function sibling (cur, dir) {
	while ((cur = cur [dir]) && cur.nodeType! == 1) {}
	возвратный курс;
}

jQuery.each ({
	parent: function (elem) {
		var parent = elem.parentNode;
		вернуть parent && parent.nodeType! == 11? родитель: ноль;
	},
	родители: функция (элемент) {
		return dir (elem, "parentNode");
	},
	Родители до: функция (элемент, я, пока) {
		return dir (elem, "parentNode", пока);
	},
	далее: функция (элемент) {
		вернуть родного брата (elem, "nextSibling");
	},
	prev: function (elem) {
		вернуть родного брата (элемент, «предыдущий брат»);
	},
	nextAll: function (elem) {
		return dir (elem, "nextSibling");
	},
	prevAll: function (elem) {
		return dir (elem, «предыдущий брат»);
	},
	nextUntil: function (elem, i, before) {
		return dir (elem, "nextSibling", пока);
	},
	prevUntil: функция (элемент, я, пока) {
		return dir (элемент, «предыдущий брат», пока);
	},
	братья и сестры: функция (элемент) {
		вернуть братьев и сестер ((elem.parentNode || {}) .firstChild, elem);
	},
	дети: функция (элемент) {
		вернуть братьев и сестер (elem.firstChild);
	},
	содержание: функция (элемент) {
		if (typeof elem.contentDocument! == "undefined") {
			return elem.contentDocument;
		}

		// Поддержка: только IE 9 - 11, только iOS 7, Android Browser <= 4.3 только
		// Считаем элемент шаблона обычным в браузерах, которые
		// не поддерживаем
		if (nodeName (elem, "template")) {
			elem = elem.content || эль;
		}

		return jQuery.merge ([], elem.childNodes);
	}
}, функция (имя, фн) {
	jQuery.fn [name] = функция (пока, селектор) {
		var matched = jQuery.map (это, fn, пока);

		if (name.slice (-5)! == "До") {
			селектор = до;
		}

		if (селектор && typeof селектор === "строка") {
			matched = jQuery.filter (селектор, совпавший);
		}

		if (this.length> 1) {

			// Удалить дубликаты
			if (! гарантированно уникален [имя]) {
				jQuery.uniqueSort (соответствует);
			}

			// Обратный порядок для родителей * и прежних производных
			if (rparentsprev.test (name)) {
				matched.reverse ();
			}
		}

		вернуть this.pushStack (совпало);
	};
});
var rnothtmlwhite = (/ [^ \ x20 \ t \ r \ n \ f] + / g);



// Преобразование параметров в формате String в параметры в формате Object
функция createOptions (опции) {
	var object = {};
	jQuery.each (options.match (rnothtmlwhite) || [], функция (_, флаг) {
		object [flag] = true;
	});
	возвращаемый объект;
}

/ *
 * Создайте список обратных вызовов, используя следующие параметры:
 *
 * options: необязательный список параметров, разделенных пробелами, которые изменят способ
 * список обратного вызова ведет себя или более традиционный вариант объекта
 *
 * По умолчанию список обратного вызова будет действовать как список обратного вызова события и может быть
 * «выстрелил» несколько раз.
 *
 * Возможные варианты:
 *
 * Once: будет гарантировать, что список обратных вызовов может быть запущен только один раз (например, Deferred).
 *
 * память: будет отслеживать предыдущие значения и будет вызывать любой добавленный обратный вызов
 * после того, как список был запущен сразу с последним "запомненным"
 * значения (например, отложенные)
 *
 * уникальный: гарантирует, что обратный вызов может быть добавлен только один раз (в списке нет дубликатов)
 *
 * stopOnFalse: прерывать вызовы, когда обратный вызов возвращает false
 *
 * /
jQuery.Callbacks = function (options) {

	// Преобразование параметров из формата String в формат объекта при необходимости
	// (сначала проверяем в кеше)
	options = typeof options === "строка"?
		createOptions (параметры):
		jQuery.extend ({}, параметры);

	var // Флаг, чтобы знать, если список в настоящее время стреляет
		стрельба,

		// Последнее значение огня для незабываемых списков
		объем памяти,

		// Флаг, чтобы узнать, был ли список уже запущен
		уволят,

		// Флаг для предотвращения стрельбы
		заблокирован,

		// Актуальный список обратных вызовов
		list = [],

		// Очередь выполнения данных для повторяющихся списков
		очередь = [],

		// Индекс текущего запускающего обратного вызова (модифицируется при необходимости добавлением / удалением)
		firingIndex = -1,

		// запускать обратные вызовы
		fire = function () {

			// Принудительное однократное включение
			заблокирован = заблокирован || options.once;

			// Выполнить обратные вызовы для всех ожидающих выполнения,
			// соблюдаем переопределения firingIndex и изменения времени выполнения
			уволен = увольнение = истина;
			for (; queue.length; firingIndex = -1) {
				память = queue.shift ();
				while (++ firingIndex <list.length) {

					// Запускаем обратный вызов и проверяем досрочное завершение
					if (list [firingIndex] .apply (memory [0], memory [1]) === false &&
						options.stopOnFalse) {

						// Перейти к концу и забыть данные, чтобы .add не перезапускал
						firingIndex = list.length;
						память = ложь;
					}
				}
			}

			// Забудем данные, если мы закончили с этим
			if (! options.memory) {
				память = ложь;
			}

			стрельба = ложь;

			// Очистим, если мы закончили увольнение навсегда
			если (заблокировано) {

				// Сохраняем пустой список, если у нас есть данные для будущих вызовов add
				if (memory) {
					список = [];

				// В противном случае этот объект расходуется
				} еще {
					list = "";
				}
			}
		},

		// Объект Actual Callbacks
		self = {

			// Добавить обратный вызов или коллекцию обратных вызовов в список
			добавить: функция () {
				if (list) {

					// Если у нас есть память из прошлого запуска, мы должны запустить после добавления
					if (память &&! увольнение) {
						firingIndex = list.length - 1;
						queue.push (память);
					}

					(функция add (args) {
						jQuery.each (аргументы, функция (_, аргумент) {
							if (isFunction (arg)) {
								if (! options.unique ||! self.has (arg)) {
									list.push (arg);
								}
							} else if (arg && arg.length && toType (arg)! == "string") {

								// Проверяем рекурсивно
								добавить (arg);
							}
						});
					}) (аргументы);

					if (память &&! увольнение) {
						Пожар();
					}
				}
				верни это;
			},

			// Удалить обратный вызов из списка
			удалить: функция () {
				jQuery.each (аргументы, функция (_, аргумент) {
					индекс var;
					while ((index = jQuery.inArray (arg, list, index))> -1) {
						list.splice (index, 1);

						// Обработка индексов стрельбы
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				верни это;
			},

			// Проверяем, есть ли данный обратный вызов в списке.
			// Если аргумент не задан, вернуть, если к списку прикреплены обратные вызовы.
			имеет: function (fn) {
				вернуть фн?
					jQuery.inArray (fn, list)> -1:
					list.length> 0;
			},

			// Удалить все обратные вызовы из списка
			пусто: функция () {
				if (list) {
					список = [];
				}
				верни это;
			},

			// Отключить .fire и .add
			// Отмена любых текущих / ожидающих выполнения
			// Очистить все обратные вызовы и значения
			отключить: функция () {
				заблокирован = очередь = [];
				list = memory = "";
				верни это;
			},
			отключено: функция () {
				возврат! список;
			},

			// Отключить .fire
			// Также отключаем .add, если у нас нет памяти (так как это не будет иметь никакого эффекта)
			// Отмена любых отложенных казней
			lock: function () {
				заблокирован = очередь = [];
				if (! memory &&! firing) {
					list = memory = "";
				}
				верни это;
			},
			заблокирован: функция () {
				возврат !! заблокирован;
			},

			// Вызов всех обратных вызовов с заданным контекстом и аргументами
			fireWith: function (context, args) {
				если (! заблокировано) {
					args = args || [];
					args = [context, args.slice? args.slice (): args];
					queue.push (args);
					если (! стрельба) {
						Пожар();
					}
				}
				верни это;
			},

			// Вызываем все обратные вызовы с заданными аргументами
			fire: function () {
				self.fireWith (this, аргументы);
				верни это;
			},

			// Узнать, если обратные вызовы уже были вызваны хотя бы один раз
			fired: function () {
				вернуться !! уволен;
			}
		};

	вернуть себя;
};


function Identity (v) {
	возврат v;
}
функция Thrower (ex) {
	бросить экс;
}

функция acceptValue (значение, разрешение, отклонение, noValue) {
	метод вар;

	пытаться {

		// Сначала проверяем аспект обещания, чтобы привилегировать синхронное поведение
		if (value && isFunction ((method = value.promise))) {
			method.call (значение) .done (разрешить) .fail (отклонить);

		// Другие объекты
		} else if (value && isFunction ((method = value.then))) {
			method.call (значение, разрешение, отклонение);

		// Другие неотменяемые
		} еще {

			// Управляем аргументами разрешения, позволяя Array # slice приводить логическое `noValue` к целому числу:
			// * false: [значение] .slice (0) => разрешение (значение)
			// * true: [value] .slice (1) => resol ()
			resol.apply (undefined, [value] .slice (noValue));
		}

	// Для Promises / A +, преобразовать исключения в отклонения
	// Поскольку jQuery.when не разворачивает объекты Canable, мы можем пропустить дополнительные проверки, появляющиеся в
	// Отложено #, чтобы условно подавить отклонение.
	} catch (value) {

		// Поддержка: только Android 4.0
		// Функции строгого режима, вызываемые без .call / .apply, получают контекст глобального объекта
		reject.apply (undefined, [value]);
	}
}

jQuery.extend ({

	Deferred: function (func) {
		var tuples = [

				// действие, добавление слушателя, обратные вызовы,
				// .... затем обработчики, индекс аргумента, [конечное состояние]
				["уведомить", "прогресс", jQuery.Callbacks ("память"),
					jQuery.Callbacks («память»), 2],
				["решить", "сделано", jQuery.Callbacks ("однажды память"),
					jQuery.Callbacks («однажды память»), 0, «разрешено»],
				["отклонить", "потерпеть неудачу", jQuery.Callbacks ("однажды память"),
					jQuery.Callbacks («однажды память»), 1, «отклонено»]
			],
			состояние = "в ожидании",
			обещание = {
				состояние: функция () {
					возвратное состояние;
				},
				всегда: function () {
					deferred.done (аргументы) .fail (аргументы);
					верни это;
				},
				"catch": function (fn) {
					вернуть обещание. than (null, fn);
				},

				// Сохраняем канал для бэк-компата
				pipe: function (/ * fnDone, fnFail, fnProgress * /) {
					var fns = arguments;

					return jQuery.Deferred (function (newDefer) {
						jQuery.each (tuples, function (i, tuple) {

							// Сопоставим кортежи (прогресс, выполнено, неудача) с аргументами (сделано, неудача, прогресс)
							var fn = isFunction (fns [tuple [4]]) && fns [tuple [4]];

							// deferred.progress (function () {связать с newDefer или newDefer.notify})
							// deferred.done (function () {связать с newDefer или newDefer.resolve})
							// deferred.fail (function () {привязка к newDefer или newDefer.reject})
							deferred [tuple [1]] (function () {
								var return = fn && fn.apply (this, аргументы);
								if (возвращено && isFunction (return.promise)) {
									returned.promise ()
										.progress (newDefer.notify)
										.done (newDefer.resolve)
										.fail (newDefer.reject);
								} еще {
									newDefer [tuple [0] + "With"] (
										этот,
										фн? [возвращено]: аргументы
									);
								}
							});
						});
						фнс = ноль;
					}) .promise ();
				},
				then: function (onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					функция разрешения (глубина, отложенная, обработчик, специальная) {
						return function () {
							вар это = это,
								аргументы = аргументы,
								mightThrow = function () {
									Вар вернулся, тогда;

									// Поддержка: Обещания / A + раздел 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Игнорируем попытки двойного разрешения
									if (глубина <maxDepth) {
										вернуть;
									}

									return = handler.apply (это, args);

									// Поддержка: Обещания / A + раздел 2.3.1
									// https://promisesaplus.com/#point-48
									if (return === deferred.promise ()) {
										бросить новую TypeError («Собственно разрешаемое»);
									}

									// Поддержка: Обещания / A + разделы 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Получить `then` только один раз
									тогда = вернул &&

										// Поддержка: Обещания / A + раздел 2.3.4
										// https://promisesaplus.com/#point-64
										// Проверяем только объекты и функции на предмет доступности
										(typeof вернул === "объект" ||
											возвращение typeof === "функция") &&
										returned.then;

									// Обрабатываем возвращаемое значение
									if (isFunction (then)) {

										// Специальные процессоры (уведомляют) просто ждут разрешения
										if (special) {
											then.call (
												вернулся,
												разрешить (maxDepth, deferred, Identity, special),
												разрешить (maxDepth, отложенный, Thrower, специальный)
											);

										// Обычные процессоры (решают) также подключаются
										} еще {

											// ... и игнорируем старые значения разрешения
											maxDepth ++;

											then.call (
												вернулся,
												разрешить (maxDepth, deferred, Identity, special),
												разрешить (maxDepth, deferred, Thrower, special),
												разрешить (maxDepth, deferred, Identity,
													deferred.notifyWith)
											);
										}

									// Обрабатываем все остальные возвращаемые значения
									} еще {

										// Только замещающие обработчики передают контекст
										// и несколько значений (не специфицированное поведение)
										if (handler! == Identity) {
											это = не определено;
											args = [возвращено];
										}

										// Обрабатываем значение (я)
										// Процесс по умолчанию решен
										(специальный || deferred.resolveWith) (тот, args);
									}
								},

								// Только нормальные процессоры (решают) ловят и отклоняют исключения
								процесс = особенный?
									mightThrow:
									function () {
										пытаться {
											mightThrow ();
										} catch (e) {

											if (jQuery.Deferred.exceptionHook) {
												jQuery.Deferred.exceptionHook (e,
													process.stackTrace);
											}

											// Поддержка: Обещания / A + раздел 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Игнорируем исключения после разрешения
											if (глубина + 1> = maxDepth) {

												// Только замещающие обработчики передают контекст
												// и несколько значений (не специфицированное поведение)
												if (handler! == Thrower) {
													это = не определено;
													args = [e];
												}

												deferred.rejectWith (тот, args);
											}
										}
									};

							// Поддержка: Promises / A + раздел 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Повторное разрешение обещаний немедленно избежать ложного отказа от
							// последующие ошибки
							if (глубина) {
								процесс();
							} еще {

								// Вызываем необязательный хук для записи стека, в случае исключения
								// поскольку в противном случае он теряется при выполнении асинхронного выполнения
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook ();
								}
								window.setTimeout (process);
							}
						};
					}

					return jQuery.Deferred (function (newDefer) {

						// progress_handlers.add (...)
						кортежи [0] [3] .add (
							разрешить(
								0,
								newDefer,
								isFunction (onProgress)?
									в процессе :
									Идентичность,
								newDefer.notifyWith
							)
						);

						// выполнял_хандлеры.адд (...)
						кортежи [1] [3] .add (
							разрешить(
								0,
								newDefer,
								isFunction (onFulfilled)?
									выполнено:
									тождественность
							)
						);

						// rejected_handlers.add (...)
						кортежи [2] [3] .add (
							разрешить(
								0,
								newDefer,
								isFunction (onRejected)?
									onRejected:
									метатель
							)
						);
					}) .promise ();
				},

				// Получить обещание для этого отложенного
				// Если указан объект obj, аспект обещания добавляется к объекту
				Обещание: функция (объект) {
					вернуть obj! = ноль? jQuery.extend (объект, обещание): обещание;
				}
			},
			deferred = {};

		// Добавить специфичные для списка методы
		jQuery.each (tuples, function (i, tuple) {
			var list = tuple [2],
				stateString = tuple [5];

			// обещание.progress = list.add
			// обещание.done = список.адд
			// prom.fail = list.add
			обещание [tuple [1]] = list.add;

			// Обработка состояния
			if (stateString) {
				list.add (
					function () {

						// состояние = "решено" (то есть выполнено)
						// состояние = "отклонено"
						state = stateString;
					},

					// rejected_callbacks.disable
					// выполнял_callbacks.disable
					кортежи [3-i] [2] .disable,

					// rejected_handlers.disable
					// выполняемая_датчики.disable
					кортежи [3-i] [3] .disable,

					// progress_callbacks.lock
					кортежи [0] [2] .lock,

					// progress_handlers.lock
					кортежи [0] [3] .lock
				);
			}

			// progress_handlers.fire
			// выполняется. handlers.fire
			// rejected_handlers.fire
			list.add (tuple [3] .fire);

			// deferred.notify = function () {deferred.notifyWith (...)}
			// deferred.resolve = function () {deferred.resolveWith (...)}
			// deferred.reject = function () {deferred.rejectWith (...)}
			deferred [tuple [0]] = function () {
				deferred [tuple [0] + "With"] (this === deferred? undefined: this, аргументы);
				верни это;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred [tuple [0] + "With"] = list.fireWith;
		});

		// Сделать отложенное обещание
		обещание. обещание (отложено);

		// Вызовите данную функцию, если есть
		if (func) {
			func.call (отложено, отложено);
		}

		// Все сделано!
		возврат отложен;
	},

	// Отложенный помощник
	когда: функция (singleValue) {
		вар

			// количество незавершенных подчиненных
			оставшиеся = arguments.length,

			// количество необработанных аргументов
			я = оставшийся,

			// подчиненные данные исполнения
			resolContexts = Array (i),
			resolValues ​​= slice.call (arguments),

			// Отложенный мастер
			master = jQuery.Deferred (),

			// подчиненная фабрика обратного вызова
			updateFunc = function (i) {
				возвращаемая функция (значение) {
					resolContexts [i] = это;
					resolValues ​​[i] = arguments.length> 1? slice.call (аргументы): значение;
					если (! (- осталось)) {
						master.resolveWith (resolContexts, resolValues);
					}
				};
			};

		// Одиночные и пустые аргументы принимаются как Promise.resolve
		если (осталось <= 1) {
			acceptValue (singleValue, master.done (updateFunc (i)) .resolve, master.reject,
				!остальной );

			// Используйте .then (), чтобы развернуть вторичные объекты (см. Gh-3000)
			if (master.state () === "в ожидании" ||
				isFunction (resolValues ​​[i] && resolValues ​​[i] .then)) {

				верните master.then ();
			}
		}

		// Несколько аргументов агрегируются как элементы массива Promise.all
		в то время как я-- ) {
			acceptValue (resolValues ​​[i], updateFunc (i), master.reject);
		}

		возврат master.promise ();
	}
});


// Они обычно указывают на ошибку программиста во время разработки,
// предупреждаем о них как можно скорее, а не проглатываем их по умолчанию.
var rerrorNames = / ^ (Eval | Internal | Range | Reference | Синтаксис | Тип | URI) Ошибка $ /;

jQuery.Deferred.exceptionHook = function (error, stack) {

	// Поддержка: только IE 8 - 9
	// Консоль существует, когда открыты инструменты разработки, что может произойти в любое время
	if (window.console && window.console.warn && error && rerrorNames.test (error.name)) {
		window.console.warn ("исключение jQuery.Deferred:" + error.message, error.stack, стек);
	}
};




jQuery.readyException = function (error) {
	window.setTimeout (function () {
		ошибка выброса;
	});
};




// Отсроченный используется в DOM ready
var readyList = jQuery.Deferred ();

jQuery.fn.ready = function (fn) {

	readyList
		.then (fn)

		// Обернуть jQuery.readyException в функцию, чтобы поиск
		// происходит во время обработки ошибок вместо обратного вызова
		// постановка на учет.
		.catch (функция (ошибка) {
			jQuery.readyException (ошибка);
		});

	верни это;
};

jQuery.extend ({

	// DOM готов к использованию? Установите в true, как только это произойдет.
	isReady: false,

	// Счетчик для отслеживания количества элементов, ожидающих до
	// готовое событие срабатывает. Смотрите # 6781
	readyWait: 1,

	// Обработка, когда DOM готов
	готов: функция (ожидание) {

		// Отмена, если есть ожидающие удержания или мы уже готовы
		if (wait === true? --jQuery.readyWait: jQuery.isReady) {
			вернуть;
		}

		// Помните, что DOM готов
		jQuery.isReady = true;

		// Если сработало обычное событие готовности DOM, уменьшите значение и, если необходимо, дождитесь
		if (wait! == true && --jQuery.readyWait> 0) {
			вернуть;
		}

		// Если есть связанные функции, выполнить
		readyList.resolveWith (document, [jQuery]);
	}
});

jQuery.ready.then = readyList.then;

// Готовый обработчик события и метод самоочистки
функция завершена () {
	document.removeEventListener ("DOMContentLoaded", завершено);
	window.removeEventListener ("загрузка", завершено);
	jQuery.ready ();
}

// Поймать случаи, когда $ (document) .ready () вызывается
// после того, как событие браузера уже произошло.
// Поддержка: только IE <= 9 - 10
// Старый IE иногда сигнализирует "интерактивный" слишком рано
if (document.readyState === "complete" ||
	(document.readyState! == "загрузка" &&! document.documentElement.doScroll)) {

	// Обрабатываем его асинхронно, чтобы дать возможность сценариям задержать готовность
	window.setTimeout (jQuery.ready);

} еще {

	// Используем удобный обратный вызов события
	document.addEventListener ("DOMContentLoaded", завершено);

	// Откат к window.onload, который всегда будет работать
	window.addEventListener ("загрузка", завершено);
}




// Многофункциональный метод для получения и установки значений коллекции
// Значение / s может быть дополнительно выполнено, если это функция
var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
	var i = 0,
		len = elems.length,
		объем = ключ == ноль;

	// Устанавливает много значений
	if (toType (key) === "object") {
		цепочка = правда;
		для (я в ключе) {
			доступ (elems, fn, i, ключ [i], true, emptyGet, raw);
		}

	// Устанавливает одно значение
	} else if (значение! == undefined) {
		цепочка = правда;

		if (! isFunction (value)) {
			raw = true;
		}

		if (навальный) {

			// Массовые операции выполняются против всего набора
			if (raw) {
				fn.call (elems, значение);
				fn = ноль;

			// ... кроме случаев выполнения значений функций
			} еще {
				объем = фн;
				fn = функция (элемент, ключ, значение) {
					возвращаем bulk.call (jQuery (elem), значение);
				};
			}
		}

		if (fn) {
			for (; i <len; i ++) {
				п (
					elems [i], ключ, raw?
					значение :
					value.call (elems [i], i, fn (elems [i], ключ))
				);
			}
		}
	}

	if (цепочка) {
		вернуть элемс;
	}

	// Получает
	if (навальный) {
		вернуть fn.call (elems);
	}

	вернуть лен? fn (elems [0], ключ): emptyGet;
};


// Соответствует пунктирной строке для верблюда
var rmsPrefix = / ^ - ms- /,
	rdashAlpha = / - ([az]) / г;

// Используется camelCase как обратный вызов для replace ()
function fcamelCase (all, letter) {
	return letter.toUpperCase ();
}

// Преобразовать пунктир в camelCase; используется модулями css и data
// Поддержка: IE <= 9 - 11, Edge 12 - 15
// Microsoft забыла префикс своего вендора (# 9572)
function camelCase (string) {
	вернуть string.replace (rmsPrefix, "ms-") .replace (rdashAlpha, fcamelCase);
}
var acceptData = function (owner) {

	// Принимает только:
	// - Узел
	// - Node.ELEMENT_NODE
	// - Node.DOCUMENT_NODE
	// - Объект
	// - Любой
	вернуть owner.nodeType === 1 || owner.nodeType === 9 || ! (+ owner.nodeType);
};




Функция Data () {
	this.expando = jQuery.expando + Data.uid ++;
}

Data.uid = 1;

Data.prototype = {

	кеш: функция (владелец) {

		// Проверяем, есть ли у объекта владельца кеш
		var value = owner [this.expando];

		// Если нет, создайте
		if (! value) {
			значение = {};

			// Мы можем принимать данные для неэлементных узлов в современных браузерах,
			// но мы не должны, см. # 8335.
			// Всегда возвращать пустой объект.
			if (acceptData (owner)) {

				// Если это узел, вряд ли будет зашифрован или зациклен на
				// используем простое назначение
				if (owner.nodeType) {
					владелец [this.expando] = значение;

				// Иначе зафиксируем его в не перечисляемом свойстве
				// настраиваемое значение должно быть истинным, чтобы свойство могло быть
				// удаляется при удалении данных
				} еще {
					Object.defineProperty (владелец, this.expando, {
						значение: значение,
						настраивается: правда
					});
				}
			}
		}

		возвращаемое значение;
	},
	set: function (владелец, данные, значение) {
		вар проп,
			cache = this.cache (владелец);

		// Обработка: [владелец, ключ, значение] args
		// Всегда использовать ключ camelCase (gh-2257)
		if (typeof data === "string") {
			cache [camelCase (data)] = значение;

		// Обработка: [owner, {properties}] args
		} еще {

			// Копируем свойства по одному в объект кеша
			for (опора в данных) {
				cache [camelCase (prop)] = data [prop];
			}
		}
		возврат кеша;
	},
	get: function (owner, key) {
		ключ возврата === не определено?
			this.cache (владелец):

			// Всегда использовать ключ camelCase (gh-2257)
			владелец [this.expando] && владелец [this.expando] [camelCase (ключ)];
	},
	доступ: функция (владелец, ключ, значение) {

		// В случаях, когда либо:
		//
		// 1. Ключ не был указан
		// 2. Указан строковый ключ, но значение не указано
		//
		// Возьмем путь «чтения» и дадим методу get определить
		// какое значение вернуть соответственно:
		//
		// 1. Весь объект кеша
		// 2. Данные хранятся на ключе
		//
		if (key === undefined ||
				((ключ && typeof key === "строка") && value === undefined)) {

			вернуть this.get (владелец, ключ);
		}

		// когда ключ не является строкой или ключом и значением
		// указываются, устанавливаются или расширяются (существующие объекты) либо:
		//
		// 1. Объект свойств
		// 2. Ключ и значение
		//
		this.set (владелец, ключ, значение);

		// Поскольку «заданный» путь может иметь две возможные точки входа
		// возвращаем ожидаемые данные в зависимости от того, какой путь был взят [*]
		возвращаемое значение! == undefined? значение: ключ;
	},
	удалить: функция (владелец, ключ) {
		я
			кеш = владелец [this.expando];

		if (cache === undefined) {
			вернуть;
		}

		if (key! == undefined) {

			// Поддержка массива или строки разделенных пробелами ключей
			if (Array.isArray (key)) {

				// Если ключ является массивом ключей ...
				// Мы всегда устанавливаем ключи camelCase, поэтому удалите это.
				key = key.map (camelCase);
			} еще {
				ключ = camelCase (ключ);

				// Если ключ с пробелами существует, используйте его.
				// В противном случае создаем массив, сопоставляя непробельные символы
				ключ = ключ в кеше?
					[ключ]:
					(key.match (rnothtmlwhite) || []);
			}

			я = длина ключа;

			в то время как я-- ) {
				удалить кеш [ключ [i]];
			}
		}

		// Удалить экспло, если данных больше нет
		if (key === undefined || jQuery.isEmptyObject (cache)) {

			// Поддержка: Chrome <= 35 - 45
			// Производительность Webkit & Blink страдает при удалении свойств
			// из DOM-узлов, поэтому установите вместо undefined
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (ошибка ограничена)
			if (owner.nodeType) {
				владелец [this.expando] = не определено;
			} еще {
				удалить владельца [this.expando];
			}
		}
	},
	hasData: function (owner) {
		var cache = owner [this.expando];
		возврат кеша! == undefined &&! jQuery.isEmptyObject (cache);
	}
};
var dataPriv = новые данные ();

var dataUser = new Data ();



// Сводка реализации
//
// 1. Обеспечиваем поверхность API и семантическую совместимость с веткой 1.9.x
// 2. Улучшаем ремонтопригодность модуля за счет уменьшения хранилища
// пути к одному механизму.
// 3. Используйте один и тот же механизм для поддержки «личных» и «пользовательских» данных.
// 4. _Never_ предоставляет «личные» данные пользовательскому коду (TODO: Drop _data, _removeData)
// 5. Старайтесь не раскрывать детали реализации пользовательских объектов (например, раскрыть свойства)
// 6. Обеспечить четкий путь обновления реализации до WeakMap в 2014 году

var rbrace = / ^ (?: \ {[\ w \ W] * \} | \ [[\ w \ W] * \]) $ /,
	rmultiDash = / [AZ] / г;

function getData (data) {
	if (data === "true") {
		вернуть истину;
	}

	if (data === "false") {
		вернуть ложь;
	}

	if (data === "null") {
		вернуть ноль;
	}

	// Преобразовать в число, только если оно не меняет строку
	if (data === + data + "") {
		возврат + данные;
	}

	if (rbrace.test (data)) {
		вернуть JSON.parse (data);
	}

	вернуть данные;
}

функция dataAttr (элемент, ключ, данные) {
	имя вар;

	// Если внутри ничего не найдено, попробуйте получить любую
	// данные из атрибута HTML5 data- *
	if (data === undefined && elem.nodeType === 1) {
		name = "data-" + key.replace (rmultiDash, "- $ &") .toLowerCase ();
		data = elem.getAttribute (name);

		if (typeof data === "string") {
			пытаться {
				data = getData (data);
			} catch (e) {}

			// Убедитесь, что мы установили данные, чтобы они не изменились позже
			dataUser.set (элемент, ключ, данные);
		} еще {
			данные = не определено;
		}
	}
	вернуть данные;
}

jQuery.extend ({
	hasData: function (elem) {
		return dataUser.hasData (elem) || dataPriv.hasData (elem);
	},

	данные: функция (элемент, имя, данные) {
		вернуть dataUser.access (элемент, имя, данные);
	},

	removeData: function (elem, name) {
		dataUser.remove (элемент, имя);
	},

	// TODO: теперь все вызовы _data и _removeData заменены
	// с прямыми вызовами методов dataPriv, они могут быть устаревшими.
	_data: функция (элемент, имя, данные) {
		вернуть dataPriv.access (элемент, имя, данные);
	},

	_removeData: функция (элемент, имя) {
		dataPriv.remove (элемент, имя);
	}
});

jQuery.fn.extend ({
	данные: функция (ключ, значение) {
		var i, name, data,
			elem = this [0],
			attrs = elem && elem.attributes;

		// Получает все значения
		if (key === undefined) {
			if (this.length) {
				data = dataUser.get (elem);

				if (elem.nodeType === 1 &&! dataPriv.get (elem, "hasDataAttrs")) {
					я = attrs.length;
					в то время как я-- ) {

						// Поддержка: только IE 11
						// Элементы attrs могут быть нулевыми (# 14894)
						if (attrs [i]) {
							name = attrs [i] .name;
							if (name.indexOf ("data-") === 0) {
								name = camelCase (name.slice (5));
								dataAttr (элемент, имя, данные [имя]);
							}
						}
					}
					dataPriv.set (elem, "hasDataAttrs", true);
				}
			}

			вернуть данные;
		}

		// Устанавливаем несколько значений
		if (typeof key === "object") {
			вернуть this.each (function () {
				dataUser.set (это ключ);
			});
		}

		вернуть доступ (это, функция (значение) {
			данные var;

			// Вызывающий объект jQuery (элемент соответствует) не пуст
			// (и, следовательно, имеет элемент появляется в этом [0]) и
			// параметр `value` не был неопределенным. Пустой объект jQuery
			// приведет к `undefined` для elem = this [0], что
			// генерируем исключение, если сделана попытка прочитать кеш данных.
			if (elem && value === undefined) {

				// Попытка получить данные из кеша
				// Ключ всегда будет верблюжьим в данных
				data = dataUser.get (элемент, ключ);
				if (data! == undefined) {
					вернуть данные;
				}

				// Попытка «обнаружить» данные в
				// HTML5 пользовательские данные- * attrs
				data = dataAttr (элемент, ключ);
				if (data! == undefined) {
					вернуть данные;
				}

				// Мы очень старались, но данных не существует.
				вернуть;
			}

			// Устанавливаем данные ...
			this.each (function () {

				// Мы всегда храним ключ camelCased
				dataUser.set (это, ключ, значение);
			});
		}, null, value, arguments.length> 1, null, true);
	},

	removeData: function (key) {
		вернуть this.each (function () {
			dataUser.remove (this, key);
		});
	}
});


jQuery.extend ({
	очередь: функция (элемент, тип, данные) {
		очередь var;

		if (elem) {
			type = (type || "fx") + "queue";
			queue = dataPriv.get (элемент, тип);

			// Ускоряем время ожидания, быстро убираясь, если это просто поиск
			if (data) {
				if (! queue || Array.isArray (data)) {
					queue = dataPriv.access (elem, type, jQuery.makeArray (data));
				} еще {
					queue.push (данные);
				}
			}
			очередь на возврат || [];
		}
	},

	dequeue: function (elem, type) {
		тип = тип || "FX";

		var queue = jQuery.queue (элемент, тип),
			startLength = queue.length,
			fn = queue.shift (),
			hooks = jQuery._queueHooks (элемент, тип),
			следующая = функция () {
				jQuery.dequeue (элемент, тип);
			};

		// Если очередь fx снята с очереди, всегда удаляем индикатор хода выполнения
		if (fn === "inprogress") {
			fn = queue.shift ();
			startLength--;
		}

		if (fn) {

			// Добавить индикатор хода выполнения, чтобы предотвратить появление очереди fx
			// автоматически удаляется
			if (type === "fx") {
				queue.unshift ("inprogress");
			}

			// Очистить последнюю функцию остановки очереди
			удалить hooks.stop;
			fn.call (элемент, следующий, крючки);
		}

		if (! startLength && hooks) {
			hooks.empty.fire ();
		}
	},

	// Не публично - генерируем объект queueHooks или возвращаем текущий
	_queueHooks: function (elem, type) {
		var key = type + "queueHooks";
		вернуть dataPriv.get (элемент, ключ) || dataPriv.access (элемент, ключ, {
			empty: jQuery.Callbacks ("однажды память") .add (function () {
				dataPriv.remove (elem, [type + "queue", key]);
			})
		});
	}
});

jQuery.fn.extend ({
	очередь: функция (тип, данные) {
		var setter = 2;

		if (typeof type! == "string") {
			данные = тип;
			type = "fx";
			сеттер--;
		}

		if (arguments.length <setter) {
			return jQuery.queue (this [0], тип);
		}

		вернуть данные === не определено?
			этот :
			this.each (function () {
				var queue = jQuery.queue (this, type, data);

				// Обеспечиваем перехват для этой очереди
				jQuery._queueHooks (это, тип);

				if (type === "fx" && queue [0]! == "inprogress") {
					jQuery.dequeue (this, type);
				}
			});
	},
	dequeue: function (type) {
		вернуть this.each (function () {
			jQuery.dequeue (this, type);
		});
	},
	clearQueue: функция (тип) {
		вернуть this.queue (тип || "fx", []);
	},

	// Получить обещание, разрешенное, когда очереди определенного типа
	// опорожняются (fx - это тип по умолчанию)
	Обещание: функция (тип, объект) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred (),
			элементы = это,
			я = эта длина
			resol = function () {
				if (! (--count)) {
					defer.resolveWith (elements, [elements]);
				}
			};

		if (typeof type! == "string") {
			obj = тип;
			тип = неопределенный;
		}
		тип = тип || "FX";

		в то время как я-- ) {
			tmp = dataPriv.get (elements [i], type + "queueHooks");
			if (tmp && tmp.empty) {
				подсчитывать ++;
				tmp.empty.add (разрешение);
			}
		}
		разрешить();
		вернуть defer.promise (obj);
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/) .source;

var rcssNum = new RegExp ("^ (?: ([+ -]) = |) (" + pnum + ") ([az%] *) $", "i");


var cssExpand = ["Top", "Right", "Bottom", "Left"];

var documentElement = document.documentElement;



	var isAttached = function (elem) {
			return jQuery.contains (elem.ownerDocument, elem);
		},
		составе = {составлено: правда};

	// Поддержка: только IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2
	// Проверяем вложение по теневым границам DOM, когда это возможно (gh-3504)
	// Поддержка: только iOS 10.0-10.2
	// Ранние версии iOS 10 поддерживают `attachShadow`, но не` getRootNode`,
	// приводит к ошибкам. Нам нужно проверить `getRootNode`.
	if (documentElement.getRootNode) {
		isAttached = function (elem) {
			return jQuery.contains (elem.ownerDocument, elem) ||
				elem.getRootNode (составленный) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function (elem, el) {

		// isHiddenWithinTree может быть вызвано из jQuery # filter function;
		// в этом случае элемент будет вторым аргументом
		elem = el || эль;

		// Встроенный стиль превосходит все
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// В противном случае проверяем вычисленный стиль
			// Поддержка: Firefox <= 43 - 45
			// Отключенные элементы могут иметь вычисленное отображение: нет, поэтому сначала убедитесь, что элемент
			// в документе.
			isAttached (elem) &&

			jQuery.css (elem, "display") === "none";
	};

var swap = function (elem, options, callback, args) {
	var ret, name,
		старый = {};

	// Запомним старые значения и вставим новые
	для (имя в опциях) {
		old [name] = elem.style [name];
		elem.style [name] = options [name];
	}

	ret = callback.apply (elem, args || []);

	// Восстановить старые значения
	для (имя в опциях) {
		elem.style [name] = old [name];
	}

	вернуться в отставку;
};




функция AdjustCSS (Elem, Prop, ValueParts, Твин) {
	отрегулировано, масштаб,
		maxIterations = 20,
		currentValue = Твин?
			function () {
				вернуть tween.cur ();
			}:
			function () {
				return jQuery.css (elem, prop, "");
			},
		initial = currentValue (),
		unit = valueParts && valueParts [3] || (jQuery.cssNumber [prop]? "": "px"),

		// Требуется начальное вычисление значения для потенциальных несоответствий единиц
		initialInUnit = elem.nodeType &&
			(jQuery.cssNumber [prop] || unit! == "px" && + initial) &&
			rcssNum.exec (jQuery.css (elem, prop));

	if (initialInUnit && initialInUnit [3]! == единица измерения) {

		// Поддержка: Firefox <= 54
		// Сократить вдвое целевое значение итерации, чтобы предотвратить помехи от верхних границ CSS (gh-2144)
		начальный = начальный / 2;

		// Трастовые единицы, сообщаемые jQuery.css
		единица = единица || initialInUnit [3];

		// Итеративно приближенный от ненулевой начальной точки
		initialInUnit = + initial || 1;

		while (maxIterations--) {

			// Оцениваем и обновляем нашу лучшую догадку (догадка удваивается, что обнуляется).
			// Завершаем, если шкала равна или пересекает 1 (что делает старый * новый продукт неположительным).
			jQuery.style (elem, prop, initialInUnit + unit);
			if ((1 - масштаб) * (1 - (масштаб = currentValue () / начальный || 0,5)) <= 0) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style (elem, prop, initialInUnit + unit);

		// Убедитесь, что мы обновим свойства анимации позже
		valueParts = valueParts || [];
	}

	if (valueParts) {
		initialInUnit = + initialInUnit || + начальный || 0;

		// Применяем относительное смещение (+ = / - =), если указано
		скорректированы = значениеParts [1]?
			initialInUnit + (valueParts [1] + 1) * valueParts [2]:
			+ valueParts [2];
		если (твин) {
			tween.unit = единица измерения;
			tween.start = initialInUnit;
			tween.end = настроено;
		}
	}
	возврат скорректирован;
}


var defaultDisplayMap = {};

function getDefaultDisplay (elem) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap [nodeName];

	if (display) {
		обратный дисплей;
	}

	temp = doc.body.appendChild (doc.createElement (nodeName));
	display = jQuery.css (temp, "display");

	temp.parentNode.removeChild (temp);

	if (display === "none") {
		дисплей = "блок";
	}
	defaultDisplayMap [nodeName] = display;

	обратный дисплей;
}

function showHide (elements, show) {
	вар дисплей, элем,
		значения = [],
		индекс = 0,
		длина = элементы. длина;

	// Определяем новое отображаемое значение для элементов, которые нужно изменить
	for (; index <длина; index ++) {
		elem = elements [index];
		if (! elem.style) {
			Продолжить;
		}

		display = elem.style.display;
		если (показать) {

			// Поскольку мы навязываем скрытые каскадом элементы, немедленное (и медленное)
			// проверка требуется в этом первом цикле, если у нас нет непустого отображаемого значения (либо
			// встроенный или подлежащий восстановлению)
			if (display === "none") {
				values ​​[index] = dataPriv.get (elem, "display") || ноль;
				if (! values ​​[index]) {
					elem.style.display = "";
				}
			}
			if (elem.style.display === "" && isHiddenWithinTree (elem)) {
				values ​​[index] = getDefaultDisplay (elem);
			}
		} еще {
			if (display! == "none") {
				значения [индекс] = "нет";

				// Помните, что мы перезаписываем
				dataPriv.set (элемент, «дисплей», дисплей);
			}
		}
	}

	// Устанавливаем отображение элементов во втором цикле, чтобы избежать постоянного перекомпоновки
	для (индекс = 0; индекс <длина; индекс ++) {
		if (values ​​[index]! = null) {
			elements [index] .style.display = values ​​[index];
		}
	}

	возвратные элементы;
}

jQuery.fn.extend ({
	show: function () {
		вернуть showHide (это правда);
	},
	скрыть: функция () {
		вернуть showHide (this);
	},
	toggle: function (state) {
		if (typeof state === "логическое") {
			вернуть состояние? this.show (): this.hide ();
		}

		вернуть this.each (function () {
			if (isHiddenWithinTree (this)) {
				jQuery (это) .show ();
			} еще {
				jQuery (это) .hide ();
			}
		});
	}
});
var rcheckableType = (/ ^ (?: checkbox | radio) $ / i);

var rtagName = (/ <([az] [^ \ / \ 0> \ x20 \ t \ r \ n \ f] *) / i);

var rscriptType = (/ ^ $ | ^ module $ | \ / (?: java | ecma) script / i);



// Мы должны закрыть эти теги для поддержки XHTML (# 13200)
var wrapMap = {

	// Поддержка: только IE <= 9
	опция: [1, "<выберите несколько = 'несколько'>", "</ выберите>"],

	// XHTML-парсеры магически не вставляют элементы в
	// так же, как это делают парсеры теговых супов. Поэтому мы не можем сократить
	// это, пропуская <tbody> или другие обязательные элементы.
	thead: [1, "<table>", "</ table>"],
	col: [2, "<table> <colgroup>", "</ colgroup> </ table>"],
	tr: [2, "<table> <tbody>", "</ tbody> </ table>"],
	td: [3, "<table> <tbody> <tr>", "</ tr> </ tbody> </ table>"],

	_default: [0, "", ""]
};

// Поддержка: только IE <= 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll (context, tag) {

	// Поддержка: только IE <= 9 - 11
	// Используем typeof, чтобы избежать вызова метода с нулевым аргументом для хост-объектов (# 15151)
	var ret;

	if (typeof context.getElementsByTagName! == "undefined") {
		ret = context.getElementsByTagName (tag || "*");

	} else if (typeof context.querySelectorAll! == "undefined") {
		ret = context.querySelectorAll (tag || "*");

	} еще {
		ret = [];
	}

	if (tag === undefined || tag && nodeName (context, tag)) {
		return jQuery.merge ([context], ret);
	}

	вернуться в отставку;
}


// Отметить сценарии как уже оцененные
function setGlobalEval (elems, refElements) {
	var i = 0,
		l = elems.length;

	for (; i <l; i ++) {
		dataPriv.set (
			elems [i],
			"GlobalEval",
			! refElements || dataPriv.get (refElements [i], "globalEval")
		);
	}
}


var rhtml = / <| & #? \ w +; /;

функция buildFragment (элементы, контекст, сценарии, выделение, игнорируется) {
	var elem, tmp, tag, wrap, прилагаются, j,
		фрагмент = context.createDocumentFragment (),
		узлы = [],
		я = 0,
		l = elems.length;

	for (; i <l; i ++) {
		elem = elems [i];

		if (elem || elem === 0) {

			// Добавить узлы напрямую
			if (toType (elem) === "object") {

				// Поддержка: только Android <= 4.0, только PhantomJS 1
				// push.apply (_, arraylike) создает древний WebKit
				jQuery.merge (узлы, elem.nodeType? [elem]: elem);

			// Преобразование не HTML в текстовый узел
			} else if (! rhtml.test (elem)) {
				node.push (context.createTextNode (elem));

			// Преобразование HTML в узлы DOM
			} еще {
				tmp = tmp || фрагмент.appendChild (context.createElement ("div"));

				// Десериализация стандартного представления
				tag = (rtagName.exec (elem) || ["", ""]) [1] .toLowerCase ();
				wrap = wrapMap [tag] || wrapMap._default;
				tmp.innerHTML = wrap [1] + jQuery.htmlPrefilter (elem) + wrap [2];

				// Спускаемся через обертки к нужному контенту
				j = wrap [0];
				while (j--) {
					tmp = tmp.lastChild;
				}

				// Поддержка: только Android <= 4.0, только PhantomJS 1
				// push.apply (_, arraylike) создает древний WebKit
				jQuery.merge (узлы, tmp.childNodes);

				// Запомним контейнер верхнего уровня
				tmp = фрагмент.firstChild;

				// Убедитесь, что созданные узлы осиротели (# 12392)
				tmp.textContent = "";
			}
		}
	}

	// Удалить обертку из фрагмента
	gment.textContent = "";

	я = 0;
	while ((elem = node [i ++])) {

		// Пропустить элементы уже в коллекции контекста (trac-4087)
		if (selection && jQuery.inArray (elem, selection)> -1) {
			если (игнорируется) {
				ignored.push (elem);
			}
			Продолжить;
		}

		прикрепленный = isAttached (элемент);

		// Добавить к фрагменту
		tmp = getAll (фрагмент.appendChild (elem), "скрипт");

		// Сохраняем историю оценки скрипта
		если (прилагается) {
			setGlobalEval (tmp);
		}

		// Захват исполняемых файлов
		if (scripts) {
			j = 0;
			while ((elem = tmp [j ++])) {
				if (rscriptType.test (elem.type || "")) {
					scripts.push (элемент);
				}
			}
		}
	}

	возвратный фрагмент;
}


(function () {
	var фрагмент = документ.createDocumentFragment (),
		div = фрагмент.appendChild (document.createElement ("div")),
		input = document.createElement ("input");

	// Поддержка: только Android 4.0 - 4.3
	// Проверка состояния потерянного, если имя установлено (# 11217)
	// Поддержка: Windows Web Apps (WWA)
	// `name` и` type` должны использовать .setAttribute для WWA (# 14901)
	input.setAttribute ("type", "radio");
	input.setAttribute («проверено», «проверено»);
	input.setAttribute ("name", "t");

	div.appendChild (вход);

	// Поддержка: только Android <= 4.1
	// Старый WebKit неправильно клонирует проверенное состояние во фрагментах
	support.checkClone = div.cloneNode (true) .cloneNode (true) .lastChild.checked;

	// Поддержка: только IE <= 11
	// Убедитесь, что текстовое поле (и флажок) defaultValue правильно клонировано
	div.innerHTML = "<textarea> x </ textarea>";
	support.noCloneChecked = !! div.cloneNode (true) .lastChild.defaultValue;
}) ();


вар
	rkeyEvent = / ^ ключ /,
	rmouseEvent = / ^ (?: мышь | указатель | contextmenu | перетаскивание | падение) | щелчок /,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue () {
	вернуть истину;
}

function returnFalse () {
	вернуть ложь;
}

// Поддержка: IE <= 9 - 11+
// focus () и blur () являются асинхронными, кроме случаев, когда они не работают.
// Поэтому ожидаем, что фокус будет синхронным, когда элемент уже активен,
// и размытие, чтобы быть синхронным, когда элемент еще не активен.
// (фокус и размытие всегда синхронны в других поддерживаемых браузерах,
// это просто определяет, когда мы можем на это рассчитывать).
function waitSync (elem, type) {
	return (e lem === safeActiveElement ()) === (type === "focus");
}

// Поддержка: только IE <= 9
// Доступ к document.activeElement может выдать неожиданно
// https://bugs.jquery.com/ticket/13393
function safeActiveElement () {
	пытаться {
		return document.activeElement;
	} catch (err) {}
}

функция включена (элемент, типы, селектор, данные, fn, один) {
	var origFn, тип;

	// Типы могут быть картой типов / обработчиков
	if (typeof types === "object") {

		// (типы-объект, селектор, данные)
		if (селектор typeof! == "строка") {

			// (типы-объект, данные)
			данные = данные || селектор;
			селектор = не определено;
		}
		for (введите типы) {
			вкл (элемент, тип, селектор, данные, типы [тип], один);
		}
		вернуть элемент;
	}

	if (data == null && fn == null) {

		// (типы, фн)
		fn = селектор;
		данные = селектор = не определено;
	} else if (fn == null) {
		if (typeof selector === "string") {

			// (типы, селектор, фн)
			фн = данные;
			данные = не определено;
		} еще {

			// (типы, данные, фн)
			фн = данные;
			данные = селектор;
			селектор = не определено;
		}
	}
	if (fn === false) {
		fn = returnFalse;
	} если if (! fn) {
		вернуть элемент;
	}

	if (one === 1) {
		origFn = fn;
		fn = функция (событие) {

			// Может использовать пустой набор, так как событие содержит информацию
			jQuery (). off (событие);
			вернуть origFn.apply (this, аргументы);
		};

		// Используем тот же guid, чтобы вызывающий мог удалить с помощью origFn
		fn.guid = origFn.guid || (origFn.guid = jQuery.guid ++);
	}
	return elem.each (function () {
		jQuery.event.add (this, types, fn, data, selector);
	});
}

/ *
 * Вспомогательные функции для управления событиями - не часть публичного интерфейса.
 * Поддерживает библиотеку addEvent Дина Эдвардса для многих идей.
 * /
jQuery.event = {

	Глобальный: {},

	добавить: функция (элемент, типы, обработчик, данные, селектор) {

		var handleObjIn, eventHandle, tmp,
			события, t, handleObj,
			special, обработчики, тип, пространства имен, origType,
			elemData = dataPriv.get (elem);

		// Не прикреплять события к узлам noData или text / comment (но разрешать простые объекты)
		if (! elemData) {
			вернуть;
		}

		// Вызывающий может передать объект пользовательских данных вместо обработчика
		if (handler.handler) {
			handleObjIn = обработчик;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Убедитесь, что недействительные селекторы генерируют исключения во время подключения
		// Оцениваем по параметру documentElement, если elem является неэлементным узлом (например, document)
		if (селектор) {
			jQuery.find.matchesSelector (documentElement, селектор);
		}

		// Убедитесь, что обработчик имеет уникальный идентификатор, используемый для его поиска / удаления позже
		if (! handler.guid) {
			handler.guid = jQuery.guid ++;
		}

		// Инициируем структуру события элемента и основной обработчик, если это первый
		if (! (events = elemData.events)) {
			events = elemData.events = {};
		}
		if (! (eventHandle = elemData.handle)) {
			eventHandle = elemData.handle = function (e) {

				// Отменить второе событие jQuery.event.trigger () и
				// когда событие вызывается после выгрузки страницы
				вернуть typeof jQuery! == "undefined" && jQuery.event.triggered! == e.type?
					jQuery.event.dispatch.apply (elem, arguments): undefined;
			};
		}

		// Обработка нескольких событий, разделенных пробелом
		types = (types || "") .match (rnothtmlwhite) || [""];
		t = types.length;
		while (t--) {
			tmp = rtypenamespace.exec (types [t]) || [];
			type = origType = tmp [1];
			namespaces = (tmp [2] || "") .split (".") .sort ();

			// Там * должен * быть тип, без присоединения обработчиков только для пространства имен
			if (! type) {
				Продолжить;
			}

			// Если событие меняет свой тип, используйте специальные обработчики событий для измененного типа
			special = jQuery.event.special [тип] || {};

			// Если определен селектор, определить тип API специального события, в противном случае данный тип
			type = (selector? special.delegateType: special.bindType) || тип;

			// Обновляем спец на основе нового типа сброса
			special = jQuery.event.special [тип] || {};

			// handleObj передается всем обработчикам событий
			handleObj = jQuery.extend ({
				тип: тип,
				origType: origType,
				данные: данные,
				обработчик: обработчик,
				guid: handler.guid,
				селектор: селектор,
				needsContext: selector && jQuery.expr.match.needsContext.test (selector),
				namespace: namespaces.join (".")
			}, handleObjIn);

			// Инициируем очередь обработчика событий, если мы первые
			if (! (handlers = events [type])) {
				обработчики = события [тип] = [];
				handlers.delegateCount = 0;

				// Используйте addEventListener только в том случае, если обработчик специальных событий возвращает false
				if (! special.setup ||
					special.setup.call (элемент, данные, пространства имен, eventHandle) === false) {

					if (elem.addEventListener) {
						elem.addEventListener (type, eventHandle);
					}
				}
			}

			if (special.add) {
				special.add.call (elem, handleObj);

				if (! handleObj.handler.guid) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Добавить в список обработчиков элемента, делегаты впереди
			if (селектор) {
				handlers.splice (handlers.delegateCount ++, 0, handleObj);
			} еще {
				handlers.push (handleObj);
			}

			// Отслеживаем, какие события когда-либо использовались, для оптимизации событий
			jQuery.event.global [type] = true;
		}

	},

	// Отсоединяем событие или набор событий от элемента
	удалить: функция (элемент, типы, обработчик, селектор, mappedTypes) {

		var j, origCount, tmp,
			события, t, handleObj,
			special, обработчики, тип, пространства имен, origType,
			elemData = dataPriv.hasData (elem) && dataPriv.get (elem);

		if (! elemData ||! (events = elemData.events)) {
			вернуть;
		}

		// Один раз для каждого type.namespace в типах; тип может быть опущен
		types = (types || "") .match (rnothtmlwhite) || [""];
		t = types.length;
		while (t--) {
			tmp = rtypenamespace.exec (types [t]) || [];
			type = origType = tmp [1];
			namespaces = (tmp [2] || "") .split (".") .sort ();

			// Отмена привязки всех событий (в этом пространстве имен, если предусмотрено) для элемента
			if (! type) {
				for (введите события) {
					jQuery.event.remove (elem, type + types [t], обработчик, селектор, true);
				}
				Продолжить;
			}

			special = jQuery.event.special [тип] || {};
			type = (selector? special.delegateType: special.bindType) || тип;
			обработчики = события [тип] || [];
			tmp = tmp [2] &&
				new RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\. |)") + "(\\. | $)");

			// Удалить совпадающие события
			origCount = j = handlers.length;
			while (j--) {
				handleObj = обработчики [j];

				if ((mappedTypes || origType === handleObj.origType) &&
					(! handler || handler.guid === handleObj.guid) &&
					(! tmp || tmp.test (handleObj.namespace)) &&
					(! селектор || селектор === handleObj.selector ||
						селектор === "**" && handleObj.selector)) {
					handlers.splice (j, 1);

					if (handleObj.selector) {
						handlers.delegateCount--;
					}
					if (special.remove) {
						special.remove.call (elem, handleObj);
					}
				}
			}

			// Удалить общий обработчик события, если мы удалили что-то, и больше не существует обработчиков
			// (исключает возможность бесконечной рекурсии при удалении специальных обработчиков событий)
			if (origCount &&! handlers.length) {
				if (! special.teardown ||
					special.teardown.call (elem, пространства имен, elemData.handle) === false) {

					jQuery.removeEvent (elem, type, elemData.handle);
				}

				удалить события [тип];
			}
		}

		// Удалить данные и экспло, если они больше не используются
		if (jQuery.isEmptyObject (events)) {
			dataPriv.remove (elem, «обрабатывать события»);
		}
	},

	dispatch: function (nativeEvent) {

		// Создание доступного для записи jQuery.Event из собственного объекта события
		var event = jQuery.event.fix (nativeEvent);

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array (arguments.length),
			handlers = (dataPriv.get (this, "events") || {}) [event.type] || [],
			special = jQuery.event.special [event.type] || {};

		// Используем исправленное jQuery.Event вместо собственного события (только для чтения)
		args [0] = событие;

		for (i = 1; i <arguments.length; i ++) {
			args [i] = arguments [i];
		}

		event.delegateTarget = this;

		// Вызовите ловушку preDispatch для сопоставленного типа и, если нужно, оставьте его на хранение
		if (special.preDispatch && special.preDispatch.call (this, event) === false) {
			вернуть;
		}

		// Определяем обработчики
		handlerQueue = jQuery.event.handlers.call (this, event, handlers);

		// Сначала запускаем делегаты; они могут хотеть прекратить распространение под нами
		я = 0;
		while ((matched = handlerQueue [i ++]) &&! event.isPropagationStopped ()) {
			event.currentTarget = matched.elem;

			j = 0;
			while ((handleObj = matched.handlers [j ++]) &&
				! event.isImmediatePropagationStopped ()) {

				// Если событие находится в пространстве имен, то каждый обработчик вызывается только если
				// специально универсальный или его пространства имен являются надмножеством событий.
				if (! event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test (handleObj.namespace)) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ((jQuery.event.special [handleObj.origType] || {}) .handle ||
						handleObj.handler) .apply (matched.elem, args);

					if (ret! == undefined) {
						if ((event.result = ret) === false) {
							event.preventDefault ();
							event.stopPropagation ();
						}
					}
				}
			}
		}

		// Вызвать хук postDispatch для сопоставленного типа
		if (special.postDispatch) {
			special.postDispatch.call (this, event);
		}

		возвращение event.result;
	},

	обработчики: функция (событие, обработчики) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			DelegateCount = Handlers.delegateCount,
			cur = event.target;

		// Найти обработчики делегатов
		if (DelegateCount &&

			// Поддержка: IE <= 9
			// Черная дыра деревьев экземпляров SVG <use> (trac-13180)
			cur.nodeType &&

			// Поддержка: Firefox <= 42
			// Подавляем щелчки, нарушающие спецификацию, указывающие на неосновную кнопку указателя (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Поддержка: только IE 11
			// ... но не клавиша со стрелкой "щелкает" радиовходами, которые могут иметь `button` -1 (gh-2343)
			! (event.type === "click" && event.button> = 1)) {

			for (; cur! == это; cur = cur.parentNode || это) {

				// Не проверять неэлементы (# 13208)
				// Не обрабатывать клики на отключенных элементах (# 6911, # 8165, # 11382, # 11764)
				if (cur.nodeType === 1 &&! (event.type === "click" && cur.disabled === true)) {
					matchedHandlers = [];
					matchedSelectors = {};
					for (i = 0; i <DelegateCount; i ++) {
						handleObj = обработчики [i];

						// Не конфликтовать со свойствами Object.prototype (# 13203)
						sel = handleObj.selector + "";

						if (matchedSelectors [sel] === undefined) {
							matchedSelectors [sel] = handleObj.needsContext?
								jQuery (sel, this) .index (cur)> -1:
								jQuery.find (sel, this, null, [cur]) .length;
						}
						if (matchedSelectors [sel]) {
							matchedHandlers.push (handleObj);
						}
					}
					if (matchedHandlers.length) {
						handlerQueue.push ({elem: cur, handlers: matchedHandlers});
					}
				}
			}
		}

		// Добавляем оставшиеся (напрямую связанные) обработчики
		cur = это;
		if (DelegateCount <handlers.length) {
			handlerQueue.push ({elem: cur, handlers: handlers.slice (DelegateCount)});
		}

		return handlerQueue;
	},

	addProp: function (name, hook) {
		Object.defineProperty (jQuery.Event.prototype, name, {
			перечислимо: верно,
			настраивается: правда,

			get: isFunction (hook)?
				function () {
					if (this.originalEvent) {
							возвратный хук (this.originalEvent);
					}
				}:
				function () {
					if (this.originalEvent) {
							вернуть this.originalEvent [name];
					}
				},

			set: function (value) {
				Object.defineProperty (это, имя, {
					перечислимо: верно,
					настраивается: правда,
					доступный для записи: правда,
					значение: значение
				});
			}
		});
	},

	fix: function (originalEvent) {
		вернуть originalEvent [jQuery.expando]?
			originalEvent:
			новый jQuery.Event (originalEvent);
	},

	специальный: {
		загрузить: {

			// Предотвращаем события триггера image.load от всплывающих окон в window.load
			noBubble: правда
		},
		нажмите: {

			// Использование собственного события для обеспечения правильного состояния проверяемых входных данных
			настройка: функция (данные) {

				// Для взаимной сжимаемости с _default, замените доступ `this` на локальную переменную.
				// `|| data` - это мертвый код, предназначенный только для сохранения переменной посредством минимизации.
				var el = this || данные;

				// Утверждаем первый обработчик
				if (rcheckableType.test (el.type) &&
					el.click && nodeName (el, "input")) {

					// dataPriv.set (el, "click", ...)
					leverageNative (el, "click", returnTrue);
				}

				// Возвращаем false, чтобы разрешить нормальную обработку в вызывающей
				вернуть ложь;
			},
			триггер: функция (данные) {

				// Для взаимной сжимаемости с _default, замените доступ `this` на локальную переменную.
				// `|| data` - это мертвый код, предназначенный только для сохранения переменной посредством минимизации.
				var el = this || данные;

				// Принудительная настройка перед нажатием кнопки
				if (rcheckableType.test (el.type) &&
					el.click && nodeName (el, "input")) {

					leverageNative (el, "click");
				}

				// Возвращаем non-false, чтобы разрешить нормальное распространение пути события
				вернуть истину;
			},

			// Для согласованности между браузерами, подавить нативную .click () для ссылок
			// Также предотвратим это, если мы в настоящее время находимся внутри стека собственных событий
			_default: функция (событие) {
				var target = event.target;
				return rcheckableType.test (target.type) &&
					target.click && nodeName (target, "input") &&
					dataPriv.get (target, "click") ||
					имя_узла (цель, "а");
			}
		},

		перед выгрузкой: {
			postDispatch: функция (событие) {

				// Поддержка: Firefox 20+
				// Firefox не предупреждает, если поле returnValue не установлено.
				if (event.result! == undefined && event.originalEvent) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Гарантируем присутствие прослушивателя событий, который обрабатывает вручную
// синтетические события, прерывая прогресс до повторного вызова в ответ на
// * native * события, которые он запускает напрямую, гарантируя, что изменения состояния имеют
// уже произошло до вызова других слушателей.
function leverageNative (el, type, hopeSync) {

	// Отсутствие waitSync указывает на вызов триггера, который должен форсировать настройку через jQuery.event.add
	if (! waitSync) {
		if (dataPriv.get (el, type) === undefined) {
			jQuery.event.add (el, type, returnTrue);
		}
		вернуть;
	}

	// Зарегистрируем контроллер как специальный универсальный обработчик для всех пространств имен событий
	dataPriv.set (el, type, false);
	jQuery.event.add (el, type, {
		пространство имен: ложь,
		обработчик: функция (событие) {
			var notAsync, результат,
				сохраненный = dataPriv.get (это, тип);

			if ((event.isTrigger & 1) && this [type]) {

				// Обработка прерывания внешнего синтетического события .trigger () ed
				// Сохраненные данные должны быть ложными в таких случаях, но могут быть оставшимся объектом захвата
				// из асинхронного собственного обработчика (gh-4350)
				если (! сохранено. длина) {

					// Сохраняем аргументы для использования при обработке внутреннего нативного события
					// Всегда будет хотя бы один аргумент (объект события), поэтому этот массив
					// не будет перепутан с оставшимся объектом захвата.
					сохраненный = slice.call (аргументы);
					dataPriv.set (это, тип, сохранено);

					// Запускаем собственное событие и фиксируем его результат
					// Поддержка: IE <= 9 - 11+
					// focus () и blur () асинхронные
					notAsync =pectSync (this, type);
					этот тип ]();
					result = dataPriv.get (this, type);
					if (сохранено! == результат || notAsync) {
						dataPriv.set (this, type, false);
					} еще {
						результат = {};
					}
					if (сохранено! == результат) {

						// Отмена внешнего синтетического события
						event.stopImmediatePropagation ();
						event.preventDefault ();
						вернуть result.value;
					}

				// Если это внутреннее синтетическое событие для события с пузырьковым суррогатом
				// (фокус или размытие), предположим, что суррогат уже распространяется от запуска
				// родное событие и предотвращаем его повторение здесь.
				// Это технически дает неправильный порядок в отношении `.trigger ()` (в котором
				// пузырящийся суррогат распространяется * после * не пузырящейся основы), но это кажется
				// менее плохо, чем дублирование.
				} else if ((jQuery.event.special [type] || {}) .delegateType) {
					event.stopPropagation ();
				}

			// Если это собственное событие, запущенное выше, теперь все в порядке
			// Запускаем внутреннее синтетическое событие с оригинальными аргументами
			} else if (сохраненная длина) {

				// ... и захватить результат
				dataPriv.set (this, type, {
					значение: jQuery.event.trigger (

						// Поддержка: IE <= 9 - 11+
						// Расширяем с прототипом для сброса вышеуказанного stopImmediatePropagation ()
						jQuery.extend (сохранено [0], jQuery.Event.prototype),
						сохраненный слайс (1),
						этот
					)
				});

				// Прервать обработку нативного события
				event.stopImmediatePropagation ();
			}
		}
	});
}

jQuery.removeEvent = function (elem, type, handle) {

	// Это «если» необходимо для простых объектов
	if (elem.removeEventListener) {
		elem.removeEventListener (тип, дескриптор);
	}
};

jQuery.Event = function (src, props) {

	// Разрешить создание экземпляра без ключевого слова 'new'
	if (! (это экземпляр jQuery.Event)) {
		вернуть новый jQuery.Event (src, props);
	}

	// Объект события
	if (src && src.type) {
		this.originalEvent = src;
		this.type = src.type;

		// События, переполняющие документ, могли быть помечены как предотвращенные
		// обработчиком опускаем дерево; отразить правильное значение.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Поддержка: только Android <= 2.3
				src.returnValue === false?
			returnTrue:
			returnFalse;

		// Создать целевые свойства
		// Поддержка: только Safari <= 6 - 7
		// Цель не должна быть текстовым узлом (# 504, # 13143)
		this.target = (src.target && src.target.nodeType === 3)?
			src.target.parentNode:
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Тип события
	} еще {
		this.type = src;
	}

	// Помещаем явно предоставленные свойства в объект события
	if (реквизит) {
		jQuery.extend (это, реквизит);
	}

	// Создать временную метку, если у входящего события ее нет
	this.timeStamp = src && src.timeStamp || Date.now ();

	// Пометить это как исправленное
	this [jQuery.expando] = true;
};

// jQuery.Event основан на событиях DOM3, как указано в привязке языка ECMAScript
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	конструктор: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	warnDefault: function () {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if (e &&! this.isSimulated) {
			e.preventDefault ();
		}
	},
	stopPropagation: function () {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if (e &&! this.isSimulated) {
			e.stopPropagation ();
		}
	},
	stopImmediatePropagation: function () {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if (e &&! this.isSimulated) {
			e.stopImmediatePropagation ();
		}

		this.stopPropagation ();
	}
};

// Включает в себя все общие события, включая KeyEvent и MouseEvent.
jQuery.each ({
	altKey: правда,
	пузыри: правда,
	можно отменить: правда,
	ChangeTouches: правда,
	ctrlKey: правда,
	деталь: правда,
	eventPhase: true,
	metaKey: правда,
	pageX: правда,
	pageY: правда,
	shiftKey: правда,
	вид: правда,
	"char": правда,
	код: правда,
	charCode: true,
	ключ: правда,
	keyCode: true,
	кнопка: правда,
	кнопки: правда,
	clientX: правда,
	clientY: правда,
	offsetX: правда,
	offsetY: верно,
	pointerId: true,
	pointerType: true,
	screenX: правда,
	screenY: правда,
	targetTouches: правда,
	toElement: правда,
	прикосновения: правда,

	который: функция (событие) {
		var button = event.button;

		// Добавить что для ключевых событий
		if (event.which == null && rkeyEvent.test (event.type)) {
			return event.charCode! = null? event.charCode: event.keyCode;
		}

		// Добавить что за клик: 1 === left; 2 === средний; 3 === верно
		if (! event.which && button! == undefined && rmouseEvent.test (event.type)) {
			если (кнопка & 1) {
				возврат 1;
			}

			если (кнопка & 2) {
				возврат 3;
			}

			если (кнопка & 4) {
				возврат 2;
			}

			вернуть 0;
		}

		вернуть событие. которое;
	}
}, jQuery.event.addProp);

jQuery.each ({focus: "focusin", blur: "focusout"}, функция (type, DelegateType) {
	jQuery.event.special [type] = {

		// Используем нативное событие, если возможно, чтобы последовательность размытия / фокусировки была правильной
		setup: function () {

			// Утверждаем первый обработчик
			// dataPriv.set (this, "focus", ...)
			// dataPriv.set (this, "blur", ...)
			leverageNative (this, type, waitSync);

			// Возвращаем false, чтобы разрешить нормальную обработку в вызывающей
			вернуть ложь;
		},
		триггер: функция () {

			// Принудительная установка перед триггером
			leverageNative (это, тип);

			// Возвращаем non-false, чтобы разрешить нормальное распространение пути события
			вернуть истину;
		},

		DelegateType: DelegateType
	};
});

// Создаем указатель мыши / выход из событий, используя указатель мыши / выход и проверку времени события
// чтобы делегирование событий работало в jQuery.
// сделать то же самое для pointerenter / pointerleave и pointerover / pointerout
//
// Поддержка: только Safari 7
// Safari отправляет mouseenter слишком часто; увидеть:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// для описания ошибки (она существовала и в более старых версиях Chrome).
jQuery.each ({
	mouseenter: "наведение мыши",
	mouseleave: "mouseout",
	pointerenter: "указатель",
	указатель выхода: «указатель»
}, функция (orig, fix) {
	jQuery.event.special [orig] = {
		DelegateType: исправить,
		bindType: исправить,

		handle: function (event) {
			вар рет,
				цель = это,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// Для mouseenter / оставить вызов обработчика, если связанный находится за пределами цели.
			// NB: No relatedTarget, если мышь ушла / вошла в окно браузера
			if (! related || (related! == target &&! jQuery.contains (target, related))) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply (this, arguments);
				event.type = fix;
			}
			вернуться в отставку;
		}
	};
});

jQuery.fn.extend ({

	on: function (типы, селектор, данные, фн) {
		return on (this, types, selector, data, fn);
	},
	один: функция (типы, селектор, данные, FN) {
		return on (this, types, selector, data, fn, 1);
	},
	off: функция (типы, селектор, fn) {
		var handleObj, тип;
		if (types && types.preventDefault && types.handleObj) {

			// (событие) отправлено jQuery.Event
			handleObj = types.handleObj;
			jQuery (types.delegateTarget) .off (
				handleObj.namespace?
					handleObj.origType + "." + handleObj.namespace:
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			верни это;
		}
		if (typeof types === "object") {

			// (types-object [, селектор])
			for (введите типы) {
				this.off (тип, селектор, типы [тип]);
			}
			верни это;
		}
		if (selector === false || typeof selector === "function") {

			// (types [, fn])
			fn = селектор;
			селектор = не определено;
		}
		if (fn === false) {
			fn = returnFalse;
		}
		вернуть this.each (function () {
			jQuery.event.remove (this, types, fn, selector);
		});
	}
});


вар

	/ * eslint-disable max-len * /

	// См. Https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = / <(?! area | br | col | embed | hr | img | input | link | meta | param) (([az] [^ \ / \ 0> \ x20 \ t \ r \ n \ f] *) [^>] *) \ /> / г,

	/ * eslint-enable * /

	// Поддержка: только IE <= 10 - 11, Edge 12 - 13
	// В IE / Edge использование групп регулярных выражений вызывает серьезные замедления.
	// см. Https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = / <script | <style | <link / i,

	// проверено = "проверено" или проверено
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = / ^ \ s * <! (?: \ [CDATA \ [| -) | (?: \] \] | -)> \ s * $ / g;

// Предпочитаем tbody над родительской таблицей для размещения новых строк
function ManagingTarget (elem, content) {
	if (имя_узла (элемент, "таблица") &&
		имя_узла (content.nodeType! == 11? content: content.firstChild, "tr")) {

		return jQuery (elem) .children ("tbody") [0] || эль;
	}

	вернуть элемент;
}

// Заменить / восстановить атрибут type элементов скрипта для безопасного манипулирования DOM
function disableScript (elem) {
	elem.type = (elem.getAttribute ("type")! == null) + "/" + elem.type;
	вернуть элемент;
}
функция restoreScript (elem) {
	if ((elem.type || "") .slice (0, 5) === "true /") {
		elem.type = elem.type.slice (5);
	} еще {
		elem.removeAttribute ("тип");
	}

	вернуть элемент;
}

function cloneCopyEvent (src, dest) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, события;

	if (dest.nodeType! == 1) {
		вернуть;
	}

	// 1. Копирование личных данных: события, обработчики и т. Д.
	if (dataPriv.hasData (src)) {
		pdataOld = dataPriv.access (src);
		pdataCur = dataPriv.set (dest, pdataOld);
		events = pdataOld.events;

		if (events) {
			удалить pdataCur.handle;
			pdataCur.events = {};

			for (введите события) {
				для (i = 0, l = события [тип]. длина; i <l; i ++) {
					jQuery.event.add (dest, type, events [type] [i]);
				}
			}
		}
	}

	// 2. Скопировать данные пользователя
	if (dataUser.hasData (src)) {
		udataOld = dataUser.access (src);
		udataCur = jQuery.extend ({}, udataOld);

		dataUser.set (dest, udataCur);
	}
}

// Исправляем ошибки IE, смотрите тесты поддержки
function fixInput (src, dest) {
	var nodeName = dest.nodeName.toLowerCase ();

	// Не в состоянии сохранить проверенное состояние клонированного флажка или переключателя.
	if (nodeName === "input" && rcheckableType.test (src.type)) {
		dest.checked = src.checked;

	// Не удается вернуть выбранный параметр в выбранное по умолчанию состояние при клонировании параметров
	} else if (nodeName === "input" || nodeName === "textarea") {
		dest.defaultValue = src.defaultValue;
	}
}

функция domManip (коллекция, аргументы, обратный вызов, игнорируется) {

	// Свести все вложенные массивы
	args = concat.apply ([], args);

	фрагмент var, first, scripts, hasScripts, node, doc,
		я = 0,
		l = collection.length,
		iNoClone = 1 - 1,
		значение = аргументы [0],
		valueIsFunction = isFunction (value);

	// Мы не можем клонировать фрагменты, которые отмечены, в WebKit
	if (valueIsFunction ||
			(l> 1 && typeof value === "string" &&
				! support.checkClone && rchecked.test (value))) {
		return collection.each (function (index) {
			var self = collection.eq (index);
			if (valueIsFunction) {
				args [0] = value.call (this, index, self.html ());
			}
			domManip (self, args, callback, игнорируется);
		});
	}

	если (л) {
		фрагмент = buildFragment (аргументы, коллекция [0] .ownerDocument, ложь, коллекция, игнорируется);
		first = фрагмент.firstChild;

		if (фрагмент.childNodes.length === 1) {
			фрагмент = первый;
		}

		// Требуем либо новое содержимое, либо интерес к игнорируемым элементам для вызова обратного вызова
		if (first || игнорируется) {
			scripts = jQuery.map (getAll (фрагмент, «скрипт»), disableScript);
			hasScripts = scripts.length;

			// Использовать оригинальный фрагмент для последнего элемента
			// вместо первого, потому что это может закончиться
			// неправильно опорожняется в определенных ситуациях (# 8070).
			for (; i <l; i ++) {
				узел = фрагмент;

				if (i! == iNoClone) {
					node = jQuery.clone (узел, правда, правда);

					// Сохраняем ссылки на клонированные скрипты для последующего восстановления
					if (hasScripts) {

						// Поддержка: только Android <= 4.0, только PhantomJS 1
						// push.apply (_, arraylike) создает древний WebKit
						jQuery.merge (scripts, getAll (узел, «скрипт»));
					}
				}

				callback.call (collection [i], node, i);
			}

			if (hasScripts) {
				doc = scripts [scripts.length - 1] .ownerDocument;

				// Reenable скрипты
				jQuery.map (scripts, restoreScript);

				// Оцениваем исполняемые скрипты при первой вставке документа
				for (i = 0; i <hasScripts; i ++) {
					узел = сценарии [я];
					if (rscriptType.test (node.type || "") &&
						! dataPriv.access (node, "globalEval") &&
						jQuery.contains (документ, узел)) {

						if (node.src && (node.type || "") .toLowerCase ()! == "module") {

							// Необязательная зависимость AJAX, но не запускает сценарии, если ее нет
							if (jQuery._evalUrl &&! node.noModule) {
								jQuery._evalUrl (node.src, {
									nonce: node.nonce || node.getAttribute ("nonce")
								});
							}
						} еще {
							DOMEval (node.textContent.replace (rcleanScript, ""), node, doc);
						}
					}
				}
			}
		}
	}

	возврат коллекции;
}

функция удаления (элемент, селектор, keepData) {
	Var узел,
		узлы = селектор? jQuery.filter (селектор, элемент): элемент,
		я = 0;

	for (; (node ​​= node [i])! = null; i ++) {
		if (! keepData && node.nodeType === 1) {
			jQuery.cleanData (getAll (node));
		}

		if (node.parentNode) {
			if (keepData && isAttached (node)) {
				setGlobalEval (getAll (node, "script"));
			}
			node.parentNode.removeChild (node);
		}
	}

	вернуть элемент;
}

jQuery.extend ({
	htmlPrefilter: function (html) {
		return html.replace (rxhtmlTag, "<$ 1> </ $ 2>");
	},

	clone: ​​function (elem, dataAndEvents, deepDataAndEvents) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode (true),
			inPage = isAttached (elem);

		// Исправляем проблемы клонирования IE
		if (! support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
				! jQuery.isXMLDoc (elem)) {

			// Мы отказываемся от Sizzle здесь из соображений производительности: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll (клон);
			srcElements = getAll (elem);

			для (i = 0, l = srcElements.length; i <l; i ++) {
				fixInput (srcElements [i], destElements [i]);
			}
		}

		// Копируем события из оригинала в клон
		if (dataAndEvents) {
			if (deepDataAndEvents) {
				srcElements = srcElements || getAll (elem);
				destElements = destElements || getAll (клон);

				для (i = 0, l = srcElements.length; i <l; i ++) {
					cloneCopyEvent (srcElements [i], destElements [i]);
				}
			} еще {
				cloneCopyEvent (элемент, клон);
			}
		}

		// Сохраняем историю оценки скрипта
		destElements = getAll (clone, "script");
		if (destElements.length> 0) {
			setGlobalEval (destElements,! inPage && getAll (elem, "script"));
		}

		// Возвращаем клонированный набор
		вернуть клона;
	},

	cleanData: function (elems) {
		var data, elem, type,
			special = jQuery.event.special,
			я = 0;

		for (; (elem = elems [i])! == undefined; i ++) {
			if (acceptData (elem)) {
				if ((data = elem [dataPriv.expando])) {
					if (data.events) {
						for (введите data.events) {
							if (special [type]) {
								jQuery.event.remove (элемент, тип);

							// Это ярлык, чтобы избежать накладных расходов jQuery.event.remove
							} еще {
								jQuery.removeEvent (elem, type, data.handle);
							}
						}
					}

					// Поддержка: Chrome <= 35 - 45+
					// Назначаем undefined вместо использования delete, см. Data # remove
					elem [dataPriv.expando] = не определено;
				}
				if (elem [dataUser.expando]) {

					// Поддержка: Chrome <= 35 - 45+
					// Назначаем undefined вместо использования delete, см. Data # remove
					elem [dataUser.expando] = не определено;
				}
			}
		}
	}
});

jQuery.fn.extend ({
	detach: function (селектор) {
		возврат удалить (это, селектор, правда);
	},

	удалить: функция (селектор) {
		возврат удалить (это, селектор);
	},

	текст: функция (значение) {
		вернуть доступ (это, функция (значение) {
			возвращаемое значение === не определено?
				jQuery.text (это):
				this.empty (). each (function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length);
	},

	append: function () {
		return domManip (this, arguments, function (elem) {
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = манипуляцияTarget (this, elem);
				target.appendChild (elem);
			}
		});
	},

	prepend: function () {
		return domManip (this, arguments, function (elem) {
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = манипуляцияTarget (this, elem);
				target.insertBefore (elem, target.firstChild);
			}
		});
	},

	перед: функция () {
		return domManip (this, arguments, function (elem) {
			if (this.parentNode) {
				this.parentNode.insertBefore (элемент, это);
			}
		});
	},

	после: функция () {
		return domManip (this, arguments, function (elem) {
			if (this.parentNode) {
				this.parentNode.insertBefore (elem, this.nextSibling);
			}
		});
	},

	пусто: функция () {
		вар элем,
			я = 0;

		for (; (elem = this [i])! = null; i ++) {
			if (elem.nodeType === 1) {

				// Предотвращаем утечки памяти
				jQuery.cleanData (getAll (elem, false));

				// Удалить все оставшиеся узлы
				elem.textContent = "";
			}
		}

		верни это;
	},

	clone: ​​function (dataAndEvents, deepDataAndEvents) {
		dataAndEvents = dataAndEvents == null? false: dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null? dataAndEvents: deepDataAndEvents;

		вернуть this.map (function () {
			return jQuery.clone (this, dataAndEvents, deepDataAndEvents);
		});
	},

	html: function (value) {
		вернуть доступ (это, функция (значение) {
			var elem = this [0] || {},
				я = 0,
				l = эта длина;

			if (value === undefined && elem.nodeType === 1) {
				вернуть elem.innerHTML;
			}

			// Посмотрим, сможем ли мы воспользоваться ярлыком и просто использовать innerHTML
			if (typeof value === "string" &&! rnoInnerhtml.test (value) &&
				! wrapMap [(rtagName.exec (значение) || ["", ""]) [1] .toLowerCase ()]) {

				value = jQuery.htmlPrefilter (value);

				пытаться {
					for (; i <l; i ++) {
						elem = this [i] || {};

						// Удалить узлы элементов и предотвратить утечки памяти
						if (elem.nodeType === 1) {
							jQuery.cleanData (getAll (elem, false));
							elem.innerHTML = значение;
						}
					}

					элем = 0;

				// Если с помощью innerHTML выдается исключение, используйте метод fallback
				} catch (e) {}
			}

			if (elem) {
				this.empty (). append (значение);
			}
		}, null, value, arguments.length);
	},

	replaceWith: function () {
		var ignored = [];

		// Вносим изменения, заменяя каждый элемент игнорируемого контекста новым содержимым
		return domManip (this, arguments, function (elem) {
			var parent = this.parentNode;

			if (jQuery.inArray (this, игнорируется) <0) {
				jQuery.cleanData (getAll (this));
				if (parent) {
					parent.replaceChild (элемент, это);
				}
			}

		// Принудительный вызов обратного вызова
		}, игнорируется);
	}
});

jQuery.each ({
	appendTo: «append»,
	prependTo: «prepend»,
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, функция (имя, оригинал) {
	jQuery.fn [имя] = функция (селектор) {
		вар элемс,
			ret = [],
			insert = jQuery (селектор),
			last = insert.length - 1,
			я = 0;

		for (; i <= last; i ++) {
			elems = я === последний? this: this.clone (true);
			jQuery (вставить [i]) [оригинал] (elems);

			// Поддержка: только Android <= 4.0, только PhantomJS 1
			// .get (), потому что push.apply (_, arraylike) создает древний WebKit
			push.apply (ret, elems.get ());
		}

		вернуть this.pushStack (ret);
	};
});
var rnumnonpx = new RegExp ("^ (" + pnum + ") (?! px) [az%] + $", "i");

var getStyles = function (elem) {

		// Поддержка: только IE <= 11, Firefox <= 30 (# 15098, # 14150)
		// IE генерирует элементы, созданные во всплывающих окнах
		// FF тем временем бросает на элементы кадра через "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (! view ||! view.opener) {
			вид = окно;
		}

		return view.getComputedStyle (elem);
	};

var rboxStyle = new RegExp (cssExpand.join ("|"), "i");



(function () {

	// Для выполнения обоих тестов pixelPosition и boxSizingReliable требуется только один макет
	// поэтому они выполняются одновременно, чтобы сохранить второе вычисление.
	function computeStyleTests () {

		// Это синглтон, нам нужно выполнить его только один раз
		if (! div) {
			вернуть;
		}

		container.style.cssText = "позиция: абсолютная; слева: -11111px; ширина: 60px;" +
			"Верхнее поле: 1px; утеплитель: 0; граница: 0";
		div.style.cssText =
			«Положение: относительная; дисплей: блок; коробчатого проклейки: границы коробки; переполнения: прокрутки;» +
			"Маржа: авто; границы: 1px; обивка: 1px;" +
			"Ширина: 60%; сверху: 1%";
		documentElement.appendChild (container) .appendChild (div);

		var divStyle = window.getComputedStyle (div);
		pixelPositionVal = divStyle.top! == "1%";

		// Поддержка: только Android 4.0 - 4.3, Firefox <= 3 - 44
		reliableMarginLeftVal = roundPixelMeasures (divStyle.marginLeft) === 12;

		// Поддержка: только Android 4.0 - 4.3, Safari <= 9.1 - 10.1, iOS <= 7.0 - 9.3
		// Некоторые стили возвращаются с процентными значениями, хотя они не должны
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures (divStyle.right) === 36;

		// Поддержка: только IE 9 - 11
		// Обнаружение искажения измерений содержимого для размеров блока: элементы border-box
		boxSizingReliableVal = roundPixelMeasures (divStyle.width) === 36;

		// Поддержка: только IE 9
		// Обнаружение переполнения: скручиваемость скручивания (gh-3699)
		// Поддержка: Chrome <= 64
		// Не обманывайте себя, когда зум влияет на offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures (div.offsetWidth / 3) === 12;

		documentElement.removeChild (контейнер);

		// Обнуляем div, чтобы он не сохранялся в памяти и
		// это также будет признаком того, что проверки уже выполнены
		div = ноль;
	}

	функция roundPixelMeasures (measure) {
		вернуть Math.round (parseFloat (measure));
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement ("div"),
		div = document.createElement ("div");

	// Завершить рано в ограниченных (не браузерных) средах
	if (! div.style) {
		вернуть;
	}

	// Поддержка: только IE <= 9 - 11
	// Стиль клонированного элемента влияет на исходный клонированный элемент (# 8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode (true) .style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend (поддержка, {
		boxSizingReliable: function () {
			computeStyleTests ();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function () {
			computeStyleTests ();
			return pixelBoxStylesVal;
		},
		pixelPosition: function () {
			computeStyleTests ();
			return pixelPositionVal;
		},
		reliableMarginLeft: function () {
			computeStyleTests ();
			вернуть надежныйMarginLeftVal;
		},
		scrollboxSize: function () {
			computeStyleTests ();
			return scrollboxSizeVal;
		}
	});
}) ();


функция curCSS (элемент, имя, вычисляется) {
	переменная ширина, minWidth, maxWidth, ret,

		// Поддержка: Firefox 51+
		// Получение стиля перед вычислением
		// исправляет проблему с получением неправильных значений
		// на отдельных элементах
		style = elem.style;

	computed = computed || getStyles (elem);

	// getPropertyValue необходим для:
	// .css ('фильтр') (только IE 9, # 12537)
	// .css ('- customProperty) (# 3144)
	if (вычислено) {
		ret = computed.getPropertyValue (name) || вычислил [имя];

		if (ret === "" &&! isAttached (elem)) {
			ret = jQuery.style (elem, name);
		}

		// Дань "удивительному взлому Дина Эдвардса"
		// Браузер Android возвращает процент для некоторых значений,
		// но ширина кажется надежной в пикселях.
		// Это против спецификации проекта CSSOM:
		// https://drafts.csswg.org/cssom/#resolved-values
		if (! support.pixelBoxStyles () && rnumnonpx.test (ret) && rboxStyle.test (name)) {

			// Запомним исходные значения
			ширина = стиль. ширина;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Вставляем новые значения, чтобы получить вычисленное значение
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Восстановить измененные значения
			style.width = ширина;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	возвращение ret! == undefined?

		// Поддержка: только IE <= 9 - 11
		// IE возвращает значение zIndex в виде целого числа.
		ret + "":
		RET;
}


function addGetHookIf (conditionFn, hookFn) {

	// Определим хук, мы проверим при первом запуске, действительно ли он нужен.
	вернуть {
		get: function () {
			if (conditionFn ()) {

				// Крючок не нужен (или его невозможно использовать из-за
				// к отсутствующей зависимости), удалите ее.
				удалить this.get;
				вернуть;
			}

			// Требуется крюк; переопределите его так, чтобы тест поддержки не выполнялся снова.
			return (this.get = hookFn) .apply (this, аргументы);
		}
	};
}


var cssPrefixes = ["Webkit", "Moz", "ms"],
	emptyStyle = document.createElement ("div") .style,
	vendorProps = {};

// Возвращаем свойство с префиксом поставщика или неопределенное
function vendorPropName (name) {

	// Проверка имен поставщиков с префиксом
	var capName = name [0] .toUpperCase () + name.slice (1),
		я = cssPrefixes.length;

	в то время как я-- ) {
		name = cssPrefixes [i] + capName;
		if (имя в emptyStyle) {
			вернуть имя;
		}
	}
}

// Возвращаем потенциально сопоставленное свойство jQuery.cssProps или префикс поставщика
function finalPropName (name) {
	var final = jQuery.cssProps [имя] || vendorProps [имя];

	if (final) {
		вернуть финал;
	}
	if (имя в emptyStyle) {
		вернуть имя;
	}
	return vendorProps [имя] = vendorPropName (имя) || название;
}


вар

	// Возможность замены, если display отсутствует или начинается с таблицы
	// кроме "table", "table-cell" или "table-caption"
	// Смотрите здесь для отображения значений: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = / ^ - /,
	cssShow = {position: "absolute", видимость: "hidden", display: "block"},
	cssNormalTransform = {
		LetterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber (elem, value, subtract) {

	// Все относительные (+/-) значения уже были
	// нормализуется в этой точке
	var соответствия = rcssNum.exec (значение);
	возвращать совпадения?

		// Защита от неопределенного «вычитания», например, при использовании как в cssHooks
		Math.max (0, соответствует [2] - (вычитать || 0)) + (соответствует [3] || "px"):
		значение;
}

function boxModelAdjustment (elem, измерение, коробка, isBorderBox, стили, computedVal) {
	var я = размерность === "ширина"? 1: 0,
		дополнительно = 0,
		дельта = 0;

	// Регулировка может не потребоваться
	if (box === (isBorderBox? "border": "content")) {
		вернуть 0;
	}

	для (; i <4; i + = 2) {

		// Обе блочные модели исключают маржу
		if (box === "margin") {
			delta + = jQuery.css (elem, box + cssExpand [i], true, styles);
		}

		// Если мы попадаем сюда с блоком контента, мы ищем «padding» или «border» или «margin»
		if (! isBorderBox) {

			// Добавить отступы
			delta + = jQuery.css (elem, "padding" + cssExpand [i], true, styles);

			// Для "border" или "margin" добавляем рамку
			if (box! == "padding") {
				delta + = jQuery.css (elem, "border" + cssExpand [i] + "Width", true, styles);

			// Но все равно следите за этим в противном случае
			} еще {
				extra + = jQuery.css (elem, "border" + cssExpand [i] + "Width", true, styles);
			}

		// Если мы попадаем сюда с рамкой границы (контент + заполнение + граница), мы ищем «контент» или
		// "padding" или "margin"
		} еще {

			// Для "содержимого" вычитаем отступ
			if (box === "content") {
				delta - = jQuery.css (elem, "padding" + cssExpand [i], true, styles);
			}

			// Для «содержимого» или «отступа» вычитаем границу
			if (box! == "margin") {
				delta - = jQuery.css (elem, "border" + cssExpand [i] + "Width", true, styles);
			}
		}
	}

	// Учет положительного прокрутки в поле содержимого при запросе с помощью computedVal
	if (! isBorderBox && computedVal> = 0) {

		// offsetWidth / offsetHeight - округленная сумма содержимого, отступов, желоба прокрутки и границы
		// Предполагая целочисленную прокрутку желоба, вычитаем остаток и округляем вниз
		delta + = Math.max (0, Math.ceil (
			elem ["offset" + dimension [0] .toUpperCase () + dimension.slice (1)] -
			computedVal -
			дельта -
			дополнительно -
			0,5

		// Если offsetWidth / offsetHeight неизвестен, то мы не можем определить желоб прокрутки блока содержимого
		// Используем явный ноль, чтобы избежать NaN (gh-3964)
		)) || 0;
	}

	возврат дельта;
}

функция getWidthOrHeight (элемент, размерность, дополнительный) {

	// Начнем с вычисленного стиля
	var styles = getStyles (elem),

		// Чтобы избежать форсировки, выбирайте boxSizing, только если нам это нужно (gh-4322).
		// Подделка поля содержимого, пока мы не узнаем, что нужно знать истинное значение.
		boxSizingNeeded =! support.boxSizingReliable () || дополнительно,
		isBorderBox = boxSizingNeeded &&
			jQuery.css (elem, "boxSizing", false, styles) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS (элемент, размерность, стили),
		offsetProp = "offset" + dimension [0] .toUpperCase () + dimension.slice (1);

	// Поддержка: Firefox <= 54
	// Возвращаем смешанное непиксельное значение или симулируемое невежество, в зависимости от ситуации.
	if (rnumnonpx.test (val)) {
		if (! extra) {
			возврат val;
		}
		val = "auto";
	}


	// Возвращаемся к offsetWidth / offsetHeight, когда значение равно «auto»
	// Это происходит для встроенных элементов без явной настройки (gh-3571)
	// Поддержка: только Android <= 4.1 - 4.3
	// Также используем offsetWidth / offsetHeight для некорректных встроенных размеров (gh-3602)
	// Поддержка: только IE 9-11
	// Также используем offsetWidth / offsetHeight для случаев, когда размеры блока ненадежны
	// Мы используем getClientRects () для проверки скрытого / отключенного.
	// В этих случаях вычисляемому значению можно доверять как border-box
	if ((! support.boxSizingReliable () && isBorderBox ||
		val === "auto" ||
		! parseFloat (val) && jQuery.css (elem, "display", false, styles) === "inline") &&
		elem.getClientRects (). length) {

		isBorderBox = jQuery.css (elem, "boxSizing", false, styles) === "border-box";

		// Где доступно, offsetWidth / offsetHeight приблизительные размеры рамки.
		// Там, где это невозможно (например, SVG), предположим ненадежный размер поля и интерпретируем
		// извлекаем значение в качестве измерения поля содержимого.
		valueIsBorderBox = offsetProp in elem;
		if (valueIsBorderBox) {
			val = elem [offsetProp];
		}
	}

	// Нормализуем "" и авто
	val = parseFloat (val) || 0;

	// Подгоняем для блочной модели элемента
	возврат (val +
		boxModelAdjustment (
			эль,
			измерение,
			дополнительный || (isBorderBox? "border": "content"),
			valueIsBorderBox,
			стили,

			// Предоставляем текущий вычисленный размер для запроса расчета желоба прокрутки (gh-3589)
			вал
		)
	) + "px";
}

jQuery.extend ({

	// Добавляем хуки свойств стиля для переопределения по умолчанию
	// поведение получения и установки свойства стиля
	cssHooks: {
		непрозрачность: {
			get: function (elem, computed) {
				if (вычислено) {

					// Мы должны всегда возвращать число из непрозрачности
					var ret = curCSS (elem, "opacity");
					return ret === ""? «1»: ret;
				}
			}
		}
	},

	// Не добавляем автоматически «px» в эти свойства, не имеющие единиц измерения
	cssNumber: {
		"animationIterationCount": правда,
		"columnCount": правда,
		"fillOpacity": правда,
		"flexGrow": правда,
		"flexShrink": правда,
		"fontWeight": правда,
		"gridArea": ​​правда,
		"gridColumn": правда,
		"gridColumnEnd": правда,
		"gridColumnStart": правда,
		"gridRow": правда,
		"gridRowEnd": правда,
		"gridRowStart": правда,
		"lineHeight": правда,
		«непрозрачность»: правда,
		«порядок»: правда,
		"сироты": правда,
		"вдовы": правда,
		"zIndex": правда,
		«зум»: правда
	},

	// Добавить в свойства, имена которых вы хотите исправить до
	// установка или получение значения
	cssProps: {},

	// Получить и установить свойство стиля на узле DOM
	style: function (elem, name, value, extra) {

		// Не устанавливать стили для узлов текста и комментариев
		if (! elem || elem.nodeType === 3 || elem.nodeType === 8 ||! elem.style) {
			вернуть;
		}

		// Убедитесь, что мы работаем с правильным именем
		var ret, type, hooks,
			origName = camelCase (name),
			isCustomProp = rcustomProp.test (name),
			style = elem.style;

		// Убедитесь, что мы работаем с правильным именем. Мы не
		// хотим запросить значение, если это пользовательское свойство CSS
		// так как они определены пользователем.
		if (! isCustomProp) {
			name = finalPropName (origName);
		}

		// Получает ловушку для префиксной версии, а затем для префиксной версии
		hooks = jQuery.cssHooks [имя] || jQuery.cssHooks [origName];

		// Проверяем, устанавливаем ли мы значение
		if (значение! == не определено) {
			type = typeof значение;

			// Преобразование "+ =" или "- =" в относительные числа (# 7345)
			if (type === "string" && (ret = rcssNum.exec (значение)) && ret [1]) {
				значение = настроить CSS (элемент, имя, ret);

				// Исправляем ошибку # 9237
				type = "number";
			}

			// Убедитесь, что значения NULL и NaN не установлены (# 7116)
			if (value == null || value! == value) {
				вернуть;
			}

			// Если передано число, добавьте модуль (за исключением определенных свойств CSS)
			// Проверка isCustomProp может быть удалена в jQuery 4.0, когда мы только автоматически добавляем
			// «px» для нескольких жестко закодированных значений.
			if (type === "number" &&! isCustomProp) {
				значение + = ret && ret [3] || (jQuery.cssNumber [origName]? "": "px");
			}

			// background- * реквизит влияет на исходные значения клона
			if (! support.clearCloneStyle && value === "" && name.indexOf ("background") === 0) {
				style [name] = "унаследовать";
			}

			// Если был предоставлен хук, используйте это значение, в противном случае просто установите указанное значение
			if (! hooks ||! ("set" в hooks) ||
				(value = hooks.set (elem, value, extra))! == undefined) {

				if (isCustomProp) {
					style.setProperty (имя, значение);
				} еще {
					стиль [имя] = значение;
				}
			}

		} еще {

			// Если был предоставлен хук, получить не вычисленное значение оттуда
			if (hooks && "get" в hooks &&
				(ret = hooks.get (elem, false, extra))! == undefined) {

				вернуться в отставку;
			}

			// В противном случае просто получить значение из объекта стиля
			вернуть стиль [имя];
		}
	},

	css: function (elem, name, extra, styles) {
		var val, num, крючки,
			origName = camelCase (name),
			isCustomProp = rcustomProp.test (name);

		// Убедитесь, что мы работаем с правильным именем. Мы не
		// хотим изменить значение, если это пользовательское свойство CSS
		// так как они определены пользователем.
		if (! isCustomProp) {
			name = finalPropName (origName);
		}

		// Попробуйте префиксное имя, за которым следует префиксное имя
		hooks = jQuery.cssHooks [имя] || jQuery.cssHooks [origName];

		// Если был предоставлен хук, получить вычисленное значение оттуда
		if (hooks && "get" in hooks) {
			val = hooks.get (elem, true, extra);
		}

		// В противном случае, если существует способ получить вычисленное значение, используйте это
		if (val === undefined) {
			val = curCSS (элемент, имя, стили);
		}

		// Преобразовать «нормальное» значение в вычисленное
		if (val === "normal" && name в cssNormalTransform) {
			val = cssNormalTransform [name];
		}

		// Сделать числовое значение, если принудительно или был указан квалификатор, а val выглядит числовым
		if (extra === "" || extra) {
			num = parseFloat (val);
			вернуть лишний === правда || isFinite (число)? число || 0: val;
		}

		возврат val;
	}
});

jQuery.each (["height", "width"], функция (i, размерность) {
	jQuery.cssHooks [измерение] = {
		get: function (elem, computed, extra) {
			if (вычислено) {

				// Некоторые элементы могут иметь информацию о размерах, если мы их незаметно показываем
				// но у него должен быть текущий стиль отображения, который принесет пользу
				return rdisplayswap.test (jQuery.css (elem, "display")) &&

					// Поддержка: Safari 8+
					// Столбцы таблицы в Safari имеют ненулевое значение offsetWidth & zero
					// getBoundingClientRect (). width, если не изменяется отображение.
					// Поддержка: только IE <= 11
					// Запуск getBoundingClientRect на отключенном узле
					// в IE выдает ошибку.
					(! elem.getClientRects (). length ||! elem.getBoundingClientRect (). width)?
						swap (elem, cssShow, function () {
							return getWidthOrHeight (элемент, размерность, дополнительный);
						}):
						getWidthOrHeight (элемент, размерность, дополнительный);
			}
		},

		set: function (elem, value, extra) {
			вар совпадений,
				styles = getStyles (elem),

				// Чтение styles.position только в том случае, если у теста есть шанс провалиться
				// чтобы избежать форсировки.
				scrollboxSizeBuggy =! support.scrollboxSize () &&
					styles.position === "Абсолют",

				// Чтобы избежать форсировки, выбирайте boxSizing, только если он нам нужен (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || дополнительно,
				isBorderBox = boxSizingNeeded &&
					jQuery.css (elem, "boxSizing", false, styles) === "border-box",
				вычесть = дополнительно?
					boxModelAdjustment (
						эль,
						измерение,
						дополнительно,
						isBorderBox,
						стили
					):
					0;

			// Учет ненадежных размеров рамки, сравнивая смещение * с вычисленным и
			// подделка поля содержимого, чтобы получить границы и отступы (gh-3699)
			if (isBorderBox && scrollboxSizeBuggy) {
				вычесть - = Math.ceil (
					elem ["offset" + dimension [0] .toUpperCase () + dimension.slice (1)] -
					parseFloat (styles [измерение]) -
					boxModelAdjustment (элемент, измерение, «граница», false, стили) -
					0,5
				);
			}

			// Конвертировать в пиксели, если требуется корректировка значения
			if (вычесть && (соответствует = rcssNum.exec (значение)) &&
				(соответствует [3] || "px")! == "px") {

				elem.style [измерение] = значение;
				значение = jQuery.css (элемент, размерность);
			}

			return setPositiveNumber (элемент, значение, вычитать);
		}
	};
});

jQuery.cssHooks.marginLeft = addGetHookIf (support.reliableMarginLeft,
	function (elem, computed) {
		if (вычислено) {
			return (parseFloat (curCSS (elem, "marginLeft")) ||
				elem.getBoundingClientRect (). left -
					swap (elem, {marginLeft: 0}, function () {
						return elem.getBoundingClientRect (). left;
					})
				) + "px";
		}
	}
);

// Эти хуки используются animate для расширения свойств
jQuery.each ({
	поле: "",
	padding: "",
	ширина рамки"
}, функция (префикс, суффикс) {
	jQuery.cssHooks [префикс + суффикс] = {
		развернуть: функция (значение) {
			var i = 0,
				расширенный = {},

				// Предполагается одно число, если не строка
				parts = typeof value === "строка"? value.split (""): [value];

			для (; i <4; i ++) {
				расширенный [префикс + cssExpand [i] + суффикс] =
					части [я] || части [i - 2] || части [0];
			}

			возврат расширен;
		}
	};

	if (префикс! == "margin") {
		jQuery.cssHooks [префикс + суффикс] .set = setPositiveNumber;
	}
});

jQuery.fn.extend ({
	css: function (имя, значение) {
		вернуть доступ (this, функция (elem, name, value) {
			вар стили, лен,
				карта = {},
				я = 0;

			if (Array.isArray (name)) {
				styles = getStyles (elem);
				len = name.length;

				for (; i <len; i ++) {
					map [name [i]] = jQuery.css (элемент, имя [i], false, стили);
				}

				карта возврата;
			}

			возвращаемое значение! == undefined?
				jQuery.style (элемент, имя, значение):
				jQuery.css (элемент, имя);
		}, имя, значение, arguments.length> 1);
	}
});


функция Tween (элемент, опции, опора, конец, ослабление) {
	вернуть новый Tween.prototype.init (elem, options, prop, end, easing);
}
jQuery.Tween = Tween;

Tween.prototype = {
	конструктор: Твин,
	init: function (elem, options, prop, end, easing, unit) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur ();
		this.end = end;
		this.unit = unit || (jQuery.cssNumber [prop]? "": "px");
	},
	cur: function () {
		var hooks = Tween.propHooks [this.prop];

		вернуть крючки && hooks.get?
			hooks.get (это):
			Tween.propHooks._default.get (this);
	},
	run: function (процент) {
		облегченный,
			hooks = Tween.propHooks [this.prop];

		if (this.options.duration) {
			this.pos = eased = jQuery.easing [this.easing] (
				процентов, this.options.duration * процентов, 0, 1, this.options.duration
			);
		} еще {
			this.pos = ослаблено = проценты;
		}
		this.now = (this.end - this.start) * облегчено + this.start;

		if (this.options.step) {
			this.options.step.call (this.elem, this.now, this);
		}

		if (hooks && hooks.set) {
			hooks.set (это);
		} еще {
			Tween.propHooks._default.set (this);
		}
		верни это;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_дефолт: {
		get: function (tween) {
			Var результат;

			// Используем свойство элемента напрямую, когда он не является элементом DOM,
			// или когда нет соответствующего свойства стиля, который существует.
			if (tween.elem.nodeType! == 1 ||
				tween.elem [tween.prop]! = null && tween.elem.style [tween.prop] == null) {
				вернуть tween.elem [tween.prop];
			}

			// Передача пустой строки в качестве 3-го параметра в .css автоматически
			// попытаться выполнить parseFloat и выполнить возврат к строке, если анализ не удастся.
			// Простые значения, такие как "10px", анализируются на Float;
			// сложные значения, такие как "rotate (1rad)", возвращаются как есть.
			result = jQuery.css (tween.elem, tween.prop, "");

			// Пустые строки, null, undefined и "auto" преобразуются в 0.
			вернуть! результат || результат === "авто"? 0: результат;
		},
		set: function (tween) {

			// Используем пошаговый хук для обратного сжатия
			// Используем cssHook, если он там есть.
			// Используйте .style, если доступно, и используйте обычные свойства, если они доступны.
			if (jQuery.fx.step [tween.prop]) {
				jQuery.fx.step [tween.prop] (tween);
			} else if (tween.elem.nodeType === 1 && (
					jQuery.cssHooks [tween.prop] ||
					tween.elem.style [finalPropName (tween.prop)]! = null)) {
				jQuery.style (tween.elem, tween.prop, tween.now + tween.unit);
			} еще {
				tween.elem [tween.prop] = tween.now;
			}
		}
	}
};

// Поддержка: только IE <= 9
// Панический подход к настройке вещей на отключенных узлах
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function (tween) {
		if (tween.elem.nodeType && tween.elem.parentNode) {
			tween.elem [tween.prop] = tween.now;
		}
	}
};

jQuery.easing = {
	линейный: функция (р) {
		возврат р;
	},
	качели: функция (р) {
		возврат 0,5 - Math.cos (p * Math.PI) / 2;
	},
	_default: "качели"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 точка расширения
jQuery.fx.step = {};




вар
	fxNow, inProgress,
	rfxtypes = / ^ (?: toggle | show | hide) $ /,
	rrun = / queueHooks $ /;

расписание функций () {
	if (inProgress) {
		if (document.hidden === false && window.requestAnimationFrame) {
			window.requestAnimationFrame (расписание);
		} еще {
			window.setTimeout (schedule, jQuery.fx.interval);
		}

		jQuery.fx.tick ();
	}
}

// Анимации, созданные синхронно, будут работать синхронно
function createFxNow () {
	window.setTimeout (function () {
		fxNow = не определено;
	});
	return (fxNow = Date.now ());
}

// Генерация параметров для создания стандартной анимации
function genFx (type, includeWidth) {
	вар который,
		я = 0,
		attrs = {высота: тип};

	// Если мы включаем ширину, значение шага равно 1, чтобы сделать все значения cssExpand,
	// в противном случае значение шага равно 2 для пропуска влево и вправо
	includeWidth = includeWidth? 1: 0;
	for (; i <4; i + = 2 - includeWidth) {
		which = cssExpand [i];
		attrs ["margin" + which] = attrs ["padding" + which] = тип;
	}

	if (includeWidth) {
		attrs.opacity = attrs.width = тип;
	}

	вернуть атрибуты;
}

функция createTween (значение, реквизит, анимация) {
	вар твен,
		collection = (Animation.tweeners [prop] || []) .concat (Animation.tweeners ["*"]),
		индекс = 0,
		длина = коллекция. длина;
	for (; index <длина; index ++) {
		if ((tween = collection [index] .call (animation, prop, value))) {

			// Мы закончили с этим свойством
			вернуть подростка;
		}
	}
}

function defaultPrefilter (elem, props, opts) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "ширина" в подпорках || «высота» в подпорках,
		аним = это,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree (elem),
		dataShow = dataPriv.get (elem, "fxshow");

	// анимация пропуска очереди
	if (! opts.queue) {
		hooks = jQuery._queueHooks (elem, "fx");
		if (hooks.unqueued == null) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function () {
				if (! hooks.unqueued) {
					oldfire ();
				}
			};
		}
		hooks.unqueued ++;

		anim.always (function () {

			// Убедитесь, что обработчик завершён до того, как завершится
			anim.always (function () {
				hooks.unqueued--;
				if (! jQuery.queue (elem, "fx") .length) {
					hooks.empty.fire ();
				}
			});
		});
	}

	// Обнаружение показать / скрыть анимацию
	для (опора в реквизит) {
		значение = реквизит [проп];
		if (rfxtypes.test (value)) {
			удалить реквизит [prop];
			toggle = toggle || значение === "переключить";
			if (value === (hidden? "hide": "show")) {

				// Притворяться скрытым, если это «шоу» и
				// все еще есть данные из остановленного шоу / скрытия
				if (значение === "показать" && dataShow && dataShow [prop]! == undefined) {
					скрытый = правда;

				// Игнорируем все другие неоперативные показ / скрытие данных
				} еще {
					Продолжить;
				}
			}
			orig [prop] = dataShow && dataShow [prop] || jQuery.style (elem, prop);
		}
	}

	// Выручаем, если это не работает, как .hide (). Hide ()
	propTween =! jQuery.isEmptyObject (props);
	if (! propTween && jQuery.isEmptyObject (orig)) {
		вернуть;
	}

	// Ограничиваем стили «переполнение» и «отображение» во время анимации блока
	if (isBox && elem.nodeType === 1) {

		// Поддержка: IE <= 9 - 11, Edge 12 - 15
		// Записать все 3 атрибута переполнения, потому что IE не выводит сокращение
		// из одинаково значимых overflowX и overflowY, а Edge просто отражает
		// значение overflowX там.
		opts.overflow = [style.overflow, style.overflowX, style.overflowY];

		// Идентифицируем тип отображения, предпочитая старые данные показа / скрытия над каскадом CSS
		restoreDisplay = dataShow && dataShow.display;
		if (restoreDisplay == null) {
			restoreDisplay = dataPriv.get (elem, "display");
		}
		display = jQuery.css (elem, "display");
		if (display === "none") {
			if (restoreDisplay) {
				display = restoreDisplay;
			} еще {

				// Получить непустые значения, временно форсируя видимость
				showHide ([элемент], правда);
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css (elem, "display");
				showHide ([элемент]);
			}
		}

		// Анимировать встроенные элементы как встроенный блок
		if (display === "inline" || display === "inline-block" && restoreDisplay! = null) {
			if (jQuery.css (elem, "float") === "none") {

				// Восстанавливаем исходное значение отображения в конце чистой анимации шоу / скрытия
				if (! propTween) {
					anim.done (function () {
						style.display = restoreDisplay;
					});
					if (restoreDisplay == null) {
						display = style.display;
						restoreDisplay = display === "нет"? "": дисплей;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if (opts.overflow) {
		style.overflow = "скрытый";
		anim.always (function () {
			style.overflow = opts.overflow [0];
			style.overflowX = opts.overflow [1];
			style.overflowY = opts.overflow [2];
		});
	}

	// Реализовать / скрыть анимацию
	propTween = false;
	for (опора в оригинале) {

		// Общие настройки показа / скрытия анимации этого элемента
		if (! propTween) {
			if (dataShow) {
				if («скрыто» в dataShow) {
					скрытый = dataShow.hidden;
				}
			} еще {
				dataShow = dataPriv.access (elem, "fxshow", {display: restoreDisplay});
			}

			// Сохраняем скрытый / видимый для переключения, поэтому `.stop (). Toggle ()` "переворачивает"
			if (toggle) {
				dataShow.hidden =! hidden;
			}

			// Показать элементы перед их анимацией
			если (скрыто) {
				showHide ([элемент], правда);
			}

			/ * eslint-disable no-loop-func * /

			anim.done (function () {

			/ * eslint-enable no-loop-func * /

				// Последний шаг анимации «скрыть» на самом деле скрывает элемент
				если (! скрытый) {
					showHide ([элемент]);
				}
				dataPriv.remove (elem, "fxshow");
				for (опора в оригинале) {
					jQuery.style (elem, prop, orig [prop]);
				}
			});
		}

		// Настройка для каждого свойства
		propTween = createTween (hidden? dataShow [prop]: 0, prop, anim);
		if (! (реквизит в dataShow)) {
			dataShow [prop] = propTween.start;
			если (скрыто) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter (props, specialEasing) {
	индекс var, имя, замедление, значение, хуки;

	// camelCase, specialEasing и раскрываем проход cssHook
	для (индекс в реквизитах) {
		name = camelCase (index);
		easing = specialEasing [имя];
		значение = реквизит [индекс];
		if (Array.isArray (value)) {
			ослабление = значение [1];
			значение = реквизиты [индекс] = значение [0];
		}

		if (index! == name) {
			реквизит [имя] = значение;
			удалить реквизит [индекс];
		}

		hooks = jQuery.cssHooks [name];
		if (hooks && "раскрыть" в hooks) {
			value = hooks.expand (value);
			удалить реквизит [имя];

			// Не совсем $ .extend, это не перезапишет существующие ключи.
			// Повторное использование индекса, потому что у нас правильное имя
			for (индекс в значении) {
				if (! (индекс в реквизитах)) {
					реквизит [индекс] = значение [индекс];
					specialEasing [index] = ослабление;
				}
			}
		} еще {
			specialEasing [name] = ослабление;
		}
	}
}

Анимация функции (элемент, свойства, опции) {
	Вар результат,
		остановился,
		индекс = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred (). всегда (функция () {

			// Не сопоставлять элемент в: анимированном селекторе
			удалить tick.elem;
		}),
		галочка = функция () {
			если (остановился) {
				вернуть ложь;
			}
			var currentTime = fxNow || createFxNow (),
				остальное = Math.max (0, animation.startTime + animation.duration - currentTime),

				// Поддержка: только Android 2.3
				// Ошибка архаичного сбоя не позволяет нам использовать `1 - (0.5 || 0)` (# 12497)
				temp = оставшийся / animation.duration || 0,
				проценты = 1 - темп,
				индекс = 0,
				length = animation.tweens.length;

			f или (; index <длина; index ++) {
				animation.tweens [index] .run (процентов);
			}

			deferred.notifyWith (elem, [анимация, проценты, оставшиеся]);

			// Если есть еще что сделать,
			if (процент <1 && длина) {
				вернуть оставшееся;
			}

			// Если это была пустая анимация, синтезировать окончательное уведомление о прогрессе
			if (! length) {
				deferred.notifyWith (elem, [animation, 1, 0]);
			}

			// Разрешить анимацию и сообщить о ее завершении
			deferred.resolveWith (elem, [animation]);
			вернуть ложь;
		},
		animation = deferred.promise ({
			Элем: Элем,
			реквизиты: jQuery.extend ({}, свойства),
			opts: jQuery.extend (true, {
				specialEasing: {},
				ослабление: jQuery.easing._default
			}, опции ),
			originalProperties: свойства,
			originalOptions: параметры,
			startTime: fxNow || createFxNow (),
			длительность: options.duration,
			подростки: [],
			createTween: function (prop, end) {
				var tween = jQuery.Tween (elem, animation.opts, prop, end,
						animation.opts.specialEasing [prop] || animation.opts.easing);
				animation.tweens.push (tween);
				вернуть подростка;
			},
			stop: function (gotoEnd) {
				var index = 0,

					// Если мы идем до конца, мы хотим запустить все подростки
					// иначе мы пропускаем эту часть
					длина = конец? animation.tweens.length: 0;
				если (остановился) {
					верни это;
				}
				остановлено = правда;
				for (; index <длина; index ++) {
					animation.tweens [index] .run (1);
				}

				// Разрешить, когда мы сыграли последний кадр; в противном случае, отклонить
				if (gotoEnd) {
					deferred.notifyWith (elem, [animation, 1, 0]);
					deferred.resolveWith (elem, [animation, gotoEnd]);
				} еще {
					deferred.rejectWith (elem, [animation, gotoEnd]);
				}
				верни это;
			}
		}),
		props = animation.props;

	propFilter (props, animation.opts.specialEasing);

	for (; index <длина; index ++) {
		result = Animation.prefilters [index] .call (анимация, элемент, реквизит, animation.opts);
		if (результат) {
			if (isFunction (result.stop)) {
				jQuery._queueHooks (animation.elem, animation.opts.queue) .stop =
					result.stop.bind (результат);
			}
			вернуть результат;
		}
	}

	jQuery.map (реквизит, createTween, анимация);

	if (isFunction (animation.opts.start)) {
		animation.opts.start.call (элемент, анимация);
	}

	// Прикрепить обратные вызовы из опций
	анимация
		.progress (animation.opts.progress)
		.done (animation.opts.done, animation.opts.complete)
		.fail (animation.opts.fail)
		.always (animation.opts.always);

	jQuery.fx.timer (
		jQuery.extend (отметьте, {
			Элем: Элем,
			аним: анимация,
			очередь: animation.opts.queue
		})
	);

	вернуть анимацию;
}

jQuery.Animation = jQuery.extend (Animation, {

	подростки: {
		"*": [function (prop, value) {
			var tween = this.createTween (prop, value);
			AdjustCSS (tween.elem, prop, rcssNum.exec (значение), tween);
			вернуть подростка;
		}]
	},

	tweener: function (реквизит, обратный вызов) {
		if (isFunction (props)) {
			обратный вызов = реквизит;
			props = ["*"];
		} еще {
			props = props.match (rnothtmlwhite);
		}

		вар проп,
			индекс = 0,
			длина = длина реквизита;

		for (; index <длина; index ++) {
			prop = props [index];
			Animation.tweeners [prop] = Animation.tweeners [prop] || [];
			Animation.tweeners [prop] .unshift (обратный вызов);
		}
	},

	префильтры: [defaultPrefilter],

	prefilter: function (callback, prepend) {
		if (prepend) {
			Animation.prefilters.unshift (обратный вызов);
		} еще {
			Animation.prefilters.push (обратный вызов);
		}
	}
});

jQuery.speed = функция (скорость, ослабление, fn) {
	var opt = speed && typeof speed === "объект"? jQuery.extend ({}, скорость): {
		завершено: fn || ! fn && easing ||
			isFunction (скорость) && скорость,
		продолжительность: скорость,
		easing: fn && easing || easing &&! isFunction (easing) && easing
	};

	// Перейти в конечное состояние, если fx выключены
	if (jQuery.fx.off) {
		opt.duration = 0;

	} еще {
		if (typeof opt.duration! == "число") {
			if (opt.duration in jQuery.fx.speeds) {
				opt.duration = jQuery.fx.speeds [opt.duration];

			} еще {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Нормализация opt.queue - true / undefined / null -> "fx"
	if (opt.queue == null || opt.queue === true) {
		opt.queue = "fx";
	}

	// Очереди
	opt.old = opt.complete;

	opt.complete = function () {
		if (isFunction (opt.old)) {
			opt.old.call (это);
		}

		if (opt.queue) {
			jQuery.dequeue (this, opt.queue);
		}
	};

	вернуть опцию;
};

jQuery.fn.extend ({
	fadeTo: function (скорость, до, замедление, обратный вызов) {

		// Показать все скрытые элементы после установки непрозрачности на 0
		вернуть this.filter (isHiddenWithinTree) .css ("непрозрачность", 0) .show ()

			// Анимация к указанному значению
			.end (). animate ({opacity: to}, скорость, замедление, обратный вызов);
	},
	animate: function (опора, скорость, замедление, обратный вызов) {
		var empty = jQuery.isEmptyObject (prop),
			optall = jQuery.speed (скорость, замедление, обратный вызов),
			doAnimation = function () {

				// Работаем с копией prop, чтобы ослабление для каждого свойства не было потеряно
				var anim = Animation (this, jQuery.extend ({}, prop), optall);

				// Пустые анимации или окончание разрешаются немедленно
				if (empty || dataPriv.get (this, "finish")) {
					anim.stop (правда);
				}
			};
			doAnimation.finish = doAnimation;

		вернуть пустое || optall.queue === false?
			this.each (doAnimation):
			this.queue (optall.queue, doAnimation);
	},
	stop: function (type, clearQueue, gotoEnd) {
		var stopQueue = function (hooks) {
			var stop = hooks.stop;
			удалить hooks.stop;
			остановка (gotoEnd);
		};

		if (typeof type! == "string") {
			gotoEnd = clearQueue;
			clearQueue = тип;
			тип = неопределенный;
		}
		if (clearQueue && type! == false) {
			this.queue (тип || "fx", []);
		}

		вернуть this.each (function () {
			var dequeue = true,
				index = type! = null && type + "queueHooks",
				таймеры = jQuery.timers,
				data = dataPriv.get (this);

			if (index) {
				if (data [index] && data [index] .stop) {
					stopQueue (данные [индекс]);
				}
			} еще {
				для (индекс в данных) {
					if (data [index] && data [index] .stop && rrun.test (index)) {
						stopQueue (данные [индекс]);
					}
				}
			}

			for (index = timers.length; index--;) {
				if (timers [index] .elem === this &&
					(type == null || timers [index] .queue === type)) {

					таймеры [index] .anim.stop (gotoEnd);
					dequeue = false;
					timers.splice (index, 1);
				}
			}

			// Запуск следующего в очереди, если последний шаг не был принудительным.
			// Таймеры в настоящее время будут вызывать свои полные обратные вызовы, которые
			// удалится из очереди, но только если они были gotoEnd.
			if (dequeue ||! gotoEnd) {
				jQuery.dequeue (this, type);
			}
		});
	},
	отделка: функция (тип) {
		if (введите! == false) {
			тип = тип || "FX";
		}
		вернуть this.each (function () {
			индекс var,
				data = dataPriv.get (this),
				очередь = данные [тип + "очередь"],
				hooks = data [type + "queueHooks"],
				таймеры = jQuery.timers,
				длина = очередь? длина очереди: 0;

			// Включить флаг финиша на личных данных
			data.finish = true;

			// Сначала очищаем очередь
			jQuery.queue (this, type, []);

			if (hooks && hooks.stop) {
				hooks.stop.call (это правда);
			}

			// Ищем любые активные анимации и заканчиваем их
			for (index = timers.length; index--;) {
				if (timers [index] .elem === this && timers [index] .queue === type) {
					таймеры [index] .anim.stop (true);
					timers.splice (index, 1);
				}
			}

			// Искать любые анимации в старой очереди и завершать их
			для (индекс = 0; индекс <длина; индекс ++) {
				if (queue [index] && queue [index] .finish) {
					queue [index] .finish.call (this);
				}
			}

			// Отключить финишный флаг
			удалить data.finish;
		});
	}
});

jQuery.each (["toggle", "show", "hide"], function (i, name) {
	var cssFn = jQuery.fn [имя];
	jQuery.fn [name] = функция (скорость, замедление, обратный вызов) {
		скорость возврата == ноль || typeof speed === "логическое"?
			cssFn.apply (это аргументы):
			this.animate (genFx (name, true), скорость, замедление, обратный вызов);
	};
});

// Генерируем ярлыки для пользовательских анимаций
jQuery.each ({
	slideDown: genFx ("показать"),
	slideUp: genFx («скрыть»),
	slideToggle: genFx ("toggle"),
	fadeIn: {opacity: "show"},
	fadeOut: {opacity: "hide"},
	fadeToggle: {opacity: "toggle"}
}, функция (имя, реквизит) {
	jQuery.fn [name] = функция (скорость, замедление, обратный вызов) {
		вернуть this.animate (реквизит, скорость, замедление, обратный вызов);
	};
});

jQuery.timers = [];
jQuery.fx.tick = function () {
	таймер вар,
		я = 0,
		таймеры = jQuery.timers;

	fxNow = Date.now ();

	for (; i <timers.length; i ++) {
		таймер = таймеры [я];

		// Запускаем таймер и безопасно удаляем его по окончании (с возможностью внешнего удаления)
		if (! timer () && timers [i] === timer) {
			timers.splice (i--, 1);
		}
	}

	if (! timers.length) {
		jQuery.fx.stop ();
	}
	fxNow = не определено;
};

jQuery.fx.timer = function (timer) {
	jQuery.timers.push (таймер);
	jQuery.fx.start ();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function () {
	if (inProgress) {
		вернуть;
	}

	inProgress = true;
	график();
};

jQuery.fx.stop = function () {
	inProgress = null;
};

jQuery.fx.speeds = {
	медленно: 600,
	быстро: 200,

	// Скорость по умолчанию
	_default: 400
};


// Основано на плагине Клинта Хелферса, с разрешения.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function (time, type) {
	время = jQuery.fx? jQuery.fx.speeds [time] || время: время;
	тип = тип || "FX";

	вернуть this.queue (тип, функция (следующая, ловушки) {
		var timeout = window.setTimeout (next, time);
		hooks.stop = function () {
			window.clearTimeout (timeout);
		};
	});
};


(function () {
	var input = document.createElement ("input"),
		select = document.createElement ("выбрать"),
		opt = select.appendChild (document.createElement ("option"));

	input.type = "checkbox";

	// Поддержка: только Android <= 4.3
	// Значение по умолчанию для флажка должно быть "включено"
	support.checkOn = input.value! == "";

	// Поддержка: только IE <= 11
	// Должен получить доступ к selectedIndex, чтобы выбрать опции по умолчанию
	support.optSelected = opt.selected;

	// Поддержка: только IE <= 11
	// Вход теряет свое значение после превращения в радио
	input = document.createElement ("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
}) ();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend ({
	attr: function (name, value) {
		вернуть доступ (this, jQuery.attr, name, value, arguments.length> 1);
	},

	removeAttr: function (name) {
		вернуть this.each (function () {
			jQuery.removeAttr (это, имя);
		});
	}
});

jQuery.extend ({
	attr: function (elem, name, value) {
		вар рет, крючки,
			nType = elem.nodeType;

		// Не получайте / не устанавливайте атрибуты на узлах текста, комментариев и атрибутов
		if (nType === 3 || nType === 8 || nType === 2) {
			вернуть;
		}

		// Откат для поддержки, когда атрибуты не поддерживаются
		if (typeof elem.getAttribute === "undefined") {
			вернуть jQuery.prop (элемент, имя, значение);
		}

		// Хуки атрибутов определяются строчной версией
		// Захватить необходимый хук, если он определен
		if (nType! == 1 ||! jQuery.isXMLDoc (elem)) {
			hooks = jQuery.attrHooks [name.toLowerCase ()] ||
				(jQuery.expr.match.bool.test (name)? boolHook: undefined);
		}

		if (значение! == не определено) {
			if (value === null) {
				jQuery.removeAttr (элемент, имя);
				вернуть;
			}

			if (hooks && "set" в hooks &&
				(ret = hooks.set (элемент, значение, имя))! == undefined) {
				вернуться в отставку;
			}

			elem.setAttribute (name, value + "");
			возвращаемое значение;
		}

		if (hooks && "get" в hooks && (ret = hooks.get (elem, name))! == null) {
			вернуться в отставку;
		}

		ret = jQuery.find.attr (элемент, имя);

		// Несуществующие атрибуты возвращают ноль, мы нормализуем до неопределенного
		return ret == ноль? undefined: ret;
	},

	attrHooks: {
		тип: {
			set: function (elem, value) {
				if (! support.radioValue && value === "radio" &&
					nodeName (elem, "input")) {
					var val = elem.value;
					elem.setAttribute ("тип", значение);
					if (val) {
						elem.value = val;
					}
					возвращаемое значение;
				}
			}
		}
	},

	removeAttr: function (elem, value) {
		имя вар,
			я = 0,

			// Имена атрибутов могут содержать не-HTML пробельные символы
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match (rnothtmlwhite);

		if (attrNames && elem.nodeType === 1) {
			while ((name = attrNames [i ++])) {
				elem.removeAttribute (name);
			}
		}
	}
});

// Хуки для логических атрибутов
boolHook = {
	set: function (elem, value, name) {
		if (value === false) {

			// Удаляем логические атрибуты, когда установлено значение false
			jQuery.removeAttr (элемент, имя);
		} еще {
			elem.setAttribute (имя, имя);
		}
		вернуть имя;
	}
};

jQuery.each (jQuery.expr.match.bool.source.match (/ \ w + / g), функция (i, имя) {
	var getter = attrHandle [имя] || jQuery.find.attr;

	attrHandle [name] = function (elem, name, isXML) {
		вар, ручка,
			lowercaseName = name.toLowerCase ();

		if (! isXML) {

			// Избегаем бесконечного цикла, временно удаляя эту функцию из геттера
			handle = attrHandle [lowercaseName];
			attrHandle [lowercaseName] = ret;
			ret = getter (elem, name, isXML)! = null?
				нижний регистр:
				ноль;
			attrHandle [нижний регистр] = дескриптор;
		}
		вернуться в отставку;
	};
});




var rfocusable = / ^ (?: input | select | textarea | button) $ / i,
	rclickable = / ^ (?: a | area) $ / i;

jQuery.fn.extend ({
	prop: function (имя, значение) {
		вернуть доступ (this, jQuery.prop, name, value, arguments.length> 1);
	},

	removeProp: function (name) {
		вернуть this.each (function () {
			удалить это [jQuery.propFix [имя] || название ];
		});
	}
});

jQuery.extend ({
	prop: function (elem, name, value) {
		вар рет, крючки,
			nType = elem.nodeType;

		// Не получаем / не устанавливаем свойства в узлах текста, комментариев и атрибутов
		if (nType === 3 || nType === 8 || nType === 2) {
			вернуть;
		}

		if (nType! == 1 ||! jQuery.isXMLDoc (elem)) {

			// Исправить имя и прикрепить хуки
			name = jQuery.propFix [name] || название;
			hooks = jQuery.propHooks [имя];
		}

		if (значение! == не определено) {
			if (hooks && "set" в hooks &&
				(ret = hooks.set (элемент, значение, имя))! == undefined) {
				вернуться в отставку;
			}

			return (elem [имя] = значение);
		}

		if (hooks && "get" в hooks && (ret = hooks.get (elem, name))! == null) {
			вернуться в отставку;
		}

		вернуть элемент [имя];
	},

	propHooks: {
		tabIndex: {
			get: function (elem) {

				// Поддержка: только IE <= 9 - 11
				// elem.tabIndex не всегда возвращает
				// правильное значение, если оно не было явно установлено
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Используем правильный поиск атрибутов (# 12072)
				var tabindex = jQuery.find.attr (elem, "tabindex");

				if (tabindex) {
					return parseInt (tabindex, 10);
				}

				если (
					rfocusable.test (elem.nodeName) ||
					rclickable.test (elem.nodeName) &&
					elem.href
				) {
					вернуть 0;
				}

				возврат -1;
			}
		}
	},

	propFix: {
		"для": "htmlFor",
		"class": "className"
	}
});

// Поддержка: только IE <= 11
// Доступ к свойству selectedIndex
// заставляет браузер соблюдать выбранные настройки
// на опцию
// Получатель гарантирует, что выбран вариант по умолчанию
// когда в оптгруппе
// правило eslint "no-unused-expressionions" отключено для этого кода
// поскольку он считает такие присоединения noop
if (! support.optSelected) {
	jQuery.propHooks.selected = {
		get: function (elem) {

			/ * eslint no-unused-expression: "off" * /

			var parent = elem.parentNode;
			if (parent && parent.parentNode) {
				parent.parentNode.selectedIndex;
			}
			вернуть ноль;
		},
		set: function (elem) {

			/ * eslint no-unused-expression: "off" * /

			var parent = elem.parentNode;
			if (parent) {
				parent.selectedIndex;

				if (parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each ([
	"TabIndex",
	«Доступен только для чтения»,
	"максимальная длина",
	"CELLSPACING",
	"CELLPADDING",
	"RowSpan",
	"Colspan",
	"UseMap",
	"рамка",
	"ContentEditable"
], function () {
	jQuery.propFix [this.toLowerCase ()] = это;
});




	// Удаляем и сворачиваем пробелы в соответствии со спецификацией HTML
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse (value) {
		var tokens = value.match (rnothtmlwhite) || [];
		return tokens.join ("");
	}


function getClass (elem) {
	вернуть elem.getAttribute && elem.getAttribute ("class") || "";
}

function classesToArray (value) {
	if (Array.isArray (value)) {
		возвращаемое значение;
	}
	if (typeof value === "string") {
		возвращаемое значение.match (rnothtmlwhite) || [];
	}
	вернуть [];
}

jQuery.fn.extend ({
	addClass: function (value) {
		классы var, elem, cur, curValue, clazz, j, finalValue,
			я = 0;

		if (isFunction (value)) {
			вернуть this.each (function (j) {
				jQuery (this) .addClass (value.call (this, j, getClass (this)));
			});
		}

		classes = classesToArray (значение);

		if (classes.length) {
			while ((elem = this [i ++])) {
				curValue = getClass (elem);
				cur = elem.nodeType === 1 && ("" + stripAndCollapse (curValue) + "");

				if (cur) {
					j = 0;
					while ((clazz = classes [j ++])) {
						if (cur.indexOf ("" + clazz + "") <0) {
							cur + = clazz + "";
						}
					}

					// Назначаем только если они разные, чтобы избежать ненужного рендеринга.
					finalValue = stripAndCollapse (cur);
					if (curValue! == finalValue) {
						elem.setAttribute ("class", finalValue);
					}
				}
			}
		}

		верни это;
	},

	removeClass: function (value) {
		классы var, elem, cur, curValue, clazz, j, finalValue,
			я = 0;

		if (isFunction (value)) {
			вернуть this.each (function (j) {
				jQuery (this) .removeClass (value.call (this, j, getClass (this)));
			});
		}

		if (! arguments.length) {
			return this.attr ("class", "");
		}

		classes = classesToArray (значение);

		if (classes.length) {
			while ((elem = this [i ++])) {
				curValue = getClass (elem);

				// Это выражение здесь для лучшей сжимаемости (см. AddClass)
				cur = elem.nodeType === 1 && ("" + stripAndCollapse (curValue) + "");

				if (cur) {
					j = 0;
					while ((clazz = classes [j ++])) {

						// Удалить * все * экземпляры
						while (cur.indexOf ("" + clazz + "")> -1) {
							cur = cur.replace ("" + clazz + "", "");
						}
					}

					// Назначаем только если они разные, чтобы избежать ненужного рендеринга.
					finalValue = stripAndCollapse (cur);
					if (curValue! == finalValue) {
						elem.setAttribute ("class", finalValue);
					}
				}
			}
		}

		верни это;
	},

	toggleClass: function (value, stateVal) {
		var type = typeof значение,
			isValidValue = type === "string" || Array.isArray (значение);

		if (typeof stateVal === "логическое" && isValidValue) {
			вернуть stateVal? this.addClass (value): this.removeClass (value);
		}

		if (isFunction (value)) {
			вернуть this.each (function (i) {
				jQuery (это) .toggleClass (
					value.call (this, i, getClass (this), stateVal),
					stateVal
				);
			});
		}

		вернуть this.each (function () {
			var className, i, self, classNames;

			if (isValidValue) {

				// Переключение имен отдельных классов
				я = 0;
				self = jQuery (это);
				classNames = classesToArray (значение);

				while ((className = classNames [i ++])) {

					// Проверка каждого заданного className, разделенного пробелами
					if (self.hasClass (className)) {
						self.removeClass (className);
					} еще {
						self.addClass (className);
					}
				}

			// Переключить имя всего класса
			} else if (значение === undefined || type === "логическое значение") {
				className = getClass (this);
				if (className) {

					// Сохранить className, если установлено
					dataPriv.set (this, "__className__", className);
				}

				// Если элемент имеет имя класса или если мы передали `false`,
				// затем удаляем полное имя класса (если оно было, оно было сохранено выше).
				// В противном случае вернуть то, что было ранее сохранено (если что),
				// возвращаемся к пустой строке, если ничего не было сохранено.
				if (this.setAttribute) {
					this.setAttribute ("class",
						className || значение === ложь?
						"":
						dataPriv.get (this, "__className__") || «»
					);
				}
			}
		});
	},

	hasClass: function (селектор) {
		var className, elem,
			я = 0;

		className = "" + selector + "";
		while ((elem = this [i ++])) {
			if (elem.nodeType === 1 &&
				("" + stripAndCollapse (getClass (elem)) + "") .indexOf (className)> -1) {
					вернуть истину;
			}
		}

		вернуть ложь;
	}
});




var rreturn = / \ r / g;

jQuery.fn.extend ({
	val: function (value) {
		перехватывает переменную, ret, valueIsFunction,
			elem = this [0];

		if (! arguments.length) {
			if (elem) {
				hooks = jQuery.valHooks [elem.type] ||
					jQuery.valHooks [elem.nodeName.toLowerCase ()];

				if (перехватывает &&
					"получить" в крюках &&
					(ret = hooks.get (elem, "value"))! == undefined
				) {
					вернуться в отставку;
				}

				ret = elem.value;

				// Обработка наиболее распространенных строковых случаев
				if (typeof ret === "string") {
					return ret.replace (rreturn, "");
				}

				// Обработка случаев, когда значение равно нулю / undef или числу
				return ret == ноль? "": ret;
			}

			вернуть;
		}

		valueIsFunction = isFunction (value);

		вернуть this.each (function (i) {
			вар вал;

			if (this.nodeType! == 1) {
				вернуть;
			}

			if (valueIsFunction) {
				val = value.call (this, i, jQuery (this) .val ());
			} еще {
				val = значение;
			}

			// Обрабатывать null / undefined как ""; преобразовать числа в строку
			if (val == null) {
				val = "";

			} else if (typeof val === "number") {
				val + = "";

			} else if (Array.isArray (val)) {
				val = jQuery.map (val, function (value) {
					возвращаемое значение == ноль? "": значение + "";
				});
			}

			hooks = jQuery.valHooks [this.type] || jQuery.valHooks [this.nodeName.toLowerCase ()];

			// Если set возвращает undefined, вернитесь к нормальной настройке
			if (! hooks ||! ("set" в hooks) || hooks.set (this, val, "value") === undefined) {
				this.value = val;
			}
		});
	}
});

jQuery.extend ({
	valHooks: {
		опция: {
			get: function (elem) {

				var val = jQuery.find.attr (elem, "value");
				вернуть val! = null?
					val:

					// Поддержка: только IE <= 10 - 11
					// option.text генерирует исключения (# 14686, # 14858)
					// Разобрать и свернуть пробелы
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse (jQuery.text (elem));
			}
		},
		Выбрать: {
			get: function (elem) {
				значение переменной, опция, я,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					значения = один? ноль : [],
					макс = один? index + 1: options.length;

				if (index <0) {
					я = макс;

				} еще {
					я = один? индекс: 0;
				}

				// Перебираем все выбранные опции
				for (; i <max; i ++) {
					option = options [i];

					// Поддержка: только IE <= 9
					// IE8-9 не обновляет выбранное после сброса формы (# 2551)
					if ((option.selected || i === index) &&

							// Не возвращать опции, которые отключены или в отключенной optgroup
							! option.disabled &&
							(! option.parentNode.disabled ||
								! nodeName (option.parentNode, "optgroup"))) {

						// Получить конкретное значение для опции
						значение = jQuery (опция) .val ();

						// нам не нужен массив для одного выбора
						если один ) {
							возвращаемое значение;
						}

						// Multi-Selects возвращает массив
						values.push (значение);
					}
				}

				возвращаемые значения;
			},

			set: function (elem, value) {
				var optionSet, option,
					options = elem.options,
					values ​​= jQuery.makeArray (value),
					я = options.length;

				в то время как я-- ) {
					option = options [i];

					/ * eslint-disable no-cond-assign * /

					if (option.selected =
						jQuery.inArray (jQuery.valHooks.option.get (опция), значения)> -1
					) {
						optionSet = true;
					}

					/ * eslint-enable no-cond-assign * /
				}

				// Принудительная работа браузеров, когда установлено несоответствующее значение
				if (! optionSet) {
					elem.selectedIndex = -1;
				}
				возвращаемые значения;
			}
		}
	}
});

// Радио и чекбоксы getter / setter
jQuery.each (["radio", "checkbox"], function () {
	jQuery.valHooks [this] = {
		set: function (elem, value) {
			if (Array.isArray (value)) {
				return (elem.checked = jQuery.inArray (jQuery (elem) .val (), value)> -1);
			}
		}
	};
	if (! support.checkOn) {
		jQuery.valHooks [this] .get = function (elem) {
			return elem.getAttribute ("value") === null? «on»: elem.value;
		};
	}
});




// Возвращаем jQuery для включения только атрибутов


support.focusin = "onfocusin" в окне;


var rfocusMorph = / ^ (?: focusinfocus | focusoutblur) $ /,
	stopPropagationCallback = function (e) {
		e.stopPropagation ();
	};

jQuery.extend (jQuery.event, {

	trigger: function (event, data, elem, onlyHandlers) {

		var i, cur, tmp, bubbleType, ontype, дескриптор, специальный, lastElement,
			eventPath = [elem || документ],
			type = hasOwn.call (событие, "тип")? event.type: event,
			namespaces = hasOwn.call (событие, "пространство имен")? event.namespace.split ("."): [];

		cur = lastElement = tmp = elem = elem || документ;

		// Не делайте события на узлах текста и комментариев
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			вернуть;
		}

		// фокус / размытие превращается в focusin / out; убедитесь, что мы не увольняем их прямо сейчас
		if (rfocusMorph.test (type + jQuery.event.triggered)) {
			вернуть;
		}

		if (type.indexOf (".")> -1) {

			// Пространство имен триггер; создайте регулярное выражение для соответствия типу события в handle ()
			namespaces = type.split (".");
			type = namespaces.shift ();
			namespaces.sort ();
		}
		ontype = type.indexOf (":") <0 && "on" + type;

		// Вызывающий может передать объект jQuery.Event, Object или просто строку типа события
		событие = событие [jQuery.expando]?
			событие :
			новый jQuery.Event (тип, событие typeof === "объект" && событие);

		// Триггерная битовая маска: & 1 для собственных обработчиков; & 2 для jQuery (всегда верно)
		event.isTrigger = onlyHandlers? 2: 3;
		event.namespace = namespaces.join (".");
		event.rnamespace = event.namespace?
			new RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\. |)") + "(\\. | $)"):
			ноль;

		// Очистить событие в случае его повторного использования
		event.result = не определено;
		if (! event.target) {
			event.target = elem;
		}

		// Клонируем любые входящие данные и добавляем событие, создавая список аргументов обработчика
		данные = данные == ноль?
			[ событие ] :
			jQuery.makeArray (data, [event]);

		// Разрешить специальным событиям рисовать вне линий
		special = jQuery.event.special [тип] || {};
		if (! onlyHandlers && special.trigger && special.trigger.apply (elem, data) === false) {
			вернуть;
		}

		// Определяем путь распространения события заранее, согласно спецификации событий W3C (# 9951)
		// Переходим к документу, затем к окну; наблюдайте за глобальным владельцемDocument var (# 9724)
		if (! onlyHandlers &&! special.noBubble &&! isWindow (elem)) {

			bubbleType = special.delegateType || тип;
			if (! rfocusMorph.test (bubbleType + type)) {
				cur = cur.parentNode;
			}
			for (; cur; cur = cur.parentNode) {
				eventPath.push (cur);
				tmp = cur;
			}

			// Добавляем окно только в том случае, если мы попали в документ (например, не обычный obj или отдельный DOM)
			if (tmp === (elem.ownerDocument || document)) {
				eventPath.push (tmp.defaultView || tmp.parentWindow || window);
			}
		}

		// Запускаем обработчики на пути события
		я = 0;
		while ((cur = eventPath [i ++]) &&! event.isPropagationStopped ()) {
			lastElement = cur;
			event.type = i> 1?
				bubbleType:
				special.bindType || тип;

			// обработчик jQuery
			handle = (dataPriv.get (cur, "events") || {}) [event.type] &&
				dataPriv.get (cur, "handle");
			if (handle) {
				handle.apply (cur, data);
			}

			// Собственный обработчик
			handle = ontype && cur [ontype];
			if (handle && handle.apply && acceptData (cur)) {
				event.result = handle.apply (cur, data);
				if (event.result === false) {
					event.preventDefault ();
				}
			}
		}
		event.type = type;

		// Если никто не помешал действию по умолчанию, сделайте это сейчас
		if (! onlyHandlers &&! event.isDefaultPrevented ()) {

			if ((! special._default ||
				special._default.apply (eventPath.pop (), data) === false) &&
				acceptData (elem)) {

				// Вызываем собственный метод DOM для цели с тем же именем, что и у события.
				// Не выполняйте действия по умолчанию для окна, вот где глобальные переменные (# 6170)
				if (ontype && isFunction (elem [type]) &&! isWindow (elem)) {

					// Не повторно вызывать событие onFOO, когда мы вызываем его метод FOO ()
					tmp = elem [ontype];

					if (tmp) {
						elem [ontype] = ноль;
					}

					// Предотвращаем повторный запуск одного и того же события, так как мы уже обдували его выше
					jQuery.event.triggered = type;

					if (event.isPropagationStopped ()) {
						lastElement.addEventListener (type, stopPropagationCallback);
					}

					Элем [тип] ();

					if (event.isPropagationStopped ()) {
						lastElement.removeEventListener (type, stopPropagationCallback);
					}

					jQuery.event.triggered = undefined;

					if (tmp) {
						elem [ontype] = tmp;
					}
				}
			}
		}

		возвращение event.result;
	},

	// Привязка к донорскому событию для имитации другого
	// Используется только для событий `focus (in | out)`
	моделировать: функция (тип, элемент, событие) {
		var e = jQuery.extend (
			новый jQuery.Event (),
			событие,
			{
				тип: тип,
				isSimulated: true
			}
		);

		jQuery.event.trigger (e, null, elem);
	}

});

jQuery.fn.extend ({

	триггер: функция (тип, данные) {
		вернуть this.each (function () {
			jQuery.event.trigger (тип, данные, это);
		});
	},
	triggerHandler: function (type, data) {
		var elem = this [0];
		if (elem) {
			return jQuery.event.trigger (тип, данные, элемент, истина);
		}
	}
});


// Поддержка: Firefox <= 44
// Firefox не имеет событий фокуса (in | out)
// Связанный тикет - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Поддержка: Chrome <= 48 - 49, Safari <= 9.0 - 9.1
// события focus (in | out) срабатывают после событий focus & blur,
// что является нарушением спецификации - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Связанный тикет - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if (! support.focusin) {
	jQuery.each ({focus: "focusin", blur: "focusout"}, функция (orig, fix) {

		// Прикрепляем один обработчик захвата к документу, пока кто-то хочет focusin / focusout
		var handler = function (event) {
			jQuery.event.simulate (исправление, event.target, jQuery.event.fix (событие));
		};

		jQuery.event.special [fix] = {
			setup: function () {
				var doc = this.ownerDocument || этот,
					attachches = dataPriv.access (doc, fix);

				если (! присоединяется) {
					doc.addEventListener (orig, handler, true);
				}
				dataPriv.access (doc, fix, (присоединяет || 0) + 1);
			},
			разрыв: функция () {
				var doc = this.ownerDocument || этот,
					attachces = dataPriv.access (doc, fix) - 1;

				если (! присоединяется) {
					doc.removeEventListener (orig, handler, true);
					dataPriv.remove (doc, fix);

				} еще {
					dataPriv.access (документ, исправление, приложение);
				}
			}
		};
	});
}
var location = window.location;

var nonce = Date.now ();

var rquery = (/ \? /);



// Кросс-браузерный анализ xml
jQuery.parseXML = function (data) {
	var xml;
	if (! data || typeof data! == "строка") {
		вернуть ноль;
	}

	// Поддержка: только IE 9 - 11
	// IE генерирует parseFromString с неверным вводом.
	пытаться {
		xml = (новое окно.DOMParser ()) .parseFromString (data, "text / xml");
	} catch (e) {
		xml = не определено;
	}

	if (! xml || xml.getElementsByTagName ("parsererror") .length) {
		jQuery.error («Неверный XML:» + данные);
	}
	вернуть xml;
};


вар
	rbracket = / \ [\] $ /,
	rCRLF = / \ r? \ n / g,
	rsubmitterTypes = / ^ (?: отправить | кнопку | изображение | сбросить | файл) $ / i,
	rsubmittable = / ^ (?: input | select | textarea | keygen) / i;

функция buildParams (префикс, obj, традиционный, добавить) {
	имя вар;

	if (Array.isArray (obj)) {

		// Сериализация элемента массива.
		jQuery.each (obj, function (i, v) {
			if (традиционный || rbracket.test (префикс)) {

				// Рассматривать каждый элемент массива как скаляр.
				добавить (префикс, v);

			} еще {

				// Элемент не скалярный (массив или объект), кодируем его числовой индекс.
				buildParams (
					префикс + "[" + (typeof v === "object" && v! = null? i: "") + "]",
					v,
					традиционный,
					добавлять
				);
			}
		});

	} else if (! Traditional && toType (obj) === "объект") {

		// Сериализация объекта.
		for (имя в obj) {
			buildParams (префикс + "[" + name + "]", obj [имя], традиционный, добавить);
		}

	} еще {

		// Сериализация скалярного элемента.
		добавить (префикс, объект);
	}
}

// Сериализуем массив элементов формы или набор
// ключ / значения в строку запроса
jQuery.param = function (a, традиционный) {
	префикс var,
		s = [],
		add = function (key, valueOrFunction) {

			// Если значение является функцией, вызвать ее и использовать возвращаемое значение
			var value = isFunction (valueOrFunction)?
				valueOrFunction ():
				valueOrFunction;

			s [s.length] = encodeURIComponent (ключ) + "=" +
				encodeURIComponent (value == null? "": value);
		};

	if (a == null) {
		вернуть "";
	}

	// Если был передан массив, предположим, что это массив элементов формы.
	if (Array.isArray (a) || (a.jquery &&! jQuery.isPlainObject (a))) {

		// Сериализация элементов формы
		jQuery.each (a, function () {
			добавить (this.name, this.value);
		});

	} еще {

		// Если традиционный, закодируйте «старый» способ (способ 1.3.2 или старше
		// сделал), иначе рекурсивно кодируем параметры.
		для (префикс в) {
			buildParams (префикс, [префикс], традиционный, добавить);
		}
	}

	// Возвращаем полученную сериализацию
	return s.join ("&");
};

jQuery.fn.extend ({
	serialize: function () {
		return jQuery.param (this.serializeArray ());
	},
	serializeArray: function () {
		вернуть this.map (function () {

			// Может добавить propHook для «elements» для фильтрации или добавления элементов формы
			var elements = jQuery.prop (this, "elements");
			вернуть элементы? jQuery.makeArray (elements): this;
		})
		.filter (function () {
			var type = this.type;

			// Используем .is (": disabled"), чтобы fieldset [disabled] работал
			вернуть this.name &&! jQuery (this) .is (": disabled") &&
				rsubmittable.test (this.nodeName) &&! rsubmitterTypes.test (type) &&
				(this.checked ||! rcheckableType.test (type));
		})
		.map (function (i, elem) {
			var val = jQuery (this) .val ();

			if (val == null) {
				вернуть ноль;
			}

			if (Array.isArray (val)) {
				return jQuery.map (val, function (val) {
					return {name: elem.name, value: val.replace (rCRLF, "\ r \ n")};
				});
			}

			return {name: elem.name, value: val.replace (rCRLF, "\ r \ n")};
		} ).получить();
	}
});


вар
	r20 = /% 20 / г,
	rhash = /#.*$/,
	rantiCache = / ([? &]) _ = [^ &] * /,
	читатели = / ^ (. *?): [\ t] * ([^ \ r \ n] *) $ / мг,

	// # 7653, # 8125, # 8152: обнаружение локального протокола
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = / ^ (?: GET | HEAD) $ /,
	rprotocol = / ^ \ / \ //,

	/ * Префильтры
	 * 1) Они полезны для представления пользовательских типов данных (см. Пример ajax / jsonp.js)
	 * 2) Это называется:
	 * - ДО запроса транспорта
	 * - ПОСЛЕ сериализации параметра (s.data является строкой, если s.processData имеет значение true)
	 * 3) ключ является типом данных
	 * 4) можно использовать символ «*»
	 * 5) выполнение начнется с транспортного dataType, а затем продолжится до "*", если это необходимо
	 * /
	префильтры = {},

	/ * Транспортные привязки
	 * 1) ключ является типом данных
	 * 2) можно использовать символ «*»
	 * 3) выбор начнется с транспорта dataType, а затем перейдите к «*», если это необходимо
	 * /
	транспорты = {},

	// Избегаем последовательность символов комментария-пролога (# 10098); должен успокоить пух и избежать сжатия
	allTypes = "* /". concat ("*"),

	// Привязка тега для разбора источника документа
	originAnchor = document.createElement ("a");
	originAnchor.href = location.href;

// Базовый «конструктор» для jQuery.ajaxPrefilter и jQuery.ajaxTransport
function addToPrefiltersOrTransports (structure) {

	// dataTypeExpression является необязательным и по умолчанию имеет значение "*"
	функция возврата (dataTypeExpression, func) {

		if (typeof dataTypeExpression! == "string") {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			я = 0,
			dataTypes = dataTypeExpression.toLowerCase (). match (rnothtmlwhite) || [];

		if (isFunction (func)) {

			// Для каждого dataType в dataTypeExpression
			while ((dataType = dataTypes [i ++])) {

				// Добавить, если требуется
				if (dataType [0] === "+") {
					dataType = dataType.slice (1) || "*";
					(структура [dataType] = структура [dataType] || []) .unshift (func);

				// Иначе добавляем
				} еще {
					(структура [dataType] = структура [dataType] || []) .push (func);
				}
			}
		}
	};
}

// Базовая функция проверки для предварительных фильтров и транспорта
функция inspectPrefiltersOrTransports (структура, параметры, originalOptions, jqXHR) {

	проверено var = {},
		seekTransport = (структура === транспорты);

	функция inspect (dataType) {
		Вар выбран;
		inspected [dataType] = true;
		jQuery.each (структура [dataType] || [], функция (_, prefilterOrFactory) {
			var dataTypeOrTransport = prefilterOrFactory (параметры, originalOptions, jqXHR);
			if (typeof dataTypeOrTransport === "строка" &&
				! lookingTransport &&! inspected [dataTypeOrTransport]) {

				options.dataTypes.unshift (dataTypeOrTransport);
				проверять (dataTypeOrTransport);
				вернуть ложь;
			} else if (seekTransport) {
				return! (selected = dataTypeOrTransport);
			}
		});
		вернуть выбранный;
	}

	возврат осмотреть (options.dataTypes [0]) || ! inspected ["*"] && inspect ("*");
}

// Специальное расширение для опций ajax
// который принимает "плоские" опции (не для глубокого расширения)
// Исправления # 9887
function ajaxExtend (target, src) {
	ключ, глубокий,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for (введите src) {
		if (src [key]! == undefined) {
			(flatOptions [key]? target: (deep || (deep = {}))) [key] = src [key];
		}
	}
	если (глубоко) {
		jQuery.extend (true, target, deep);
	}

	вернуть цель;
}

/ * Обрабатывает ответы на ajax-запрос:
 * - находит правильный dataType (посредник между типом контента и ожидаемым dataType)
 * - возвращает соответствующий ответ
 * /
function ajaxHandleResponses (s, jqXHR, ответы) {

	var ct, type, finalDataType, firstDataType,
		content = s.contents,
		dataTypes = s.dataTypes;

	// Удаляем auto dataType и получаем content-type в процессе
	while (dataTypes [0] === "*") {
		dataTypes.shift ();
		if (ct === undefined) {
			ct = s.mimeType || jqXHR.getResponseHeader ("Content-Type");
		}
	}

	// Проверяем, имеем ли мы дело с известным типом контента
	if (ct) {
		for (введите содержимое) {
			if (содержимое [тип] && содержимое [тип] .test (ct)) {
				dataTypes.unshift (type);
				перерыв;
			}
		}
	}

	// Проверяем, есть ли у нас ответ для ожидаемого dataType
	if (dataTypes [0] в ответах) {
		finalDataType = dataTypes [0];
	} еще {

		// Попробуйте конвертируемые dataTypes
		для (введите ответы) {
			if (! dataTypes [0] || s.converters [type + "" + dataTypes [0]]) {
				finalDataType = type;
				перерыв;
			}
			if (! firstDataType) {
				firstDataType = type;
			}
		}

		// Или просто использовать первый
		finalDataType = finalDataType || firstDataType;
	}

	// Если мы нашли dataType
	// При необходимости добавляем dataType в список
	// и возвращаем соответствующий ответ
	if (finalDataType) {
		if (finalDataType! == dataTypes [0]) {
			dataTypes.unshift (finalDataType);
		}
		возвращать ответы [finalDataType];
	}
}

/ * Цепные преобразования с учетом запроса и исходного ответа
 * Также устанавливает поля responseXXX в экземпляре jqXHR
 * /
function ajaxConvert (s, response, jqXHR, isSuccess) {
	var conv2, current, conv, tmp, prev,
		преобразователи = {},

		// Работа с копией dataTypes на случай, если нам нужно изменить ее для преобразования
		dataTypes = s.dataTypes.slice ();

	// Создать карту конвертеров с ключами в нижнем регистре
	if (dataTypes [1]) {
		for (conv в s.converters) {
			convertters [conv.toLowerCase ()] = s.converters [conv];
		}
	}

	current = dataTypes.shift ();

	// Конвертировать в каждый последовательный dataType
	while (текущий) {

		if (s.responseFields [current]) {
			jqXHR [s.responseFields [current]] = ответ;
		}

		// Применяем dataFilter, если имеется
		if (! prev && isSuccess && s.dataFilter) {
			response = s.dataFilter (response, s.dataType);
		}

		предыдущая = текущая;
		current = dataTypes.shift ();

		if (current) {

			// Работать нужно только если текущий dataType не автоматический
			if (current === "*") {

				текущий = предыдущий;

			// Конвертировать ответ, если предыдущий dataType не автоматический и отличается от текущего
			} else if (prev! == "*" && prev! == current) {

				// Ищем прямой конвертер
				conv = конвертеры [prev + "" + current] || конвертеры ["*" + ток];

				// Если ничего не найдено, ищем пару
				if (! conv) {
					for (conv2 в конвертерах) {

						// Если conv2 выводит ток
						tmp = conv2.split ("");
						if (tmp [1] === current) {

							// Если предыдущий может быть преобразован в принятый ввод
							conv = конвертеры [prev + "" + tmp [0]] ||
								конвертеры ["*" + tmp [0]];
							if (conv) {

								// Конденсаторы эквивалентности
								if (conv === true) {
									conv = конвертеры [conv2];

								// В противном случае вставляем промежуточный dataType
								} else if (преобразователи [conv2]! == true) {
									current = tmp [0];
									dataTypes.unshift (tmp [1]);
								}
								перерыв;
							}
						}
					}
				}

				// Применяем конвертер (если не эквивалентность)
				if (conv! == true) {

					// Если ошибки не могут всплыть, поймать и вернуть их
					if (conv && s.throws) {
						ответ = конв (ответ);
					} еще {
						пытаться {
							ответ = конв (ответ);
						} catch (e) {
							вернуть {
								состояние: "parsererror",
								ошибка: конв? e: "Нет преобразования из" + prev + "в" + current
							};
						}
					}
				}
			}
		}
	}

	return {состояние: «успех», данные: ответ};
}

jQuery.extend ({

	// Счетчик для хранения количества активных запросов
	активный: 0,

	// Last-Modified кеш заголовка для следующего запроса
	Последнее изменение: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		тип: "GET",
		isLocal: rlocalProtocol.test (location.protocol),
		глобальный: правда,
		processData: true,
		асинхронно: правда,
		contentType: "application / x-www-form-urlencoded; charset = UTF-8",

		/ *
		время ожидания: 0,
		данные: ноль,
		dataType: null,
		имя пользователя: ноль,
		пароль: ноль,
		кеш: ноль,
		броски: ложь,
		традиционный: ложный,
		заголовки: {},
		* /

		принимает: {
			"*": все типы,
			текст: "текст / обычный",
			html: "text / html",
			xml: "application / xml, text / xml",
			JSON: «Приложение / JSON, текст / JavaScript»
		},

		содержание: {
			xml: / \ bxml \ b /,
			html: / \ bhtml /,
			JSON: / \ BJSON \ B /
		},

		responseFields: {
			xml: "responseXML",
			текст: "responseText",
			json: "responseJSON"
		},

		// Конвертеры данных
		// Ключи отдельных типов источника (или перехвата "*") и назначения с одним пробелом
		преобразователи: {

			// Конвертировать что угодно в текст
			"* текст": строка,

			// Текст в html (true = без преобразования)
			"Текст HTML": правда,

			// Оцениваем текст как выражение json
			"текст JSON": JSON.parse,

			// Разбор текста как xml
			"text xml": jQuery.parseXML
		},

		// Для параметров, которые не должны быть глубоко расширены:
		// вы можете добавить свои собственные опции здесь, если
		// и когда вы создаете тот, который не должен быть
		// глубоко расширен (см. ajaxExtend)
		flatOptions: {
			URL: правда,
			контекст: правда
		}
	},

	// Создаем полноценный объект настроек в цель
	// с полями ajaxSettings и settings.
	// Если цель не указана, записывается в ajaxSettings.
	ajaxSetup: функция (цель, настройки) {
		вернуть настройки?

			// Создание объекта настроек
			ajaxExtend (ajaxExtend (target, jQuery.ajaxSettings), настройки):

			// Расширение ajaxSettings
			ajaxExtend (jQuery.ajaxSettings, target);
	},

	ajaxPrefilter: addToPrefiltersOrTransports (префильтры),
	ajaxTransport: addToPrefiltersOrTransports (транспорты),

	// Основной метод
	ajax: function (url, options) {

		// Если url является объектом, симулируем подпись до 1.5
		if (typeof url === "object") {
			параметры = URL;
			URL = не определено;
		}

		// Заставить опции быть объектом
		опции = опции || {};

		вар транспорт,

			// URL без параметра защиты от кеша
			cacheURL,

			// Заголовки ответа
			responseHeadersString,
			responseHeaders,

			// тайм-аут
			timeoutTimer,

			// URL-адрес очистки var
			urlAnchor,

			// Состояние запроса (становится ложным при отправке и истинным после завершения)
			завершено,

			// Чтобы узнать, нужно ли отправлять глобальные события
			fireGlobals,

			// Переменная цикла
			я,

			// некэшированная часть URL
			некэшированным,

			// Создать конечный объект параметров
			s = jQuery.ajaxSetup ({}, параметры),

			// Контекст обратных вызовов
			callbackContext = s.context || s,

			// Контекст для глобальных событий - callbackContext, если это узел DOM или коллекция jQuery.
			globalEventContext = s.context &&
				(callbackContext.nodeType || callbackContext.jquery)?
					jQuery (callbackContext):
					jQuery.event,

			// Отложено
			deferred = jQuery.Deferred (),
			completeDeferred = jQuery.Callbacks («однажды память»),

			// Статус-зависимые обратные вызовы
			statusCode = s.statusCode || {},

			// Заголовки (они отправляются сразу)
			requestHeaders = {},
			requestHeadersNames = {},

			// сообщение об отмене по умолчанию
			strAbort = "отменено",

			// Поддельный xhr
			jqXHR = {
				readyState: 0,

				// При необходимости строит хеш-таблицу заголовков
				getResponseHeader: function (key) {
					var match;
					если (выполнено) {
						if (! responseHeaders) {
							responseHeaders = {};
							while ((match = rheaders.exec (responseHeadersString))) {
								responseHeaders [match [1] .toLowerCase () + ""] =
									(responseHeaders [match [1] .toLowerCase () + ""] || [])
										.concat (match [2]);
							}
						}
						match = responseHeaders [key.toLowerCase () + ""];
					}
					возвращать совпадение == ноль? null: match.join (",");
				},

				// Необработанная строка
				getAllResponseHeaders: function () {
					возврат завершен? responseHeadersString: null;
				},

				// кэшируем заголовок
				setRequestHeader: function (name, value) {
					если (завершено == ноль) {
						name = requestHeadersNames [name.toLowerCase ()] =
							requestHeadersNames [name.toLowerCase ()] || название;
						requestHeaders [name] = значение;
					}
					верни это;
				},

				// Переопределяет заголовок типа содержимого ответа
				overrideMimeType: function (type) {
					если (завершено == ноль) {
						s.mimeType = type;
					}
					верни это;
				},

				// Статус-зависимые обратные вызовы
				statusCode: function (map) {
					код вар;
					if (map) {
						если (выполнено) {

							// Выполнить соответствующие обратные вызовы
							jqXHR.always (map [jqXHR.status]);
						} еще {

							// Ленивый добавить новые обратные вызовы таким образом, чтобы сохранить старые
							для (код на карте) {
								statusCode [code] = [statusCode [code], map [code]];
							}
						}
					}
					верни это;
				},

				// Отмена запроса
				abort: function (statusText) {
					var finalText = statusText || strAbort;
					if (транспорт) {
						transport.abort (finalText);
					}
					готово (0, finalText);
					верни это;
				}
			};

		// Прикрепить отложенные
		deferred.promise (jqXHR);

		// Добавить протокол, если не указан (его могут ожидать предварительные фильтры)
		// Обработка ложного URL в объекте настроек (# 10093: соответствие старой подписи)
		// Мы также используем параметр url, если он доступен
		s.url = ((url || s.url || location.href) + "")
			.replace (rprotocol, location.protocol + "//");

		// Метод псевдонима для ввода в соответствии с билетом # 12004
		s.type = options.method || options.type || s.method || s.type;

		// Извлечение списка dataTypes
		s.dataTypes = (s.dataType || "*") .toLowerCase (). match (rnothtmlwhite) || [""];

		// Междоменный запрос в порядке, когда источник не совпадает с текущим источником.
		if (s.crossDomain == null) {
			urlAnchor = document.createElement ("a");

			// Поддержка: IE <= 8 - 11, Edge 12 - 15
			// IE генерирует исключение при доступе к свойству href, если url искажен,
			// например http://example.com:80x/
			пытаться {
				urlAnchor.href = s.url;

				// Поддержка: только IE <= 8 - 11
				// Неправильно установлено свойство хоста Anchor, когда s.url относительно
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host! ==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch (e) {

				// Если при разборе URL произошла ошибка, предположим, что это crossDomain,
				// транспорт может быть отклонен, если он недействителен
				s.crossDomain = true;
			}
		}

		// Конвертировать данные, если строка еще не
		if (s.data && s.processData && typeof s.data! == "строка") {
			s.data = jQuery.param (s.data, s.traditional);
		}

		// Применяем префильтры
		inspectPrefiltersOrTransports (prefilters, s, options, jqXHR);

		// Если запрос прерван внутри префильтра, остановитесь на этом
		если (выполнено) {
			возврат jqXHR;
		}

		// Мы можем запускать глобальные события, если их попросить
		// Не запускать события, если jQuery.event не определен в сценарии использования AMD (# 15118)
		fireGlobals = jQuery.event && s.global;

		// Следим за новым набором запросов
		if (fireGlobals && jQuery.active ++ === 0) {
			jQuery.event.trigger ("ajaxStart");
		}

		// Прописные буквы типа
		s.type = s.type.toUpperCase ();

		// Определяем, есть ли в содержании запроса
		s.hasContent =! rnoContent.test (s.type);

		// Сохраняем URL на тот случай, если мы играем с If-Modified-Since
		// и / или заголовок If-None-Match позже
		// Удалить хеш, чтобы упростить манипулирование URL
		cacheURL = s.url.replace (rhash, "");

		// Дополнительные параметры обработки запросов без содержимого
		if (! s.hasContent) {

			// Запомним хеш, чтобы мы могли вернуть его обратно
			uncached = s.url.slice (cacheURL.length);

			// Если данные доступны и должны быть обработаны, добавляем данные в URL
			if (s.data && (s.processData || typeof s.data === "string")) {
				cacheURL + = (rquery.test (cacheURL)? "&": "?") + s.data;

				// # 9682: удалить данные, чтобы они не использовались при повторной попытке
				удалить s.data;
			}

			// Добавляем или обновляем параметр anti-cache при необходимости
			if (s.cache === false) {
				cacheURL = cacheURL.replace (rantiCache, "$ 1");
				uncached = (rquery.test (cacheURL)? "&": "?") + "_ =" + (nonce ++) + uncached;
			}

			// Помещаем хеш и анти-кеш на URL, который будет запрашиваться (gh-1732)
			s.url = cacheURL + uncached;

		// Изменим «% 20» на «+», если это закодированное содержимое тела формы (gh-2658)
		} else if (s.data && s.processData &&
			(s.contentType || "") .indexOf ("application / x-www-form-urlencoded") === 0) {
			s.data = s.data.replace (r20, "+");
		}

		// Устанавливаем заголовки If-Modified-Since и / или If-None-Match, если в режиме ifModified.
		if (s.ifModified) {
			if (jQuery.lastModified [cacheURL]) {
				jqXHR.setRequestHeader («If-Modified-Since», jQuery.lastModified [cacheURL]);
			}
			if (jQuery.etag [cacheURL]) {
				jqXHR.setRequestHeader ("If-None-Match", jQuery.etag [cacheURL]);
			}
		}

		// Установить правильный заголовок, если данные отправляются
		if (s.data && s.hasContent && s.contentType! == false || options.contentType) {
			jqXHR.setRequestHeader ("Content-Type", s.contentType);
		}

		// Установить заголовок Accepts для сервера, в зависимости от dataType
		jqXHR.setRequestHeader (
			«Принять»,
			s.dataTypes [0] && s.accepts [s.dataTypes [0]]?
				s.accepts [s.dataTypes [0]] +
					(s.dataTypes [0]! == "*"? "," + allTypes + "; q = 0.01": ""):
				s.accepts ["*"]
		);

		// Проверка опции заголовков
		для (я в s.headers) {
			jqXHR.setRequestHeader (i, s.headers [i]);
		}

		// Разрешить пользовательские заголовки / mimetypes и раннее прерывание
		if (s.beforeSend &&
			(s.beforeSend.call (callbackContext, jqXHR, s) === false || завершено)) {

			// Прервать, если это еще не сделано, и вернуться
			return jqXHR.abort ();
		}

		// Отмена больше не является отменой
		strAbort = "abort";

		// Устанавливаем обратные вызовы на отложенные
		completeDeferred.add (s.complete);
		jqXHR.done (s.success);
		jqXHR.fail (s.error);

		// Получить транспорт
		transport = inspectPrefiltersOrTransports (транспорты, опции, опции, jqXHR);

		// Если нет транспорта, мы автоматически отменяем
		if (! transport) {
			сделано (-1, «Нет транспорта»);
		} еще {
			jqXHR.readyState = 1;

			// Отправить глобальное событие
			if (fireGlobals) {
				globalEventContext.trigger ("ajaxSend", [jqXHR, s]);
			}

			// Если запрос был прерван внутри ajaxSend, остановитесь на этом
			если (выполнено) {
				возврат jqXHR;
			}

			// Тайм-аут
			if (s.async && s.timeout> 0) {
				timeoutTimer = window.setTimeout (function () {
					jqXHR.abort («тайм-аут»);
				}, s.timeout);
			}

			пытаться {
				завершено = ложно;
				transport.send (requestHeaders, done);
			} catch (e) {

				// Rethrow исключения после завершения
				если (выполнено) {
					бросить е;
				}

				// Распространение результатов других
				сделано (-1, е);
			}
		}

		// Обратный вызов, когда все сделано
		функция выполнена (статус, nativeStatusText, ответы, заголовки) {
			var isSuccess, успех, ошибка, ответ, модифицированный,
				statusText = nativeStatusText;

			// Игнорируем повторные вызовы
			если (выполнено) {
				вернуть;
			}

			завершено = верно;

			// Очистить тайм-аут, если он существует
			if (timeoutTimer) {
				window.clearTimeout (timeoutTimer);
			}

			// Разыменование транспорта для ранней сборки мусора
			// (независимо от того, как долго будет использоваться объект jqXHR)
			транспорт = не определено;

			// Кэшировать заголовки ответа
			responseHeadersString = headers || "";

			// Установить readyState
			jqXHR.readyState = status> 0? 4: 0;

			// Определяем, успешно ли
			isSuccess = status> = 200 && status <300 || статус === 304;

			// Получить данные ответа
			if (ответы) {
				response = ajaxHandleResponses (s, jqXHR, ответы);
			}

			// Преобразование независимо от того, что (таким образом, поля responseXXX всегда установлены)
			response = ajaxConvert (s, response, jqXHR, isSuccess);

			// В случае успеха обработать цепочку типов
			if (isSuccess) {

				// Устанавливаем заголовки If-Modified-Since и / или If-None-Match, если в режиме ifModified.
				if (s.ifModified) {
					ified = jqXHR.getResponseHeader («Last-Modified»);
					если (изменено) {
						jQuery.lastModified [cacheURL] = модифицированный;
					}
					ified = jqXHR.getResponseHeader ("etag");
					если (изменено) {
						jQuery.etag [cacheURL] = изменено;
					}
				}

				// если нет контента
				if (status === 204 || s.type === "HEAD") {
					statusText = "nocontent";

				// если не модифицировано
				} else if (status === 304) {
					statusText = "notmodified";

				// Если у нас есть данные, давайте конвертируем их
				} еще {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess =! error;
				}
			} еще {

				// Извлечение ошибки из statusText и нормализация для не прерываний
				ошибка = statusText;
				if (status ||! statusText) {
					statusText = "ошибка";
					if (статус <0) {
						статус = 0;
					}
				}
			}

			// Устанавливаем данные для поддельного объекта xhr
			jqXHR.status = статус;
			jqXHR.statusText = (nativeStatusText || statusText) + "";

			// Успех / Ошибка
			if (isSuccess) {
				deferred.resolveWith (callbackContext, [success, statusText, jqXHR]);
			} еще {
				deferred.rejectWith (callbackContext, [jqXHR, statusText, error]);
			}

			// Статус-зависимые обратные вызовы
			jqXHR.statusCode (statusCode);
			statusCode = undefined;

			if (fireGlobals) {
				globalEventContext.trigger (isSuccess? "ajaxSuccess": "ajaxError",
					[jqXHR, s, это успех? успех: ошибка]);
			}

			// Завершить
			completeDeferred.fireWith (callbackContext, [jqXHR, statusText]);

			if (fireGlobals) {
				globalEventContext.trigger ("ajaxComplete", [jqXHR, s]);

				// Обработка глобального счетчика AJAX
				if (! (--jQuery.active)) {
					jQuery.event.trigger ("ajaxStop");
				}
			}
		}

		возврат jqXHR;
	},

	getJSON: function (url, data, callback) {
		return jQuery.get (url, data, callback, "json");
	},

	getScript: function (url, callback) {
		return jQuery.get (url, undefined, callback, "script");
	}
});

jQuery.each (["get", "post"], function (i, method) {
	jQuery [метод] = функция (URL, данные, обратный вызов, тип) {

		// Сдвиг аргументов, если аргумент данных был опущен
		if (isFunction (data)) {
			тип = тип || Перезвоните;
			обратный вызов = данные;
			данные = не определено;
		}

		// URL может быть объектом параметров (который затем должен иметь .url)
		вернуть jQuery.ajax (jQuery.extend ({
			URL: URL,
			тип: метод,
			dataType: type,
			данные: данные,
			успех: обратный звонок
		}, jQuery.isPlainObject (url) && url));
	};
});


jQuery._evalUrl = function (url, options) {
	вернуть jQuery.ajax ({
		URL: URL,

		// Сделать это явным, поскольку пользователь может переопределить это через ajaxSetup (# 11264)
		тип: "GET",
		dataType: "script",
		кеш: правда,
		асинхронный: ложный,
		global: false,

		// Оцениваем только ответ, если он успешный (gh-4126)
		// dataFilter не вызывается для ответов об ошибках, поэтому используйте его вместо
		// Конвертер по умолчанию Kludgy, но он работает.
		преобразователи: {
			"текстовый скрипт": function () {}
		},
		dataFilter: function (response) {
			jQuery.globalEval (ответ, варианты);
		}
	});
};


jQuery.fn.extend ({
	wrapAll: function (html) {
		вар обертывание;

		if (this [0]) {
			if (isFunction (html)) {
				html = html.call (this [0]);
			}

			// Элементы, чтобы обернуть цель вокруг
			wrap = jQuery (html, this [0] .ownerDocument) .eq (0) .clone (true);

			if (this [0] .parentNode) {
				wrap.insertBefore (this [0]);
			}

			wrap.map (function () {
				var elem = это;

				while (elem.firstElementChild) {
					elem = elem.firstElementChild;
				}

				вернуть элемент;
			}) .append (это);
		}

		верни это;
	},

	wrapInner: function (html) {
		if (isFunction (html)) {
			вернуть this.each (function (i) {
				jQuery (это) .wrapInner (html.call (это, я));
			});
		}

		вернуть this.each (function () {
			var self = jQuery (это),
				content = self.contents ();

			if (contents.length) {
				contents.wrapAll (html);

			} еще {
				self.append (html);
			}
		});
	},

	wrap: function (html) {
		var htmlIsFunction = isFunction (html);

		вернуть this.each (function (i) {
			jQuery (this) .wrapAll (htmlIsFunction? html.call (this, i): html);
		});
	},

	развернуть: функция (селектор) {
		this.parent (селектор) .not ("тело") .each (function () {
			jQuery (this) .replaceWith (this.childNodes);
		});
		верни это;
	}
});


jQuery.expr.pseudos.hidden = function (elem) {
	return! jQuery.expr.pseudos.visible (elem);
};
jQuery.expr.pseudos.visible = function (elem) {
	return !! (elem.offsetWidth || elem.offsetHeight || elem.getClientRects (). length);
};




jQuery.ajaxSettings.xhr = function () {
	пытаться {
		вернуть новое окно. XMLHttpRequest ();
	} catch (e) {}
};

var xhrSuccessStatus = {

		// Файловый протокол всегда выдает код состояния 0, допустим 200
		0: 200,

		// Поддержка: только IE <= 9
		// # 1450: иногда IE возвращает 1223, когда должно быть 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr ();

support.cors = !! xhrSupported && ("withCredentials" в xhrSupported);
support.ajax = xhrSupported = !! xhrSupported;

jQuery.ajaxTransport (function (options) {
	var callback, errorCallback;

	// Кросс-домен разрешен только если поддерживается через XMLHttpRequest
	if (support.cors || xhrSupported &&! options.crossDomain) {
		вернуть {
			send: function (заголовки, завершено) {
				я
					xhr = options.xhr ();

				xhr.open (
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Применяем настраиваемые поля, если есть
				if (options.xhrFields) {
					для (я в options.xhrFields) {
						xhr [i] = options.xhrFields [i];
					}
				}

				// Заменить MIME-тип, если это необходимо
				if (options.mimeType && xhr.overrideMimeType) {
					xhr.overrideMimeType (options.mimeType);
				}

				// X-Requested-With заголовок
				// Для междоменных запросов, поскольку условия для предварительной проверки
				// сродни мозаике, мы просто никогда ее не устанавливаем.
				// (всегда можно установить для каждого запроса или даже с помощью ajaxSetup)
				// Для запросов того же домена, заголовок не будет изменен, если он уже предоставлен.
				if (! options.crossDomain &&! headers ["X-Requested-With"]) {
					заголовки ["X-Requested-With"] = "XMLHttpRequest";
				}

				// Установить заголовки
				для (я в заголовках) {
					xhr.setRequestHeader (i, headers [i]);
				}

				// Перезвоните
				обратный вызов = функция (тип) {
					return function () {
						if (callback) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if (type === "abort") {
								xhr.abort ();
							} else if (type === "error") {

								// Поддержка: только IE <= 9
								// При ручном прерывании работы, IE9 выбрасывает
								// ошибки при доступе к любому свойству, которое не готово
								if (typeof xhr.status! == "number") {
									завершено (0, «ошибка»);
								} еще {
									полная (

										// Файл: протокол всегда дает статус 0; см. № 8605, № 14207
										xhr.status,
										xhr.statusText
									);
								}
							} еще {
								полная (
									xhrSuccessStatus [xhr.status] || xhr.status,
									xhr.statusText,

									// Поддержка: только IE <= 9
									// IE9 не имеет XHR2, но создает двоичный файл (trac-11426)
									// Для не-текста XHR2, пусть вызывающий обрабатывает его (gh-2498)
									(xhr.responseType || "текст")! == "текст" ||
									typeof xhr.responseText! == "строка"?
										{двоичный файл: xhr.response}:
										{text: xhr.responseText},
									xhr.getAllResponseHeaders ()
								);
							}
						}
					};
				};

				// Слушаем события
				xhr.onload = callback ();
				errorCallback = xhr.onerror = xhr.ontimeout = callback («ошибка»);

				// Поддержка: только IE 9
				// Используем onreadystatechange для замены onabort
				// для обработки необработанных прерываний
				if (xhr.onabort! == undefined) {
					xhr.onabort = errorCallback;
				} еще {
					xhr.onreadystatechange = function () {

						// Проверяем readyState до истечения времени ожидания
						if (xhr.readyState === 4) {

							// Разрешить вызов onerror первым,
							// но это не будет обрабатывать нативный аборт
							// Также сохраняем errorCallback в переменную
							// так как xhr.onerror недоступен
							window.setTimeout (function () {
								if (callback) {
									errorCallback ();
								}
							});
						}
					};
				}

				// Создать обратный вызов
				callback = callback ("abort");

				пытаться {

					// Посылаем запрос (это может вызвать исключение)
					xhr.send (options.hasContent && options.data || null);
				} catch (e) {

					// # 14683: только перебрасывать, если об этом еще не было сообщено как ошибка
					if (callback) {
						бросить е;
					}
				}
			},

			abort: function () {
				if (callback) {
					Перезвоните();
				}
			}
		};
	}
});




// Предотвращаем автоматическое выполнение скриптов, когда не был указан явный dataType (см. Gh-2432)
jQuery.ajaxPrefilter (function (s) {
	if (s.crossDomain) {
		s.contents.script = false;
	}
});

// Установить скрипт dataType
jQuery.ajaxSetup ({
	принимает: {
		скрипт: «текст / javascript, приложение / javascript» +
			"application / ecmascript, application / x-ecmascript"
	},
	содержание: {
		скрипт: / \ b (?: java | ecma) скрипт \ b /
	},
	преобразователи: {
		"текстовый скрипт": функция (текст) {
			jQuery.globalEval (текст);
			вернуть текст;
		}
	}
});

// Обработка особого случая кеша и crossDomain
jQuery.ajaxPrefilter ("script", function (s) {
	if (s.cache === undefined) {
		s.cache = false;
	}
	if (s.crossDomain) {
		s.type = "GET";
	}
});

// Привязать скрипт тега взломать транспорт
jQuery.ajaxTransport ("script", function (s) {

	// Этот транспорт работает только с междоменными или принудительными запросами
	if (s.crossDomain || s.scriptAttrs) {
		сценарий var, обратный вызов;
		вернуть {
			отправить: функция (_, завершено) {
				script = jQuery ("<script>")
					.attr (s.scriptAttrs || {})
					.prop ({charset: s.scriptCharset, src: s.url})
					.on («ошибка загрузки», callback = function (evt) {
						script.remove ();
						обратный вызов = ноль;
						if (evt) {
							полная (evt.type === "ошибка"? 404: 200, evt.type);
						}
					});

				// Используем нативную манипуляцию с DOM, чтобы избежать нашего обмана AJAX в domManip
				document.head.appendChild (script [0]);
			},
			abort: function () {
				if (callback) {
					Перезвоните();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = / (=) \? (? = & | $) | \? \? /;

// Настройки jsonp по умолчанию
jQuery.ajaxSetup ({
	jsonp: "обратный вызов",
	jsonpCallback: function () {
		var callback = oldCallbacks.pop () || (jQuery.expando + "_" + (nonce ++));
		this [callback] = true;
		обратный звонок;
	}
});

// Обнаружение, нормализация параметров и установка обратных вызовов для запросов jsonp
jQuery.ajaxPrefilter ("json jsonp", function (s, originalSettings, jqXHR) {

	var callbackName, перезаписано, responseContainer,
		jsonProp = s.jsonp! == false && (rjsonp.test (s.url)?
			"URL":
			typeof s.data === "строка" &&
				(s.contentType || "")
					.indexOf ("приложение lication / x-www-form-urlencoded") === 0 &&
				rjsonp.test (s.data) && "data"
		);

	// Обрабатываем, если ожидаемый тип данных "jsonp" или у нас есть параметр для установки
	if (jsonProp || s.dataTypes [0] === "jsonp") {

		// Получить имя обратного вызова, запомнив существующее значение, связанное с ним
		callbackName = s.jsonpCallback = isFunction (s.jsonpCallback)?
			s.jsonpCallback ():
			s.jsonpCallback;

		// Вставить обратный вызов в URL или данные формы
		if (jsonProp) {
			s [jsonProp] = s [jsonProp] .replace (rjsonp, "$ 1" + callbackName);
		} else if (s.jsonp! == false) {
			s.url + = (rquery.test (s.url)? "&": "?") + s.jsonp + "=" + callbackName;
		}

		// Используем конвертер данных для получения json после выполнения скрипта
		s.converters ["script json"] = function () {
			if (! responseContainer) {
				jQuery.error (callbackName + "не был вызван");
			}
			return responseContainer [0];
		};

		// Принудительно json dataType
		s.dataTypes [0] = "json";

		// Установить обратный вызов
		перезаписано = окно [callbackName];
		window [callbackName] = function () {
			responseContainer = аргументы;
		};

		// Функция очистки (срабатывает после преобразователей)
		jqXHR.always (function () {

			// Если предыдущее значение не существовало - удалите его
			if (перезаписано === не определено) {
				jQuery (окно) .removeProp (callbackName);

			// В противном случае восстановить существующее значение
			} еще {
				window [callbackName] = перезаписано;
			}

			// Сохранить обратно как бесплатное
			if (s [callbackName]) {

				// Убедитесь, что повторное использование параметров не мешает
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Сохраняем имя обратного вызова для будущего использования
				oldCallbacks.push (callbackName);
			}

			// Вызов, если это была функция, и у нас есть ответ
			if (responseContainer && isFunction (перезаписано)) {
				перезаписано (responseContainer [0]);
			}

			responseContainer = перезаписано = не определено;
		});

		// Делегировать в скрипт
		вернуть «скрипт»;
	}
});




// Поддержка: только Safari 8
// В Safari 8 документы создаются с помощью document.implementation.createHTMLDocument
// свернуть формы родного брата: второй становится потомком первого.
// Из-за этого эта мера безопасности должна быть отключена в Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = (function () {
	var body = document.implementation.createHTMLDocument ("") .body;
	body.innerHTML = "<form> </ form> <form> </ form>";
	return body.childNodes.length === 2;
}) ();


// Аргумент «data» должен быть строкой html
// context (необязательно): если указан, фрагмент будет создан в этом контексте,
// по умолчанию документ
// keepScripts (необязательно): если true, будет включать скрипты, переданные в HTML-строке
jQuery.parseHTML = function (data, context, keepScripts) {
	if (typeof data! == "string") {
		вернуть [];
	}
	if (typeof context === "логическое значение") {
		keepScripts = context;
		контекст = ложь;
	}

	var base, parsed, scripts;

	if (! context) {

		// Остановим немедленное выполнение скриптов или встроенных обработчиков событий
		// используя document.implementation
		if (support.createHTMLDocument) {
			context = document.implementation.createHTMLDocument ("");

			// Установить базовую ссылку для созданного документа
			// поэтому любые проанализированные элементы с URL
			// основаны на URL документа (gh-2965)
			base = context.createElement ("base");
			base.href = document.location.href;
			context.head.appendChild (base);
		} еще {
			контекст = документ;
		}
	}

	parsed = rsingleTag.exec (данные);
	scripts =! keepScripts && [];

	// одиночный тег
	if (parsed) {
		return [context.createElement (parsed [1])];
	}

	parsed = buildFragment ([данные], контекст, скрипты);

	if (scripts && scripts.length) {
		jQuery (скрипты) .remove ();
	}

	return jQuery.merge ([], parsed.childNodes);
};


/ **
 * Загрузить URL на страницу
 * /
jQuery.fn.load = function (url, params, callback) {
	var selector, type, response,
		Я = это,
		off = url.indexOf ("");

	if (off> -1) {
		selector = stripAndCollapse (url.slice (off));
		url = url.slice (0, выкл);
	}

	// Если это функция
	if (isFunction (params)) {

		// Мы предполагаем, что это обратный вызов
		обратный вызов = params;
		params = undefined;

	// В противном случае строим строку параметров
	} else if (params && typeof params === "object") {
		type = "POST";
	}

	// Если у нас есть элементы для изменения, сделать запрос
	if (self.length> 0) {
		jQuery.ajax ({
			URL: URL,

			// Если переменная «type» не определена, будет использован метод «GET».
			// Сделать значение этого поля явным, так как
			// пользователь может переопределить его с помощью метода ajaxSetup
			тип: тип || "ПОЛУЧИТЬ",
			dataType: "html",
			данные: параметры
		}) .done (function (responseText) {

			// Сохраняем ответ для использования при полном обратном вызове
			ответ = аргументы;

			self.html (селектор?

				// Если указан селектор, найдите нужные элементы в фиктивном элементе div
				// Исключаем скрипты, чтобы избежать ошибок IE 'Permission Denied'
				jQuery ("<div>") .append (jQuery.parseHTML (responseText)) .find (селектор):

				// Иначе использовать полный результат
				responseText);

		// Если запрос выполнен успешно, эта функция получает «data», «status», «jqXHR»
		// но они игнорируются, потому что ответ был установлен выше.
		// В случае сбоя эта функция получает «jqXHR», «status», «error»
		}) .always (функция обратного вызова && (jqXHR, status) {
			self.each (function () {
				callback.apply (this, response || [jqXHR.responseText, status, jqXHR]);
			});
		});
	}

	верни это;
};




// Присоединяем кучу функций для обработки общих событий AJAX
jQuery.each ([
	"AjaxStart",
	"AjaxStop",
	"AjaxComplete",
	"AjaxError",
	"AjaxSuccess",
	"AjaxSend"
], функция (i, тип) {
	jQuery.fn [тип] = функция (фн) {
		вернуть this.on (тип, fn);
	};
});




jQuery.expr.pseudos.animated = function (elem) {
	return jQuery.grep (jQuery.timers, function (fn) {
		вернуть элемент === фн.элем;
	}) .length;
};




jQuery.offset = {
	setOffset: function (elem, options, i) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, Calculate,
			position = jQuery.css (elem, "position"),
			curElem = jQuery (elem),
			реквизит = {};

		// Сначала устанавливаем позицию, в случае, если верх / лев установлены даже на статическом элементе
		if (position === "static") {
			elem.style.position = "относительный";
		}

		curOffset = curElem.offset ();
		curCSSTop = jQuery.css (elem, "top");
		curCSSLeft = jQuery.css (elem, "left");
		рассчитать положение = (позиция === "абсолютная" || позиция === "фиксированная") &&
			(curCSSTop + curCSSLeft) .indexOf ("auto")> -1;

		// Нужно иметь возможность рассчитать позицию, если либо
		// вверху или слева - авто, а позиция - абсолютная или фиксированная
		if (calculatePosition) {
			curPosition = curElem.position ();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} еще {
			curTop = parseFloat (curCSSTop) || 0;
			curLeft = parseFloat (curCSSLeft) || 0;
		}

		if (isFunction (options)) {

			// Используем jQuery.extend здесь, чтобы разрешить изменение аргумента координат (gh-1848)
			options = options.call (elem, i, jQuery.extend ({}, curOffset));
		}

		if (options.top! = null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left! = null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}

		if («используя» в настройках) {
			options.using.call (элемент, реквизит);

		} еще {
			curElem.css (реквизит);
		}
	}
};

jQuery.fn.extend ({

	// offset () связывает рамку элемента с источником документа
	смещение: функция (опции) {

		// Сохраняем цепочку для сеттера
		if (arguments.length) {
			варианты возврата === не определено?
				этот :
				this.each (function (i) {
					jQuery.offset.setOffset (это, параметры, я);
				});
		}

		var rect, win,
			elem = this [0];

		if (! elem) {
			вернуть;
		}

		// Возвращаем нули для отключенных и скрытых (display: none) элементов (gh-2310)
		// Поддержка: только IE <= 11
		// Запуск getBoundingClientRect для
		// отключенный узел в IE выдает ошибку
		if (! elem.getClientRects (). length) {
			return {top: 0, left: 0};
		}

		// Получить относительную позицию документа, добавив прокрутку видового экрана к gBCR относительного видового экрана
		rect = elem.getBoundingClientRect ();
		win = elem.ownerDocument.defaultView;
		вернуть {
			top: rect.top + win.pageYOffset,
			слева: rect.left + win.pageXOffset
		};
	},

	// position () связывает поле поля элемента с полем заполнения его смещенного родителя
	// Это соответствует поведению CSS абсолютного позиционирования
	position: function () {
		if (! this [0]) {
			вернуть;
		}

		var offsetParent, offset, doc,
			elem = this [0],
			parentOffset = {top: 0, left: 0};

		// позиция: фиксированные элементы смещены относительно области просмотра, которая всегда имеет нулевое смещение
		if (jQuery.css (elem, "position") === "fixed") {

			// Предполагаем позицию: исправлено подразумевает наличие getBoundingClientRect
			offset = elem.getBoundingClientRect ();

		} еще {
			offset = this.offset ();

			// Учет * реального * родительского смещения, которым может быть документ или его корневой элемент
			// когда идентифицирован статически расположенный элемент
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while (offsetParent &&
				(offsetParent === doc.body || offsetParent === doc.documentElement) &&
				jQuery.css (offsetParent, "position") === "static") {

				offsetParent = offsetParent.parentNode;
			}
			if (offsetParent && offsetParent! == elem && offsetParent.nodeType === 1) {

				// Включаем границы в свое смещение, так как они находятся за пределами источника контента
				parentOffset = jQuery (offsetParent) .offset ();
				parentOffset.top + = jQuery.css (offsetParent, "borderTopWidth", true);
				parentOffset.left + = jQuery.css (offsetParent, "borderLeftWidth", true);
			}
		}

		// Вычитаем родительские смещения и поля элементов
		вернуть {
			top: offset.top - parentOffset.top - jQuery.css (elem, "marginTop", true),
			left: offset.left - parentOffset.left - jQuery.css (elem, "marginLeft", true)
		};
	},

	// Этот метод вернет documentElement в следующих случаях:
	// 1) Для элемента внутри iframe без offsetParent этот метод вернет
	// documentElement родительского окна
	// 2) Для скрытого или отсоединенного элемента
	// 3) Для элемента body или html, т.е. в случае узла html - он вернет сам
	//
	// но эти исключения никогда не были представлены в качестве реальных сценариев использования
	// и может рассматриваться как более предпочтительный результат.
	//
	// Эта логика, однако, не гарантируется и может измениться в любой момент в будущем
	offsetParent: function () {
		вернуть this.map (function () {
			var offsetParent = this.offsetParent;

			while (offsetParent && jQuery.css (offsetParent, "position") === "static") {
				offsetParent = offsetParent.offsetParent;
			}

			вернуть offsetParent || documentElement;
		});
	}
});

// Создать методы scrollLeft и scrollTop
jQuery.each ({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, функция (метод, реквизит) {
	var top = "pageYOffset" === prop;

	jQuery.fn [method] = function (val) {
		возвратный доступ (this, function (elem, method, val) {

			// Объединяем документы и окна
			вар победа;
			if (isWindow (elem)) {
				победа = элемент;
			} else if (elem.nodeType === 9) {
				win = elem.defaultView;
			}

			if (val === undefined) {
				вернуть выиграть? победа [опора]: элемент [метод];
			}

			если (победа) {
				win.scrollTo (
					!Топ ? val: win.pageXOffset,
					Топ ? val: win.pageYOffset
				);

			} еще {
				elem [метод] = val;
			}
		}, метод, val, arguments.length);
	};
});

// Поддержка: Safari <= 7 - 9,1, Chrome <= 37 - 49
// Добавить верхний / левый cssHooks используя jQuery.fn.position
// Ошибка Webkit: https://bugs.webkit.org/show_bug.cgi?id=29084
// Мигает ошибка: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle возвращает процент, если указано для top / left / bottom / right;
// вместо того, чтобы заставить модуль css зависеть от модуля смещения, просто проверьте это здесь
jQuery.each (["top", "left"], function (i, prop) {
	jQuery.cssHooks [prop] = addGetHookIf (support.pixelPosition,
		function (elem, computed) {
			if (вычислено) {
				computed = curCSS (elem, prop);

				// Если curCSS возвращает процент, откат к смещению
				вернуть rnumnonpx.test (вычислено)?
					jQuery (elem) .position () [prop] + "px":
					вычислено;
			}
		}
	);
});


// Создаем методы innerHeight, innerWidth, height, width, outerHeight и outerWidth
jQuery.each ({Высота: «высота», Ширина: «ширина»}, функция (имя, тип) {
	jQuery.each ({padding: "inner" + name, content: type, "": "external" + name},
		function (defaultExtra, funcName) {

		// Маржа только для externalHeight, outerWidth
		jQuery.fn [funcName] = function (margin, value) {
			var chainable = arguments.length && (defaultExtra || typeof margin! == "логическое значение"),
				extra = defaultExtra || (margin === true || value === true? "margin": "border");

			вернуть доступ (this, функция (elem, type, value) {
				вар док;

				if (isWindow (elem)) {

					// $ (window) .outerWidth / Height возвращаемая ширина в час, включая полосы прокрутки (gh-1729)
					return funcName.indexOf ("external") === 0?
						elem ["inner" + name]:
						elem.document.documentElement ["клиент" + имя];
				}

				// Получить ширину или высоту документа
				if (elem.nodeType === 9) {
					doc = elem.documentElement;

					// Либо прокручиваем [Ширина / Высота], либо смещаем [Ширина / Высота], либо клиент [Ширина / Высота],
					// какой самый большой
					вернуть Math.max (
						elem.body ["scroll" + имя], doc ["scroll" + имя],
						elem.body ["offset" + name], doc ["offset" + name],
						doc ["клиент" + имя]
					);
				}

				возвращаемое значение === не определено?

					// Получить ширину или высоту элемента, запрашивая, но не форсируя parseFloat
					jQuery.css (элемент, тип, дополнительный):

					// Установить ширину или высоту элемента
					jQuery.style (elem, type, value, extra);
			} типа, цепочки? поле: не определено, цепочка);
		};
	});
});


jQuery.each (("размытие фокуса, фокус, фокусировка, изменение размера, прокрутка, щелчок dblclick" +
	"mousedown mouseup mousemove mouseover mouseout mouseterleave" +
	"изменить, выбрать, отправить, нажать клавишу, нажать клавишу, контекстное меню") .split (""),
	функция (я, имя) {

	// Обработка привязки события
	jQuery.fn [name] = function (data, fn) {
		вернуть arguments.length> 0?
			this.on (name, null, data, fn):
			this.trigger (имя);
	};
});

jQuery.fn.extend ({
	hover: function (fnOver, fnOut) {
		return this.mouseenter (fnOver) .mouseleave (fnOut || fnOver);
	}
});




jQuery.fn.extend ({

	bind: function (types, data, fn) {
		вернуть this.on (типы, null, data, fn);
	},
	unbind: function (types, fn) {
		вернуть this.off (types, null, fn);
	},

	делегат: функция (селектор, типы, данные, fn) {
		вернуть this.on (типы, селектор, данные, фн);
	},
	undelegate: function (селектор, типы, fn) {

		// (пространство имен) или (селектор, types [, fn])
		вернуть arguments.length === 1?
			this.off (селектор, "**"):
			this.off (типы, селектор || "**", fn);
	}
});

// Привязать функцию к контексту, необязательно частично применяя любой
// аргументы.
// jQuery.proxy устарел для продвижения стандартов (в частности, Function # bind)
// Тем не менее, это не намечено для удаления в ближайшее время
jQuery.proxy = function (fn, context) {
	var tmp, args, proxy;

	if (typeof context === "string") {
		tmp = fn [context];
		context = fn;
		fn = tmp;
	}

	// Быстрая проверка, чтобы определить, является ли цель вызываемой, в спецификации
	// это вызывает ошибку TypeError, но мы просто вернем undefined.
	if (! isFunction (fn)) {
		возврат не определен;
	}

	// Имитация привязки
	args = slice.call (arguments, 2);
	proxy = function () {
		return fn.apply (context || this, args.concat (slice.call (arguments)));
	};

	// Устанавливаем guid уникального обработчика на тот же, что и в оригинальном обработчике, чтобы его можно было удалить
	proxy.guid = fn.guid = fn.guid || jQuery.guid ++;

	возврат прокси;
};

jQuery.holdReady = function (hold) {
	if (hold) {
		jQuery.readyWait ++;
	} еще {
		jQuery.ready (правда);
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function (obj) {

	// Начиная с jQuery 3.0, isNumeric ограничено
	// строки и числа (примитивы или объекты)
	// это может быть приведено к конечным числам (gh-2662)
	var type = jQuery.type (obj);
	возврат (тип === "число" || тип === "строка") &&

		// parseFloat NaNs ложные срабатывания с числовым значением ("")
		// ... но неверно интерпретирует строки начальных чисел, особенно шестнадцатеричные литералы ("0x ...")
		// вычитаем силы бесконечности в NaN
		! isNaN (obj - parseFloat (obj));
};




// Зарегистрируйтесь как именованный модуль AMD, поскольку jQuery может быть соединен с другим
// файлы, которые могут использовать define, но не через надлежащий сценарий конкатенации, который
// понимает анонимные модули AMD. Названная AMD является самой безопасной и надежной
// способ зарегистрироваться. JQuery в нижнем регистре используется, потому что имена модулей AMD
// получен из имен файлов, а jQuery обычно поставляется в нижнем регистре
// имя файла. Сделайте это после создания глобального, так что если модуль AMD хочет
// вызвать noConflict, чтобы скрыть эту версию jQuery, она будет работать.

// Обратите внимание, что для максимальной переносимости библиотеки, не являющиеся jQuery, должны
// объявляем себя анонимными модулями и избегаем установки глобального
// AMD загрузчик присутствует. JQuery это особый случай. Для получения дополнительной информации см.
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if (typeof define === "function" && define.amd) {
	define ("jquery", [], function () {
		вернуть jQuery;
	});
}




вар

	// Карта поверх jQuery в случае перезаписи
	_jQuery = window.jQuery,

	// Карта поверх $ в случае перезаписи
	_ $ = окно. $;

jQuery.noConflict = function (deep) {
	if (window. $ === jQuery) {
		окно. $ = _ $;
	}

	if (deep && window.jQuery === jQuery) {
		window.jQuery = _jQuery;
	}

	вернуть jQuery;
};

// Предоставляем идентификаторы jQuery и $ даже в AMD
// (# 7102 # комментарий: 10, https://github.com/jquery/jquery/pull/557)
// и CommonJS для эмуляторов браузера (# 13566)
if (! noGlobal) {
	window.jQuery = window. $ = jQuery;
}




вернуть jQuery;
});