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
	const navItems = ref([
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
		{ icon: true, name: '會員專區', source: 'member' },
		{ icon: true, name: '購物車', source: 'shopping-cart' },
	]);

	//FAQ內容
	const faqList = ref([]);
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
