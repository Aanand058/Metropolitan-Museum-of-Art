import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button, Container } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';
import { useState } from 'react';


export default function History() {

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    let parsedHistory = [];
    
    if (!searchHistory) return null;

    searchHistory.forEach((h) => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    };


    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    return (
        <Container>


            {parsedHistory.length === 0 ? (
                <Card >
                    <Card.Body>
                        <h4><b>Nothing Here</b></h4>
                        Try searching for some artwork.
                    </Card.Body>
                </Card>
            ) :
                (
                    <ListGroup>
                        {parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item
                                key={index}
                                className={styles.historyListItem}
                                onClick={(e) => historyClicked(e, index)}
                            >
                                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                <Button className="float-end" variant="danger" size="sm"
                                    onClick={e => removeHistoryClicked(e, index)}>&times;</Button>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

        </Container>
    );
}
