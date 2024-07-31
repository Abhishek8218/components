// fetchData.ts
export interface House {
    title: string;
    specialty: string;
  }
  
  export interface BlogInfo {
    heading: string;
    paragraph: string;
  }
  
  export interface Profile {
    name: string;
    date: string;
    time: string;
    latitude: string;
    longitude: string;
    fullName: string;
    gender: string;
    dob: string;
    day: string;
    timeOfBirth: string;
    city: string;
    fullLatitude: string;
    fullLongitude: string;
  }
  
  export const fetchHouses = async (): Promise<House[]> => {
    const response = await fetch('/houses.json');
    if (!response.ok) {
      throw new Error('Failed to fetch houses data');
    }
    return response.json();
  };
  
  export const fetchProfile = async (): Promise<Profile> => {
    const response = await fetch('/profile.json');
    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }
    return response.json();
  };
  
  export const fetchBlog = async (): Promise<BlogInfo[]> => {
    const response = await fetch('/blog.json');
    if (!response.ok) {
      throw new Error('Failed to fetch blog data');
    }
    return response.json();
  };
  