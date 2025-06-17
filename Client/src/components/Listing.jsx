import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Listing() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchListing = async () => {
      const res = await axios.get("http://localhost:8000/api/listing");
      setListings(res.data);
      console.log(res.data);
    };
    fetchListing();
  }, []);
  return (
    <div>
      {listings.map((list) => (
        <div id={list.id}>
          {list.title} - {list.city}
        </div>
      ))}
    </div>
  );
}

export default Listing;
