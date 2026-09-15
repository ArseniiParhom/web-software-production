import { useEffect, useState } from "react";
import * as categoriesApi from "../api/categories";
import type { Category, NewCategory } from "../types/category";

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		categoriesApi.fetchCategories().then(setCategories);
	}, []);

	async function addCategory(category: NewCategory) {
		const createdCategory = await categoriesApi.createCategory(category);

		setCategories((currentCategories) => [
			...currentCategories,
			createdCategory,
		]);
	}

	async function editCategory(id: string, category: NewCategory) {
		const updatedCategory = await categoriesApi.updateCategory(id, category);

		setCategories((currentCategories) =>
			currentCategories.map((currentCategory) =>
				currentCategory.id === id ? updatedCategory : currentCategory,
			),
		);
	}

	async function removeCategory(id: string) {
		await categoriesApi.deleteCategory(id);

		setCategories((currentCategories) =>
			currentCategories.filter((currentCategory) => currentCategory.id !== id),
		);
	}

	return {
		categories,
		addCategory,
		editCategory,
		removeCategory,
	};
}
