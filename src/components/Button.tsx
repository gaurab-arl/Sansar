

interface ButtonProps {
    title: string;
    id?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerClass?: string;
}

export default function Button({
    title,
    id,
    leftIcon,
    rightIcon,
    containerClass,
}: ButtonProps) {
    return (
        <button
            id={id}
            className={`group !bg-yellow-50 flex items-center gap-2 relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span>{title}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </button>
    );
}