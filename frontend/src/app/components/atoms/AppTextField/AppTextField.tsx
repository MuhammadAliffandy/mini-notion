import { Controller } from "react-hook-form";

interface AppTextField {
  control: any;
  name: string;
  rules: Object;
  placeholder: string;
  type?: string;
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

const AppTextField: React.FC<AppTextField> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field, fieldState }) => (
        <>
          <input
            {...field}
            onBlur={props.onBlur}
            value={field.value ?? ""}
            type={props.type || "text"}
            placeholder={props.placeholder}
            onChange={(e) => {
              field.onChange(e.target.value);
              props.onChange?.(e.target.value);
            }}
            className={`w-full p-2 border rounded ${
              props.className
            } text-black ${
              fieldState.invalid ? "border-red-500" : "border-gray-300"
            }`}
          />
          {fieldState.error && (
            <p className="text-sm text-red-500 mt-1">
              {fieldState.error.message}
            </p>
          )}
        </>
      )}
    />
  );
};

export default AppTextField;
