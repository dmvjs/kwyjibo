const config = !window.location.hostname.includes('localhost') ? {
    //initialKey: 4,
    //initialTempo: 84,
    //fileType: '.wav',
} : {
    // initialKey: 1,
    // initialTempo: 94,
    fileType: '.wav',
}

export {config}
