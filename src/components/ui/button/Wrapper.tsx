interface IWrapperProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function UiButtonWrapper({
  name,
  isActive,
  onClick,
}: IWrapperProps) {
  return (
    <label
      className={`relative flex h-10 py-[7px] border border-[#d9d9d9] rounded-lg bg-[#0000000A] transition-all duration-500
        ${isActive && 'border-custom-blue outline-2 outline-custom-blue-light bg-custom-blue cursor-pointer'}
        ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <span
        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00000040] transition-all duration-500 pointer-events-none
        ${isActive && 'text-white'}`}
      >
        {name}
      </span>
      <button
        type='button'
        onClick={isActive ? onClick : undefined}
        className={`${isActive && 'cursor-pointer'}`}
      />
    </label>
  );
}
