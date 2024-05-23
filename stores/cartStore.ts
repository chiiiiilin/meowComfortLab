import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue';
import { useAuthStore } from './authStore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useCartStore = defineStore('cartStore', () => {
	interface CartItem {
		id: string;
		quantity: number;
	}

	const cartItems = vueRef<CartItem[]>([]);
	const authStore = useAuthStore();
	const { $firestore } = useNuxtApp();

	const showCartDropdown = ref(false);
	const setShowCartDropdown = (value: boolean) => {
		showCartDropdown.value = value;
	};

	const loadCartItems = () => {
		if (typeof window !== 'undefined') {
			const storedCartItems = localStorage.getItem('cartItems');
			if (storedCartItems) {
				cartItems.value = JSON.parse(storedCartItems);
			}
		}
	};

	const saveCartItemsToLocalStorage = () => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
		}
	};

	const saveCartItemsToFirestore = async () => {
		const userId = authStore.user?.uid;
		if (userId) {
			try {
				const userCartRef = doc($firestore, 'users', userId);
				await setDoc(
					userCartRef,
					{ cartItems: cartItems.value },
					{ merge: true }
				);
			} catch (error) {
				console.error('Error saving cart items to Firestore:', error);
			}
		}
	};

	const mergeCartItems = (
		localItems: CartItem[],
		firestoreItems: CartItem[]
	) => {
		const mergedItems = [...firestoreItems];

		localItems.forEach((localItem) => {
			const existingItem = mergedItems.find(
				(item) => item.id === localItem.id
			);
			if (existingItem) {
				// 如果本地的商品已存在於 Firestore 中，則保持 Firestore 的數量
				existingItem.quantity = localItem.quantity;
			} else {
				// Firestore 中沒有本地商品，將本地商品添加到合併後的列表
				mergedItems.push(localItem);
			}
		});

		return mergedItems;
	};

	const addCartItem = (id: string, quantity: number) => {
		const existingItem = cartItems.value.find((item) => item.id === id);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cartItems.value.push({ id, quantity });
		}
		saveCartItemsToLocalStorage();
		saveCartItemsToFirestore();
	};

	const deleteCartItem = (id: string) => {
		cartItems.value = cartItems.value.filter((item) => item.id !== id);
		saveCartItemsToLocalStorage();
		saveCartItemsToFirestore();
	};

	const loadAndMergeCartItems = async () => {
		const userId = authStore.user?.uid;
		if (userId) {
			try {
				const userCartRef = doc($firestore, 'users', userId);
				const docSnap = await getDoc(userCartRef);

				if (docSnap.exists()) {
					const firestoreData = docSnap.data();

					if (firestoreData && firestoreData.cartItems) {
						const firestoreCartItems = firestoreData.cartItems;

						cartItems.value = mergeCartItems(
							cartItems.value,
							firestoreCartItems
						);

						saveCartItemsToLocalStorage();
						saveCartItemsToFirestore();
					}
				}
			} catch (error) {
				console.error(
					'Error loading cart items from Firestore:',
					error
				);
			}
		}
	};

	return {
		showCartDropdown,
		setShowCartDropdown,
		cartItems,
		loadCartItems,
		addCartItem,
		deleteCartItem,
		loadAndMergeCartItems,
	};
});
