/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import toast from "react-hot-toast";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.food); // Accessing the correct path for data
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  };

  // on Page Load Fetch all Food list.
  useEffect(() => {
    fetchList();
  }, []);

  // remove food
  const removeFood = async (foodId) => {
    console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, idx) => (
            <div key={idx} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="food" />
              <p>{item.name}</p>
              <p>{item.category ? item.category : "Unknown"}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                x
              </p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default List;
