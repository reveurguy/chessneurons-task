import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { toast } from "sonner"

function Favourites() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [favourites, setFavourites] = useState([]);
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

  const fetchFavourites = async () => {
    try {
      const q = query(collection(db, "favourites"));
      const doc = await getDocs(q);
      const data = doc.docs.map((doc) => doc.data());
      setFavourites(data);
    } catch (err) {
      console.error(error);
      toast("An error occured while fetching user data");
    }
  };



  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
    fetchFavourites();
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
                View your Favourite clubs here! ⚽️
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
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
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {favourites.map((fav) => (
                <li key={fav.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={fav.badge} alt="" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-gray-900 capitalize">{fav.name}</p>
                      <p className="truncate text-sm text-gray-900 capitalize">Stadium: <span className='font-medium'>{fav.stadium}</span></p>
                      <p className="truncate text-sm text-gray-900 capitalize">Nicknames: <span className='font-medium'>{fav.nicknames}</span></p>
                      <p className="truncate text-sm text-gray-500 mt-2">{'@' + fav.id} </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>


  );
}

export default Favourites;