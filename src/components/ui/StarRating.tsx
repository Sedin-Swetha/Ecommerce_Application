"use client";
import {FiStar} from "react-icons/fi";
import {FaStar,FaStarHalfAlt} from "react-icons/fa";
interface StarRatingProps
{
    rating :number;
    max?:number;
    size?:number;
    showValue?:boolean;
    interactive?:boolean;
    onRate?:(value:number)=>void;
}
export default function StarRating({
    rating,
    max=5,
    size=16,
    showValue=false,
    interactive=false,
    onRate,
}:StarRatingProps){
    return (
        <div className="flex items-center gap-1">
            {Array.from({length:max},(_,i)=>{
                const filled =i+1<=Math.floor(rating);
                const half=!filled && i< rating;
                return (
                    <button
                      key={i}
                      disabled={!interactive}
                      onClick={()=>interactive && onRate && onRate(i+1) }
                      className={interactive ? "cursor-pointer hover:scale-110 transition":"cursor-default"}
                      >
                    {
                        filled ?(
                            <FaStar size={size} className="text-yellow-400"/>
                        ):half?(
                        <FaStarHalfAlt size={size} className="text-yellow-400" />
                        ):(
                           <FiStar size={size} className="text-gray-300" /> 
                        )}
                      </button>
                )
             }
            )}
            {showValue && (
                <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
            )}
        </div>
    )
}