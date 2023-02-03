import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";
import { async } from "@firebase/util";

export default function Profile() {
  const auth = getAuth();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [chnageDetails, SetChangeDetails] = useState(false);

  const { name, email } = formData;
  // useEffect(() => {
  //   // we will get current user object only  from userCrendial objects
  //   console.log(auth.currentUser);
  //   setUser(auth.currentUser);
  // }, []);
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // console.log('hjimansu',listings);

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);
  // on logout
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    console.log(123);

    try {
      if (auth.currentUser.displayName !== name) {
        //update the displayname in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update in db
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: name,
        });
        toast.success("sucessfull");
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThing went wrong!");
    }
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      // store the value wrt to the id of that element
      [id]: value,
    }));
    console.log(formData);
  };
  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      // delete from firebase
      const docRef = doc(db, "listings", listingId);
      await deleteDoc(docRef);
      // show updated listings in browser
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };
  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                //if true got to onsubmit
                chnageDetails && onSubmit();
                SetChangeDetails((prev) => !prev);
              }}
            >
              {chnageDetails ? "done" : "change"}
            </p>
          </div>
          <div className="profileCard">
            <form>
              {/* active inactive input tag */}
              <input
                type="text"
                id="name"
                //if false
                className={!chnageDetails ? "profileName" : "profileNameActive"}
                // if false than disable
                disabled={!chnageDetails}
                value={name}
                onChange={onChange}
              />

              <input
                type="text"
                id="email"
                //if false
                className={
                  !chnageDetails ? "profileEmail" : "profileEmailActive"
                }
                // if false than disable
                disabled={!chnageDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>

          <Link to="/create-listing" className="createListing">
            <img src={homeIcon} alt="home" />
            <p>Sell or rent you home </p>
            <img src={arrowRight} alt="arrow-right" />
          </Link>
          {/* listing in profile the list */}
          {!loading && listings?.length > 0 && (
            <>
              <p className="listingText">Your Listings</p>
              <ul className="listingsList">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
}
