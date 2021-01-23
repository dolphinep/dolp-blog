import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MyPopup from '../utils/MyPopup';

function EditButton({ postID, commentID, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <MyPopup content={commentID ? 'Edit comment' : 'Write Story'}>
                <Button
                    as="div"
                    floated="right"
                    icon
                    size="small"
                    onClick={() => setConfirmOpen(true)}
                    as={Link}
                    to={`/posts/${postID}`}
                >
                    <Icon name="pencil alternate" style={{ margin: 0 }} size="small" />
                </Button>
            </MyPopup>
        </>
    );
}


export default EditButton;