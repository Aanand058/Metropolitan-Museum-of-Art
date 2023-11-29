import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';


export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    
    if(!favouritesList) return null;

    return (
        <Container>
           
            {favouritesList.length === 0 ? (
                <Card >
                    <Card.Body>
                        <h4><b>Nothing Here</b></h4>
                        Try adding some new artwork to the list.
                    </Card.Body>
                </Card>
            ) : (
                <Row >
                    {favouritesList.map((objectID) => (
                        <Col key={objectID}>
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

