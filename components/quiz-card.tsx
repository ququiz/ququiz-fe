import Image from "next/image";
import Link from "next/link";

type QuizCardProps = {
  href: string;
};

const QuizCard = ({ href }: QuizCardProps) => {
  return (
    <Link className="block" href={href}>
      <div className="shadow-md rounded-md overflow-hidden hover:scale-[1.02] cursor-pointer transition">
        <Image
          className="object-cover w-full h-40"
          src="https://source.unsplash.com/random/?nature"
          alt="Random Image"
          width={500}
          height={300}
        />
        <div className="py-3 px-5">
          <h3 className="font-medium text-xl">Dummy Quiz</h3>
          <p className="text-gray-400 text-xs">By Ambasing</p>
        </div>
      </div>
    </Link>
  );
};
export default QuizCard;
