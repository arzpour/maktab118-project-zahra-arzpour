import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dateSchema,
  dateSchemaType,
} from "@/server/validations/datapicker.validation";

const DatePickerDelivery = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<dateSchemaType>({
    resolver: zodResolver(dateSchema),
  });

  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleDateChange = (date: any) => {
    const formattedDate = date?.format("YYYY/MM/DD") || "";
    setValue("deliveryDate", formattedDate, { shouldValidate: true });
    setSelectedDate(date);
  };

  const onSubmit = (data: dateSchemaType) => {
    console.log("تاریخ انتخاب‌ شده:", data.deliveryDate);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex flex-col justify-between flex-wrap gap-4"
    >
      <div className="flex justify-between gap-1">
        <div className="flex flex-col">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            inputClass={`p-2 rounded border-b text-slate-300 text-sm border-slate-800 pr-1 bg-BackgroundColor text-slate-50 outline-none placeholder:text-xs ${
              errors.deliveryDate ? "border-red-500" : ""
            }`}
            placeholder="تاریخ تحویل را انتخاب کنید"
          />
          <input
            type="hidden"
            {...register("deliveryDate")}
            className="text-slate-500"
          />
          {errors.deliveryDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.deliveryDate.message}
            </p>
          )}
        </div>
        {/* {selectedDate && (
          <p className="text-gray-600 text-sm mt-2">
            تاریخ انتخاب‌شده: {selectedDate}
          </p>
        )} */}
        <button
          type="submit"
          className="px-4 py-2 rounded text-slate-300 text-sm underline"
        >
          تایید
        </button>
      </div>
    </form>
  );
};

export default DatePickerDelivery;
