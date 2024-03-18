export default defineNuxtPlugin((nuxtApp) => {
	const ToastManager = {
		showToast({
			message,
			type,
			duration = 1500,
		}: {
			message: string;
			type: string;
			duration?: number;
		}): void {
			const toast = document.createElement('div');
			toast.className = `toast toast-top toast-center mt-12`;
			toast.innerHTML = `
				<div class="alert alert-${type}">
					<div>
						<span>${message}</span>
					</div>
				</div>
			`;

			document.body.appendChild(toast);
			setTimeout(() => {
				toast.remove();
			}, duration);
		},
	};

	nuxtApp.provide('toast', ToastManager);
});
