const shareLink = document.getElementById('share-link');
const feedback = document.getElementById('feedback');
const feedbackInput = document.getElementById('feedback-input');
const submitFeedback = document.getElementById('submit-feedback');
const cancelFeedback = document.getElementById('cancel-feedback');

shareLink.onclick = () => {
	if ('share' in navigator) {
		navigator.share({ url: 'https://defly.monster' });
	} else {
		shareLink.outerHTML = `<span>You can't share links</span>`;
	}
};

document.getElementById('feedback-link').onclick = (e) => {
	feedback.showModal();
};

cancelFeedback.onclick = (e) => {
	feedback.close();
	feedbackInput.value = '';
};

submitFeedback.onclick = async (e) => {
	if (feedbackInput.value.length >= 20) {
		console.log(
			JSON.stringify({
				feedback: feedbackInput.value.substring(0, 500),
			})
		);
		submitFeedback.innerHTML = 'Loading...';
		const data = await fetch('/api/feedback', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				feedback: feedbackInput.value.substring(0, 500),
			}),
		});
		const res = await data.json();
		if (res.status === 'success') {
			feedback.close();
			feedbackInput.value = '';
			submitFeedback.innerHTML = 'Submit';
		} else {
			submitFeedback.innerHTML = 'Try again';
		}
	} else {
		submitFeedback.innerHTML = 'Try again';
	}
};
