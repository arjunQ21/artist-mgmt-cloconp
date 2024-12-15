import moment from 'moment';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from 'src/components/custom/loading';
import { Button } from 'src/components/ui/button';
import useAPIFetch from 'src/hooks/useAPIFetch';
import useFetchSingle from 'src/hooks/useFetchSingle'

function SingleMusicShow () {
    const { musicId } = useParams();
    const { loading, singleResource } = useFetchSingle("/musics/" + musicId)
    const navigate = useNavigate();
    const { loading: deleteLoading, parsedResponse, fetchAPI } = useAPIFetch();

    function handleDelete () {
        fetchAPI({
            uri: "/musics/" + musicId, options: {
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
                        <li><span><b>Title: </b> { singleResource.title }</span></li>

                        <li><span><b>Genre: </b> { singleResource.genre } </span></li>
                        <li><span><b>Album: </b> { singleResource.album_name } </span></li>
                        
                        <li><span><b>Created  </b>At: { moment(singleResource.created_at).format("DD MMM, YYYY") } </span></li>
                        <li><span><b>Updated  </b>At: { moment(singleResource.updated_at).format("DD MMM, YYYY") } </span></li>
                    </ul>
                    <hr />
                    <hr />
                    <Button loading={ deleteLoading } loadingText="Deleting..." color='red' variant='outline' onClick={ handleDelete }>Delete this Music</Button>
                </>
            ) }
        </>
    )
}



export default SingleMusicShow