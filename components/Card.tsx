import Image from 'next/image';

interface CardProps {
    image: string;
    title: string;
    description: string;
}

export default function Card({ image, title, description }: CardProps) {
    return (
        <div className='h-102 w-84 rounded-xl shadow-2xl overflow-hidden'>
            <Image
                src={image}
                alt={title || "Card Image"}
                width={300}
                height={200}
                className="w-full h-1/2 rounded-lg"
            />
            
            <div className='flex flex-col justify-between p-3 gap-2'>
                <p className='font-bold text-lg'>{title}</p>
                <p className='text-gray-600'>{description}</p>
            </div>
        </div>
    );
}