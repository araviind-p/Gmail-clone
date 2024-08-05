import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        open: false,
        emails: [],
        selectedEmail: null,
        searchText: "",
        user: null,
        sideBarOpen: false,
        archievedMails: {},
        starredMails: [],
        loading: false
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        },
        setEmails: (state, action) => {
            state.emails = action.payload
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setSideBarOpen: (state, action) => {
            state.sideBarOpen = action.payload
        },
        setArchievedMails: (state, action) => {
            const email = action.payload; // payload is expected to be the entire email object
            if (email && email.id) {
                state.archievedMails = {
                    ...state.archievedMails,
                    [email.id]: email
                };
            }
        },
        setStarredMails: (state, action) => {
            state.starredMails = action.payload; // Set payload directly as array
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {
    setOpen, setEmails, setSelectedEmail, setSearchText, setUser, setSideBarOpen,
    setArchievedMails, setStarredMails,setLoading
} = appSlice.actions;
export default appSlice.reducer