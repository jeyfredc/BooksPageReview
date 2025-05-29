import React from 'react'
import { useAppStore } from '../../stores/UseAppStore'


const DetailCommentsBook: React.FC = () => {

const {reviews } = useAppStore() 



  return (
    <>
    <div className="space-y-6">
          {reviews.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-medium">{comment.userName.charAt(0).toUpperCase()}</span>
        </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 pl-2 pt-2">{comment.userName}</h4>
                    <span className="text-sm text-gray-500 pl-4">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex mt-1 pl-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600 pl-2">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div> 
    </>
  )
}

export default DetailCommentsBook
