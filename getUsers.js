/*
Made by: SomeAspy#9999 (https://aspy.dev)
*/
'use strict';
const whitelistedUsers=[ // set the users you want to display
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

window.onload=()=>{
    const lanyardSocket=new WebSocket('wss://tcla.aspy.dev/socket'); //change this to the lanyard server or self host lanyard.
    lanyardSocket.onopen=()=>{
        lanyardSocket.send(JSON.stringify({op:2,d:{subscribe_to_ids:whitelistedUsers}}));
    };
    lanyardSocket.onmessage=async(message)=>{
        const{d}=await JSON.parse(message.data);
        for(const rawUserData of Object.values(d)){
            const userData=rawUserData?.discord_user;
            if(!userData)continue;
            const UserObject={
                username:`${userData.username}#${userData.discriminator}`,
                status:rawUserData.discord_status
            };
            lanyardSocket.close();
            if(userData.avatar?.startsWith('a_')){
                UserObject.avatar=`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.gif`;
            }else if(userData.avatar==null){
                UserObject.avatar='./images/defaultAvatar.webp';
            }else{
                UserObject.avatar=`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            }
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
    async function getOnline(){
        const online=await (await fetch('https://canary.discord.com/api/guilds/932140058507612251/widget.json')).json(); //change this to the server you want to get the users from
        document.getElementById('online').innerHTML=online.presence_count+' On-line';
    };
    getOnline();
};
