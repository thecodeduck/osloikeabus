import * as vet from 'vet';

const matches = vet.objects.matches;

export default matches(
	{
		lang: vet.strings.isString,
		modal: {
			shown: vet.booleans.isBoolean,
			text: vet.strings.isString,
			action: vet.strings.isString,
		},
	}
);

// code: optional(
// 	vet.matchesAllOf(vet.arrays.isArray, vet.arrays.isLength(4))
// ),
