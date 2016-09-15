# spotify-radio-integration
Web app for adding Spotify integration to online radio playlists.

Simply log in to Spotify, choose an available station from the menu, and add any recently played songs to your Spotify playlists.  Great for when you want to save a song you heard on the radio, but forgot what you heard.  

Currently radio tracks are scraped from TuneGenie.  

App does require playlist read/write permission for Spotify account, but only uses temporary tokens to interact with Spotify.  

Sessions for provided tokens last an hour, after that the user needs to re-authenticate with Spotify by refreshing and logging back in.
