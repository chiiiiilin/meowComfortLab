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
				<ul class="ml-2 mt-5">
					<li class="flex items-center py-[1px]">
						<SvgIcon name="phone" class="w-5 h-8 mr-2"></SvgIcon>
						<a href="tel:+1234567890" class="my-1 block"
							>01-234-567-890</a
						>
					</li>
					<li class="flex items-center py-[1px]">
						<SvgIcon
							name="email-outline"
							class="w-5 h-8 mr-2"
						></SvgIcon>
						<a
							href="mailto: test@meow.com.tw"
							target="_blank"
							class="my-1 block"
						>
							test@meow.com.tw</a
						>
					</li>
					<li class="flex items-center py-[1px]">
						<SvgIcon name="shop" class="w-5 h-8 mr-2"></SvgIcon>
						<p>14:00 ~ 22:00</p>
					</li>
					<li class="flex items-center py-[1px]">
						<SvgIcon name="location" class="w-5 h-8 mr-2"></SvgIcon>
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
								class="text-lg"
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
									class="block text-primary-dark hover:text-gray-700 transition duration-300"
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
