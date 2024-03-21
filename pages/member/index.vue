<template>
	<template v-if="userInfo">
		<h2>個人資料</h2>
		<h3>
			您可以存取及修改您的個人資料（姓名、寄送地址、電話號碼等），以便今後購買更快速
		</h3>
		<div class="card py-3 w-full">
			<form @submit.prevent="saveUserInfo">
				<label class="form-control w-full max-w-screen-md">
					<div class="label">
						<span class="label-text">姓名</span>
					</div>
					<input
						type="text"
						placeholder="輸入您的姓名或暱稱"
						class="input input-bordered input-md w-full"
						v-model="userInfo.name"
					/>
				</label>
				<label class="form-control w-full max-w-screen-md">
					<div class="label">
						<span class="label-text">電子信箱</span>
					</div>
					<div class="flex justify-between">
						<input
							type="text"
							placeholder="Type here"
							class="input input-bordered input-md"
							:class="{
								'w-full': isEmailVerified,
								'w-11/12 mr-2': !isEmailVerified,
							}"
							v-model="userInfo.email"
							disabled
						/>
						<button
							v-if="!isEmailVerified"
							class="btn btn-outline btn-primary"
							type="button"
							@click="handleSendEmail"
						>
							驗證信箱
						</button>
					</div>
				</label>
				<label class="form-control w-full max-w-screen-md">
					<div class="label">
						<span class="label-text">手機號碼</span>
					</div>
					<input
						type="text"
						placeholder="請輸入手機號碼不包含任何符號及空格"
						class="input input-bordered input-md w-full"
						v-model="userInfo.phone"
					/>
				</label>
				<label class="form-control w-full max-w-screen-md">
					<div class="label">
						<span class="label-text">寄送地址</span>
					</div>
					<div class="flex flex-wrap lg:flex-nowrap">
						<select
							v-model="userInfo.address.city"
							class="select select-bordered w-1/3 lg:w-1/6 max-w-xs mr-2"
						>
							<option
								v-for="city in cities"
								:key="city.name"
								:value="city.name"
							>
								{{ city.name }}
							</option>
						</select>
						<select
							v-model="userInfo.address.district"
							class="select select-bordered w-1/3 lg:w-1/6 max-w-xs mr-2"
						>
							<option
								v-for="district in selectedCityDistricts"
								:key="district.zip"
								:value="district.name"
							>
								{{ district.name }}
							</option>
						</select>
						<input
							type="text"
							placeholder="請輸入詳細地址"
							class="input input-bordered input-md w-full mt-2 lg:w-2/3 lg:mt-0 max-w-screen-md"
							v-model="userInfo.address.detail"
						/>
					</div>
				</label>

				<button class="btn btn-md btn-accent mt-5" type="submit">
					儲存
				</button>
			</form>
		</div>
	</template>
</template>

<script setup lang="ts">
import taiwanCities from '@/assets/data/twCities.json';
const cities = taiwanCities;

const { $toast } = useNuxtApp();
const {
	user,
	getUserInfo,
	updateUserAuthProfile,
	updateUserFirestoreDoc,
	sendVerificationEmail,
} = useFirebaseAuth();

interface UserInfo {
	name: string;
	email: string;
	phone: string;
	address: {
		city: string;
		district: string;
		detail: string;
		zip: string;
	};
}

const userInfo = ref<UserInfo | null>(null);
onMounted(async () => {
	console.log(user.value);
	if (user.value) {
		const doc = await getUserInfo(user.value);
		if (doc) {
			console.log(doc);
			userInfo.value = {
				...doc,
				address: doc.address || {
					city: taiwanCities[0].name,
					district: '',
					detail: '',
				},
			} as UserInfo;
		}
	}
});
const selectedCityDistricts = computed(() => {
	if (userInfo.value && userInfo.value.address.city) {
		const selectedCity = cities.find(
			(city) => city.name === userInfo.value?.address.city
		);
		return selectedCity ? selectedCity.districts : [];
	}
	return [];
});
watch(
	() => userInfo.value?.address.district,
	(newDistrict) => {
		if (!userInfo.value || !newDistrict) return;
		const zip = cities
			.find((city) => city.name === userInfo.value?.address.city)
			?.districts.find((district) => district.name === newDistrict)?.zip;
		if (zip) userInfo.value.address.zip = zip;
	}
);
const saveUserInfo = async () => {
	if (!user.value || !userInfo.value) return;
	const authProfileUpdateSuccess = await updateUserAuthProfile(user.value, {
		displayName: userInfo.value.name,
	});
	const firestoreDocUpdateSuccess = await updateUserFirestoreDoc(
		user.value.uid,
		userInfo.value
	);

	if (authProfileUpdateSuccess && firestoreDocUpdateSuccess) {
		$toast.showToast({
			message: '修改成功',
			type: 'success',
		});
	} else {
		$toast.showToast({
			message: '發生錯誤，請稍後再試',
			type: 'error',
		});
	}
};

const isEmailVerified = computed(() => user.value && user.value.emailVerified);
const handleSendEmail = async () => {
	const result = await sendVerificationEmail();

	if (result === false) {
		$toast.showToast({
			message: '無法發送驗證郵件',
			type: 'error',
		});
	} else if (result.success) {
		$toast.showToast({
			message: '已重發驗證信',
			type: 'success',
		});
	} else {
		if (result.message === 'auth/too-many-requests') {
			$toast.showToast({
				message: '操作過於頻繁，請稍後再試',
				type: 'error',
			});
		} else {
			$toast.showToast({
				message: '發生錯誤請稍後再試',
				type: 'error',
			});
		}
	}
};
</script>

<style scoped src="@/assets/css/normalStyle.css"></style>
