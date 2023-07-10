import { FC } from 'react'
import { useCreateTrackContext } from 'src/context/CreateTrackContext'
import CreateTrackInfo from 'src/routes/CreateTrack/CreateTrackInfo';
import CreateTrackPoint from 'src/routes/CreateTrack/CreateTrackPoint';
import CreateTrackSummary from 'src/routes/CreateTrack/CreateTrackSummary';

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
        case 3:
            stepContent = <CreateTrackSummary />
            break;
    }

    return stepContent;
}


export default Step