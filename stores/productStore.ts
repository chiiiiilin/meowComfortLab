import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { defineStore } from 'pinia';
import { ref as vueRef } from 'vue';

export const useProductStore = defineStore('productStore', () => {
	interface Product {
		id?: string;
		name: string;
		price: number;
		description?: string;
		category: string;
		subcategory?: string;
		coverImages: string[];
	}

	const products = vueRef<Product[]>([]);

	const getProducts = async () => {
		if (products.value.length === 0) {
			try {
				const db = getFirestore();
				const storage = getStorage();
				const collectionRef = collection(db, 'products');
				const snapshot = await getDocs(collectionRef);

				const productPromises = snapshot.docs.map(async (doc) => {
					const data = doc.data() as Product;
					data.id = doc.id;

					const coverImagePromises = data.coverImages.map(
						async (imageName: string) => {
							const imageRef = ref(
								storage,
								`product_images/${imageName}`
							);
							return getDownloadURL(imageRef);
						}
					);

					data.coverImages = await Promise.all(coverImagePromises);
					return data;
				});

				products.value = await Promise.all(productPromises);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		}
	};

	return { products, getProducts };
});
