/*
Made by:
SomeAspy#9999 (https://aspy.dev)
Sun#1000
*/
window.onload=()=>{
    const lanyardSocket=new WebSocket('wss://tcla.aspy.dev/socket');
    lanyardSocket.onopen=()=>{
        lanyardSocket.send('{"op":2,"d":{"subscribe_to_all":true}}');
    };
    lanyardSocket.onmessage=(message)=>{
        lanyardSocket.close();
        const{d}=JSON.parse(message.data);
        for(const rawUserData of Object.entries(d)){
            const userData=rawUserData[1].discord_user; // 1 is the User's Presence
            if(!userData?.username){ //Lanyard returns garbage occasionally
                continue;
            };
            const UserObject={
                username:`${userData.username}#${userData.discriminator}`,
                avatar:`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
            };
            //MAIN USER ELEMENT, SUB ELEMENT OF LIST ELEMENT
            const userElement=document.createElement('div');
            userElement.classList.add('userElement');
            document.getElementById('userList').appendChild(userElement);
            //PFP ELEMENT, SUB-ELEMENT OF USER ELEMENT
            const PFPElement=document.createElement('img');
            PFPElement.classList.add('PFPElement');
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
