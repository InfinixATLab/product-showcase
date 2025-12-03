interface CardProps {
  name: string;
  image: string;
  isLast: boolean;
}

export default function Card({ name, image, isLast }: CardProps) {
  return (
    <div
      className={`bg-neutral-100 rounded-md shadow-md grid place-items-center p-2 md:gap-2 ${
        isLast && "col-span-full"
      }`}
    >
      <img src={image} className="md:h-image-tablet" />
      <p>{name}</p>
    </div>
  );
}
