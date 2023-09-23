import dotenv from 'dotenv';
dotenv.config();
const url = process.env.NEXT_PUBLIC_API_URL;

// get the poap in common between two lenses
// return null if there is an error
// return the list of poap in common if there is no error
async function getPoapInCommon(lens1: string, lens2: string) {
    try {
      const data = {
        lens1: lens1,
        lens2: lens2
      };
  
      const response = await fetch(url + "/poap/commonPoaps", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log(responseData);
        return responseData;
      } else {
        console.error(responseData);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

// like a lens
// if true there is a match, if false there is no match
async function like(lens1: string, lens2: string) {
    try {
      const data = {
        from: lens1,
        to: lens2
      };
  
      const response = await fetch(url + "/like/like", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        const isMatch = responseData.message === "It's a match!";
        return true; 
      } else {
        console.error(responseData.message);
        return false;
      }
    } catch (error) {
      console.error(error);
        return false;
    }
  }

  // get the filtered profile
// return null if there is an error
// return the list of profile in the hackathon if there is no error
  async function getFilteredProfile(lens: string, hackathonName: string) {
    try {
      const data = {
        hackathonName: hackathonName,
        lens: lens
      };
  
      const response = await fetch(url + "/profile/profileFiltered", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log(responseData);
        return responseData;
      } else {
        console.error(responseData);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

async function registerForHackathon(lens : string, hackathonName : string) : Promise<boolean>{
    console.log(lens, hackathonName);
    try{
    const data = {
        lensProfile: lens,
        hackathon: hackathonName
    };
    console.log(url);
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
        return true;
    }catch(e){
        return false;
    }
        
}

// export all the functions
export { getPoapInCommon, like, getFilteredProfile, registerForHackathon };