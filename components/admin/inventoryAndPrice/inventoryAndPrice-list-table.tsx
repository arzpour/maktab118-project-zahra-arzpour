"use client";

import useProductList from "@/hooks/useProduct";
import { perPageLimit } from "@/utils/config";
import React from "react";
import Pagination from "../pagination";
import TotalPageTable from "../total-page-table";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { queryClient } from "@/providers/tanstack.provider";
import { toast } from "react-toastify";
import { usePatchProducts } from "@/apis/mutations/product";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
const InventoryAndPriceListTable: React.FC = () => {
  const [edit, setEdit] = React.useState(false);
  const [editedProducts, setEditedProducts] = React.useState<
    Record<string, Partial<Product>>
  >({});
  const { data: products, setPage, page } = useProductList();

  const totalPages = Math.ceil(products?.total! / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    field: keyof Product
  ) => {
    const value = e.target.value;

    setEditedProducts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: Number(value),
      },
    }));
  };

  const editProduct = usePatchProducts();

  const onSubmit = async () => {
    const updates = Object.entries(editedProducts).map(([id, changes]) => ({
      id,
      ...changes,
    }));

    try {
      const updateRequests = updates.map((update) => {
        const data = new FormData();

        if (update.price !== undefined) {
          data.append("price", update.price.toString());
        }

        if (update.quantity !== undefined) {
          data.append("quantity", update.quantity.toString());
        }

        return editProduct.mutateAsync({ data, id: update.id });
      });

      await Promise.all(updateRequests);

      toast.success("ویرایش شد");
      setEditedProducts({});
      setEdit(false);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد");
      errorHandler(error as AxiosError<IError>);
    }
  };
  return (
    <div className="mx-5">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div className="flex gap-4 items-center">
          <p className="font-medium xl:text-lg hidden sm:block">
            موجودی و قیمت
          </p>
        </div>
        <div className="flex gap-3 justify-center sm:justify-normal">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="bg-orange text-white py-1.5 px-5 rounded text-sm"
            >
              ویرایش
            </button>
          ) : (
            <>
              <button
                onClick={onSubmit}
                className="bg-green-600 text-white py-1.5 px-6 rounded text-sm"
              >
                ذخیره
              </button>
              <button
                onClick={() => setEdit(false)}
                className="bg-red-500 text-white py-1.5 px-5 rounded text-sm"
              >
                کنسل
              </button>
            </>
          )}
        </div>
      </div>
      <div className="relative flex flex-col w-full h-full text-slate-300 bg-CyanBlueDark shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/3">
                <p className="text-sm font-normal leading-none text-slate-400">
                  نام کالا
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/4">
                <p className="text-sm font-normal leading-none text-slate-400">
                  قیمت کالا
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/4">
                <p className="text-sm font-normal leading-none text-slate-400">
                  موجودی کالا
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.products.map((el) => (
              <tr
                key={el._id}
                className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
              >
                <td className="p-4">
                  <p className="text-sm text-slate-400">{el.name}</p>
                </td>
                <td className="p-4">
                  {edit ? (
                    <input
                      type="number"
                      defaultValue={el.price}
                      onChange={(e) => {
                        handleInputChange(e, el._id!, "price");
                      }}
                      className="text-sm text-slate-400 bg-BlueL outline-none border-none rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-sm text-slate-400">{el.price}</p>
                  )}
                </td>
                <td className="p-4">
                  {edit ? (
                    <input
                      type="number"
                      defaultValue={el.quantity}
                      onChange={(e) => {
                        handleInputChange(e, el._id!, "quantity");
                      }}
                      className="text-sm text-slate-400 outline-none bg-BlueL border-none rounded px-2 py-1"
                    />
                  ) : (
                    <p className="text-sm text-slate-400">{el.quantity}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-y-6 sm:px-10 py-3 mt-5">
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        <TotalPageTable page={page} total={products?.total!} />
      </div>
    </div>
  );
};

export default InventoryAndPriceListTable;
