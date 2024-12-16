import moment from 'moment';
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from 'src/components/custom/loading';
import useFetchSingle from 'src/hooks/useFetchSingle'

function SingleArtistShow () {
    const { artistId } = useParams();
    const { loading, singleResource } = useFetchSingle("/artists/" + artistId)
   

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
                    
                    <hr />
                    <hr />
                    
                </>
            ) }
        </>
    )
}



export default SingleArtistShow