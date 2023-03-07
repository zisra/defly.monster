export function escapeEmojis(str) {
	// Define regex pattern to match emojis
	const regex =
		/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

	// Replace all occurrences of emojis with the same text with backslashes added
	return str.replace(regex, '\\$1');
}
