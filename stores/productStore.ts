import { doc, setDoc, getDoc } from 'firebase/firestore';
export const useProductStore = defineStore('productStore', () => {
	interface Category {
		name: string;
		chName: string;
		children?: Category[];
		items: Product[];
	}
	interface Product {
		id: String;
		name: String;
		price: Number;
		description?: String;
	}

	const products = ref<Category[]>([
		{
			name: 'cat-jump',
			chName: '貓跳台',
			items: [
				{
					id: '1',
					name: '跳台型號A',
					price: 100,
					description: '高質感木製跳台，適合室內外使用',
				},
				{
					id: '2',
					name: '跳台型號B',
					price: 200,
					description: '多層次設計，讓你的貓咪更享受攀爬',
				},
			],
			children: [
				{
					name: 'sub1',
					chName: '小型貓跳台',
					items: [
						{
							id: '5',
							name: '迷你跳台',
							price: 80,
							description: '適合小空間，讓貓咪也能自由跳躍',
						},
					],
				},
			],
		},
		{
			name: 'cat-litter',
			chName: '貓砂櫃',
			items: [
				{
					id: '3',
					name: '智能除臭貓砂櫃',
					price: 300,
					description: '自動除臭，保持室內空氣清新',
				},
				{
					id: '4',
					name: '簡約款貓砂櫃',
					price: 150,
					description: '簡潔設計，融入家居不突兀',
				},
			],
		},
		{
			name: 'cat-toy',
			chName: '貓咪玩具',
			items: [
				{
					id: '6',
					name: '羽毛逗貓棒',
					price: 50,
					description: '彈性好，帶給貓咪無限樂趣',
				},
				{
					id: '7',
					name: '智能逗貓球',
					price: 120,
					description: '自動滾動，吸引貓咪追逐',
				},
			],
		},
	]);
	return { products };
});
