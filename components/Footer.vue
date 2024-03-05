<template>
	<footer class="bg-primary px-4 py-4 lg:px-12 lg:py-8">
		<div class="flex justify-around py-6 lg:py-12">
			<div class="w-full lg:w-1/5 lg:text-left">
				<div class="flex justify-start my-3">
					<NuxtLink
						to="https://www.instagram.com/"
						target="blank"
						external
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
							alt=""
							class="h-8 w-8 mx-2"
						/>
					</NuxtLink>
					<NuxtLink
						to="https://www.facebook.com/"
						target="blank"
						external
					>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
							alt=""
							class="h-8 w-12 mx-2"
						/>
					</NuxtLink>
					<NuxtLink to="https://line.me/tw/" target="blank" external>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/9/92/LINE_APP_Logo.png"
							alt=""
							class="h-8 w-8 mx-2"
						/>
					</NuxtLink>
				</div>
				<ul class="ml-2">
					<li class="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 24 24"
							class="w-[20px] mr-2"
						>
							<path
								d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1c-1.24 0-2.45-.2-3.57-.57a.84.84 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.149 15.149 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1z"
								fill="currentColor"
							></path>
						</svg>
						<a href="tel:+1234567890" class="my-1 block"
							>01-234-567-890</a
						>
					</li>
					<li class="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 48 48"
							class="w-[20px] mr-2"
						>
							<g fill="none">
								<path
									d="M37.75 9c2.9 0 5.25 2.35 5.25 5.25v19.5c0 2.9-2.35 5.25-5.25 5.25h-27.5A5.25 5.25 0 0 1 5 33.75v-19.5C5 11.35 7.35 9 10.25 9h27.5zm2.75 9.351l-15.898 8.744a1.25 1.25 0 0 1-1.077.061l-.127-.06L7.5 18.35V33.75a2.75 2.75 0 0 0 2.75 2.75h27.5a2.75 2.75 0 0 0 2.75-2.75V18.351zM37.75 11.5h-27.5a2.75 2.75 0 0 0-2.75 2.75v1.249L24 24.573l16.5-9.075V14.25a2.75 2.75 0 0 0-2.75-2.75z"
									fill="currentColor"
								></path>
							</g>
						</svg>
						<a
							href="mailto: test@meow.com.tw"
							target="_blank"
							class="my-1 block"
						>
							test@meow.com.tw</a
						>
					</li>
					<li class="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 1024 1024"
							class="w-[20px] mr-2"
						>
							<path
								d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0 0 14.4 70.4c4.3 10.2 9.6 19.8 15.6 28.9v345c0 17.6 14.3 32 32 32h676c17.7 0 32-14.3 32-32V535a175 175 0 0 0 15.6-28.9c9.5-22.3 14.4-46 14.4-70.4V304c0-17-13.3-30.9-30-31.9zM214 184h596v88H214v-88zm362 656.1H448V736h128v104.1zm234 0H640V704c0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32v136.1H214V597.9c2.9 1.4 5.9 2.8 9 4c22.3 9.4 46 14.1 70.4 14.1s48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1c.2-.1.4-.1.6 0a180.4 180.4 0 0 0 38.7 22.1c22.3 9.4 46 14.1 70.4 14.1c24.4 0 48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1c.2-.1.4-.1.6 0a180.4 180.4 0 0 0 38.7 22.1c22.3 9.4 46 14.1 70.4 14.1c24.4 0 48-4.7 70.4-14.1c3-1.3 6-2.6 9-4v242.2zm30-404.4c0 59.8-49 108.3-109.3 108.3c-40.8 0-76.4-22.1-95.2-54.9c-2.9-5-8.1-8.1-13.9-8.1h-.6c-5.7 0-11 3.1-13.9 8.1A109.24 109.24 0 0 1 512 544c-40.7 0-76.2-22-95-54.7c-3-5.1-8.4-8.3-14.3-8.3s-11.4 3.2-14.3 8.3a109.63 109.63 0 0 1-95.1 54.7C233 544 184 495.5 184 435.7v-91.2c0-.3.2-.5.5-.5h655c.3 0 .5.2.5.5v91.2z"
								fill="currentColor"
							></path>
						</svg>
						<p>14:00 ~ 22:00</p>
					</li>
					<li class="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 20 20"
							class="w-[20px] mr-2"
						>
							<g fill="none">
								<path
									d="M13 9a3 3 0 1 1-6 0a3 3 0 0 1 6 0zm-1 0a2 2 0 1 0-4 0a2 2 0 0 0 4 0zm2.95 4.955a7.005 7.005 0 0 0 0-9.904a6.998 6.998 0 0 0-9.9 0a7.005 7.005 0 0 0 0 9.904l1.521 1.499l2.043 1.985l.133.118c.775.628 1.91.588 2.64-.118l2.435-2.37l1.128-1.114zM5.755 4.756a6.002 6.002 0 0 1 8.49 0a6.008 6.008 0 0 1 .176 8.31l-.176.184l-1.321 1.304l-2.23 2.168l-.094.08a.997.997 0 0 1-1.2 0l-.093-.08l-2.98-2.905l-.572-.567l-.176-.183a6.008 6.008 0 0 1 .176-8.31z"
									fill="currentColor"
								></path>
							</g>
						</svg>
						<a
							href="https://maps.app.goo.gl/tCShmx8YTDu7MXW1A"
							target="_blank"
							class="my-1 block"
						>
							貓星市軟綿區喵嗚大道二段22號</a
						>
					</li>
				</ul>
			</div>
			<nav class="hidden lg:flex lg:w-4/5">
				<template
					v-for="navItem in mainStore.navItems"
					:key="navItem.name"
				>
					<ul v-if="!navItem.icon" class="lg:w-1/4">
						<li>
							<NuxtLink
								:to="`/${navItem.source}`"
								class="text-lg font-bold"
							>
								{{ navItem.name }}
							</NuxtLink>
						</li>
						<div class="w-4/5 h-[3px] bg-primary-dark my-2"></div>
						<ul>
							<li>
								<NuxtLink
									v-for="navChild in navItem.children"
									:key="navChild.name"
									:to="`/${navItem.source}/${navChild.source}`"
									class="block hover:text-primary-dark transition duration-300"
									>{{ navChild.name }}
								</NuxtLink>
							</li>
						</ul>
					</ul>
				</template>
			</nav>
		</div>
		<div class="w-full bg-primary-dark h-[0.5px] my-5"></div>
		<p class="text-sm mx-auto w-fit font-bold text-red-800">
			本網站為個人練習作品，僅供學習、展示之用，無法進行購買流程。
			如有侵權疑慮將立即處理，謝謝
		</p>
	</footer>
</template>

<script setup>
const mainStore = useMainStore();
</script>

<style lang="scss" scoped></style>
