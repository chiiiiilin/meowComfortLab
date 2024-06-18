<template>
	<main class="lg:py-24 relative m-auto">
		<section
			class="w-[80%] m-auto relative flex flex-col lg:flex-row justify-between"
		>
			<header
				class="box-border lg:pt-24 lg:flex lg:items-center translate-y-[50%] md:translate-y-[100%] lg:translate-y-0"
			>
				<h1 class="w-full lg:w-fit">
					<SvgIcon
						name="logo-large"
						class="w-[150px] h-[60px] lg:w-[450px] lg:h-fit"
					></SvgIcon>
				</h1>
				<div class="pb-3 md:pb-0 text-sm md:text-lg lg:text-xl">
					<p>最適合你家的家具</p>
					<p>懂你的貓，也懂你的人</p>
				</div>
			</header>
			<img
				ref="catHouseImage"
				src="@/assets/images/design_cat_toilet.jpg"
				alt="設計貓砂櫃"
				class="w-1/2 box-border pl-3 lg:w-[500px] relative z-10 self-end"
			/>
		</section>
		<section class="relative">
			<figure
				class="h-screen w-[80%] m-auto translate-y-[-5%] sticky top-[70px] opacity-100"
				ref="catWallImage"
			>
				<img
					src="@/assets/images/design_cat_wall.jpg"
					alt="設計貓牆"
					class="w-full h-full object-cover"
				/>
			</figure>
			<article
				class="w-full text-center text-xl relative translate-y-[-150%] lg:translate-y-[-100%]"
			>
				<div class="flex flex-col items-center">
					<p>貓咪亂抓、亂尿傢俱,</p>
					<p>搞得環境一團糟，</p>
					<p>是在傳達他對環境空間的不滿意...</p>
					<br />
					<p>不同於狗狗，貓貓需要的是</p>
					<br />
					<p
						class="flex justify-center tracking-widest"
						style="writing-mode: vertical-lr"
					>
						垂直空間
					</p>
					<br />
					<p>即使是租屋族、小坪數套房，</p>
					<p>也能讓貓咪擁有更棒的生活空間!</p>
				</div>
			</article>
		</section>
		<section
			class="max-w-screen-xl px-3 relative translate-y-[-42px] m-auto flex flex-col lg:flex-row lg:justify-between"
			ref="sectionRef1"
		>
			<img
				src="https://chiiiiilin.github.io/lifecat/pictures/verdical.png"
				alt="垂直貓牆"
				class="w-1/2 lg:w-96 lg:order-last translate-y-[-30%] lg:translate-y-[-15%]"
				ref="sectionImage1"
			/>
			<article class="lg:mt-40 w-full lg:w-1/2" ref="sectionArticle1">
				<header class="flex items-center relative">
					<div class="text-lg md:text-xl lg:text-4xl my-6">
						<h2>適合所有貓咪家庭</h2>
						<h2>實用和美觀兼具的質感設計</h2>
					</div>
					<img
						src="https://chiiiiilin.github.io/lifecat/pictures/nekofoot.png"
						alt="標題"
						class="w-24 mx-5"
						ref="sectionPaw1"
					/>
				</header>
				<p class="lg:text-lg">
					運用家中多餘的牆壁，能為貓咪增加具隱蔽性、且能居高臨下的好感空間！貓體工學堅持使用全實木，並挑選對貓咪不具毒性的胡桃木、松木，裁切後磨成圓角，去除樹木天然產生的尖刺，確保貓咪用的開心，您也看得安心！
				</p>
				<UICustomBtn
					label="查看設計商品"
					class="my-5"
					@click="navigateTo('products')"
				/>
			</article>
		</section>
	</main>
</template>

<script lang="ts" setup>
const catHouseImage = ref(null);
const catWallImage = ref(null);
const sectionRef1 = ref(null);
const sectionImage1 = ref(null);
const sectionArticle1 = ref(null);
const sectionPaw1 = ref(null);

onMounted(() => {
	const { $gsap } = useNuxtApp();

	$gsap
		.timeline({
			scrollTrigger: {
				trigger: catHouseImage.value,
				start: 'top 70px',
				end: 'bottom-=30px 80px',
				scrub: true,
				// markers: true,
			},
		})
		.to(catWallImage.value, {
			width: '100%',
			duration: 3,
		})
		.to(
			catWallImage.value,
			{
				opacity: '0.7',
				duration: 1,
			},
			'+=0' // 設置在寬度變化完成後立即開始
		);
	if (process.client) {
		const isMobile = window.innerWidth <= 1280;

		if (!isMobile) {
			$gsap
				.timeline({
					scrollTrigger: {
						trigger: sectionRef1.value,
						start: 'top-=100px 180px',
						end: 'bottom top',
						scrub: true,
						// markers: true,
					},
				})
				.to(sectionArticle1.value, {
					y: '100px',
					ease: 'none',
					duration: 1,
				})
				.to(
					sectionImage1.value,
					{
						y: '-100px',
						ease: 'none',
						duration: 1,
					},
					0 // 與時間起點縣同步開始
				)
				.to(
					sectionPaw1.value,
					{
						rotate: '50deg',
						ease: 'none',
						duration: 1,
					},
					'<' // 與前一個動畫同步開始
				);
		} else {
			$gsap
				.timeline({
					scrollTrigger: {
						trigger: sectionRef1.value,
						start: 'top-=100px 180px',
						end: 'bottom top',
						scrub: true,
						// markers: true,
					},
				})
				.to(sectionArticle1.value, {
					y: '-50px',
					ease: 'none',
					duration: 1,
				})
				.to(
					sectionImage1.value,
					{
						y: '50px',
						ease: 'none',
						duration: 1,
					},
					0 // 與時間起點縣同步開始
				)
				.to(
					sectionPaw1.value,
					{
						rotate: '50deg',
						ease: 'none',
						duration: 1,
					},
					'<' // 與前一個動畫同步開始
				);
		}
	}
});
</script>

<style scoped>
.w-fit {
	width: fit-content;
}
</style>
