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
    console.log("تاریخ انتخاب‌شده:", data.deliveryDate);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex justify-between items-center flex-wrap gap-4"
    >
      <h2 className="text-sm text-slate-300">انتخاب تاریخ تحویل: </h2>
      <div className="flex flex-col gap-1">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          calendar={persian}
          locale={persian_fa}
          inputClass={`p-2 rounded border-b text-sm border-slate-800 pr-7 bg-BackgroundColor text-slate-50 outline-none placeholder:text-xs ${
            errors.deliveryDate ? "border-red-500" : ""
          }`}
          placeholder="تاریخ را انتخاب کنید"
        />
        <input type="hidden" {...register("deliveryDate")} />
        {errors.deliveryDate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.deliveryDate.message}
          </p>
        )}
        {/* {selectedDate && (
          <p className="text-gray-600 text-sm mt-2">
            تاریخ انتخاب‌شده: {selectedDate}
          </p>
        )} */}
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded text-slate-200 text-sm"
      >
        تایید
      </button>
    </form>
  );
};

export default DatePickerDelivery;
