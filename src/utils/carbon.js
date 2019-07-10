import safeEval from 'safe-eval';

export const carbonAmountIn = (years = 25, formula, userSurface = 1) => {
	if (!years || isNaN(years)) return;

	return safeEval(`(function(y) { ${formula}; })(${years}) * ${userSurface}`);
};
