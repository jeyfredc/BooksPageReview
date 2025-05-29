import { useState } from "react";

export const StarRating: React.FC<{
    rating: number;
    onRatingChange: (rating: number) => void;
}> = ({ rating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="text-3xl focus:outline-none"
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    aria-label={`Calificar con ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
                >
                    <span 
                        className={`${
                            star <= (hoveredRating || rating) 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'
                        }`}
                    >
                        ★
                    </span>
                </button>
            ))}
        </div>
    );
};