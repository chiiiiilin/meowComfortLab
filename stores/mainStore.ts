import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
export const useMainStore = defineStore('mainStore', () => {
	//rwd的目錄切換
	const isNavOpen = ref(false);
	const toggleNav = () => {
		isNavOpen.value = !isNavOpen.value;
	};
	const closeNav = () => {
		isNavOpen.value = false;
	};
	//網站目錄
	interface NavItem {
		name: string;
		source: string;
		children?: NavItem[];
		icon?: boolean;
		svg?: string;
	}
	const navItems = ref<NavItem[]>([
		{
			name: '所有商品',
			source: 'products',
			children: [
				{ name: '貓跳台', source: 'cat-towers' },
				{ name: '貓砂櫃', source: 'litter-boxes' },
				{ name: '生活小物', source: 'accessories' },
			],
		},
		{
			name: '實體概念店',
			source: 'shop',
			children: [
				{ name: '位置資訊', source: 'location' },
				{ name: '產品理念', source: 'ideas' },
			],
		},
		{
			name: '貓星人的推薦',
			source: 'recommend',
			children: [
				{
					name: '貍貍是隻貓｜鎖牆式貓跳台',
					source: 'wall-mounted-cat-towers',
				},
				{
					name: '奶茶不能喝｜落地式貓跳台',
					source: 'floor-cat-towers',
				},
				{ name: '妞妞扭一扭｜貓砂櫃', source: 'twist-litter-boxes' },
			],
		},
		{
			name: '常見問題',
			source: 'FAQ',
		},
		{
			icon: true,
			name: '會員專區',
			source: 'member',
			children: [
				{
					name: '個人資料',
					source: 'member',
					svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
				  </svg>
			  `,
				},
				{
					name: '所有訂單',
					source: 'member/orders',
					svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
			  </svg>`,
				},
				{
					name: '收藏商品',
					source: 'member/likes',
					svg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
			  </svg>
			  `,
				},
			],
		},
		{ icon: true, name: '購物車', source: 'shopping-cart' },
	]);

	//FAQ內容
	interface FaqItem {
		id: string;
		order: number;
		title: string;
		contents: {
			[key: string]: any;
		};
	}
	const faqList = ref<FaqItem[]>([]);
	const getFaqList = async () => {
		const db = getFirestore();
		const docRef = doc(db, 'siteInfo', 'FAQ');
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			let data = docSnap.data();
			faqList.value = Object.entries(data)
				.map(([id, content]) => ({
					id,
					...content,
				}))
				.sort((a, b) => a.order - b.order);
		}
	};

	return {
		isNavOpen,
		toggleNav,
		closeNav,
		navItems,
		faqList,
		getFaqList,
	};
});
