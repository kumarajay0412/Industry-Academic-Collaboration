import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { Controller, type Control } from 'react-hook-form';
import Image from 'next/image';
interface TextFieldComponentProps {
  label: string;
  type: string;
  name: string;
  control: Control;
  icon?: React.ReactNode;
  placeholder?: string;
  error?: string;
  endIcon?: React.ReactNode;
  disabled?: boolean;
}

function TextFieldComponent({
  label,
  type,
  name,
  control,
  icon,
  placeholder,
  error,
  endIcon,
  disabled = false,
}: TextFieldComponentProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="!w-full">
      <label htmlFor={name} className="mb-[8px] flex">
        <div
          className={`font-interV text-[14px]  font-[400] leading-[21px]   ${
            label ? 'text-grey-25' : 'text-[#0F1115]  opacity-0'
          } `}
        >
          {label}
        </div>
      </label>
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <div className="relative block ">
              {icon}

              <input
                {...field}
                readOnly={disabled}
                type={endIcon && showPassword ? 'string' : type}
                id={name}
                name={name}
                placeholder={placeholder}
                className={`${
                  error ? 'border-red ' : 'border-grey-90'
                } !w-full appearance-none ${icon ? 'pl-[50px]' : ''}  ${
                  endIcon ? 'pr-[50px]' : ''
                } rounded-[8px] text-white border-[1px] bg-black p-3 text-[16px]  font-[400] text-grey-50 outline-none placeholder:text-[14px] placeholder:text-[#7B7C7E]`}
              />
              {endIcon && (
                <div className="absolute bottom-0 right-[3%] top-0 flex items-center">
                  {showPassword ? (
                    <VisibilityOffIcon
                      style={{ color: '#7B7C7E' }}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      style={{ color: '#7B7C7E' }}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        />

        <div
          className={`font-interV mt-[4px] flex justify-end gap-3 text-[14px] ${
            error ? 'text-red' : 'text-transparent opacity-0'
          }`}
        >
          <Image src="/assets/Danger.svg" width={16} height={16} alt="danger" />
          <span>{error || 'no error'}</span>
        </div>
      </div>
    </div>
  );
}

export default TextFieldComponent;
