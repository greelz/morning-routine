interface ITextFieldProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export default function TextField(props: ITextFieldProps) {
  return <input {...props} type="text"
    className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${props.className}`}
  />;
}
