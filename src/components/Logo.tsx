export function SQLioLogo({
    size = 28,
    className = '',
}: {
    size?: number;
    className?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 64 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <defs>
                <linearGradient
                    id='logoGradient'
                    x1='0%'
                    y1='0%'
                    x2='100%'
                    y2='100%'
                >
                    <stop offset='0%' stopColor='#6366f1' />
                    <stop offset='50%' stopColor='#8b5cf6' />
                    <stop offset='100%' stopColor='#a855f7' />
                </linearGradient>
            </defs>
            <rect
                x='4'
                y='4'
                width='56'
                height='56'
                rx='14'
                fill='url(#logoGradient)'
            />
            <path
                d='M20 26C20 24.8954 20.8954 24 22 24H42C43.1046 24 44 24.8954 44 26V28C44 29.1046 43.1046 30 42 30H22C20.8954 30 20 29.1046 20 28V26Z'
                fill='white'
                opacity='0.9'
            />
            <path
                d='M20 36C20 34.8954 20.8954 34 22 34H36C37.1046 34 38 34.8954 38 36V38C38 39.1046 37.1046 40 36 40H22C20.8954 40 20 39.1046 20 38V36Z'
                fill='white'
                opacity='0.7'
            />
            <circle cx='46' cy='42' r='6' fill='white' opacity='0.9' />
            <path
                d='M44 42L46 44L49 40'
                stroke='url(#logoGradient)'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export default SQLioLogo;
