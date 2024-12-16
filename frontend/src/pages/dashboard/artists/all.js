import {
    Table, Group, HStack,
    Text,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import useAPIFetch from 'src/hooks/useAPIFetch'
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "src/components/ui/pagination"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogActionTrigger,
} from "src/components/ui/dialog"
import Loading from 'src/components/custom/loading';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'src/components/ui/button';
import { csv2json, json2csv } from 'json-2-csv'



function AllArtists ({ onRowClicked }) {

    const inputFileRef = useRef();

    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const { loading, fetchAPI, parsedResponse } = useAPIFetch();

    const { loading: artistImportLoading, fetchAPI: artistImportFetch, parsedResponse: artistImportResponse } = useAPIFetch();

    const [importedArtists, setImportedArtists] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    function fetchNow () {
        fetchAPI({ uri: `/artists?page=${page}&limit=10` })
    }

    function handleImportArtists(){
        artistImportFetch({
            uri: "/artists/import",
            options: {
                "method": "POST",
                body: JSON.stringify({rawArtists: importedArtists})
            }
        } );
    }

    useEffect(function () {
        if (artistImportResponse && artistImportResponse.status === 'success') {
            setIsOpen(false);
            setImportedArtists(null);
            fetchNow();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artistImportResponse])


    function handleFileChange (e) {
        console.log("File changed");
        const file = inputFileRef.current?.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file); // Create a temporary URL for the file

            // Use fetch API to read the file content
            fetch(fileURL)
                .then(response => response.text())
                .then(async data => {
                    console.log(data)
                    const jsonData = csv2json(data).map(function (e) {
                        let toReturn = { ...e };
                        delete toReturn.id;
                        delete toReturn.created_at;
                        delete toReturn.updated_at;
                        return toReturn;
                    })
                    console.log({jsonData})
                    setImportedArtists(jsonData);
                    URL.revokeObjectURL(fileURL); // Clean up the object URL
                })
                .catch(error => {
                    console.log( `Error: ${error.message}`);
                });
        } else {
            setImportedArtists(null);
        }

    }

    function handlePageChange (details) {
        setPage(details.page)
    }

    function handleRowClick (artistId) {
        if (onRowClicked) {
            onRowClicked(artistId);
        } else {
            navigate("/dashboard/artists/" + artistId);
        }
    }

    

    // download CSV File from json
     function downloadCSVFromJson (filename, arrayOfJson) {
        let csv =  json2csv(arrayOfJson)

        // Create link and download
        var link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        fetchNow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return loading ? <Loading /> : (

        <>
            <Table.ScrollArea borderWidth="1px" interactive>
                <Table.Root size="sm" variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader >ID</Table.ColumnHeader>
                            <Table.ColumnHeader >Name</Table.ColumnHeader>
                            <Table.ColumnHeader >DOB</Table.ColumnHeader>
                            <Table.ColumnHeader >Gender</Table.ColumnHeader>
                            <Table.ColumnHeader >Address</Table.ColumnHeader>
                            <Table.ColumnHeader >First Release Year</Table.ColumnHeader>
                            <Table.ColumnHeader >Released Albums</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { parsedResponse && parsedResponse.status === 'success' && parsedResponse.data.map((item) => (
                            <Table.Row key={ item.id } onClick={ () => handleRowClick(item.id) } cursor={ 'pointer' } >
                                <Table.Cell>{ item.id }</Table.Cell>
                                <Table.Cell>{ item.name }</Table.Cell>
                                <Table.Cell>{ moment(item.dob).format("DD MMM, YYYY") }</Table.Cell>
                                <Table.Cell>{ item.gender }</Table.Cell>
                                <Table.Cell>{ item.address }</Table.Cell>
                                <Table.Cell>{ item.first_release_year }</Table.Cell>
                                <Table.Cell>{ item.no_of_albums_released }</Table.Cell>
                            </Table.Row>
                        )) }
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>

            <DialogRoot size={ 'sm' } open={ isOpen } onOpenChange={() => setImportedArtists(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import Artists </DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <p style={{marginBottom: "17px"}}>
                            Choose a CSV File to import artists from:
                        </p>
                        <input ref={ inputFileRef } onChange={ handleFileChange } type='file' id='csvFileInput' accept='.csv' />
                        { importedArtists && (
                            <Text color={'red'} mt={'1em'}> Duplicates will also be imported!!!</Text>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button onClick={ () => setIsOpen(false) } variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button loading={artistImportLoading} loadingText={`Importing ${importedArtists && importedArtists.length} artists...`} onClick={handleImportArtists} disabled={ !importedArtists }>{ importedArtists? `Import ${importedArtists.length} Artists` : "Import" }</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>

            <HStack width={ '100%' } justifyContent={ 'space-between' }>

                <PaginationRoot count={ (page + 3) * 10 } onPageChange={ handlePageChange } pageSize={ 10 } page={ page } defaultPage={ 1 } >
                    <Group attached>
                        <PaginationPrevTrigger />
                        <PaginationItems />
                        <PaginationNextTrigger />
                    </Group>
                </PaginationRoot>
                { !onRowClicked && (
                    <HStack>
                        <Group>
                            <Button variant='outline' onClick={ () => setIsOpen(true) }>Import</Button>
                            <Button variant='outline' onClick={ () => downloadCSVFromJson(`artists#${page}.csv`, parsedResponse.data) }>Export</Button>
                        </Group>
                    </HStack>
                ) }
            </HStack>
        </>
    )
}


export default AllArtists