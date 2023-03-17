import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, generatePath } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { toast } from "sonner"
import List from "../components/list";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(error);
      toast("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <>
      <header aria-label="Page Header">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, {name}!
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Choose your favorite club and add it to your favorite list!! ⚽️
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                onClick={() => navigate(generatePath(`/dashboard/${user?.uid}/favourites`))}
                className="block rounded-md bg-black px-5 py-2 text-base font-bold text-white transition focus:outline-none focus:ring"
                type="button">
                View Favourites
              </button>
              <button
                onClick={logout}
                className="block rounded-md bg-black px-5 py-2 text-base font-bold text-white transition focus:outline-none focus:ring"
                type="button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <List />
        </div>
      </main>
    </>
  );
}

export default Dashboard;