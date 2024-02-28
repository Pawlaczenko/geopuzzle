import { FC, useEffect, useState } from "react";
import Banner from "src/components/Banner";
import Page from "src/layout/Page.styled";
import Container from "src/layout/Container";
import TrackSwiper from "src/components/TrackSwiper";
import { getAllTracks } from "src/services/TrackService";
import { styled } from "styled-components";
import TrackItem, { ITrackItemProps } from "src/components/TrackItem/TrackItem";
import ButtonIcon from "src/components/Button/ButtonIcon";

const ExploreTracks: FC = () => {
    const [tracks,setTracks] = useState<ITrackItemProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const TRACKS_PER_PAGE = 9;
    const searchQuery = "";

    useEffect(() => {
        async function fetchTracks() {
            // setIsLoading(true);
            const res = await getAllTracks(searchQuery, TRACKS_PER_PAGE, currentPage);
            if (res && res.data) {
                const resTracks: ITrackItemProps[] = res.data.map((item: any) => ({
                    id: item._id,
                    title: item.name,
                    tags: item.tags,
                    description: item.description,
                    puzzleCount: item.waypoints.length,
                    thumbnail: item.thumbnail,
                    author: "Adam Driver"
                }));
                setTracks(prevTracks => [...prevTracks, ...resTracks]);
                setHasMore(res.data.length !== 0);
            }
            // setIsLoading(false);
        }

        fetchTracks();
    }, [currentPage]);

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    
  return (
    <Page>
		<Banner text="Eksploruj trasy" />
        <Container>
            {
                !isLoading &&
                <>
                    <StyledTracksWrapper>
                        {
                            tracks.map(track => (
                                <TrackItem 
                                    thumbnail={track.thumbnail} 
                                    title={track.title} 
                                    description={track.description} 
                                    author={track.author} 
                                    puzzleCount={track.puzzleCount} 
                                    tags={track.tags}
                                    id={track.id}
                                />
                            ) )
                        }
                    </StyledTracksWrapper>
                </>
            }
        </Container>
        {
            hasMore &&
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ButtonIcon onClick={loadMore} btnType="outline" icon="arrow-down">Załaduj więcej</ButtonIcon>
            </div>
        }
		<Container>
			<TrackSwiper />
		</Container>
    </Page>
  );
};

const StyledTracksWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 3.6rem;
    padding: 6.4rem 0;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2,1fr);
    }

    @media (max-width: 650px) {
        grid-template-columns: repeat(1,1fr);
    }
`;

export default ExploreTracks;
