import ICategory from "../category/Category";

interface IProductPayload {
  id: number | null;
  title: string;
  slug: string;
  price: string | number;
  description: string;
  category: ICategory;
  images: string[];
}

export default IProductPayload;
