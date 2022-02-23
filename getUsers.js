/*
Made by: SomeAspy#9999 (https://aspy.dev)
*/
'use strict';
const whitelistedUsers=[
    '290257733482053642',// ax
    '720710673180524646',// dasiria
    '386215881966878721',// dzn
    '152921834835279872',// ferraz
    '245563449772474378',// lck
    '225869227033231361',// onlyus
    '928791980660621403',// soe
    '171576345090981888',// strolly
    '202244634800422913',// sun
    //'516750892372852754',//aspy, for testing.
];
window.onload=async()=>{
    const lanyardSocket=new WebSocket('wss://tcla.aspy.dev/socket');
    lanyardSocket.onopen=()=>{
        lanyardSocket.send('{"op":2,"d":{"subscribe_to_all":true}}');
    };
    lanyardSocket.onmessage=async(message)=>{
        const{d}=JSON.parse(message.data);
        for(const rawUserData of Object.entries(d)){
            const userData=rawUserData[1]?.discord_user; // 1 is the User's Presence
            if(!userData?.username||!whitelistedUsers.includes(userData?.id)){ // Fuck off im lazy
                continue;
            };
            let UserObject={
                username:`${userData.username}#${userData.discriminator}`,
                avatar:'waiting...',
                status:rawUserData[1].discord_status
            };
            await fetch('https://cdn.discordapp.com/avatars/'+userData.id+'/'+userData.avatar+'.gif').then(res=>{ //This will throw errors when the user has a static avatar
                if(res.ok){
                    UserObject.avatar=res.url; //User Avatar is Animated
                }else if(res.status==404){
                    UserObject.avatar='./images/defaultAvatar.webp'; //User has no Avatar
                }else if(res.status==415){
                    UserObject.avatar=`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`; //User Avatar is Static
                };
            });
            lanyardSocket.close();
            //MAIN USER ELEMENT, SUB ELEMENT OF LIST ELEMENT
            const userElement=document.createElement('div');
            userElement.classList.add('userElement');
            document.getElementById('userList').appendChild(userElement);
            //PFP ELEMENT, SUB-ELEMENT OF USER ELEMENT
            const PFPElement=document.createElement('img');
            PFPElement.classList.add('PFPElement',UserObject.status);
            PFPElement.src=UserObject.avatar;
            userElement.appendChild(PFPElement);
            //USERNAME ELEMENT, SUB-ELEMENT OF USER ELEMENT
            const usernameElement=document.createElement('div');
            usernameElement.classList.add('usernameElement');
            usernameElement.innerText=UserObject.username;
            userElement.appendChild(usernameElement);
        };
    };
};
