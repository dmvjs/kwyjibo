const songdata = [{
    id: 1,
    artist: "Ying Yang Twins",
    title: "I Yi Yi",
    key: 2,
    bpm: 94,
}, {
    id: 2,
    artist: "2Pac",
    title: "How Do U Want It",
    key: 2,
    bpm: 94
}, {
    id: 3,
    artist: "Too Short",
    title: "Couldn't Be a Better Player",
    key: 2,
    bpm: 94,
}, {
    id: 4,
    artist: "Snoop Dogg",
    title: "What's My Name",
    key: 10,
    bpm: 94
}, {
    id: 5,
    artist: "Notorious BIG",
    title: "Hypnotize",
    key: 9,
    bpm: 94,
}, {
    id: 6,
    artist: "Nas",
    title: "If I Ruled the World",
    key: 2,
    bpm: 94,
}, {
    id: 7,
    artist: "Mobb Deep",
    title: "Shook Ones Part 2",
    key: 3,
    bpm: 94,
}, {
    id: 8,
    artist: "Ludacris",
    title: "Southern Hospitality",
    key: 10,
    bpm: 94,
}, {
    id: 9,
    artist: "Lil Wayne",
    title: "Shine",
    key: 6,
    bpm: 94,
}, {
    id: 10,
    artist: "Kane and Abel",
    title: "Show Dat Work",
    key: 8,
    bpm: 94,
}, {
    id: 11,
    artist: "Juvenile",
    title: "Back Dat Ass Up",
    key: 7,
    bpm: 94,
}, {
    id: 12,
    artist: "J-Kwon",
    title: "Tipsy",
    key: 4,
    bpm: 94,
}, {
    id: 13,
    artist: "Dr Dre",
    title: "The Next Episode",
    key: 2,
    bpm: 94
}, {
    id: 14,
    artist: "David Banner",
    title: "Play",
    key: 5,
    bpm: 94,
}, {
    id: 15,
    artist: "Clipse",
    title: "Grindin'",
    key: 4,
    bpm: 94,
}, {
    id: 16,
    artist: "Ali",
    title: "Breathe In, Breathe Out",
    key: 8,
    bpm: 94,
}, {
    id: 17,
    artist: "C-Murder",
    title: "Down for my Ns",
    key: 1,
    bpm: 94,
}, {
    id: 18,
    artist: "Boo & Gotti",
    title: "Ain't It Man",
    key: 4,
    bpm: 94,
}, {
    id: 19,
    artist: "T.I.",
    title: "Why U Wanna",
    key: 8,
    bpm: 94,
}, {
    id: 20,
    artist: "50 Cent",
    title: "In Da Club",
    key: 6,
    bpm: 94,
}, {
    id: 21,
    artist: "Beyonce",
    title: "Single Ladies",
    key: 4,
    bpm: 94,
}, {
    id: 22,
    artist: "50 Cent",
    title: "I Get It In",
    key: 12,
    bpm: 94,
}, /*{
    id: 23,
    artist: "Dr. Dre",
    title: "G Thang",
    key: 11,
    bpm: 94
}, */{
    id: 24,
    artist: "Lil Mo",
    title: "Superwoman Remix",
    key: 12,
    bpm: 94,
}, {
    id: 25,
    artist: "Fabolous",
    title: "Can't Deny It",
    key: 4,
    bpm: 94,
}, {
    id: 26,
    artist: "Masta Ace",
    title: "Born to Roll",
    key: 4,
    bpm: 94,
}, /*{
    id: 27,
    artist: "Outcast",
    title: "ATLiens Bad Boy Remix",
    key: 11,
    bpm: 94
}, *//*{
    id: 28,
    artist: "Miss B",
    title: "Bottle Action",
    key: 2,
    bpm: 94,
}, */{
    id: 29,
    artist: "Ludacris",
    title: "Ho",
    key: 8,
    bpm: 94,
}, {
    id: 30,
    artist: "Snoop Dogg",
    title: "Deep Cover",
    key: 4,
    bpm: 94,
}, {
    id: 31,
    artist: "Snoop Dogg",
    title: "Drop It Like Its Hot",
    key: 9,
    bpm: 94,
}, {
    id: 32,
    artist: "Dr Dre",
    title: "Dre Day",
    key: 1,
    bpm: 94
}, /*{
    id: 33,
    artist: "Jay-Z",
    title: "Excuse Me Miss",
    key: 1,
    bpm: 94,
}, */{
    id: 34,
    artist: "Juvenile",
    title: "Ha",
    key: 5,
    bpm: 94,
}, {
    id: 35,
    artist: "Silk the Shocker",
    title: "Aint My Fault Part 2",
    key: 4,
    bpm: 94,
}, {
    id: 36,
    artist: "Nas",
    title: "Street Dreams",
    key: 6,
    bpm: 94,
}, {
    id: 37,
    artist: "Lil Wayne",
    title: "I Need a Hot Girl",
    key: 6,
    bpm: 94,
}, {
    id: 38,
    artist: "Paul Cameron",
    title: "Brown Beat",
    key: 8,
    bpm: 94,
}, /*{
    id: 39,
    artist: "Eminem",
    title: "Get You Mad",
    key: 6,
    bpm: 94
}, */{
    id: 40,
    artist: "Sean Paul",
    title: "Baby Boy",
    key: 12,
    bpm: 94,
}, {
    id: 41,
    artist: "Pastor Troy",
    title: "Are We Cuttin",
    key: 8,
    bpm: 94,
}, {
    id: 42,
    artist: "MOP",
    title: "Ante Up",
    key: 4,
    bpm: 94
}, {
    id: 43,
    artist: "Total",
    title: "What About Us Remix",
    key: 3,
    bpm: 94,
}, {
    id: 44,
    artist: "Nelly",
    title: "Shake Ya Tailfeather",
    key: 4,
    bpm: 94,
    computedKey: 11,
}, {
    id: 45,
    artist: "Too Short",
    title: "Quit Hatin",
    key: 2,
    bpm: 94,
    computedKey: 12,
}, {
    id: 46,
    artist: "Ludacris",
    title: "Move B*tch",
    key: 11,
    bpm: 94,
}, {
    id: 47,
    artist: "Mystikal",
    title: "Been So Long",
    key: 11,
    bpm: 94,
}, {
    id: 48,
    artist: "Cheeky Blakk",
    title: "B*tch Get Off Me",
    key: 1,
    bpm: 94,
}, {
    id: 49,
    artist: "Chingy",
    title: "Right Thurr",
    key: 2,
    bpm: 94,

}, {
    id: 50,
    artist: "Chris Brown",
    title: "Wall 2 Wall",
    key: 4,
    bpm: 94
}, {
    id: 51,
    artist: "Young Buck",
    title: "Shorty Wanna Ride",
    key: 4,
    bpm: 94,
}, {
    id: 52,
    artist: "Juvenile",
    title: "In My Life",
    key: 9,
    bpm: 94,
}, /*{
    id: 53,
    artist: "Jay-Z",
    title: "Just Wanna Love U",
    key: 1,
    bpm: 94,
}, */{
    id: 54,
    artist: "Juvenile",
    title: "From Her Mama",
    key: 6,
    bpm: 94,
}, {
    id: 55,
    artist: "Big Tymers",
    title: "Number One Stunna",
    key: 1,
    bpm: 94,
}, {
    id: 56,
    artist: "Big Tymers",
    title: "Get Your Roll On",
    key: 1,
    bpm: 94,
}, {
    id: 57,
    artist: "LL Cool J",
    title: "Doin It",
    key: 4,
    bpm: 94
}, {
    id: 58,
    artist: "Jim Jones",
    title: "We Fly High",
    key: 1,
    bpm: 94,
}, {
    id: 59,
    artist: "Kia Shine",
    title: "Krispy",
    key: 8,
    bpm: 94,
}, {
    id: 60,
    artist: "Vockah Redu",
    title: "Roll Call",
    key: 10,
    bpm: 94,
}, {
    id: 61,
    artist: "Quint Black",
    title: "Shake Dem Haters Off",
    key: 12,
    bpm: 94,
}, {
    id: 62,
    artist: "Traxster",
    title: "Freak Hoes",
    key: 2,
    bpm: 84,
}, {
    id: 63,
    artist: "Lil Wayne",
    title: "Bring it Back",
    key: 6,
    bpm: 84,
}, {
    id: 64,
    artist: "Youngbloodz",
    title: "Presidential",
    key: 6,
    bpm: 84,
}, {
    id: 65,
    artist: "Lil Wayne",
    title: "Go DJ",
    key: 1,
    bpm: 84,
}, {
    id: 66,
    artist: "Total",
    title: "What About Us Remix",
    key: 1,
    bpm: 84,
}, {
    id: 67,
    artist: "Master P",
    title: "I'm a Ho",
    key: 1,
    bpm: 84,
}, {
    id: 68,
    artist: "Jay-Z",
    title: "Dirt Off Your Shoulder",
    key: 3,
    bpm: 84,
}, {
    id: 69,
    artist: "Lil Boosie",
    title: "Wipe Me Down Remix",
    key: 4,
    bpm: 84
}, {
    id: 70,
    artist: "Snoop Dogg",
    title: "Woof",
    key: 11,
    bpm: 84,
}, {
    id: 71,
    artist: "Too Short",
    title: "Quit Hatin'",
    key: 5,
    bpm: 84,
}, {
    id: 72,
    artist: "Kelis",
    title: "Bossy",
    key: 2,
    bpm: 84
}, {
    id: 73,
    artist: "Chris Brown",
    title: "Get Like Me",
    key: 2,
    bpm: 84,
    computedKey: 1
}, {
    id: 74,
    artist: "Ludacris",
    title: "Get Back",
    key: 3,
    bpm: 84
}, {
    id: 75,
    artist: "Lil Wayne",
    title: "Stuntin' Like My Daddy",
    key: 3,
    bpm: 84,
    computedKey: 11
}, {
    id: 76,
    artist: "Super Duck Breaks",
    title: "Beak This",
    key: 3,
    bpm: 84,
    computedKey: 10
}, {
    id: 77,
    artist: "Trillville",
    title: "Some Cut",
    key: 8,
    bpm: 84,
    computedKey: 9
}, {
    id: 78,
    artist: "Nelly",
    title: "E.I.",
    key: 7,
    bpm: 84,
    computedKey: 1
}, {
    id: 79,
    artist: "504 Boys",
    title: "Wobble Wobble",
    key: 1,
    bpm: 84
}, {
    id: 80,
    artist: "T.I.",
    title: "Big Things Poppin'",
    key: 6,
    bpm: 84,
    computedKey: 5
}, {
    id: 81,
    artist: "P$C",
    title: "I'm a King",
    key: 4,
    bpm: 84
}, {
    id: 82,
    artist: "Juvenile",
    title: "Set It Off",
    key: 4,
    bpm: 84
}, {
    id: 83,
    artist: "T.I.",
    title: "24's",
    key: 4,
    bpm: 84,
    computedKey: 11
}, {
    id: 84,
    artist: "54th Platoon",
    title: "Holdin' It Down",
    key: 4,
    bpm: 84,
    computedKey: 12
}, {
    id: 85,
    artist: "Lil Scrappy",
    title: "No Problem",
    key: 5,
    bpm: 84
}, {
    id: 86,
    artist: "Bubba Sparxxx",
    title: "Ugly",
    key: 3,
    bpm: 94,
    computedKey: 11
}, {
    id: 87,
    artist: "Nas",
    title: "Oochie Wally",
    key: 11,
    bpm: 94
}, {
    id: 88,
    artist: "Quint Black",
    title: "Shake Dem Haters Remix",
    key: 5,
    bpm: 94,
    computedKey: 12
}, {
    id: 89,
    artist: "Da Sha Ra",
    title: "Bootin' Up",
    key: 2,
    bpm: 94,
    computedKey: 1
}, {
    id: 90,
    artist: "Usher",
    title: "You Make Me Wanna Remix",
    key: 5,
    bpm: 84,
}, {
    id: 91,
    artist: "Three 6 Mafia",
    title: "You Scared Part 2",
    key: 5,
    bpm: 84,
    computedKey: 1
}, {
    id: 92,
    artist: "Nelly",
    title: "Country Grammar",
    key: 7,
    bpm: 84,
    computedKey: 6
}, {
    id: 93,
    artist: "Webbie",
    title: "Bad B*tch",
    key: 8,
    bpm: 84
}, {
    id: 94,
    artist: "T.I.",
    title: "Top Back",
    key: 5,
    bpm: 84,
    computedKey: 1
}, {
    id: 95,
    artist: "David Banner",
    title: "Shawty Say",
    key: 6,
    bpm: 84
}, {
    id: 96,
    artist: "Lil Keke",
    title: "Southside",
    key: 12,
    bpm: 84
}, {
    id: 97,
    artist: "Kingpin Skinny Pimp",
    title: "TVs Remix",
    key: 9,
    bpm: 84
}, {
    id: 98,
    artist: "Three 6 Mafia",
    title: "Ask & Get It",
    key: 9,
    bpm: 84,
    computedKey: 4
}, {
    id: 99,
    artist: "Three 6 Mafia",
    title: "Who Run It",
    key: 11,
    bpm: 84,
    computedKey: 6
}, {
    id: 100,
    artist: "Jay-Z",
    title: "Hey Papi",
    key: 2,
    bpm: 84,
    computedKey: 12
}, {
    id: 101,
    artist: "Project Pat",
    title: "Ooh Nuttin",
    key: 8,
    bpm: 84,
    computedKey: 2
}, {
    id: 102,
    artist: "Lil Troy",
    title: "We Gon Lean",
    key: 8,
    bpm: 84,
    computedKey: 2
}, {
    id: 103,
    artist: "Youngbloodz",
    title: "Datz Me",
    key: 11,
    bpm: 84,
    computedKey: 6
}, {
    id: 104,
    artist: "Project Pat",
    title: "Dont Save Her",
    key: 8,
    bpm: 84,
    computedKey: 3
}, {
    id: 105,
    artist: "E-40",
    title: "Rep Yo City",
    key: 5,
    bpm: 84,
    computedKey: 1
}, {
    id: 106,
    artist: "Lil Jon",
    title: "I Dont Give a What",
    key: 1,
    bpm: 84,
    computedKey: 8
}, {
    id: 107,
    artist: "Rich Boy",
    title: "Throw Some Ds",
    key: 5,
    bpm: 84,
    computedKey: 4
}, {
    id: 108,
    artist: "Project Pat",
    title: "Gel and Weave",
    key: 11,
    bpm: 84,
    computedKey: 5
}, {
    id: 109,
    artist: "Wacko Skip & Juvenile",
    title: "Nolia Clap",
    key: 1,
    bpm: 84,
    computedKey: 2
}, {
    id: 110,
    artist: "Lil Wayne",
    title: "Fireman",
    key: 11,
    bpm: 84,
    computedKey: 6
}, {
    id: 111,
    artist: "Yung Joc",
    title: "It's Goin Down",
    key: 1,
    bpm: 84
}, {
    id: 112,
    artist: "Ludacris",
    title: "D@mn",
    key: 9,
    bpm: 84
}, {
    id: 113,
    artist: "Magic",
    title: "I Smoke I Drank Remix",
    key: 9,
    bpm: 84
}, {
    id: 114,
    artist: "DJ KaySlay",
    title: "Who Gives A ...",
    key: 9,
    bpm: 84,
    computedKey: 4
}, {
    id: 115,
    artist: "Nelly",
    title: "Air Force Ones",
    key: 7,
    bpm: 84,
    computedKey: 10
}, {
    id: 116,
    artist: "Lil Jon",
    title: "Snap Yo Fingers",
    key: 1,
    bpm: 84
}, {
    id: 117,
    artist: "Nelly",
    title: "Grillz",
    key: 12,
    bpm: 84,
    computedKey: 11
}, {
    id: 118,
    artist: "Cam'Ron",
    title: "Down and Out",
    key: 12,
    bpm: 84,
    computedKey: 4
}, {
    id: 119,
    artist: "Busta Rhymes",
    title: "Break Yo Neck",
    key: 11,
    bpm: 84,
    computedKey: 8
}, {
    id: 120,
    artist: "Project Pat",
    title: "Back Clap Remix",
    key: 8,
    bpm: 84,
    computedKey: 12
}, {
    id: 121,
    artist: "Three 6 Mafia",
    title: "Ridin Spinners",
    key: 1,
    bpm: 84,
    computedKey: 8
}, {
    id: 122,
    artist: "Ludacris",
    title: "D@mn Remix",
    key: 9,
    bpm: 84
}, {
    id: 123,
    artist: "Too Short",
    title: "Shake That Monkey",
    key: 8,
    bpm: 102
}, {
    id: 124,
    artist: "Juelz Santana",
    title: "There It Go",
    key: 7,
    bpm: 102,
    computedKey: 6
}, {
    id: 125,
    artist: "LL Cool J",
    title: "Headsprung",
    key: 5,
    bpm: 102,
    computedKey: 1
}, {
    id: 126,
    artist: "Sean Paul",
    title: "Get Busy",
    key: 3,
    bpm: 102,
    computedKey: 2
}, {
    id: 127,
    artist: "Choppa",
    title: "Choppa Style",
    key: 2,
    bpm: 102
}, {
    id: 128,
    artist: "Master P",
    title: "Rock It",
    key: 2,
    bpm: 102,
    computedKey: 1
}, {
    id: 129,
    artist: "Too Short",
    title: "Blow the Whistle",
    key: 2,
    bpm: 102,
    computedKey: 5
}, {
    id: 130,
    artist: "Too Short",
    title: "Burn Rubber",
    key: 1,
    bpm: 102,
    computedKey: 5
}, {
    id: 131,
    artist: "Lil Jon",
    title: "Get Low",
    key: 5,
    bpm: 102
}, {
    id: 132,
    artist: "Master P",
    title: "Them Jeans",
    key: 5,
    bpm: 102
}, {
    id: 133,
    artist: "Da Sha Ra",
    title: "Bootin' Up",
    key: 2,
    bpm: 102
}, {
    id: 134,
    artist: "Loon",
    title: "How U Want That",
    key: 1,
    bpm: 102
}, {
    id: 135,
    artist: "Khia",
    title: "My Neck, My Back",
    key: 8,
    bpm: 102
}, {
    id: 136,
    artist: "Ying Yang Twins",
    title: "Salt Shaker",
    key: 2,
    bpm: 102
}, {
    id: 137,
    artist: "Usher",
    title: "Yeah",
    key: 5,
    bpm: 102,
    computedKey: 6
}, {
    id: 138,
    artist: "T.I.",
    title: "I'm Serious Remix",
    key: 8,
    bpm: 102,
    computedKey: 9
}, {
    id: 139,
    artist: "Busta Rhymes",
    title: "Light Your A$$ On Fire",
    key: 7,
    bpm: 102,
    computedKey: 12
}, {
    id: 140,
    artist: "Missy Elliott",
    title: "Work It",
    key: 5,
    bpm: 102
}, {
    id: 141,
    artist: "E-40",
    title: "Tell Me When To Go",
    key: 3,
    bpm: 102,
    computedKey: 9
}, {
    id: 142,
    artist: "The Showboys",
    title: "Drag Rap",
    key: 8,
    bpm: 94,
    computedKey: 9
}, {
    id: 143,
    artist: "Young Gunz",
    title: "Can't Stop Won't Stop",
    key: 1,
    bpm: 102
}, {
    id: 144,
    artist: "Petey Pablo",
    title: "Freek a Leek",
    key: 6,
    bpm: 102,
    computedKey: 1
}, {
    id: 145,
    artist: "Ludacris",
    title: "Stand Up",
    key: 4,
    bpm: 102,
    computedKey: 3
}, {
    id: 146,
    artist: "Cheeky Blakk",
    title: "B*tch Get Off Me",
    key: 9,
    bpm: 102,
    computedKey: 1
}, {
    id: 147,
    artist: "Jay-Z",
    title: "Just Wanna Luv U",
    key: 10,
    bpm: 102,
    linkageId: 1,
    computedKey: 4
}, {
    id: 148,
    artist: "Silky Slim",
    title: "Sista Sista",
    key: 4,
    bpm: 102,
    computedKey: 6
}, {
    id: 149,
    artist: "Ludacris",
    title: "Area Codes",
    key: 9,
    bpm: 102,
    computedKey: 8
}, {
    id: 150,
    artist: "Chris Brown",
    title: "Run It",
    key: 2,
    bpm: 102,
}, {
    id: 151,
    artist: "Ying Yang Twins",
    title: "Whistle While You Twerk",
    key: 3,
    bpm: 102,
    computedKey: 2
}, {
    id: 152,
    artist: "5th Ward Webbie",
    title: "On Da Wall",
    key: 12,
    bpm: 102,
    computedKey: 11
}, {
    id: 153,
    artist: "5th Ward Webbie",
    title: "Toot It Up",
    key: 11,
    bpm: 102,
    computedKey: 6
}, {
    id: 154,
    artist: "The Pack",
    title: "Vans",
    key: 11,
    bpm: 102,
    computedKey: 2
}, {
    id: 155,
    artist: "Montell Jordan",
    title: "This Is How We Do It",
    key: 5,
    bpm: 102,
    computedKey: 4
}, {
    id: 156,
    artist: "Ying Yang Twins",
    title: "Whisper",
    key: 3,
    bpm: 102
}, {
    id: 157,
    artist: "FRESH",
    title: "Cake Boy",
    key: 1,
    bpm: 84,
    computedKey: 2
}, {
    id: 158,
    artist: "Bloodclot Breaks",
    title: "Kuttin Like a Maniac",
    key: 4,
    bpm: 84,
    computedKey: 2
}, {
    id: 159,
    artist: "Super Seal",
    title: "Side B Break",
    key: 2,
    bpm: 84,
    computedKey: 8
}, {
    id: 160,
    artist: "Fat Joe",
    title: "Make It Rain",
    key: 9,
    bpm: 84,
    computedKey: 11
}, {
    id: 161,
    artist: "Crime Mobb",
    title: "Rock Ya Hips",
    key: 2,
    bpm: 84,
    computedKey: 1
}, {
    id: 162,
    artist: "Crime Mobb",
    title: "Stilettos",
    key: 9,
    bpm: 84,
    computedKey: 1
}, {
    id: 163,
    artist: "DJ DMD",
    title: "25 Lighters",
    key: 2,
    bpm: 84
}, {
    id: 164,
    artist: "Ludacris",
    title: "Catch Up",
    key: 4,
    bpm: 84,
    computedKey: 11
}, {
    id: 165,
    artist: "8-Ball & MJG",
    title: "Pimp Hard",
    key: 5,
    bpm: 84,
    computedKey: 12
}, {
    id: 166,
    artist: "Three 6 Mafia",
    title: "Chickenheads",
    key: 6,
    bpm: 84,
    computedKey: 1
}, {
    id: 167,
    artist: "Bravehearts",
    title: "Quick to Back Down",
    key: 9,
    bpm: 84,
    computedKey: 4
}, {
    id: 168,
    artist: "G-Unit",
    title: "Wanna Get to Know You",
    key: 5,
    bpm: 84
}, {
    id: 169,
    artist: "Gangsta Boo",
    title: "Where Dem Dollas At",
    key: 1,
    bpm: 84,
    computedKey: 2
}, {
    id: 170,
    artist: "Tango",
    title: "Wobble & Shake It",
    key: 8,
    bpm: 84,
    computedKey: 9
}, /*{
    id: 171,
    artist: "Too Short",
    title: "Freaky Tales Part 2",
    key: 1,
    bpm: 84
}, */{
    id: 172,
    artist: "Webbie",
    title: "How U Ridin'",
    key: 6,
    bpm: 84
}, {
    id: 173,
    artist: "Jim Jones",
    title: "Weatherman",
    key: 1,
    bpm: 84,
    computedKey: 3
}, {
    id: 174,
    artist: "Ludacris",
    title: "Act a Fool",
    key: 9,
    bpm: 84
}, {
    id: 175,
    artist: "Mobb Deep",
    title: "Get It Twisted",
    key: 1,
    bpm: 102
}, {
    id: 176,
    artist: "Saweetie",
    title: "My Type Remix",
    key: 6,
    bpm: 102
}, {
    id: 177,
    artist: "Ying Yang Twins",
    title: "Get It Girl",
    key: 1,
    bpm: 102
}, {
    id: 178,
    artist: "Big Freedia",
    title: "A$$ Everywhere",
    key: 4,
    bpm: 102
}, {
    id: 179,
    artist: "Drake",
    title: "Nice for What",
    key: 4,
    bpm: 94
}, {
    id: 180,
    artist: "Joe Budden",
    title: "Pump It Up",
    key: 3,
    bpm: 102
}, {
    id: 181,
    artist: "DJ Felli Fell",
    title: "Get Buck in Here",
    key: 2,
    bpm: 102,
    computedKey: 1
}, {
    id: 182,
    artist: "B.G.",
    title: "Bling Bling",
    key: 10,
    bpm: 102,
    computedKey: 9
}, /*{
    id: 183,
    artist: "Cassie",
    title: "Me & U",
    key: 1,
    bpm: 102
}, *//*{
    id: 184,
    artist: "Freeway",
    title: "Flipside",
    key: 1,
    bpm: 102
}, */{
    id: 185,
    artist: "Busta Rhymes",
    title: "Fire It Up",
    key: 8,
    bpm: 102
}, {
    id: 186,
    artist: "Too Short",
    title: "Keep Bouncing",
    key: 6,
    bpm: 102,
    computedKey: 10
}, {
    id: 187,
    artist: "Notorious BIG",
    title: "Nasty Girl",
    key: 11,
    bpm: 102,
    computedKey: 12
}, {
    id: 188,
    artist: "Saweetie",
    title: "Up Now",
    key: 5,
    bpm: 102,
    computedKey: 2
}, {
    id: 189,
    artist: "Missy Elliott",
    title: "Ching a Ling",
    key: 4,
    bpm: 102
}, {
    id: 190,
    artist: "Kilo",
    title: "Who Dat Call tha Police",
    key: 1,
    bpm: 102,
}, {
    id: 191,
    artist: "Kilo",
    title: "Get In Line",
    key: 3,
    bpm: 102
}, {
    id: 192,
    artist: "Mobb Deep",
    title: "Real Gangstaz",
    key: 9,
    bpm: 102
}, {
    id: 193,
    artist: "Doug E Fresh",
    title: "The Show",
    key: 4,
    bpm: 102
}, {
    id: 194,
    artist: "50 Cent",
    title: "Candy Shop",
    key: 11,
    bpm: 102,
    computedKey: 6
}, /*{
    id: 195,
    artist: "A Tribe Called Quest",
    title: "Electric Relaxation",
    key: 2,
    bpm: 102,
    computedKey: 9
}, *//*{
    id: 196,
    artist: "Beastie Boys",
    title: "Sure Shot European B-Boy Remix",
    key: 8,
    bpm: 102,
    computedKey: 2
}, */{
    id: 197,
    artist: "Busta Rhymes",
    title: "Pass the Courvosier",
    key: 4,
    bpm: 102,
    computedKey: 12
}, {
    id: 198,
    artist: "Chris Brown",
    title: "Iffy",
    key: 5,
    bpm: 102
}, /*{
    id: 199,
    artist: "Del the Funky Homosapien",
    title: "Mistadobalina",
    key: 3,
    bpm: 102,
    computedKey: 10
}*/ {
    id: 200,
    artist: "FM",
    title: "Gimme What You Got",
    key: 8,
    bpm: 102,
    computedKey: 2
}, /*{
    id: 201,
    artist: "De La Soul",
    title: "Still Ego Trippin",
    key: 3,
    bpm: 102,
    computedKey: 11
}*/ /*{
    id: 202,
    artist: "Fu2",
    title: "Boomin In Ya Jeep",
    key: 4,
    bpm: 102,
    computedKey: 1
}*/ /*{
    id: 203,
    artist: "Ice Cube",
    title: "We Be Clubbin Remix",
    key: 5,
    bpm: 102,
    computedKey: 12
}, *//*{
    id: 204,
    artist: "Richard Browne",
    title: "Baddis Ting",
    key: 6,
    bpm: 102,
    computedKey: 2
}*/ /*{
    id: 205,
    artist: "Lloyd",
    title: "Girls Around the World",
    key: 6,
    bpm: 102,
    computedKey: 1
}, {
    id: 206,
    artist: "Lloyd",
    title: "You",
    key: 12,
    bpm: 102,
}, */{
    id: 207,
    artist: "Master P",
    title: "Ghetto D",
    key: 5,
    bpm: 102
}, {
    id: 208,
    artist: "Mystikal",
    title: "Shake Ya Ass",
    key: 1,
    bpm: 102
}, {
    id: 209,
    artist: "Naughty by Nature",
    title: "O.P.P.",
    key: 11,
    bpm: 102,
    computedKey: 6
}, {
    id: 210,
    artist: "Onyx",
    title: "Slam",
    key: 8,
    bpm: 102,
    computedKey: 3
}, /*{
    id: 211,
    artist: "Public Enemy",
    title: "Louder Than a Bomb JMJ Remix",
    key: 2,
    bpm: 102
}, {
    id: 212,
    artist: "Public Enemy",
    title: "Security First World",
    key: 2,
    bpm: 102,
    computedKey: 9
}*/ {
    id: 213,
    artist: "R Kelly",
    title: "Playas Only",
    key: 1,
    bpm: 102
}, /*{
    id: 214,
    artist: "Redman",
    title: "I'll Be Dat",
    key: 4,
    bpm: 102,
    computedKey: 8
}, {
    id: 215,
    artist: "Sean Paul",
    title: "Like Glue",
    key: 12,
    bpm: 102,
    computedKey: 7
}*/ {
    id: 216,
    artist: "Skee Lo",
    title: "I Wish",
    key: 6,
    bpm: 102,
    computedKey: 1
}, {
    id: 217,
    artist: "Swizz Beats",
    title: "Money In the Bank",
    key: 5,
    bpm: 102,
    computedKey: 2
}, {
    id: 218,
    artist: "The Game",
    title: "How We Do",
    key: 9,
    bpm: 102,
    computedKey: 4
}, /*{
    id: 219,
    artist: "Pharcyde",
    title: "Ya Mama J-Swift",
    key: 7,
    bpm: 102,
    computedKey: 2
},*/ /*{
    id: 220,
    artist: "Tony Touch",
    title: "Capicu",
    key: 3,
    bpm: 102,
    computedKey: 11
}, {
    id: 221,
    artist: "Travis Barker",
    title: "100",
    key: 1,
    bpm: 102,
    computedKey: 8
}, {
    id: 222,
    artist: "Mike Epps",
    title: "Tryna Be a Gangsta",
    key: 12,
    bpm: 102
}, */{
    id: 223,
    artist: "Busta Rhymes",
    title: "Dangerous",
    key: 9,
    bpm: 102,
    computedKey: 12
}, {
    id: 224,
    artist: "The Game",
    title: "Hate It or Love It",
    key: 1,
    bpm: 102,
    computedKey: 12
}, /*{
    id: 225,
    artist: "Naughty by Nature",
    title: "The Hood Comes First",
    key: 1,
    bpm: 102,
    computedKey: 12
}, {
    id: 226,
    artist: "Def Jef",
    title: "Black to the Future",
    key: 1,
    bpm: 102
}, */{
    id: 227,
    artist: "Ying Yang Twins",
    title: "Twurkulator Part 2",
    key: 7,
    bpm: 102
}, /*{
    id: 228,
    artist: "Kelis",
    title: "Blindfolded",
    key: 8,
    bpm: 102,
    computedKey: 11
}, *//*{
    id: 229,
    artist: "Cypress Hill",
    title: "Insane in the Brain",
    key: 7,
    bpm: 102
}, */{
    id: 230,
    artist: "Next",
    title: "Too Close",
    key: 11,
    bpm: 102
}, {
    id: 231,
    artist: "Kriss Kross",
    title: "Jump",
    key: 11,
    bpm: 102
}, /*{
    id: 232,
    artist: "K-Solo",
    title: "Letterman",
    key: 11,
    bpm: 102
}, {
    id: 233,
    artist: "Ini Kimoze",
    title: "Here Comes the Hotstepper",
    key: 11,
    bpm: 102
}, {
    id: 234,
    artist: "J-Dilla",
    title: "The $",
    key: 11,
    bpm: 102
}, {
    id: 235,
    artist: "Pharcyde",
    title: "Soul Flower",
    key: 10,
    bpm: 102
}, */{
    id: 236,
    artist: "Ying Yang Twins",
    title: "Twerking in the Mirror",
    key: 10,
    bpm: 102,
    computedKey: 2
}, /*{
    id: 237,
    artist: "Nas & KRS One",
    title: "Classic",
    key: 10,
    bpm: 102
}, *//*{
    id: 238,
    artist: "T-Pain",
    title: "One More Drink",
    key: 10,
    bpm: 102
}, */{
    id: 239,
    artist: "Kid Cudi",
    title: "Poker Face",
    key: 10,
    bpm: 102
}, /*{
    id: 240,
    artist: "Jay Rock",
    title: "All My Life",
    key: 11,
    bpm: 102
}, {
    id: 241,
    artist: "Jadakiss",
    title: "By My Side",
    key: 10,
    bpm: 102,
    computedKey: 2
}, */{
    id: 242,
    artist: "Beyonce",
    title: "Naughty Girl",
    key: 10,
    bpm: 102
}, {
    id: 243,
    artist: "Slim",
    title: "So Fly Remix",
    key: 7,
    bpm: 94
}, /*{
    id: 244,
    artist: "Black Milk",
    title: "Sound of the City",
    key: 1,
    bpm: 94
}, {
    id: 245,
    artist: "De La Soul",
    title: "Itsoweezee",
    key: 1,
    bpm: 94
}, {
    id: 246,
    artist: "Del the Funky Homosapien",
    title: "Memory Loss",
    key: 1,
    bpm: 94
}, {
    id: 247,
    artist: "Jay Dee",
    title: "Circus",
    key: 1,
    bpm: 94
}, {
    id: 248,
    artist: "Mystikal",
    title: "That Woman",
    key: 1,
    bpm: 94,
    computedKey: 2
}, {
    id: 249,
    artist: "Pauly Perry",
    title: "Paulas Jam",
    key: 1,
    bpm: 94
}, {
    id: 250,
    artist: "Steady B",
    title: "Yo Motha",
    key: 1,
    bpm: 94
}, {
    id: 251,
    artist: "Big Punisher",
    title: "You Came Up",
    key: 4,
    bpm: 94,
    computedKey: 12
}, {
    id: 252,
    artist: "Ice T",
    title: "Mixed Up",
    key: 1,
    bpm: 94,
    computedKey: 11
}, {
    id: 253,
    artist: "Handsome Boy Modeling School",
    title: "If It Wasnt for You",
    key: 1,
    bpm: 94,
}, {
    id: 254,
    artist: "G-Mo",
    title: "Everyday Thing to Roll",
    key: 4,
    bpm: 94,
    computedKey: 11
}, {
    id: 255,
    artist: "Kool Keith",
    title: "I Dont Believe You Remix",
    key: 11,
    bpm: 94,
}, {
    id: 256,
    artist: "Cocoa Brovas",
    title: "Super Brooklyn",
    key: 8,
    bpm: 94,
}, {
    id: 257,
    artist: "Souls of Mischief",
    title: "Fourmation",
    key: 1,
    bpm: 94,
    computedKey: 8
}, {
    id: 258,
    artist: "Da Brat",
    title: "Funkdafied DJ Club Edit",
    key: 7,
    bpm: 94,
    computedKey: 2
}, {
    id: 259,
    artist: "Kool G Rap",
    title: "Fash Life",
    key: 1,
    bpm: 94,
    computedKey: 2
}, */{
    id: 260,
    artist: "Amerie",
    title: "1 Thing",
    key: 5,
    bpm: 102
}, {
    id: 261,
    artist: "Busta Rhymes",
    title: "Turn It Up",
    key: 11,
    bpm: 94,
    computedKey: 6
}, /*{
    id: 262,
    artist: "AZ",
    title: "Sugar Hill",
    key: 4,
    bpm: 94
}, */{
    id: 263,
    artist: "Youngbloodz",
    title: "Cadillac Pimpin",
    key: 6,
    bpm: 94,
    computedKey: 2
}, /*{
    id: 264,
    artist: "Large Professor",
    title: "IJUSTWANNACHILL",
    key: 11,
    bpm: 94,
    computedKey: 6
}, {
    id: 265,
    artist: "Souls of Mischief",
    title: "Home Game",
    key: 11,
    bpm: 94,
    computedKey: 6
}, {
    id: 266,
    artist: "Souls of Mischief",
    title: "Proper Aim",
    key:6,
    bpm: 94,
    computedKey: 5
}, {
    id: 267,
    artist: "Scott Lark",
    title: "Razzle Dazzle",
    key: 1,
    bpm: 94,
    computedKey: 5
}, {
    id: 268,
    artist: "Audio Two",
    title: "Top Billin",
    key: 4,
    bpm: 94
}, {
    id: 269,
    artist: "Dilated Peoples",
    title: "Global Dynamics",
    key: 4,
    bpm: 94,
    computedKey: 11
}, */{
    id: 270,
    artist: "Junior MAFIA",
    title: "Get Money",
    key: 10,
    bpm: 94,
    computedKey: 5
}, /*{
    id: 271,
    artist: "Lady of Rage",
    title: "Afro Puffs",
    key: 6,
    bpm: 94
}, *//*{
    id: 272,
    artist: "People Under the Stairs",
    title: "Schooled in the Trade",
    key: 6,
    bpm: 94,
    computedKey: 2
}, */{
    id: 273,
    artist: "Rihanna feat Young Jeezy",
    title: "Hard",
    key: 10,
    bpm: 94,
    computedKey: 5
}, /*{
    id: 274,
    artist: "Mad Skillz",
    title: "Its Goin Down",
    key: 6,
    bpm: 94
}, */{
    id: 275,
    artist: "Eve",
    title: "Tamborine Remix",
    key: 5,
    bpm: 102
}, {
    id: 276,
    artist: "Funkdoobiest",
    title: "Bow Wow Wow Remix",
    key: 6,
    bpm: 102,
    computedKey: 11
}, /*{
    id: 277,
    artist: "Def Jef",
    title: "On The Real Tip",
    key: 2,
    bpm: 102
}, */{
    id: 278,
    artist: "Bhad Barbie",
    title: "Bestie",
    key: 4,
    bpm: 102
}, /*{
    id: 279,
    artist: "Anjalixne the Pharoah",
    title: "Jump Shot",
    key: 6,
    bpm: 102
}, */{
    id: 280,
    artist: "DMX",
    title: "Stop Bein Greedy",
    key: 5,
    bpm: 102
}, /*{
    id: 281,
    artist: "Naughty by Nature",
    title: "Everythings Gonna Be Alright",
    key: 3,
    bpm: 102
}, *//*{
    id: 282,
    artist: "Timbaland",
    title: "Clock Strikes",
    key: 9,
    bpm: 102
}, */{
    id: 283,
    artist: "Baby",
    title: "Do That",
    key: 1,
    bpm: 102
}, {
    id: 284,
    artist: "Hot Boys",
    title: "I Got That Fire",
    key: 4,
    bpm: 102
}, {
    id: 285,
    artist: "Juelz Santana",
    title: "Hey Ma",
    key: 4,
    bpm: 84,
    computedKey: 6
}, {
    id: 286,
    artist: "Hurricane Chris",
    title: "Hand Clap",
    key: 6,
    bpm: 84,
    computedKey: 11
}, {
    id: 287,
    artist: "Eightball",
    title: "Lay It Down",
    key: 4,
    bpm: 84
}, {
    id: 289,
    artist: "Outkast",
    title: "So Fresh So Clean",
    key: 5,
    bpm: 84
}, {
    id: 290,
    artist: "MoneyBagg Yo",
    title: "Wockesha Remix",
    key: 8,
    bpm: 84
}, {
    id: 291,
    artist: "Master P",
    title: "Make Em Say Uhhh",
    key: 4,
    bpm: 84
}, {
    id: 292,
    artist: "Funk Shid Up",
    title: "Sucka Stepped Up",
    key: 11,
    bpm: 84,
    computedKey: 6
}, {
    id: 293,
    artist: "G-Eazy",
    title: "1942",
    key: 9,
    bpm: 84,
    computedKey: 2
}, {
    id: 294,
    artist: "Missy Elliott",
    title: "Hot Boyz",
    key: 4,
    bpm: 84,
    computedKey: 11
}, /*{
    id: 295,
    artist: "Scarface",
    title: "Homies & Thugs",
    key: 8,
    bpm: 84
}, */{
    id: 296,
    artist: "T-Pain",
    title: "Got Money",
    key: 8,
    bpm: 84,
    computedKey: 9
}, /*{
    id: 297,
    artist: "Kool Keith",
    title: "The Real Beginner",
    key: 7,
    bpm: 94,
    computedKey: 2
}, */{
    id: 298,
    artist: "Audio Two",
    title: "Top Billin",
    key: 4,
    bpm: 94
}, {
    id: 299,
    artist: "50 Cent",
    title: "Get Up",
    key: 10,
    bpm: 94
}, /*{
    id: 300,
    artist: "Rah Digga",
    title: "What They Call Me",
    key: 1,
    bpm: 94,
    computedKey: 8
}, */{
    id: 301,
    artist: "City Girls",
    title: "P&ssy Talk",
    key: 1,
    bpm: 102
}, /*{
    id: 302,
    artist: "DJ DMD",
    title: "Mr. 25/8",
    key: 2,
    bpm: 84,
}, */{
    id: 303,
    artist: "Cam'Ron",
    title: "Oh Boy",
    key: 1,
    bpm: 84,
    computedKey: 1
}, {
    id: 304,
    artist: "T.I.",
    title: "Front Back",
    key: 2,
    bpm: 84,
}, /*{
    id: 305,
    artist: "Gangstaar",
    title: "Code of the Streets",
    key: 5,
    bpm: 102
}, */{
    id: 306,
    artist: "Lord Tariq & Peter Gunz",
    title: "Deva Vu Uptown Baby",
    key: 7,
    bpm: 102
}, {
    id: 307,
    artist: "NORE",
    title: "Nothin",
    key: 8,
    bpm: 102
}, {
    id: 308,
    artist: "Paperboy",
    title: "Ditty",
    key: 7,
    bpm: 102
}, {
    id: 309,
    artist: "The Game",
    title: "Game's Pain",
    key: 6,
    bpm: 102
}, {
    id: 310,
    artist: "DMX",
    title: "Up In Here",
    key: 2,
    bpm: 102
}, {
    id: 311,
    artist: "Outkast",
    title: "Rosa Parks",
    key: 1,
    bpm: 102
}, {
    id: 312,
    artist: "Baby D",
    title: "F That Side",
    key: 2,
    bpm: 102
}, {
    id: 313,
    artist: "Lil Goldie",
    title: "Act a Donkey",
    key: 12,
    bpm: 102
}, {
    id: 314,
    artist: "5th Ward Webbie",
    title: "Toot it Up Remix",
    key: 6,
    bpm: 102
}, {
    id: 315,
    artist: "Busta Rhymes",
    title: "Put Your Hands Where My Eyes Can See",
    key: 9,
    bpm: 102
}, {
    id: 316,
    artist: "Jay-Z",
    title: "Excuse Me Miss Remix",
    key: 4,
    bpm: 102
}, {
    id: 317,
    artist: "Tracey Lee",
    title: "The Theme",
    key: 1,
    bpm: 102
}, {
    id: 318,
    artist: "Pras",
    title: "Ghetto Superstar",
    key: 4,
    bpm: 102
}, {
    id: 319,
    artist: "Lauryn Hill",
    title: "That Thing",
    key: 2,
    bpm: 102
}, {
    id: 320,
    artist: "Notorious BIG",
    title: "Goin Back to Cali",
    key: 3,
    bpm: 102
}, {
    id: 321,
    artist: "DJ Khaled",
    title: "Holla At Me",
    key: 4,
    bpm: 102
}, {
    id: 322,
    artist: "Megan thee Stallion",
    title: "Hot Girl Summer",
    key: 3,
    bpm: 102
}, {
    id: 323,
    artist: "G-Unit",
    title: "Ryder Part 2",
    key: 4,
    bpm: 102
}, {
    id: 324,
    artist: "Murphy Lee",
    title: "What the Hook Gon Be",
    key: 4,
    bpm: 102
}, {
    id: 325,
    artist: "Puff Daddy",
    title: "Can't Hold Me Down",
    key: 4,
    bpm: 102
}, {
    id: 326,
    artist: "DJ Jazzy Jeff",
    title: "Brand New Funk",
    key: 4,
    bpm: 102
}, /*{
    id: 327,
    artist: "Ice-T",
    title: "I Ain't New to This",
    key: 5,
    bpm: 102
}, {
    id: 328,
    artist: "LL Cool J",
    title: "How I'm Comin",
    key: 10,
    bpm: 102
}, */{
    id: 329,
    artist: "Fat Joe",
    title: "Lean Back Remix",
    key: 8,
    bpm: 102
}, {
    id: 330,
    artist: "Wyclef Jean",
    title: "We Trying to Stay Alive",
    key: 4,
    bpm: 102
}, {
    id: 331,
    artist: "G Dep",
    title: "Special Delivery",
    key: 2,
    bpm: 102
}, {
    id: 332,
    artist: "Offset & Metro Boomin",
    title: "Ric Flair Drip",
    key: 2,
    bpm: 102
}, {
    id: 333,
    artist: "Bubba Sparxx",
    title: "Ms New Booty",
    key: 1,
    bpm: 102
}, {
    id: 334,
    artist: "E-40",
    title: "White Girl",
    key: 2,
    bpm: 102
}, {
    id: 335,
    artist: "Notorious BIG",
    title: "Dead Wrong",
    key: 1,
    bpm: 84
}, {
    id: 336,
    artist: "DJ UNK",
    title: "Walk It Out",
    key: 9,
    bpm: 84
}, {
    id: 337,
    artist: "Lil Boosie",
    title: "Supafly",
    key: 11,
    bpm: 84
}, {
    id: 338,
    artist: "Jamie Foxx",
    title: "Blame It",
    key: 3,
    bpm: 84
}, {
    id: 339,
    artist: "Gucci Mane",
    title: "Go Head",
    key: 1,
    bpm: 84
}, {
    id: 340,
    artist: "Durrough",
    title: "Walk that Walk",
    key: 9,
    bpm: 84
}, /*{
    id: 341,
    artist: "Drake",
    title: "Say Something",
    key: 8,
    bpm: 84
}, *//*{
    id: 342,
    artist: "Blueprint",
    title: "Corner Store",
    key: 1,
    bpm: 84
}, */{
    id: 343,
    artist: "Bun B",
    title: "That's Gangsta",
    key: 9,
    bpm: 84
}, {
    id: 344,
    artist: "Cookie Ekawaii",
    title: "If I Back It Up",
    key: 1,
    bpm: 84
}, /*{
    id: 345,
    artist: "Erykah Badu",
    title: "On & On",
    key: 9,
    bpm: 84
}, */{
    id: 346,
    artist: "Young Jeezy",
    title: "Get Some Money",
    key: 2,
    bpm: 84
}, {
    id: 347,
    artist: "Lil Boosie",
    title: "Zoom",
    key: 4,
    bpm: 84
}, {
    id: 348,
    artist: "MIMS",
    title: "This is Why I'm Hot",
    key: 12,
    bpm: 84
}, {
    id: 349,
    artist: "Nappy Roots",
    title: "Aww-Naww",
    key: 1,
    bpm: 84
}, {
    id: 350,
    artist: "Webbie",
    title: "Like That",
    key: 12,
    bpm: 84
}, {
    id: 351,
    artist: "Young Jeezy",
    title: "Black Tee",
    key: 6,
    bpm: 84
}, {
    id: 352,
    artist: "UGK",
    title: "Let Me See It",
    key: 4,
    bpm: 84
}, {
    id: 353,
    artist: "Young Boy Never Broke",
    title: "Make No Sense",
    key: 5,
    bpm: 84
}, {
    id: 354,
    artist: "Webbie",
    title: "Gimme That",
    key: 1,
    bpm: 84
}, {
    id: 355,
    artist: "Lil Boosie",
    title: "Adios",
    key: 11,
    bpm: 84
}, {
    id: 356,
    artist: "Gucci Mane",
    title: "Wasted",
    key: 2,
    bpm: 84
}, {
    id: 357,
    artist: "D4L",
    title: "Laffy Taffy",
    key: 1,
    bpm: 84
}, {
    id: 358,
    artist: "T.I.",
    title: "Rubber Band Man",
    key: 1,
    bpm: 84
}, {
    id: 359,
    artist: "Rocko",
    title: "Tomorrow",
    key: 6,
    bpm: 84
}, {
    id: 360,
    artist: "Concrete Boys",
    title: "Crank Dat Roadrunner",
    key: 2,
    bpm: 84
}, {
    id: 361,
    artist: "Project Pat",
    title: "Good Googly Moogly",
    key: 1,
    bpm: 84
}, {
    id: 362,
    artist: "T.I.",
    title: "Be Easy",
    key: 4,
    bpm: 84
}, {
    id: 363,
    artist: "DJ UNK",
    title: "2 Step",
    key: 1,
    bpm: 84
}, {
    id: 364,
    artist: "Petey Pablo",
    title: "Raise Up",
    key: 2,
    bpm: 84
}, {
    id: 365,
    artist: "Gz",
    title: "Do the Stanky Leg",
    key: 5,
    bpm: 84
}, /*{
    id: 366,
    artist: "Dead Prez",
    title: "Hip Hop",
    key: 3,
    bpm: 84
}, */{
    id: 367,
    artist: "Cali Swag District",
    title: "Teach Me How to Dougie",
    key: 10,
    bpm: 84
}, {
    id: 368,
    artist: "Trillville",
    title: "Neva Eva",
    key: 2,
    bpm: 84
},/* {
    id: 369,
    artist: "MC Thick",
    title: "Marerro",
    key: 11,
    bpm: 84
}, */{
    id: 370,
    artist: "Kilo",
    title: "Tick Tock Bass Remix",
    key: 1,
    bpm: 84
}, {
    id: 371,
    artist: "Coolio",
    title: "Gangstas Paradise",
    key: 12,
    bpm: 84
}, {
    id: 372,
    artist: "Eminem",
    title: "Stan",
    key: 6,
    bpm: 84
}, {
    id: 373,
    artist: "Billy Wes",
    title: "Shake That Jelly",
    key: 2,
    bpm: 84
}, {
    id: 374,
    artist: "Big Sean",
    title: "Dance",
    key: 2,
    bpm: 84
}, {
    id: 375,
    artist: "The Game",
    title: "Big Dreams",
    key: 1,
    bpm: 84
}, {
    id: 376,
    artist: "T.I.",
    title: "ASAP",
    key: 2,
    bpm: 84
}, {
    id: 377,
    artist: "TELA",
    title: "Got Pimpin",
    key: 10,
    bpm: 84
}, {
    id: 378,
    artist: "Shawty Lo",
    title: "Supplier",
    key: 9,
    bpm: 84
}, /*{
    id: 379,
    artist: "Scarface",
    title: "Mary Jane",
    key: 3,
    bpm: 84
}, *//*{
    id: 380,
    artist: "Plies",
    title: "Shawty",
    key: 4,
    bpm: 84
}, {
    id: 381,
    artist: "Plies",
    title: "Bust It Baby",
    key: 9,
    bpm: 84
}, */{
    id: 382,
    artist: "Juvenile",
    title: "Rodeo",
    key: 11,
    bpm: 84
}, {
    id: 383,
    artist: "JR Writer",
    title: "Grill Em",
    key: 11,
    bpm: 84
}, /*{
    id: 384,
    artist: "Hurricane",
    title: "9mm & Techs",
    key: 4,
    bpm: 84
}, */{
    id: 385,
    artist: "Eazy-E",
    title: "BNK",
    key: 2,
    bpm: 84
}, {
    id: 386,
    artist: "Dorrough",
    title: "Handcuffs",
    key: 2,
    bpm: 84
}, {
    id: 387,
    artist: "Krysheem",
    title: "Gwop",
    key: 4,
    bpm: 84
}, {
    id: 388,
    artist: "Yo Gotti",
    title: "King Sh*t",
    key: 4,
    bpm: 84
}, /*{
    id: 389,
    artist: "Joi",
    title: "Pretty Boy",
    key: 10,
    bpm: 84
}, */{
    id: 390,
    artist: "ASAP",
    title: "Rocky Cocky",
    key: 2,
    bpm: 84
}, {
    id: 391,
    artist: "Yung LA",
    title: "Ain't I",
    key: 4,
    bpm: 84
}, {
    id: 392,
    artist: "Youngbloodz",
    title: "85",
    key: 4,
    bpm: 84
}, /*{
    id: 393,
    artist: "Quasimoto",
    title: "Boom Music",
    key: 1,
    bpm: 84
}, *//*{
    id: 394,
    artist: "Click",
    title: "Hurricane",
    key: 11,
    bpm: 84
}, *//*{
    id: 395,
    artist: "J-Dilla",
    title: "Tomita",
    key: 1,
    bpm: 84
}, */{
    id: 396,
    artist: "The Game",
    title: "Put You In the Game",
    key: 6,
    bpm: 84
}, /*{
    id: 397,
    artist: "Dr Dre",
    title: "Been There Done That",
    key: 12,
    bpm: 84
}, */{
    id: 398,
    artist: "Pitbull",
    title: "Dem Miami Boys",
    key: 2,
    bpm: 84
}, /*{
    id: 399,
    artist: "Aaliyah",
    title: "If Your Girl Only Knew",
    key: 9,
    bpm: 84
}, */{
    id: 400,
    artist: "Notorious BIG",
    title: "Big Poppa",
    key: 8,
    bpm: 84
}, {
    id: 401,
    artist: "Youngbloodz",
    title: "Presidential Remix",
    key: 1,
    bpm: 84
}, {
    id: 402,
    artist: "T.I.",
    title: "You Know What It Is",
    key: 9,
    bpm: 84
}, {
    id: 403,
    artist: "Kingpin Skinny Pimp",
    title: "TVs",
    key: 9,
    bpm: 84
}, {
    id: 404,
    artist: "Black Rob",
    title: "Whoa",
    key: 11,
    bpm: 84
}, /*{
    id: 405,
    artist: "Master P",
    title: "Make Em Say Uhhh",
    key: 2,
    bpm: 84
},*/ {
    id: 406,
    artist: "Beastie Boys",
    title: "Posse In Effect",
    key: 1,
    bpm: 84
}, {
    id: 407,
    artist: "Three 6 Mafia",
    title: "Side 2 Side",
    key: 10,
    bpm: 84
}, {
    id: 408,
    artist: "Mystikal",
    title: "Here I Go",
    key: 3,
    bpm: 84
}, /*{
    id: 409,
    artist: "Eminem",
    title: "My Name Is",
    key: 9,
    bpm: 84
}, */{
    id: 410,
    artist: "Luniz",
    title: "I Got 5 On It",
    key: 4,
    bpm: 84
}, {
    id: 411,
    artist: "Dogg Pound",
    title: "New York New York",
    key: 11,
    bpm: 84
}, {
    id: 412,
    artist: "Nappy Roots",
    title: "Po Folks Collipark Remix",
    key: 2,
    bpm: 84
}, /*{
    id: 413,
    artist: "Jay-Z",
    title: "Dead Presidents",
    key: 6,
    bpm: 84
}, */{
    id: 414,
    artist: "Lil Wayne",
    title: "The Block is Hot",
    key: 2,
    bpm: 84
}, /*{
    id: 415,
    artist: "Rihanna",
    title: "Umbrella",
    key: 3,
    bpm: 84
}, */{
    id: 416,
    artist: "Cassidy",
    title: "Drink & My 2 Step",
    key: 8,
    bpm: 84
}, {
    id: 417,
    artist: "Paul Wall",
    title: "Bizzy Body",
    key: 2,
    bpm: 84
}, {
    id: 418,
    artist: "Webbie",
    title: "Independent",
    key: 2,
    bpm: 84
}, {
    id: 419,
    artist: "Field Mob",
    title: "Sick of Being Lonely",
    key: 1,
    bpm: 84
}, {
    id: 420,
    artist: "Above the Law",
    title: "Black Superman",
    key: 8,
    bpm: 84
}, {
    id: 421,
    artist: "Ron Browz",
    title: "Jumpin Out the Window",
    key: 1,
    bpm: 84
}, {
    id: 422,
    artist: "DJ Khaled",
    title: "Out Here Grinding",
    key: 5,
    bpm: 84
}, {
    id: 423,
    artist: "Big Tymers",
    title: "Big Ballin",
    key: 12,
    bpm: 84
}, {
    id: 424,
    artist: "Joeski Love",
    title: "Pee Wee Dance",
    key: 10,
    bpm: 84
}, {
    id: 425,
    artist: "Birdman",
    title: "What Happened to That Boy",
    key: 10,
    bpm: 94
}, {
    id: 426,
    artist: "Snoop Dogg",
    title: "Drop It Like Its Hot Remix",
    key: 5,
    bpm: 94
}, {
    id: 427,
    artist: "Nelly",
    title: "E.I. Tipdrill Remix",
    key: 2,
    bpm: 94
}, {
    id: 428,
    artist: "Junior MAFIA",
    title: "Players Anthem Remix",
    key: 11,
    bpm: 94
}, /*{
    id: 429,
    artist: "DaBaby",
    title: "Baby Sitter",
    key: 7,
    bpm: 94
}*/ /*{
    id: 430,
    artist: "Too Short",
    title: "I Ain't Trippin",
    key: 12,
    bpm: 94
}, */{
    id: 431,
    artist: "T.I.",
    title: "Get Loose",
    key: 2,
    bpm: 94
}, {
    id: 432,
    artist: "Jermaine Dupri",
    title: "Welcome to Atlanta ATL Remix",
    key: 1,
    bpm: 94
}, {
    id: 433,
    artist: "Saweetie",
    title: "Best Friend",
    key: 1,
    bpm: 94
}, {
    id: 434,
    artist: "Nicki Minaj",
    title: "Your Love",
    key: 1,
    bpm: 94
}, {
    id: 435,
    artist: "Megan thee Stallion",
    title: "Girls In The Hood",
    key: 11,
    bpm: 94
}, {
    id: 436,
    artist: "Mike Jones",
    title: "Drop & Gimme 50",
    key: 9,
    bpm: 94
}, {
    id: 437,
    artist: "Durrough",
    title: "Ice Cream Paint Job",
    key: 12,
    bpm: 94
}, {
    id: 438,
    artist: "Rihanna",
    title: "Birthday Cake Remix",
    key: 2,
    bpm: 84
}, {
    id: 439,
    artist: "Future",
    title: "Stick Talk",
    key: 7,
    bpm: 84
}, {
    id: 440,
    artist: "Drake",
    title: "First Person Shooter",
    key: 9,
    bpm: 84
}, {
    id: 441,
    artist: "Master P",
    title: "Weed & Money",
    key: 2,
    bpm: 84
}, {
    id: 442,
    artist: "Drake",
    title: "Rich Flex",
    key: 8,
    bpm: 84
}, {
    id: 443,
    artist: "Playboi Carti",
    title: "Milli Rock",
    key: 10,
    bpm: 84
}, {
    id: 444,
    artist: "Three 6 Mafia",
    title: "Hard Out Here",
    key: 9,
    bpm: 84
}, {
    id: 445,
    artist: "Gunna",
    title: "Pushin P",
    key: 1,
    bpm: 84
}, {
    id: 446,
    artist: "Travis Scott & Drake",
    title: "SICKO MODE",
    key: 3,
    bpm: 84
}, {
    id: 447,
    artist: "Whodini",
    title: "I'm a Ho",
    key: 1,
    bpm: 84
}, {
    id: 448,
    artist: "Drake",
    title: "Girls Want Girls",
    key: 5,
    bpm: 84
}, {
    id: 449,
    artist: "2 Chainz & Lil Wayne",
    title: "Big Diamonds",
    key: 3,
    bpm: 84
}, {
    id: 450,
    artist: "Three 6 Mafia",
    title: "Let's Run a Train",
    key: 2,
    bpm: 84
}, {
    id: 451,
    artist: "Drake",
    title: "No Friends in the Industry",
    key: 2,
    bpm: 84
}, {
    id: 452,
    artist: "Future",
    title: "I Serve the Base",
    key: 8,
    bpm: 84
}, {
    id: 453,
    artist: "Future",
    title: "Freak Hoe",
    key: 12,
    bpm: 84
}, {
    id: 454,
    artist: "Cardi B",
    title: "Up",
    key: 9,
    bpm: 84
}, {
    id: 455,
    artist: "Future",
    title: "For a Nut",
    key: 5,
    bpm: 84
}, {
    id: 456,
    artist: "Megan thee Stallion",
    title: "Captain Hook",
    key: 6,
    bpm: 84
}, {
    id: 457,
    artist: "SR3MM",
    title: "T'd Up",
    key: 5,
    bpm: 84
}, {
    id: 458,
    artist: "Drake",
    title: "Nonstop",
    key: 11,
    bpm: 84
}, {
    id: 459,
    artist: "Future",
    title: "I'm on One",
    key: 2,
    bpm: 84
}, {
    id: 460,
    artist: "Drake",
    title: "Gods Plan",
    key: 1,
    bpm: 84
}, {
    id: 461,
    artist: "Li Uzu Vert",
    title: "XO TOUR LIFE",
    key: 1,
    bpm: 84
}, {
    id: 462,
    artist: "Mr Bigg",
    title: "Hos",
    key: 7,
    bpm: 84
}, {
    id: 463,
    artist: "Dem Franchize Boys",
    title: "I Think They Like Me",
    key: 5,
    bpm: 84
}, {
    id: 464,
    artist: "Sexy Redd",
    title: "Pound Town",
    key: 1,
    bpm: 94
}, {
    id: 465,
    artist: "Ghostface600",
    title: "Pray to the East",
    key: 9,
    bpm: 94
}, {
    id: 466,
    artist: "OMB Peezy",
    title: "Think You Ready",
    key: 9,
    bpm: 94
}, {
    id: 467,
    artist: "Lil Eazzyy",
    title: "Bring Some Mo",
    key: 12,
    bpm: 94
}, {
    id: 468,
    artist: "Rick Ross & Meek Mill",
    title: "Lyrical Eazy",
    key: 5,
    bpm: 94
}, {
    id: 469,
    artist: "Gucci Mane",
    title: "There I Go",
    key: 12,
    bpm: 94
}, {
    id: 470,
    artist: "J.I.",
    title: "Murda",
    key: 5,
    bpm: 94
}, {
    id: 471,
    artist: "Snoop Dogg",
    title: "Freak It",
    key: 1,
    bpm: 94
}, {
    id: 472,
    artist: "Mount Rushmore",
    title: "Big Subwoofer",
    key: 4,
    bpm: 94
}, {
    id: 473,
    artist: "Offset feat Moneybagg Yo",
    title: "Yo Code",
    key: 5,
    bpm: 94
}, {
    id: 474,
    artist: "Too Short",
    title: "Young Thang",
    key: 4,
    bpm: 94
}, {
    id: 475,
    artist: "French Montana",
    title: "Trap House",
    key: 1,
    bpm: 94
}, {
    id: 476,
    artist: "2rare",
    title: "Lil Mama",
    key: 1,
    bpm: 94
}, {
    id: 477,
    artist: "Country Dons & SL",
    title: "Just Eat",
    key: 2,
    bpm: 94
}, {
    id: 478,
    artist: "The Game",
    title: "Violence",
    key: 8,
    bpm: 94
}, /*{
    id: 479,
    artist: "",
    title: "",
    key: 8,
    bpm: 94
}, {
    id: 480,
    artist: "",
    title: "",
    key: 8,
    bpm: 94
}, {
    id: 481,
    artist: "",
    title: "",
    key: 8,
    bpm: 94
}, {
    id: 482,
    artist: "",
    title: "",
    key: 8,
    bpm: 94
}, {
    id: 483,
    artist: "",
    title: "",
    key: 8,
    bpm: 94
}, {
    id: 484,
    artist: "",
    title: "",
    key: 8,
    bpm: 94
}*/ {
    id: 485,
    artist: "10 KANs",
    title: "D In Your Life",
    key: 9,
    bpm: 102
}, {
    id: 486,
    artist: "2Pac",
    title: "Still Ballin",
    key: 2,
    bpm: 102
}, {
    id: 487,
    artist: "Das EFX",
    title: "They Want EFX",
    key: 1,
    bpm: 102
}, {
    id: 488,
    artist: "Kurupt",
    title: "We Can Freak It",
    key: 12,
    bpm: 102
}, {
    id: 489,
    artist: "Wale",
    title: "Chillin",
    key: 1,
    bpm: 102
}, /*/!*{
    id: 490,
    artist: "NORE",
    title: "Chillin",
    key: 9,
    bpm: 102
}, *!/{
    id: 491,
    artist: "Notorious BIG",
    title: "Only You",
    key: 11,
    bpm: 102
}, */{
    id: 492,
    artist: "Derek B",
    title: "Good Groove",
    key: 5,
    bpm: 102
}, {
    id: 493,
    artist: "50 Cent",
    title: "Disco Inferno",
    key: 1,
    bpm: 102
}, /*{
    id: 494,
    artist: "Bubba Sparxx",
    title: "I Like It a Lot",
    key: 3,
    bpm: 102
}, *//*{
    id: 495,
    artist: "Ja Rule",
    title: "Always On Time",
    key: 1,
    bpm: 102
}, */{
    id: 496,
    artist: "LL Cool J",
    title: "Eat Em Up L Chill Remix",
    key: 1,
    bpm: 102
}, {
    id: 497,
    artist: "Fabolous",
    title: "Baby Don't Go",
    key: 1,
    bpm: 102
}, {
    id: 498,
    artist: "Diggy feat French Montana",
    title: "Ain't Bout to Do",
    key: 11,
    bpm: 102
}, {
    id: 499,
    artist: "DJ Khaled Lil Baby & Future",
    title: "SUPPOSED TO BE LOVED",
    key: 1,
    bpm: 102
}, {
    id: 500,
    artist: "Pusha T",
    title: "Let the Smokers Shine the Coupes",
    key: 5,
    bpm: 102
}, /*{
    id: 501,
    artist: "K.Comedy, Key Glock & Mac",
    title: "Sause",
    key: 2,
    bpm: 102
}, */{
    id: 502,
    artist: "Pap Chanel",
    title: "Apple Jacks",
    key: 1,
    bpm: 102
}, {
    id: 503,
    artist: "AD Christian & O.T. Genasis",
    title: "U Luv It",
    key: 1,
    bpm: 102
}, {
    id: 504,
    artist: "French Montana",
    title: "Good Summer",
    key: 5,
    bpm: 102
}, {
    id: 505,
    artist: "Kendra Jae & Saweetie",
    title: "See Saw",
    key: 5,
    bpm: 102
}, {
    id: 506,
    artist: "Rubi Rose",
    title: "Poke",
    key: 1,
    bpm: 102
}, {
    id: 507,
    artist: "Anna Mvze & Krystall Poppin",
    title: "Where The Bag At",
    key: 8,
    bpm: 102
}, {
    id: 508,
    artist: "OhGeesy",
    title: "Tour Bus",
    key: 1,
    bpm: 102
}, {
    id: 509,
    artist: "Beadz feat Erica Banks",
    title: "Twerk Girl",
    key: 3,
    bpm: 102
}, {
    id: 510,
    artist: "Armani White",
    title: "Billie Eilish",
    key: 1,
    bpm: 102
}]

export {songdata}
