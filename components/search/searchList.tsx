"use client";
import useGetBlogs from "@/hooks/useGetBlogs";
import useProductList from "@/hooks/useProduct";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProductCard from "../home/products/product-card";
import BlogCard from "../home/blogs/blog-card";

const SearchList = () => {
  const [products, setProducts] = React.useState<IProducts[]>([]);
  const [blogs, setBlogs] = React.useState<IBlog[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: blogList } = useGetBlogs(Infinity);

  const { data: productList } = useProductList(Infinity);

  React.useEffect(() => {
    if (query.trim()) {
      const filteredBlogs = blogList?.data.filter((blog) =>
        blog.title.includes(query.trim())
      );

      const filteredProducts = productList?.data?.products.filter((product) =>
        product.name?.includes(query.trim())
      );
      setProducts(filteredProducts ?? []);
      setBlogs(filteredBlogs ?? []);
    } else {
      setProducts([]);
      setBlogs([]);
    }
  }, [query]);

  console.log(
    !products.length && !blogs.length,
    "products.length < 0 && blogs.length < 0"
  );

  return (
    <div className="md:pt-10 mx-5">
      {products.length > 0 && (
        <>
          <h4 className="text-orange sm:text-xl mr-5 sm:mr-0">محصولات</h4>
          <div className="flex gap-5 justify-center sm:justify-normal xl:gap-10 items-center flex-wrap px-5 lg:px-0 py-9">
            {products?.map((el) => (
              <ProductCard key={el._id} {...el} />
            ))}
          </div>
        </>
      )}

      {blogs.length > 0 && (
        <>
          <h4 className="text-orange sm:text-xl pt-3 mr-5 sm:mr-0">وبلاگ</h4>
          <div className="flex gap-5 justify-center sm:justify-normal xl:gap-10 items-center flex-wrap px-5 lg:px-0 pt-9">
            {blogs?.map((el) => (
              <BlogCard key={el._id} {...el} />
            ))}
          </div>
        </>
      )}
      {!products.length && !blogs.length && (
        <p className="text-slate-200 sm:pb-16 pt-8">یافت نشد...</p>
      )}
    </div>
  );
};

export default SearchList;
