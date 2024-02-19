import { FC, RefObject, useEffect, useRef, useState } from 'react';
import Banner from 'src/components/Banner'
import Page from 'src/layout/Page.styled'
import Stepper from 'src/components/Stepper'
import { CreateTrackContext, CreateTrackFormData } from 'src/context/CreateTrackContext';
import Step from 'src/components/Step';

const CreateTrack : FC = () => {
    const pageRef : RefObject<HTMLDivElement> = useRef(null);
    const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const [trackId, setTrackId] = useState<string>("");
    const [formData, setFormData] = useState<CreateTrackFormData>({
        trackDescription: "",
        trackName: "",
        trackTagNames: [],
        trackWaypoints: []
    });

    useEffect(() => {
        if(pageRef.current) {
            pageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [activeStepIndex]);

    return (
    <CreateTrackContext.Provider value={{
        activeStepIndex,setActiveStepIndex,currentPoint,setCurrentPoint,formData,setFormData,trackId,setTrackId
        }}>
        <Page ref={pageRef}>
            <Banner text="Stwórz Trasę" />
            {
                activeStepIndex < 4 && <Stepper />
            }
            <Step />
        </Page>
    </CreateTrackContext.Provider>
    )
}

export default CreateTrack