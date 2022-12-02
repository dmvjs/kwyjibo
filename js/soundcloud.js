import {cryptoRandom} from "./cryptoRandom.js";

const iframes = [
    '<iframe id="soundcloud-iframe" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1370186788&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/cappinkirk" title="cappinkirk" target="_blank" style="color: #cccccc; text-decoration: none;">cappinkirk</a> · <a href="https://soundcloud.com/cappinkirk/backdatcomputerup" title="BackDatComputerUp" target="_blank" style="color: #cccccc; text-decoration: none;">BackDatComputerUp</a></div>',
    '<iframe id="soundcloud-iframe" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1213410100&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/cappinkirk" title="cappinkirk" target="_blank" style="color: #cccccc; text-decoration: none;">cappinkirk</a> · <a href="https://soundcloud.com/cappinkirk/boogie-on-back-break-beat" title="Boogie on Back Break Beat" target="_blank" style="color: #cccccc; text-decoration: none;">Boogie on Back Break Beat</a></div>',
    '<iframe id="soundcloud-iframe" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1331126932&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/cappinkirk" title="cappinkirk" target="_blank" style="color: #cccccc; text-decoration: none;">cappinkirk</a> · <a href="https://soundcloud.com/cappinkirk/pop-star" title="Pop Star" target="_blank" style="color: #cccccc; text-decoration: none;">Pop Star</a></div>'
]

export const getIframe = ()=> {
    const div = document.createElement('div');
    div.innerHTML = getHTML()
    document.body.appendChild(div);
}

const getHTML = () => {
    const cr = Math.floor(cryptoRandom() * 3);
    return iframes[cr];
}



