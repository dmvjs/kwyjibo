const tracks = []

export const addTracks = (newTracks) => {
    if (typeof tracks === 'number' || Array.isArray(tracks)) {
        tracks.push(newTracks)
    }
}


export const getShareURL = () => {
    const newURL = new URL("https://cappinkirk.com")
    if (tracks.length) {
        newURL.searchParams.set('tracks', JSON.stringify(tracks))
    }
    navigator.clipboard.writeText(newURL.href)
    return newURL.href;
}

const shareBtn = document.getElementById('share-button');
if (shareBtn) {
  shareBtn.addEventListener('click', getShareURL);
}
