import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dateSchema,
  dateSchemaType,
} from "@/server/validations/datapicker.validation";

const DatePickerDelivery = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dateSchemaType>({
    resolver: zodResolver(dateSchema),
    mode: "onChange",
  });

  const [selectedDate, setSelectedDate] = React.useState<string>("");

  const onSubmit: SubmitHandler<dateSchemaType> = (data) => {
    console.log("تاریخ انتخاب‌شده:", data.deliveryDate);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex flex-col justify-between flex-wrap gap-4"
    >
      <div className="flex justify-between gap-1">
        <Controller
          control={control}
          name="deliveryDate"
          render={({ field, fieldState }) => (
            <div className="flex flex-col">
              <DatePicker
                value={selectedDate}
                onChange={(date) => {
                  const formatDate = date?.format("YYYY/MM/DD") || "";
                  setSelectedDate(formatDate);
                  field.onChange(formatDate);
                  console.log(formatDate, "formatDate");
                }}
                calendar={persian}
                locale={persian_fa}
                inputClass={`p-2 rounded border-b text-slate-300 text-sm border-slate-800 pr-1 bg-BackgroundColor text-slate-50 outline-none placeholder:text-xs ${
                  errors.deliveryDate ? "border-red-500" : ""
                }`}
                placeholder="تاریخ تحویل را انتخاب کنید"
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-xs mt-1">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />
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
