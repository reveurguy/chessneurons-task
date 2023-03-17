import axios from 'axios'
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


export default function List() {
  const [clubList, setclubList] = useState([]);
  const [user] = useAuthState(auth);
  const [added, setAdded] = useState(false);

  const getClubs = async () => {
    const club = await axios.get('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League')
    return club.data.teams
  }

  useEffect(() => {
    async function fetchData() {
      const results = await getClubs();
      setclubList(results);
    }
    fetchData();
  }, []);

  const handleAddFavorite = async (club, id) => {

    if (!added[id]) {
      // add club to favourites
      setDoc(doc(db, "favourites", club.idTeam), {
        uid: user.uid,
        id: club.idTeam,
        name: club.strTeam,
        stadium: club.strStadium,
        nicknames: club.strKeywords,
        badge: club.strTeamBadge
      }).then(() => {
        setAdded({ ...added, [id]: true });
      }).catch((error) => {
        console.error("Error adding club to favourites: ", error);
      });
    }
    if (added[id]) {
      deleteDoc(doc(db, "favourites", club.idTeam)).then(() => {
        setAdded({ ...added, [id]: false });
      }).catch((error) => {
        console.error("Error removing club from favourites: ", error);
      });
    }
  };

  return (
    <div>
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {clubList.map((club) => (
            <li key={club.idTeam} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={club.strTeamBadge} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900 capitalize">{club.strTeam}</p>
                  <p className="truncate text-sm text-gray-900 capitalize">Stadium: <span className='font-medium'>{club.strStadium}</span></p>
                  <p className="truncate text-sm text-gray-900 capitalize">Nicknames: <span className='font-medium'>{club.strKeywords}</span></p>
                  <p className="truncate text-sm text-gray-500 mt-2">{'@' + club.idTeam} </p>
                </div>
                <div>
                  <button id={club.idTeam}
                    className={!added[club.idTeam] ? 'block rounded bg-red-600 p-2 text-base font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring sm:w-auto' : 'block rounded bg-black p-2 text-base font-medium text-white shadow hover:bg-black/80 focus:outline-none focus:ring sm:w-auto'}
                    onClick={() => handleAddFavorite(club, club.idTeam)}>
                    {added[club.idTeam] ? "Remove from favorite" : "Add to favorite"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
