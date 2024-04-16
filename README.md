# CSE316-FinalProject
Features:
Numbered Cards - Note that when a list loads the songs are all displayed as cards. Update those cards so that they are numbered starting with 1 to denote playlist song order.

Song Hyperlinks - The song cards all list the song title and artist name as plaintext. Update these cards so that the text is wrapped in a hyperlink that, when clicked, takes the user to the YouTube video corresponding to that song's YouTube id. Note that the hyperlink should wrap the song title and artist name but not the song number. Note that the Numbered Cards and the Hyperlinks are shown in Figure 1.

Changing the Playlist - There is currently no mechanism for changing the playlist so we'll need to add the following three editing features:
Adding a Song - Add a + button to the edit toolbar to the left of the undo button so that, when pressed, it adds a brand new song to the list. It should be immediately reflected in the list. That new song should always be called Untitled with an artist named Unknown and a YouTube id of dQw4w9WgXcQ.
Editing a Song - Should the user double-click on a song card it should open up a modal (i.e. dialog) that is laid out as shown in Figure 2 below where the current values for the song title, artist, and YouTube id are loaded into textfields. The user can then edit these values and by pressing Confirm, can update the song and close the dialog. Pressing Cancel should close the modal without updating the song.
Removing a Song - Update the song cards so each one has a X button (as shown in Figure 2 below) for removing a song from the playlist. Note that when pressed your program should open up a modal to confirm that the user wants to remove the song. Your modal should have Confirm and Cancel buttons and should look like the modal shown in Figure 3 below.


Undo/Redo - Note that Adding, Editing, and Removing a song should all be done via transactions, meaning they should all be integrated into the Undo/Redo system, which currently only works for song dragging.

Foolproof Design - it is important that you don't tempt users with features that are not usable. So, controls that are not usable should be either absent or visibly different (i.e. greyed out) and functionally disabled:
Add List Button - if a list is in the process of being edited this button should be visibly and functionally disabled and only enabled if the edited list is first closed. Note that the provided example app does not work this way.
Add Song Button - this button should only be enabled if a list is currently loaded and being edited.
Undo/Redo Buttons - if there are no transactions to Undo, this button should be visibly and functionally disabled, the same goes for the Redo button. Note our example application does not do this.
Close List - if a list is not loaded for editing the Close List button should be disabled.
cd client and cd server on a split terminal

server terminal:
npm install -g nodemon
npm install
nodemon index.js

client terminal:
npm install
npm install 'react-youtube'
npm start
