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
    Nakshatra: string;
    NakshatraLord: string;
    ChandraRasi: string;
    ChandraRasiLord: string;
    ZodiacSign: string;
    Deity: string;
    Ganam: string;
}
export declare const fetchHouses: () => Promise<House[]>;
export declare const fetchProfile: () => Promise<Profile>;
export declare const fetchBlog: () => Promise<BlogInfo[]>;
//# sourceMappingURL=fetchData.d.ts.map