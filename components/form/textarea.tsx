interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
}

export const Textarea: React.FC<IInput> = ({
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-2 mt-8">
      <textarea
        type="text"
        className={`border h-20 text-xs outline-none text-slate-700 rounded-md py-1 px-2 scrollbar hover:outline focus:outline placeholder:text-xs placeholder:font-medium ${
          !!error ? "border-red-400" : "border-slate-400"
        }
          `}
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
