import { FC } from "react";
import Banner from "src/components/Banner";
import TextWithPhoto from "src/components/TextWithPhoto/TextWithPhoto";
import Page from "src/layout/Page.styled";
import Photo1 from "src/assets/images/landing-1.jpg";
import Container from "src/layout/Container";
import TrackSwiper from "src/components/TrackSwiper";
import HighlightedTracks from "src/components/HighlightedTracks/HighlightedTracks";

const HomePage: FC = () => {
  return (
    <Page>
		<Banner text="Witaj w GeoPuzzle" />
		{/* <HighlightedTracks /> */}
		<TextWithPhoto
			photo={Photo1}
			heading={"Wyrusz na wspaniałą przygodę"}
			paragraph={
				"Twoja podróż po wiedzy geograficznej zaczyna się tutaj! Włącz się w interaktywną platformę edukacyjną, gdzie geografia staje się nie tylko nauką, ale również ekscytującą przygodą!"
			}
			button={"Wyruszamy!"}
		/>
		<Container>
			<TrackSwiper />
		</Container>
    </Page>
  );
};

export default HomePage;
