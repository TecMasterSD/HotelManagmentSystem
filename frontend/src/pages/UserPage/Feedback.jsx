import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks } from "../../ReducState/FeedbackState/feedbackSlice";

const UserFeedback = () => {
  const dispatch = useDispatch();

  const { feedbacks, loading, error } = useSelector(
    (state) => state.feedback
  );

  const { user } = useSelector((state) => state.auth);

  /* 🔐 FETCH FEEDBACK ONLY WHEN USER EXISTS */
  useEffect(() => {
    if (user) {
      dispatch(fetchFeedbacks());
    }
  }, [dispatch, user]);

  /* 🚫 USER NULL → KUCH BHI RENDER NAHI */
  if (!user) return null;

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-gray-400 tracking-[0.2em] text-sm font-bold uppercase mb-2">
            Testimonials
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a2b3c]">
            Happy users <span className="italic font-serif font-medium">say</span>
          </h1>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400">Loading feedback...</p>
        )}

        {/* ERROR */}
        {error && !loading && (
          <p className="text-center text-red-500">
            {error.message || error}
          </p>
        )}

        {/* FEEDBACK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {feedbacks?.length > 0 &&
            feedbacks.map((item) => (
              <div
                key={item._id}
                className="bg-white p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] rounded-sm border border-gray-50 flex flex-col justify-between"
              >
                <div>
                  <h1 className="text-xl font-bold text-[#1a2b3c] mb-5">
                    {item.title}
                  </h1>

                  <p className="text-gray-500 leading-relaxed italic mb-8">
                    “ {item.comment || item.message} ”
                  </p>
                </div>

                {/* USER INFO */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-[#1a2b3c]">
                      {item.user?.username || "Guest"}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                      {item.user?.userrole || "User"}
                    </p>
                  </div>

                  {/* AVATAR */}
                  <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                    {(item.user?.username?.[0] || "G").toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* NO FEEDBACK */}
        {!loading && !error && feedbacks?.length === 0 && (
          <p className="text-center mt-10 text-gray-400">
            No feedback available
          </p>
        )}
      </div>
    </section>
  );
};

export default UserFeedback;
