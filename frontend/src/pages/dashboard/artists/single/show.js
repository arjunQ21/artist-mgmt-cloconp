import moment from 'moment';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from 'src/components/custom/loading';
import { Button } from 'src/components/ui/button';
import useAPIFetch from 'src/hooks/useAPIFetch';
import useFetchSingle from 'src/hooks/useFetchSingle'

function SingleArtistShow () {
    const { artistId } = useParams();
    const { loading, singleResource } = useFetchSingle("/artists/" + artistId)
    const navigate = useNavigate();
    const { loading: deleteLoading, parsedResponse, fetchAPI } = useAPIFetch();

    function handleDelete () {
        fetchAPI({
            uri: "/artists/" + artistId, options: {
                method: "DELETE"
            }
        })
    }

    useEffect(function () {
        if (parsedResponse && parsedResponse.status === 'success') {
            navigate("../")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsedResponse])

    return loading ? <Loading /> : (
        <>
            { singleResource && (
                <>
                    <ul>
                        <li><span><b>Name: </b> { singleResource.name }</span></li>

                        <li><span><b>Gender: </b> { singleResource.gender === 'm' ? "Male" : singleResource.gender === 'f' ? "Female" : "Others" } </span></li>
                        <li><span><b>DOB: </b> { moment(singleResource.dob).format("DD MMM, YYYY") } </span></li>
                        <li><span><b>Address: </b> { singleResource.address } </span></li>
                        <li><span><b>First Release Year: </b> { singleResource.first_release_year } </span></li>
                        <li><span><b>Released Albums: </b> { singleResource.no_of_albums_released } </span></li>
                        <li><span><b>Created  </b>At: { moment(singleResource.created_at).format("DD MMM, YYYY") } </span></li>
                        <li><span><b>Updated  </b>At: { moment(singleResource.updated_at).format("DD MMM, YYYY") } </span></li>
                    </ul>
                    <hr />
                    <hr />
                    <Button loading={ deleteLoading } loadingText="Deleting..." color='red' variant='outline' onClick={ handleDelete }>Delete this Artist</Button>
                </>
            ) }
        </>
    )
}



export default SingleArtistShow