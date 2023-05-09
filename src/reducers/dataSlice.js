import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  apiData: [],
  isLoading: false,
  errorMessage: "",
  isSuccess: false,
  dataDeleted: false,
};

const token =
  "eyJraWQiOiI1MWFhYjMxMC0xOWNiLTQ1YzctYjk5OS0wZTY3YTNlY2FhNjUiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX1VTRVIsIFJPTEVfQURNSU4iLCJncm91cHMiOlsiUk9MRV9VU0VSIiwiUk9MRV9BRE1JTiJdLCJjb21wYW55IjoxLCJ1c2VyX2lkIjozLCJpYXQiOjE2ODE0NDMyNjAsImlzcyI6Imh0dHBzOi8vd3d3LnRhbGVuY3kuY28iLCJleHAiOjE2ODQwMzUyNjB9.LYruQy8HNhVDIl_85anFpuVDfrbCCvx2Fd3JP_jGT2f4j2HLDNBLPxplyv5DTOKJJhm_vRKOMt3mg9KTg1aAtojGmsfgu549aMIVp94BvAewmrPJYSm_82Sq4mYfHLWxagbCox8cbPKmnoaeD1B2bU-KAkmvSwOlyr3St5nMSRUNj_eNrkYOGq7EzxVWo2VRNHlPnsowcRrOW1tntdg1tT1kPotRsbK5aZEMTlJ4EV_KgLPDLUw1lxb3ERR_gh7hKNkHqMw-UUcZa7XrrsxK8GLOayu1oepGM1Rojngv_9xj0aDnp5xe5rlABBSbHyW0WR1TxjyJU6EWcDnWPKbDCg";

export const fetchTeamData = createAsyncThunk(
  "team/fetchTeamData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://146.190.10.231:8080/pipeline/v1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const createTeamData = createAsyncThunk(
  "team/createTeamData",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://146.190.10.231:8080/pipeline/v1",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      thunkAPI.dispatch(fetchTeamData());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTeamData = createAsyncThunk(
  "team/deleteTeamData",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(
        `http://146.190.10.231:8080/pipeline/v1/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      thunkAPI.dispatch(fetchTeamData());
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const TeamSlice = createSlice({
  name: "Team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamData.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchTeamData.fulfilled, (state, action) => {
        state.apiData = action?.payload;
        state.isLoading = false;
        state.dataDeleted = "";
        state.isSuccess = false;
      })
      .addCase(createTeamData.rejected, (state, action) => {
        state.errorMessage = action?.payload || "Something went wrong";
      })
      .addCase(createTeamData.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(deleteTeamData.fulfilled, (state, action) => {
        state.dataDeleted = true;
      });
  },
});

export default TeamSlice.reducer;
