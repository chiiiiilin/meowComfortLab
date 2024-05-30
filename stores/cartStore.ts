import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue';
import { useAuthStore } from './authStore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useCartStore = defineStore('cartStore', () => {
	const authStore = useAuthStore();
	interface CartItem {
		id: string;
		quantity: number;
	}
	interface WishItem {
		id: string;
	}

	const cartItems = vueRef<CartItem[]>([]);
	const wishItems = vueRef<WishItem[]>([]);
	const { $firestore } = useNuxtApp();

	const showCartDropdown = vueRef(false);
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

	const updateCartItemQuantity = (id: string, quantity: number) => {
		const item = cartItems.value.find((item) => item.id === id);
		if (item) {
			item.quantity = quantity;
			saveCartItemsToLocalStorage();
			saveCartItemsToFirestore();
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
	const saveWishItemsToFirestore = async () => {
		const userId = authStore.user?.uid;
		if (userId) {
			try {
				const userCartRef = doc($firestore, 'users', userId);
				await setDoc(
					userCartRef,
					{ wishItems: wishItems.value },
					{ merge: true }
				);
			} catch (error) {
				console.error('Error saving wish items to Firestore:', error);
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

	const addWishItem = (id: string) => {
		const existingItem = wishItems.value.find((item) => item.id === id);
		if (!existingItem) {
			wishItems.value.push({ id });
		}
		saveWishItemsToFirestore();
	};

	const deleteWishItem = (id: string) => {
		wishItems.value = wishItems.value.filter((item) => item.id !== id);
		saveWishItemsToFirestore();
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
	const loadWishItems = async () => {
		const userId = authStore.user?.uid;
		if (userId) {
			try {
				const userCartRef = doc($firestore, 'users', userId);
				const docSnap = await getDoc(userCartRef);

				if (docSnap.exists()) {
					const firestoreData = docSnap.data();

					if (firestoreData && firestoreData.wishItems) {
						const firestoreWishItems = firestoreData.wishItems;
						wishItems.value = firestoreWishItems;
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

	watch(
		cartItems,
		(newCartItems) => {
			saveCartItemsToLocalStorage();
			saveCartItemsToFirestore();
		},
		{ deep: true }
	);

	return {
		showCartDropdown,
		setShowCartDropdown,
		cartItems,
		wishItems,
		loadCartItems,
		updateCartItemQuantity,
		addCartItem,
		deleteCartItem,
		addWishItem,
		deleteWishItem,
		loadAndMergeCartItems,
		loadWishItems,
	};
});
