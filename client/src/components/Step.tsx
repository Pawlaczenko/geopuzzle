import { FC } from 'react'
import { useCreateTrackContext } from 'src/context/CreateTrackContext'
import CreateTrackInfo from 'src/routes/CreateTrack/CreateTrackInfo';
import CreateTrackPoint from 'src/routes/CreateTrack/CreateTrackPoint';

const Step : FC = () => {
    const {activeStepIndex} = useCreateTrackContext();
    let stepContent;
    
    switch(activeStepIndex) {
        case 1:
        default: 
            stepContent = <CreateTrackInfo />;
            break;
        case 2:
            stepContent = <CreateTrackPoint />;
            break;
    }

    return stepContent;
}


export default Step