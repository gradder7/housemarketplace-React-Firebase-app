import React from "react";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ListingItem from "./ListingItem";

export default function AllListings() {
  // eslint-disable-next-line
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get refernce of the collection
        const listingsRef = collection(db, "listings");

        //create a query
        //where(check and compare value though which data should be filterd)
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(10));

        //execute the query
        const querySnap = await getDocs(q);
        // listings will be array of objects containing id and the data
        const listings = [];
        console.log("Query=>", querySnap);
        querySnap.forEach((doc) => {
          // data() to get our data
          //we get the onbjects of the listings
          //   console.log(doc.data());
          //give id if the doc it is seprate from data()
          // console.log(doc.id);
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch Listings!");
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="category">
      <header>
        <h1>ALL</h1>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Property</p>
      )}
    </div>
  );
}
