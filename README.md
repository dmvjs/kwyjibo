# Kwyjibo

Example output posted to soundcloud: https://soundcloud.com/cappinkirk/kwyjibot-3actplayv2

LIVE JavaScript DJ Website dynamically powered by Kwyjibo: https://cappinkirk.com

Note: This project won't work out of the box, it needs the music files corresponding to data in songdata.json. If you are interested hit me up and I can help you get going but there is enough nuance that I won't attempt to explain it all here just yet. 

## How does it work?

The application has a bunch of audio files (specifically in 84, 94, and 103 BPM tempos) that are each 16 and 64 beats in length (two files, 'lead' and 'body'), for each of 193 songs that have an object describing their native integer tempo, artist name, title, and key randomly selects forward or reverse, selects a random tempo, and a random key (1-12) to start.

Next, it filters the set of songs to the tempo and key* and randomly chooses one, and removes this from the list of songs. It gets two songs going in matching tempo with near or matching keys for 16 beats while playing two DJ samples at specific times, chosen randomly from a bank of sounds created for this purpose.

Next it plays a longer version of those two songs for 64 beats. For the next four songs, just play the longer versions, but also just like before, filter songs, choose one randomly, remove from list. Each chosen song moves the active key value ahead, forward or reverse, and when it overflows it goes back to the bottom/top (forward/reverse).

If a song isn’t available in the key search, just randomly choose any song and remove it from the list (this rarely happens, contrary to my expectation). At an index specified, change to the next tempo and run the same program.

* when considering key the metadata also includes specific information not only about the entire instrumental (native key) but also the time shifted key, if it is affected. this allows for more complex combinations of beats

Check out https://cappinkirk.com for endless on-key mixes