import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
export const useMainStore = defineStore('mainStore', () => {
	const productStore = useProductStore();

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
	interface Category {
		name: string;
		subitems: string[];
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
					svg: 'member',
				},
				{
					name: '所有訂單',
					source: 'member/orders',
					svg: 'order',
				},
				{
					name: '收藏商品',
					source: 'member/likes',
					svg: 'heart-outline',
				},
			],
		},
		{ icon: true, name: '購物車', source: 'cart' },
	]);

	const updateNavItems = (categories: Category[]) => {
		const allProductsIndex = navItems.value.findIndex(
			(item) => item.name === '所有商品'
		);
		if (allProductsIndex !== -1) {
			navItems.value[allProductsIndex].children = categories.map(
				(category) => ({
					name: category.name,
					source: `products?category=${category.name}`,
					children: category.subitems.map((subitem) => ({
						name: subitem,
						source: `products?category=${category.name}&subcategory=${subitem}`,
					})),
				})
			);
		}
	};

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
		updateNavItems,
		faqList,
		getFaqList,
	};
});
