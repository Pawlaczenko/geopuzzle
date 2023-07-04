import { FC, RefObject, useEffect, useRef, useState } from 'react';
import Banner from 'src/components/Banner'
import Page from 'src/layout/Page.styled'
import Stepper from 'src/components/Stepper'
import { CreateTrackContext, CreateTrackFormData } from 'src/context/CreateTrackContext';
import Step from 'src/components/Step';

const CreateTrack : FC = () => {
    const pageRef : RefObject<HTMLDivElement> = useRef(null);
    const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
    const [formData, setFormData] = useState<CreateTrackFormData>({
        trackDescription: "",
        trackName: "",
        trackTagNames: [],
        trackWaypoints: []
    });

    useEffect(() => {
        if(pageRef.current) pageRef.current.scrollTop = 0;
    }, [activeStepIndex,formData.trackWaypoints]);

    return (
    <CreateTrackContext.Provider value={{activeStepIndex,setActiveStepIndex,formData,setFormData}}>
        <Page ref={pageRef}>
            <Banner text="Stwórz Trasę" />
            <Stepper />
            <Step />
        </Page>
    </CreateTrackContext.Provider>
    )
}

export default CreateTrack