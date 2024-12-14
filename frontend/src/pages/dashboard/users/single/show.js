import moment from 'moment';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from 'src/components/custom/loading';
import { Button } from 'src/components/ui/button';
import useAPIFetch from 'src/hooks/useAPIFetch';
import useFetchSingle from 'src/hooks/useFetchSingle'

function SingleUserShow () {
    const { userId } = useParams();
    const { loading, singleResource } = useFetchSingle("/users/" + userId)
    const navigate = useNavigate();
    const { loading: deleteLoading, parsedResponse, fetchAPI } = useAPIFetch();

    function handleDelete () {
        fetchAPI({
            uri: "/users/" + userId, options: {
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
                        <li><span><b>Name: </b> { singleResource.first_name } { singleResource.last_name } </span></li>
                        <li><span><b>Email: </b> { singleResource.email } </span></li>
                        <li><span><b>Phone: </b> { singleResource.phone } { singleResource.last_name } </span></li>
                        <li><span><b>Address: </b> { singleResource.address } { singleResource.last_name } </span></li>
                        <li><span><b>Gender: </b> { singleResource.gender === 'm' ? "Male" : singleResource.gender === 'f' ? "Female" : "Others" } </span></li>
                        <li><span><b>DOB: </b> { moment(singleResource.dob).format("DD MMM, YYYY") } </span></li>
                        <li><span><b>Created  </b>At: { moment(singleResource.created_at).format("DD MMM, YYYY") } </span></li>
                        <li><span><b>Updated  </b>At: { moment(singleResource.updated_at).format("DD MMM, YYYY") } </span></li>
                    </ul>
                    <hr />
                    <hr />
                    <Button color='red' variant='outline' onClick={handleDelete}>Delete this User</Button>
                </>
            ) }
        </>
    )
}



export default SingleUserShow