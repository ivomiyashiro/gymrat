import { IProduct } from '@/interfaces';

interface ApiResponse {
  product: IProduct | null;
}

export const getProductBySlug = async (slug: string): Promise<ApiResponse> => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}/storefront/products/${slug}`;

    const response = await fetch(apiUrl, { next: { revalidate: 60 * 60 * 24 } });
    if (!response.ok) throw new Error('Error while fetching product.');

    const { product, error: apiError } = await response.json();
    if (apiError) throw new Error(apiError);

    return { product: product[0] };
    
  } catch (error) {
    console.log(error);

    return { product: null };
  }
};
