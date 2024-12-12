interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
}

export const Input: React.FC<IInputProps> = ({
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <input
        type="text"
        className={
          className ||
          `w-full rounded-md text-xs border-b text-gray-800 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none ${
            !!error ? "border-red-400" : "border-slate-400"
          }`
        }
        {...props}
      />
      {!!error && (
        <p className="text-red-400 text-start text-xs font-semibold capitalize">
          {error}
        </p>
      )}
    </div>
  );
};
