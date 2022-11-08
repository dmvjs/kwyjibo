# Kwyjibo

This is the tech that powers https://cappinkirk.com (minus the beats) posted here for all. Provide your own music.

Please check out https://cappinkirk.com for always unique endless mixes.

Note: This project won't work out of the box, it needs the music files corresponding to data in songdata.json. If you are interested hit me up and I can help you get going but there is enough nuance that I won't attempt to explain it all here just yet. 

## How does it work?

The application has a bunch of audio files (specifically in 84 and 94 BPM tempos) that are each 16 and 64 beats in length (two files, 'lead' and 'body'), for each of 85 songs that have an object describing their native integer tempo, artist name, title, and key randomly selects forward or reverse, selects tempo of 84, and a random key (1-12) to start.

Next, it filters the set of songs to the tempo and key* and randomly chooses one, and removes this from the list of songs. It gets two songs going in matching tempo with near or matching keys for 16 beats while playing two DJ samples at specific times, chosen randomly from a bank of sounds created for this purpose.

Next it plays a longer version of those two songs for 64 beats. For the next four songs, just play the longer versions, but also just like before, filter songs, choose one randomly, remove from list. Each chosen song moves the active key value ahead, forward or reverse, and when it overflows it goes back to the bottom/top (forward/reverse).

If a song isn’t available in the key search, just randomly choose any song and remove it from the list (this rarely happens, contrary to my expectation). At an index specified, change tempo to 94 bpm (or automatically if you run out of songs) run the same program, 84 and 103 tempos are also currently supported

* when considering key the metadata also includes specific information not only about the entire instrumental (native key) but also the time shifted key, if it is affected. this allows for more complex combinations of beats