import { FC } from 'react'
import { useCreateTrackContext } from 'src/context/CreateTrackContext'
import CreateTrackInfo from 'src/routes/CreateTrack/CreateTrackInfo';
import CreateTrackPoint from 'src/routes/CreateTrack/CreateTrackPoint';
import CreateTrackSummary from 'src/routes/CreateTrack/CreateTrackSummary';
import CreateTrackEndScreen from 'src/routes/CreateTrack/CreateTrackEndScreen';

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
        case 4:
            stepContent = <CreateTrackEndScreen />
            break;
    }

    return stepContent;
}


export default Step