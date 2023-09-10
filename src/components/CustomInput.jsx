import ConfigProvider from 'antd/es/config-provider'
import Input  from 'antd/es/input' 
import React from 'react'

const CustomInput = ({
  label, placeholder, value, className,
  type, autoComplete, suffix, name,
  formikHook: formik, error, errorText, 
  showError, onChange, onPressEnter, maxLength,
  onFocusChange
}) => {
  if (formik && name) {
    showError = showError || (formik.touched[name] && !!formik.errors[name])
    errorText = errorText || (formik.touched[name] && formik.errors[name])
  }

  return (
    <div className={className}>
        <div className='poppins-400-12 mb-1 text-white'>{label}</div>
        <div className='border-b border-[gray] py-2 pb-8 text-white flex pr-4 h-10 items-center pl-2'>
            <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: 'white',
                    colorTextPlaceholder: 'gray',
                    colorText: 'white',
                    colorBgBase: 'transparent',
                  }
                }}
            >
                <Input
                    className='text-lg'
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    bordered={false}
                    type={type}
                    autoComplete={autoComplete}
                    onPressEnter={onPressEnter}
                    maxLength={maxLength}
                    onFocus={() => (typeof onFocusChange === 'function') && onFocusChange(true)}
                    onBlur={() => (typeof onFocusChange === 'function') && onFocusChange(false)}
                />
            </ConfigProvider>
            <div>
                {suffix}
            </div>
        </div>
        <div
          className='text-[#FA7066] mt-1 text-lg'
          style={{
            height: showError ? '16px' : '0px',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {showError && <div>{errorText}</div>}
        </div>
    </div>
  )
}

export default CustomInput
