import { getUserById } from "@/lib/auth-service";
import Image from "next/image";
import Link from "next/link";

type QuizCardProps = {
  quiz: Quiz;
  href: string;
};

const QuizCard = async ({ quiz, href }: QuizCardProps) => {
  return (
    <Link className="block" href={href}>
      <div className="shadow-md rounded-md overflow-hidden hover:scale-[1.02] cursor-pointer transition">
        <Image
          className="object-cover w-full h-40"
          src={`https://source.unsplash.com/random/?${quiz.name}`}
          alt="Random Image"
          width={500}
          height={300}
        />
        <div className="py-3 px-5">
          <h3 className="font-medium text-xl">{quiz.name}</h3>
          <p className="text-gray-400 text-xs">By</p>
        </div>
      </div>
    </Link>
  );
};
export default QuizCard;
