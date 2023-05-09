import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeamData,
  createTeamData,
  deleteTeamData,
} from "./reducers/dataSlice";
import "./App.css";

function App() {
  const [data, setData] = useState({
    name: "",
    defaultValue: "",
    companyId: 0,
  });
  const dispatch = useDispatch();
  const { apiData, isLoading } = useSelector((state) => state?.teamsData);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onButtonClick = () => {
    const transformData = {
      name: data?.name,
      defaultValue: data?.defaultValue,
      companyId: Number(data?.companyId),
    };
    dispatch(createTeamData(transformData));
    setData({
      name: "",
      defaultValue: "",
      companyId: 0,
    });
  };

  const onDeleteRow = (id) => {
    dispatch(deleteTeamData(id));
  };

  useEffect(() => {
    dispatch(fetchTeamData());
  }, []);

  return (
    <div className="App">
      <h1>Frontend Interview Redux toolkit</h1>
      <div className="container">
        <label>
          Name:
          <input
            type="text"
            className="text-box"
            value={data?.name}
            name="name"
            onChange={onChange}
          />
        </label>
        <div className="radio-button-container">
          <label>
            Default value
            <input
              type="radio"
              value={true}
              checked={data?.defaultValue}
              name="defaultValue"
              onChange={onChange}
            />
          </label>
        </div>

        <label>
          Company Id:
          <input
            type="number"
            className="text-box"
            value={data?.companyId || ""}
            name="companyId"
            onChange={onChange}
          />
        </label>
        <button className="submit-button" onClick={onButtonClick}>
          Submit
        </button>
      </div>
      <div className="show-contaner">
        <h1>Show Data from API</h1>
        <div className="data-container">
          <table id="customers">
            <thead>
              <tr>
                <th className="thdata">Name</th>
                <th className="thdata">Default Value</th>
                <th className="thdata">Company Id</th>
                <th className="thdata">Delete</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <h2>Loading....</h2>
              ) : (
                <>
                  {apiData?.content?.map((item, id) => (
                    <tr key={item?.id}>
                      <td>{item?.name}</td>
                      <td>{item?.defaultValue === true ? "true" : "false"}</td>
                      <td>{item?.companyId}</td>
                      <td>
                        <button onClick={() => onDeleteRow(item?.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
