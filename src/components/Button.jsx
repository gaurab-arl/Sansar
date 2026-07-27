

export default function Button({title, id , leftIcon, rightIcon, containerClass}){
    return (
        <button id={id} className={`group relative z-10 w-fit cusor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`}>
            {leftIcon}
            <span className="font-special font-bold text-sm uppercase">{title}</span>
            {rightIcon}

        </button>
       
    )
}