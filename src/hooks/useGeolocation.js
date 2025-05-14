import { useState } from "react";

export function useGeolocation(defaultPosition=null) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [error, setError] = useState(null);

    function getPostion() {
        if (!navigator.geolocation) return setError('Your browser does not suppport geolocation');

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(function (pos) {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
            setIsLoading(false);
        },
            function (error) {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }
    return {isLoading,position,error,getPostion}

}
