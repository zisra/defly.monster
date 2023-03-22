export function escapeEmojis(str) {
	const regex =
		/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g; // Matches all emojis
	return str.replace(regex, '\\$1');
}
