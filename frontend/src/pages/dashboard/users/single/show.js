import moment from 'moment';
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from 'src/components/custom/loading';
import useFetchSingle from 'src/hooks/useFetchSingle'

function SingleUserShow () {
    const { userId } = useParams();
    const { loading, singleResource } = useFetchSingle("/users/" + userId)
    return loading ? <Loading /> : (
        <>
            { singleResource && (
                <ul>
                    <li><span><b>Name: </b> { singleResource.first_name } { singleResource.last_name } </span></li>
                    <li><span><b>Email: </b> { singleResource.email } </span></li>
                    <li><span><b>Phone: </b> { singleResource.phone } { singleResource.last_name } </span></li>
                    <li><span><b>Address: </b> { singleResource.address } { singleResource.last_name } </span></li>
                    <li><span><b>Gender: </b> { singleResource.gender === 'm' ? "Male" : singleResource.gender === 'f' ? "Female" : "Others" } </span></li>
                    <li><span><b>DOB: </b> { singleResource.dob } </span></li>
                    <li><span><b>Created  </b>At: { moment(singleResource.created_at).format("DD MMM, YYYY") } </span></li>
                    <li><span><b>Updated  </b>At: { moment(singleResource.updated_at).format("DD MMM, YYYY") } </span></li>
                </ul>
            ) }
        </>
    )
}



export default SingleUserShow