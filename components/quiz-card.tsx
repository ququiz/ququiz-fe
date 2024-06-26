import Image from "next/image";
import Link from "next/link";
import Timer from "./timer";
import ErrorSafeImage from "./error-safe-image";

type QuizCardProps = {
  quiz: Quiz;
  href: string;
};

const QuizCard = async ({ quiz, href }: QuizCardProps) => {
  return (
    <>
      <Link className="block" href={href}>
        <div className="shadow-md rounded-md overflow-hidden hover:scale-[1.02] cursor-pointer transition">
          <ErrorSafeImage
            className="object-cover w-full h-32"
            src={`https://source.unsplash.com/random/?${quiz.name}`}
            alt="Random Image"
            width={500}
            height={300}
          />
          <div className="py-3 px-5">
            <h3 className="font-semibold text-[22px]">{quiz.name}</h3>
            <Timer target={quiz.start_time} />
            <p className="text-gray-400 text-sm">
              {quiz.participants?.length || "No"} participants
            </p>
            <p className="text-gray-400 text-xs">By {quiz.creator_name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
export default QuizCard;
