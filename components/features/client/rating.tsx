import { IconStar } from "@tabler/icons-react";

export const Rating: React.FC<{ rating: number; count: number; avg_rating: number }> = ({
      rating,
      count,
      avg_rating,
}) => {
      const fullStars = Math.floor(rating);
      const stars = [];
      for (let i = 0; i < 5; i++) {
            stars.push(
                  <IconStar
                        key={i}
                        size={14}
                        className={i < fullStars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />,
            );
      }
      return (
            <div className="flex items-center gap-1">
                  {stars} {avg_rating > 0 ? avg_rating : ""}
                  {count !== undefined && (
                        <span className={`text-sm text-gray-500 ml-1`}>{count >= 1 ? count : "No"} reviews</span>
                  )}
            </div>
      );
};
