import dotenv from 'dotenv';
dotenv.config();
const url = process.env.REACT_APP_API_URL;

async function getPoapInCommon(lens1: string, lens2: string) {
    const data = {
        lens1: lens1,
        lens2: lens2
    };

    fetch(url + "/poap/commonPoaps", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

}

async function like(lens1: string, lens2: string) {
    const data = {
        from: lens1,
        to: lens2
    };

    fetch(url + "/like/like", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

async function getFilteredProfile(hackathonName : string){
    const data = {
        hackathonName: hackathonName
    };

    fetch(url + "/profile/profileFiltered", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

async function registerForHackathon(lens : string, hackathonName : string, github : string, twitter : string, telegram:string,bio:string,skills:string){
    const data = {
        lensProfile: lens,
        hackathon: hackathonName,
        github:github, 
        twitter:twitter,
        telegram:telegram,
        bio:bio,
        skills:skills
    };

    fetch(url + "/user/newUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

// export all the functions
export { getPoapInCommon, like, getFilteredProfile, registerForHackathon };