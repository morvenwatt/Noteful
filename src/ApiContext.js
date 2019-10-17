import React from 'react';

export default React.createContext ({
    notes: [],
    folders: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: () => {}
})

// This creates a context object, thus the Providers
// and Consumers can read the values of these things.