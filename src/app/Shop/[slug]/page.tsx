import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProductDetails from "@/components/product/ProductDetails";
import { getProductBySlug, PRODUCTS } from "@/data/products";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product not found | Graferd Farms",
    };
  }
  return {
    title: `${product.name} | Graferd Farms`,
    description: `Discover ${product.name} from Graferd Farms palm oil selection.`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  return <ProductDetails product={product!} />;
}
