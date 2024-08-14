import { createSlice } from "@reduxjs/toolkit";

const serializeTimestamp = (timestamp) => timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

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
        loading: false,
        checkedMails: [],
        tempEmails: [], // Initialize as an empty array
        checkedCount: 0
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload.map(email => ({
                ...email,
                createdAt: email.createdAt ? serializeTimestamp(email.createdAt) : null
            }));
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setSideBarOpen: (state, action) => {
            state.sideBarOpen = action.payload;
        },
        setArchievedMails: (state, action) => {
            const email = action.payload; // payload is expected to be the entire email object
            if (email && email.id) {
                state.archievedMails = {
                    ...state.archievedMails,
                    [email.id]: {
                        ...email,
                        createdAt: email.createdAt ? serializeTimestamp(email.createdAt) : null
                    }
                };
            }
        },
        setStarredMails: (state, action) => {
            state.starredMails = action.payload; // Set payload directly as array
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCheckedMails: (state, action) => {
            const payload = action.payload;

            if (Array.isArray(payload)) {
                // Handle bulk selection
                state.checkedMails = payload;
            } else if (payload && payload.id) {
                // Handle individual selection
                const isAlreadyChecked = state.checkedMails.some(mail => mail.id === payload.id);
                if (isAlreadyChecked) {
                    state.checkedMails = state.checkedMails.filter(mail => mail.id !== payload.id); // Remove from checkedMails
                } else {
                    state.checkedMails = [...state.checkedMails, payload]; // Add to checkedMails
                }
            }
        },
        setTempEmails: (state, action) => {
            // Make sure action.payload is an array
            state.tempEmails = action.payload;
        },
        setCheckedCount: (state, action) => {
            state.checkedCount = state.checkedCount + action.payload;
        },
        resetCheckedCount: (state, action) => {
            state.checkedCount = action.payload;
        },
    }
});

export const {
    setOpen, setEmails, setSelectedEmail, setSearchText, setUser, setSideBarOpen,
    setArchievedMails, setStarredMails, setLoading, setCheckedMails, setTempEmails,
    setCheckedCount, resetCheckedCount
} = appSlice.actions;
export default appSlice.reducer;
