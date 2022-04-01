export interface Weather {
    current: Current;
    location: Location;
}

interface Current {
    /** Temp w stopniach C */
    temp_c: number;
    /** Temp w stopniach F */
    temp_f: number;
    /** Wskaźnik UV */
    uv: number;
    condition: {
        /** Url ikony stanu pogody */
        icon: string;
    }
}

interface Location {
    /** Kraj */
    country: string;
    /** Lokalizacja */
    name: string;
}