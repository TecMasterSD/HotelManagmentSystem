// src/pages/admin/UserPage/UserView.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  updateUserRole,
} from "../../../ReducState/AuthState/AuthState";

const UserView = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(
    (state) => state.auth || {}
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleUpdateRole = (userId) => {
    if (window.confirm("Are you sure you want to update this user's role?")) {
      dispatch(updateUserRole(userId));
    }
  };

  return (
    <div className="min-h-screen p-6 font-sans text-white">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl rounded-md overflow-x-auto">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-white/5">
          <h3 className="font-serif text-lg sm:text-xl">
            System Users
          </h3>
        </div>

        {/* States */}
        {loading && (
          <p className="p-4 text-sm text-white/60">Loading users...</p>
        )}
        {error && (
          <p className="p-4 text-sm text-red-400">{error}</p>
        )}
        {!loading && users.length === 0 && (
          <p className="p-4 text-sm text-white/60">No users found</p>
        )}

        {/* Table */}
        {!loading && users.length > 0 && (
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-white/40 border-b border-white/10">
                <th className="px-3 sm:px-6 py-3">#</th>
                <th className="px-3 sm:px-6 py-3">Name</th>
                <th className="px-3 sm:px-6 py-3">Email</th>
                <th className="px-3 sm:px-6 py-3">Role</th>
                <th className="px-3 sm:px-6 py-3">Status</th>
                <th className="px-3 sm:px-6 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-3 sm:px-6 py-3 text-xs font-mono text-[#D4AF37]">
                    {index + 1}
                  </td>

                  <td className="px-3 sm:px-6 py-3 font-medium">
                    {user.username}
                  </td>

                  <td className="px-3 sm:px-6 py-3 text-sm text-white/70">
                    {user.useremail}
                  </td>

                  <td className="px-3 sm:px-6 py-3 text-sm">
                    {user.userrole || (
                      <span className="text-white/40">Pending</span>
                    )}
                  </td>

                  <td className="px-3 sm:px-6 py-3">
                    {user.isvrify === "pending" ? (
                      <span className="px-2 py-1 text-[9px] uppercase tracking-wider font-bold rounded-sm bg-yellow-500/20 text-yellow-400">
                        Pending
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-[9px] uppercase tracking-wider font-bold rounded-sm bg-green-500/20 text-green-400">
                        Verified
                      </span>
                    )}
                  </td>

                  <td className="px-3 sm:px-6 py-3 text-right">
                    {user.selectedRole &&
                    user.userrole !== user.selectedRole ? (
                      <button
                        onClick={() => handleUpdateRole(user._id)}
                        className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight text-[#D4AF37] hover:underline"
                      >
                        Accept Role ({user.selectedRole})
                      </button>
                    ) : (
                      <span className="text-[10px] text-white/40">
                        No Role Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserView;
